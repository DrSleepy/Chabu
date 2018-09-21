import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
        <Router>
          <Switch>
            <Route path="/login" component={!this.props.accountID ? <LoginView /> : <Redirect to="/joined-rooms" />} />
            <Route auth={true} path="/settings" component={<AccountSettingsView />} />
            <Route auth={true} path="/(joined-rooms|created-questions|created-rooms)/" component={<HomeView />} />
            <Route path="/r/:roomID" component={<RoomView />} />
            <Route path="/r/:roomID/:questionID" component={<QuestionView />} />
            <Route auth={true} path="/r/:roomID/settings" component={<RoomSettingsView />} />
            <Redirect from="/" to="/joined-rooms" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { accountID: state.accountID };
};

export default connect(mapStateToProps)(App);
