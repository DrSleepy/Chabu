import React from 'react';
import { Route } from 'react-router-dom';

// created for consistency reasons with authRoute - removes the need for function as component
const customRoute = props => {
  return <Route exact path={props.path} component={() => props.component} />;
};

export default customRoute;
