import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginView from './components/LoginView/LoginView';
import HomeView from './components/HomeView/HomeView';
import RoomView from './components/RoomView/RoomView';
import QuestionView from './components/QuestionView/QuestionView';
import AccountSettingsView from './components/AccountSettingsView/AccountSettingsView';
import RoomSettingsView from './components/RoomSettingsView/RoomSettingsView';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginView} />

            <ProtectedRoute path="/settings" component={<AccountSettingsView />} />

            <Route exact path="/r/:roomID" component={RoomView} />
            <Route exact path="/r/:roomID/settings" component={RoomSettingsView} />
            <Route exact path="/q/:questionID" component={QuestionView} />
            <Route path="/" component={HomeView} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
