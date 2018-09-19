import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
      <BrowserRouter>
        <div style={{ height: '100%' }}>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/settings" component={AccountSettingsView} />
            <Route exact path="/r/:roomID" component={RoomView} />
            <Route exact path="/r/:roomID/settings" component={RoomSettingsView} />
            <Route exact path="/q/:questionID" component={QuestionView} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
