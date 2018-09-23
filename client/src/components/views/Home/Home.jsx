import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import mapDispatchToProps from '../../../store/dispatch';
import Modal from '../../elements/Modal/Modal';
import Loader from '../../elements/Loader/Loader';
import NavBar from '../../elements/NavBar/NavBar';
import InputWithError from '../../elements/InputWithError/InputWithError';
import RoomItem from '../../elements/RoomItem/RoomItem';
import QuestionItem from '../../elements/QuestionItem/QuestionItem';
import server from '../../../axios';
import css from './home.less';

class Home extends Component {
  state = {
    list: null,
    loading: false,
    joinModal: false,
    createModal: false
  };

  modalHandler = (modalName, boolean) => {
    this.setState({ [modalName]: boolean });
  };

  getList = async list => {
    this.setState({ loading: true });

    const response = await server.get(`/accounts/${list}`).catch(error => error.response);
    if (!response || response.status === 401) {
      this.props.unsetAccount();
      return;
    }

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

  componentWillMount = () => {
    const list = window.location.pathname.replace('/', '');
    this.getList(list);
  };

  render() {
    return (
      <Fragment>
        {this.state.joinModal && (
          <Modal title="Join Room" close={() => this.modalHandler('joinModal', false)} primaryText="Join">
            <InputWithError placeholder="Room ID" />
          </Modal>
        )}
        {this.state.createModal && (
          <Modal title="Create Room" close={() => this.modalHandler('createModal', false)} primaryText="Create">
            <InputWithError placeholder="Title" />
            <InputWithError placeholder="Your name (optional)" />
          </Modal>
        )}
        <div className={css.head}>
          <button className={css.head__join} onClick={() => this.modalHandler('joinModal', true)}>
            Join room
          </button>
          <button className={css.head__create} onClick={() => this.modalHandler('createModal', true)}>
            Create room
          </button>
          <Link to="/settings" className={css.head__settings} />
        </div>
        <NavBar />
        {this.state.loading ? <Loader className={css.loader} /> : this.state.list}
      </Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Home);
