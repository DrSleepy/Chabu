import React, { Component } from 'react';

// import HomeView from './components/HomeView/HomeView';
import RoomView from './components/RoomView/RoomView';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <div>
        {/* <HomeView /> */}
        <RoomView />
      </div>
    );
  }
}

export default App;
