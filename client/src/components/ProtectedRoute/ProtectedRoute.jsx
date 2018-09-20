import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = props => {
  console.log(props);
  console.log(props.accountID ? 'YES' : 'NOT LOGGED IN');
  return <Route exact path={props.path} render={() => (props.accountID ? props.component : <Redirect to="/login" />)} />;
};

const mapStateToProps = state => {
  return {
    accountID: state.accountID
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
