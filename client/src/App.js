import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import HomeView from './components/HomeView/HomeView';
import RoomView from './components/RoomView/RoomView';
import QuestionView from './components/QuestionView/QuestionView';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ height: '100%' }}>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/r/:roomID" component={RoomView} />
            <Route exact path="/q/:questionID" component={QuestionView} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
