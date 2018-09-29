import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import css from './collapsibleDate.less';

class CollapsibleDate extends Component {
  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const today = moment(new Date()).format('MMM Do YY');
    const date = today === this.props.date ? 'Today' : this.props.date;

    const cssIsCollapsed = !this.state.collapsed ? css.isCollapsed : '';

    return (
      <section>
        <header className={css.header} onClick={this.toggleCollapsed}>
          <h2 className={css.date}> {date} </h2>
          <i className={[css.icon, cssIsCollapsed].join(' ')} />
        </header>
        {!this.state.collapsed && this.props.children}
      </section>
    );
  }
}

CollapsibleDate.propTypes = {
  date: PropTypes.string.isRequired
};

export default CollapsibleDate;
