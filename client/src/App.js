import React, { Component } from 'react';
import Button from 'antd/lib/button';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary"> Bob </Button>
        <p> Hi Bob </p>
      </div>
    );
  }
}

export default App;
