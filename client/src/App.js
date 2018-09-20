import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Route from './components/Route/Route';
import AuthRoute from './components/AuthRoute/AuthRoute';
import LoginView from './components/LoginView/LoginView';
import HomeView from './components/HomeView/HomeView';
import RoomView from './components/RoomView/RoomView';
import QuestionView from './components/QuestionView/QuestionView';
import AccountSettingsView from './components/AccountSettingsView/AccountSettingsView';
import RoomSettingsView from './components/RoomSettingsView/RoomSettingsView';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Router>
          <Switch>
            <Route path="/login" component={!this.props.accountID ? <LoginView /> : <Redirect to="/" />} />
            <AuthRoute path="/settings" component={<AccountSettingsView />} />
            <AuthRoute path="/(joined-rooms|created-questions|created-rooms)/" component={<HomeView />} />
            <Route path="/r/:roomID" component={<RoomView />} />
            <Route path="/r/:roomID/:questionID" component={<QuestionView />} />
            <AuthRoute path="/r/:roomID/settings" component={<RoomSettingsView />} />
            <Redirect from="/" to="/joined-rooms" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountID: state.accountID
  };
};

export default connect(mapStateToProps)(App);
