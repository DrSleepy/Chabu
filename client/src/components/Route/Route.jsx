import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const customRoute = props => {
  let component;

  if (props.auth) {
    component = props.accountID ? props.component : <Redirect to="/login" />;
  } else {
    component = props.component;
  }

  return <Route exact path={props.path} component={() => component} />;
};

const mapStateToProps = state => {
  return { accountID: state.accountID };
};

export default connect(mapStateToProps)(customRoute);
