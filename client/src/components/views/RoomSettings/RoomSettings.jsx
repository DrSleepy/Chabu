import React, { Component, Fragment } from 'react';

import SettingsHeader from '../../elements/SettingsHeader/SettingsHeader';
import SettingsSection from '../../elements/SettingsSection/SettingsSection';
import ButtonWithLoader from '../../elements/ButtonWithLoader/ButtonWithLoader';
import Modal from '../../elements/Modal/Modal';
import OnOff from '../../elements/OnOff/OnOff';
import server from '../../../axios';
import css from './roomSettings.less';

class RoomSettings extends Component {
  state = {
    id: '',
    title: '',
    creator: '',
    locked: false,
    updateLoader: false,
    deleteLoader: false,
    deleteModal: false
  };

  modalHandler = (property, boolean) => {
    this.setState({ [property]: boolean });
  };

  lockHandler = async boolean => {
    this.setState({ locked: boolean });
  };

  bindToState = (event, property) => {
    this.setState({ [property]: event.target.value });
  };

  updateRoom = async () => {
    this.setState({ updateLoader: true });

    const { title, creator, locked } = this.state;
    const data = { title, creator, locked };
    await server.patch(`/rooms/${this.state.id}`, data);

    this.setState({ updateLoader: false });
  };

  deleteRoom = async () => {
    this.setState({ deleteLoader: true });
    await server.delete(`/rooms/${this.state.id}`);
    this.props.history.replace('/joined-rooms');
  };

  setupRoom = async () => {
    const roomID = window.location.pathname.split('/')[2];
    const response = await server.get(`/rooms/${roomID}`).catch(error => error.response.data);
    if (!response || !response.data) return this.props.history.push('/joined-rooms');

    const { title, creator, locked } = response.data.data;

    this.setState({ id: roomID, title, creator, locked });
  };

  componentWillMount = async () => {
    this.setupRoom();
  };

  render() {
    return (
      <Fragment>
        <div className={css.settings}>
          <SettingsHeader backLink={`/r/${this.state.id}`} heading="Room Settings" />

          <SettingsSection heading="Edit" text="Change room info by editing the fields below.">
            <input
              className={css.input}
              type="text"
              placeholder="Title"
              value={this.state.title}
              onChange={event => this.bindToState(event, 'title')}
            />
            <input
              className={css.input}
              type="text"
              placeholder="Creator"
              value={this.state.creator}
              onChange={event => this.bindToState(event, 'creator')}
            />
          </SettingsSection>

          <SettingsSection
            heading="Activity"
            text="Unlocking the room prevents any further messages from being added to the room."
          >
            <OnOff offText="Unlock" onText="lock" state={this.state.locked} toggler={this.lockHandler} />
          </SettingsSection>

          <SettingsSection heading="Delete" headingColor="#ef4573" text="This action cannot be undone.">
            <button className={css.delete} onClick={() => this.modalHandler('deleteModal', true)}>
              Delete
            </button>
          </SettingsSection>

          <div className={css.footer}>
            <ButtonWithLoader
              text="Update"
              buttonType="default"
              className={css.update}
              onClick={this.updateRoom}
              loading={this.state.updateLoader}
            />
          </div>
        </div>

        {this.state.deleteModal && (
          <Modal
            type="danger"
            titleText="Delete Room"
            buttonText="Delete"
            buttonLoader={this.state.deleteLoader}
            onSubmit={this.deleteRoom}
            onClose={() => this.modalHandler('deleteModal', false)}
          >
            <p> Are you sure you want to delete this room? </p>
          </Modal>
        )}
      </Fragment>
    );
  }
}
export default RoomSettings;
