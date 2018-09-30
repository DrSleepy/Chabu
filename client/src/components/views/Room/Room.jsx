import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import RoomInfo from '../../elements/RoomInfo/RoomInfo';
import QuestionItem from '../../elements/QuestionItem/QuestionItem';
import CreateQuestion from '../../elements/CreateQuestion/CreateQuestion';
import FilterSearch from '../../elements/FilterSearch/FilterSearch';
import FilterList from '../../elements/FilterList/FilterList';
import { populateDatesWithQuestion, sortQuestionsInDate, getSortedDates } from '../../../helpers/questions';
import CollapsibleDate from '../../elements/CollapsibleDate/CollapsibleDate';
import Loader from '../../elements/Loader/Loader';
import server from '../../../axios';
import css from './room.less';

class Room extends Component {
  state = {
    loading: false,
    room: {
      id: '',
      title: '',
      unlocked: '',
      creator: '',
      account: ''
    },
    questions: {},
    sortedDates: [],
    createQuestion: false,
    actions: {
      view: false,
      search: false,
      sort: false
    },
    searchValue: '',
    viewOptions: [
      { value: 'today', content: 'Today' },
      { value: 'week', content: 'Week' },
      { value: 'month', content: 'Month' },
      { value: 'all', content: 'All' }
    ],
    sortOptions: [
      { value: 'date:1', content: 'New' },
      { value: 'date:-1', content: 'Old' },
      { value: 'likes:-1', content: 'Likes 🠛' },
      { value: 'likes:1', content: 'Likes 🠙' }
    ]
  };

  bindToState = (event, property) => {
    this.setState({ [property]: event.target.value });
  };

  searchQuery = () => {
    const encodedSearch = encodeURI(this.state.searchValue);
    this.props.history.push({ pathname: `/r/${this.state.room.id}`, search: `?keywords=${encodedSearch}` });
  };

  actionToggler = icon => {
    if (!icon) {
      this.setState({ createQuestion: !this.state.createQuestion, actions: { view: false, search: false, sort: false } });
      return;
    }

    if (this.state.actions[icon]) {
      this.setState({ createQuestion: false, actions: { view: false, search: false, sort: false } });
      return;
    }

    this.setState({ createQuestion: false, actions: { view: false, search: false, sort: false, [icon]: true } });
  };

  setupRoom = async () => {
    this.setState({ loading: true });

    const roomID = window.location.pathname.split('/')[2];
    const response = await server.get(`/rooms/${roomID}`).catch(error => error.response.data);
    if (!response || !response.data) return this.props.history.push('/joined-rooms');

    const { id, title, unlocked, creator, account, questions } = response.data.data;

    const questionsInDates = populateDatesWithQuestion(questions);
    const sortedDates = getSortedDates(Object.keys(questionsInDates));
    Object.keys(questionsInDates).forEach(date => sortQuestionsInDate(questionsInDates[date]));

    this.setState({
      room: { id, title, unlocked, creator, account },
      sortedDates,
      questions: questionsInDates,
      loading: false
    });
  };

  componentWillMount = () => {
    this.setupRoom();
  };

  render() {
    const { view, search, sort } = this.state.actions;

    const cssView = view ? css.activeIcon : '';
    const cssSearch = search ? css.activeIcon : '';
    const cssSort = sort ? css.activeIcon : '';

    return (
      <Fragment>
        <header className={css.head}>
          <div className={css.room}>
            <Link to="/" className={css.room__back} />
            <div className={css['room__room-info']}>
              <RoomInfo {...this.state.room} />
            </div>
            <i className={css.room__leave} />
            <Link to={'/settings'} className={css.room__settings} />
          </div>
          <div className={css.actions}>
            <button className={css.actions__submit} onClick={() => this.actionToggler(null)}>
              Create Question
            </button>
            <i className={[css.actions__search, cssSearch].join(' ')} onClick={() => this.actionToggler('search')} />
            <i className={[css.actions__view, cssView].join(' ')} onClick={() => this.actionToggler('view')} />
            <i className={[css.actions__sort, cssSort].join(' ')} onClick={() => this.actionToggler('sort')} />
          </div>
          <div className={css.filters}>
            {this.state.actions.search && (
              <FilterSearch
                value={this.state.searchValue}
                onChange={event => this.bindToState(event, 'searchValue')}
                onClick={this.searchQuery}
              />
            )}
            {this.state.actions.sort && <FilterList list={this.state.sortOptions} roomID={this.state.room.id} />}
            {this.state.actions.view && <FilterList list={this.state.viewOptions} roomID={this.state.room.id} />}
            {this.state.createQuestion && (
              <CreateQuestion roomID={this.state.room.id} cancel={() => this.actionToggler(null)} />
            )}
          </div>
        </header>
        <main>
          {this.state.loading && <Loader className={css.loader} />}
          {!this.state.loading && Object.keys(this.state.questions) < 1 && <p className={css.notFound}> No Questions </p>}

          {!this.state.loading &&
            this.state.sortedDates.map((date, dateIndex) => (
              <CollapsibleDate date={date} key={dateIndex}>
                {this.state.questions[date].map((question, questionIndex) => (
                  <QuestionItem {...question} roomCreator={this.state.room.account} key={questionIndex} />
                ))}
              </CollapsibleDate>
            ))}
        </main>
      </Fragment>
    );
  }
}

export default Room;
