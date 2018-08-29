import React, { Component } from 'react';

import './styles/reset.less';
import './styles/base.less';
import css from './App.less';

class App extends Component {
  render() {
    return (
      <div className="App">
        <button className={css.App__btn}> Join room by ID </button>
        <button className={[css.App__btn2, css.red].join(' ')}> Create Questions Room </button>
      </div>
    );
  }
}

export default App;
