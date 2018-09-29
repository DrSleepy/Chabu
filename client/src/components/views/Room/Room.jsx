import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import RoomInfo from '../../elements/RoomInfo/RoomInfo';
import QuestionItem from '../../elements/QuestionItem/QuestionItem';
import FilterSearch from '../../elements/FilterSearch/FilterSearch';
import FilterList from '../../elements/FilterList/FilterList';
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
    questions: [],
    categorisedQuestions: {},
    sortedDates: [],
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

  activeIcon = icon => {
    if (this.state.actions[icon]) {
      this.setState({
        actions: {
          view: false,
          search: false,
          sort: false
        }
      });
      return;
    }

    this.setState({
      actions: {
        view: false,
        search: false,
        sort: false,
        [icon]: true
      }
    });

    return css.activeIcon;
  };

  sortDates = () => {
    const dates = Object.keys(this.state.categorisedQuestions);
    const sortedDates = dates.sort((a, b) => moment(a, 'MMM Do YY').toISOString() < moment(b, 'MMM Do YY').toISOString());
    this.setState({ sortedDates });
  };

  sortQuestions = () => {
    const dates = Object.keys(this.state.categorisedQuestions);

    dates.forEach(date => {
      const sortedQuestions = this.state.categorisedQuestions[date].sort((a, b) => a.date < b.date);
      this.setState({ categorisedQuestions: { ...this.state.categorisedQuestions, [date]: sortedQuestions } });
    });
  };

  categoriseQuestionsByDates = questions => {
    const categorisedQuestions = {};

    questions.forEach(question => {
      const date = moment(question.date).format('MMM Do YY');

      if (Object.keys(categorisedQuestions).includes(date)) {
        categorisedQuestions[date].push(question);
        return;
      }
      categorisedQuestions[date] = [question];
    });

    this.setState({ categorisedQuestions });
    this.sortDates();
    this.sortQuestions();
  };

  getRoom = async roomID => {
    this.setState({ loading: true });

    const response = await server.get(`/rooms/${roomID}`).catch(error => error.response.data);
    const { id, title, unlocked, creator, account, questions } = response.data.data;

    this.categoriseQuestionsByDates(questions);
    this.setState({ room: { id, title, unlocked, creator, account }, questions, loading: false });
  };

  componentWillMount = () => {
    const roomID = window.location.pathname.replace('/r/', '');
    this.getRoom(roomID);
  };

  render() {
    const { view, search, sort } = this.state.actions;

    const cssActiveIconView = view ? css.activeIcon : '';
    const cssActiveIconSearch = search ? css.activeIcon : '';
    const cssActiveIconSort = sort ? css.activeIcon : '';

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
            <button className={css.actions__submit}> Create Question </button>
            <i className={[css.actions__search, cssActiveIconSearch].join(' ')} onClick={() => this.activeIcon('search')} />
            <i className={[css.actions__view, cssActiveIconView].join(' ')} onClick={() => this.activeIcon('view')} />
            <i className={[css.actions__sort, cssActiveIconSort].join(' ')} onClick={() => this.activeIcon('sort')} />
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
          </div>
        </header>
        <main>
          {this.state.loading && <Loader className={css.loader} />}
          {!this.state.loading && !this.state.questions.length && <p className={css.notFound}> No Questions </p>}

          {!this.state.loading &&
            this.state.sortedDates.map((date, dateIndex) => (
              <CollapsibleDate date={date} key={dateIndex}>
                {this.state.categorisedQuestions[date].map((question, questionIndex) => (
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
