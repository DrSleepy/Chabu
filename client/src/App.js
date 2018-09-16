import React, { Component } from 'react';

import QuestionView from './components/QuestionView/QuestionView';

import './styles/reset.less';
import './styles/base.less';

class App extends Component {
  render() {
    return (
      <div>
        <QuestionView />
      </div>
    );
  }
}

export default App;
