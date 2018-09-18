import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
            <Route exact path="/r/:roomID" component={RoomView} />
            <Route exact path="/q/:questionID" component={QuestionView} />
            <Route path="/" component={HomeView} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
