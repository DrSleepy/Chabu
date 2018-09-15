import React, { Component } from 'react';

import Home from './views/Home/Home';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
