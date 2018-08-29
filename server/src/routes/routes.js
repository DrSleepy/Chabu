import users from './users';

const routes = server => {
  server.use('/users', users);
  // server.use('/ifThisPathIsEntered', UseThisRouterWhichDealsWithIt);
  // server.use('/', 'xxx'); Default route needs to be last as it can be fired by any path
};

export default routes;
