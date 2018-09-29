import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import mapStateToProps from './store/state';
import Route from './components/elements/Route/Route';
import LoginView from './components/views/Login/Login';
import HomeView from './components/views/Home/Home';
import RoomView from './components/views/Room/Room';
import QuestionView from './components/views/Question/Question';
import AccountSettingsView from './components/views/AccountSettings/AccountSettings';
import RoomSettingsView from './components/views/RoomSettings/RoomSettings';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginView} if={this.props.accountID} redirect="/joined-rooms" />
            <Route auth path="/settings" component={AccountSettingsView} />
            <Route auth path="/(joined-rooms|created-questions|created-rooms)/" component={HomeView} />
            <Route path="/r/:roomID/:questionID" component={QuestionView} />
            <Route path="/r/:roomID" component={RoomView} />
            <Route auth path="/r/:roomID/settings" component={RoomSettingsView} />
            <Redirect from="/" to="/joined-rooms" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
