import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Login = props => (
  <form>
    <h1> Chabu </h1>
    <p> Converse with strangers </p>

    <div>
      <TextField type="text" label="Username" />
      <Button type="primary">Button</Button>
    </div>

    <div>
      <TextField type="text" label="Password" />
    </div>

    <p> Forgot your password? </p>

    <div>
      <Button type="submit" variant="outlined" color="primary">
        Login
      </Button>
      <p onClick={props.switchComponent}> Create new account </p>
    </div>
  </form>
);

export default Login;
