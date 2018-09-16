import React, { Component } from 'react';

import HomeView from './components/HomeView/HomeView';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <div>
        <HomeView />
      </div>
    );
  }
}

export default App;
