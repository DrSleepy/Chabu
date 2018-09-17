import React, { Component } from 'react';

import RoomSettingsView from './components/RoomSettingsView/RoomSettingsView';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <RoomSettingsView />
      </div>
    );
  }
}

export default App;
