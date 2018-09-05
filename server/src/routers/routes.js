import login from './login';
import accounts from './accounts';
// import rooms from './rooms';
// import questions from './questions';
import comments from './comments';

const routes = server => {
  server.use('/login', login);
  server.use('/accounts', accounts);
  // server.use('/rooms', rooms);
  // server.use('/questions', questions);
  server.use('/comments', comments);
};

export default routes;
