import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../Loader/Loader';
import NavBar from '../NavBar/NavBar';
import RoomItem from '../RoomItem/RoomItem';
import QuestionItem from '../QuestionItem/QuestionItem';
import css from './homeView.less';
import server from '../../axios';

class HomeView extends Component {
  state = {
    list: null,
    loading: true
  };

  componentWillMount() {
    const list = window.location.pathname.replace('/', '');
    this.getList(list);
  }

  componentWillReceiveProps(nextProps) {
    const list = window.location.pathname.replace('/', '');
    this.getList(list);
  }

  getList = async list => {
    this.setState({ loading: true });

    const response = await server.get(`/accounts/${list}`).catch(error => error.response.data);
    const result = response.data.data;
    let resultJSX;

    if (list === 'joined-rooms' || list === 'created-rooms') {
      resultJSX = result.map(room => <RoomItem title={room.title} id={room._id} creator={room.creator} key={room._id} />);
    }

    if (list === 'created-questions') {
      resultJSX = result.map((question, i) => <QuestionItem {...question} key={i} />);
    }

    this.setState({ loading: false, list: resultJSX });
  };

  render() {
    return (
      <Fragment>
        <div className={css.head}>
          <button className={css.head__join}> Join room </button>
          <button className={css.head__create}> Create room </button>
          <Link to="/settings" className={css.head__settings} />
        </div>
        <NavBar />
        {this.state.loading ? <Loader loading={this.state.loading} /> : this.state.list}
      </Fragment>
    );
  }
}

export default HomeView;
