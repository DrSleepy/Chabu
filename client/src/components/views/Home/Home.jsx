import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import mapDispatchToProps from '../../../store/dispatch';
import Modal from '../../elements/Modal/Modal';
import ButtonWithLoader from '../../elements/ButtonWithLoader/ButtonWithLoader';
import Loader from '../../elements/Loader/Loader';
import appendErrorsHandler from '../../../helpers/appendErrorsHandler';
import NavBar from '../../elements/NavBar/NavBar';
import InputWithError from '../../elements/InputWithError/InputWithError';
import RoomItem from '../../elements/RoomItem/RoomItem';
import QuestionItem from '../../elements/QuestionItem/QuestionItem';
import server from '../../../axios';
import css from './home.less';

class Home extends Component {
  state = {
    list: {
      list: null,
      loader: false
    },
    joinRoom: {
      data: { id: '' },
      modal: false,
      loader: false,
      error: ''
    },
    createRoom: {
      data: { title: '', creator: '' },
      modal: false,
      loader: false,
      errors: { title: [], creator: [] }
    }
  };

  modalHandler = (property, boolean) => {
    this.setState({ [property]: { ...this.state[property], modal: boolean } });
  };

  joinRoomHandler = async () => {
    this.setState({ joinRoom: { ...this.state.joinRoom, loader: true } });

    const result = await server.get('/accounts').catch(error => error.response);
    const joined = result.data.data.joinedRooms.includes(this.state.joinRoom.data.id);

    if (joined) {
      this.setState({ joinRoom: { ...this.state.joinRoom, loader: false, error: 'Room already joined' } });
      return;
    }

    const response = await server.patch(`/rooms/${this.state.joinRoom.data.id}/join`).catch(error => error.response);
    if (response.data.errors.length) {
      const error = response.data.errors[0].message;
      this.setState({ joinRoom: { ...this.state.joinRoom, loader: false, error } });
      return;
    }

    this.setState({ joinRoom: { ...this.state.joinRoom, data: { id: '' }, loader: false, modal: false } });
    this.props.history.push('/joined-rooms');
  };

  createRoomHandler = async () => {
    this.setState({ createRoom: { ...this.state.createRoom, loader: true, errors: { title: [], creator: [] } } });

    const response = await server.post('/rooms', this.state.createRoom.data).catch(error => error.response);
    if (response.data.errors.length) {
      const errors = response.data.errors;
      const appendedErrors = appendErrorsHandler(errors, this.state.createRoom.errors);
      this.setState({ createRoom: { ...this.state.createRoom, loader: false, errors: appendedErrors } });
      return;
    }

    this.setState({
      createRoom: {
        ...this.state.createRoom,
        data: { title: '', creator: '' },
        loader: false,
        modal: false
      }
    });
    this.props.history.push('/created-rooms');
  };

  getListHandler = async list => {
    this.setState({ loadingList: true });

    const response = await server.get(`/accounts/${list}`).catch(error => error.response);
    if (!response || response.status === 401) {
      this.props.unsetAccount();
      return;
    }

    const result = response.data.data.sort((a, b) => new Date(a.date) < new Date(b.date));
    let resultJSX;

    if (list === 'joined-rooms' || list === 'created-rooms') {
      resultJSX = result.map(room => <RoomItem title={room.title} id={room._id} creator={room.creator} key={room._id} />);
    }

    if (list === 'created-questions') {
      resultJSX = result.map((question, i) => <QuestionItem {...question} key={i} />);
    }

    this.setState({ loadingList: false, list: resultJSX });
  };

  bindToState = (event, property, input) => {
    this.setState({
      [property]: {
        ...this.state[property],
        data: {
          ...this.state[property].data,
          [input]: event.target.value
        }
      }
    });
  };

  componentWillMount = () => {
    const list = window.location.pathname.replace('/', '');
    this.getListHandler(list);
  };

  componentWillReceiveProps = nextProps => {
    const list = nextProps.location.pathname.replace('/', '');
    this.getListHandler(list);
  };

  render() {
    return (
      <Fragment>
        <div className={css.container}>
          <div className={css.head}>
            <button className={css.head__join} onClick={() => this.modalHandler('joinRoom', true)}>
              Join room
            </button>
            <button className={css.head__create} onClick={() => this.modalHandler('createRoom', true)}>
              Create room
            </button>
            <Link to="/settings" className={css.head__settings} />
          </div>

          <NavBar />

          <main className={css.main}>
            {this.state.loadingList ? <Loader className={css.loader} /> : this.state.list}
            {!this.state.loadingList && !this.state.list.length && <p className={css.notFound}> None found </p>}
          </main>
        </div>

        {this.state.joinRoom.modal && (
          <Modal titleText="Join Room" close={() => this.modalHandler('joinRoom', false)}>
            <InputWithError
              placeholder="Room ID"
              value={this.state.joinRoom.data.id}
              onChange={event => this.bindToState(event, 'joinRoom', 'id')}
              errorMessage={this.state.joinRoom.error}
            />
            <div className={css['modal-actions']}>
              <button className={css['modal-actions__secondary']} onClick={() => this.modalHandler('joinRoom', false)}>
                Cancel
              </button>
              <ButtonWithLoader
                className={css['modal-actions__primary']}
                text="Join"
                buttonType="primary"
                spinnerColor="#fff"
                onClick={this.joinRoomHandler}
                loading={this.state.joinRoom.loader}
              />
            </div>
          </Modal>
        )}

        {this.state.createRoom.modal && (
          <Modal titleText="Create Room" close={() => this.modalHandler('createRoom', false)}>
            <InputWithError
              placeholder="Title"
              maxLength={40}
              value={this.state.createRoom.data.title}
              onChange={event => this.bindToState(event, 'createRoom', 'title')}
              errorMessage={this.state.createRoom.errors.title[0]}
            />
            <InputWithError
              placeholder="Creator (optional)"
              value={this.state.createRoom.data.creator}
              maxLength={15}
              onChange={event => this.bindToState(event, 'createRoom', 'creator')}
              errorMessage={this.state.createRoom.errors.creator[0]}
            />
            <div className={css['modal-actions']}>
              <button className={css['modal-actions__secondary']} onClick={() => this.modalHandler('createRoom', false)}>
                Cancel
              </button>
              <ButtonWithLoader
                className={css['modal-actions__primary']}
                text="Create"
                buttonType="primary"
                spinnerColor="#fff"
                onClick={this.createRoomHandler}
                loading={this.state.createRoom.loader}
              />
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Home);
