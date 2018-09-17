import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import HomeView from './components/HomeView/HomeView';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ height: '100%' }}>
          <HomeView />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
