import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import mapStateToProps from '../../../store/state';

const customRoute = props => {
  let component = <Route exact path={props.path} component={props.component} />;

  if (props.auth) {
    component = props.accountID ? component : <Redirect to="/login" />;
  }

  if (props.if) {
    component = <Redirect to={props.redirect} />;
  }

  return component;
};

customRoute.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  redirect: PropTypes.string,
  auth: PropTypes.bool,
  if: PropTypes.any
};

export default connect(mapStateToProps)(customRoute);
