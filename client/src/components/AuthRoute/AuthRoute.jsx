import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = props => {
  return (
    <Route
      exact
      path={props.path}
      component={() => (props.accountID ? props.component : <Redirect to={props.redirect || '/login'} />)}
    />
  );
};

const mapStateToProps = state => {
  return { accountID: state.accountID };
};

export default connect(mapStateToProps)(AuthRoute);
