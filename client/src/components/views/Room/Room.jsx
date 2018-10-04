import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import mapStateToProps from '../../../store/state';
import Popup from '../../elements/Popup/Popup';
import RoomInfo from '../../elements/RoomInfo/RoomInfo';
import Modal from '../../elements/Modal/Modal';
import QuestionItem from '../../elements/QuestionItem/QuestionItem';
import CreateQuestion from '../../elements/CreateQuestion/CreateQuestion';
import FilterSearch from '../../elements/FilterSearch/FilterSearch';
import FilterList from '../../elements/FilterList/FilterList';
import ButtonWithLoader from '../../elements/ButtonWithLoader/ButtonWithLoader';
import { populateDatesWithQuestion, sortQuestionsInDate, getSortedDates } from '../../../helpers/questions';
import CollapsibleDate from '../../elements/CollapsibleDate/CollapsibleDate';
import Loader from '../../elements/Loader/Loader';
import server from '../../../axios';
import css from './room.less';

class Room extends Component {
  state = {
    loadingData: false,
    leaveLoader: false,
    leaveModal: false,
    room: {
      id: '',
      title: '',
      locked: '',
      creator: '',
      account: ''
    },
    isJoined: false,
    isOwner: false,
    canJoin: false,
    joinedPopup: false,
    questions: {},
    sortedDates: [],
    createQuestion: false,
    actions: {
      view: false,
      search: false
    },
    searchValue: ''
  };

  bindToState = (event, property) => {
    this.setState({ [property]: event.target.value });
  };

  joinHandler = async () => {
    this.setState({ isJoined: true, joinedPopup: true });
    await server.patch(`/rooms/${this.state.room.id}/join`).catch(error => error.response.data);
  };

  leaveHandler = async () => {
    this.setState({ leaveLoader: true });
    await server.patch(`/rooms/${this.state.room.id}/join`).catch(error => error.response.data);
    this.props.history.push('/joined-rooms');
  };

  actionToggler = icon => {
    if (!icon) {
      this.setState({ createQuestion: !this.state.createQuestion, actions: { view: false, search: false } });
      return;
    }

    if (this.state.actions[icon]) {
      this.setState({ createQuestion: false, actions: { view: false, search: false } });
      return;
    }

    this.setState({ createQuestion: false, actions: { view: false, search: false, [icon]: true } });
  };

  searchHandler = async search => {
    this.setState({ loadingData: true });
    this.props.history.push({ search: `?keywords=${this.state.searchValue}` });
  };

  setupRoom = async roomID => {
    this.setState({ loadingData: true });

    const response = await server.get(`/rooms/${roomID}`).catch(error => error.response.data);
    if (!response || !response.data) return this.props.history.push('/joined-rooms');

    const isJoined = response.data.data.members.includes(this.props.accountID);
    const isOwner = response.data.data.account === this.props.accountID;
    const canJoin = !isJoined && this.props.accountID;

    if (isJoined) {
      this.setState({ isJoined });
    }

    if (isOwner) {
      this.setState({ isOwner });
    }

    if (canJoin) {
      this.setState({ canJoin });
    }

    const { id, title, locked, creator, account } = response.data.data;
    this.setState({ room: { id, title, locked, creator, account } });
  };

  setupQuestions = async roomID => {
    this.setState({ loadingData: true });

    const [category, value] = window.location.search.replace('?', '').split('=');
    const response = await server.get(`/rooms/${roomID}?${category}=${value}`).catch(error => error.response.data);

    const questionsInDates = populateDatesWithQuestion(response.data.data.questions);
    const sortedDates = getSortedDates(Object.keys(questionsInDates));

    Object.keys(questionsInDates).forEach(date => sortQuestionsInDate(questionsInDates[date]));

    this.setState({ sortedDates, questions: questionsInDates, loadingData: false });
  };

  componentWillMount = () => {
    if (!window.location.search) {
      this.props.history.push('?view=all');
    }

    const roomID = window.location.pathname.split('/')[2];
    this.setupRoom(roomID);
    this.setupQuestions(roomID);
  };

  componentWillReceiveProps = async () => {
    const roomID = window.location.pathname.split('/')[2];
    this.setupQuestions(roomID);
  };

  render() {
    const cssView = this.state.actions.view ? css.activeIcon : '';
    const cssSearch = this.state.actions.search ? css.activeIcon : '';
    const cssCreateDisabled = this.state.room.locked ? css['actions__create--disabled'] : '';

    return (
      <Fragment>
        <header className={css.head}>
          <div className={css.room}>
            <Link to="/joined-rooms" className={css.room__back} />
            <div className={css['room__room-info']}>
              <RoomInfo {...this.state.room} />
            </div>
            {!this.state.isJoined && this.state.canJoin && <i className={css.room__join} onClick={this.joinHandler} />}
            {this.state.isJoined && <i className={css.room__leave} onClick={() => this.setState({ leaveModal: true })} />}
            {this.state.isOwner && <Link to={`${this.state.room.id}/settings`} className={css.room__settings} />}
          </div>
          <div className={css.actions}>
            <button
              className={[css.actions__create, cssCreateDisabled].join(' ')}
              onClick={() => this.actionToggler(null)}
              disabled={this.state.room.locked}
            >
              Create Question
            </button>
            <i className={[css.actions__search, cssSearch].join(' ')} onClick={() => this.actionToggler('search')} />
            <i className={[css.actions__view, cssView].join(' ')} onClick={() => this.actionToggler('view')} />
          </div>
          <div className={css.filters}>
            {this.state.actions.search && (
              <FilterSearch
                value={this.state.searchValue}
                onChange={event => this.bindToState(event, 'searchValue')}
                onClick={() => this.searchHandler(this.state.searchValue)}
              />
            )}
            {this.state.actions.view && <FilterList list={['Today', 'Week', 'Month', 'All']} roomID={this.state.room.id} />}
            {this.state.createQuestion && (
              <CreateQuestion roomID={this.state.room.id} close={() => this.actionToggler(null)} />
            )}
          </div>
        </header>
        <main>
          {this.state.loadingData && <Loader className={css.loader} />}
          {!this.state.loadingData &&
            Object.keys(this.state.questions) < 1 && <p className={css.notFound}> No Questions </p>}

          {!this.state.loadingData &&
            this.state.sortedDates.map((date, dateIndex) => (
              <CollapsibleDate date={date} key={dateIndex}>
                {this.state.questions[date].map((question, questionIndex) => (
                  <QuestionItem {...question} roomCreator={this.state.room.account} key={questionIndex} />
                ))}
              </CollapsibleDate>
            ))}
        </main>

        {this.state.joinedPopup && <Popup text="Room Joined" />}

        {this.state.leaveModal && (
          <Modal
            titleText="Leave Room"
            titleColor="#ef4573"
            close={() =>
              this.setState({
                leaveModal: false
              })
            }
          >
            <p> Are you sure you want to leave this room? </p>
            <div className={css['modal-actions']}>
              <button className={css['modal-actions__secondary']} onClick={() => this.setState({ leaveModal: false })}>
                Cancel
              </button>
              <ButtonWithLoader
                className={css['modal-actions__primary']}
                text="Leave"
                buttonType="primary--danger"
                spinnerColor="#fff"
                onClick={this.leaveHandler}
                loading={this.state.leaveLoader}
              />
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Room);
