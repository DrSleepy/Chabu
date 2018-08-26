import React from 'react';

const Login = props => (
  <form>
    <h1> Chabu </h1>
    <p> Converse with strangers </p>

    <div>
      <label htmlFor=""> Email: </label>
      <input type="text" />
    </div>

    <div>
      <label htmlFor=""> Password: </label>
      <input type="text" />
    </div>

    <div>
      <label htmlFor=""> Password: </label>
      <input type="text" />
    </div>

    <fieldset>
      <input type="radio" />
      <input type="radio" />
    </fieldset>

    <div>
      <button type="submit"> Signup </button>
      <p onClick={props.switchComponent}> Already have an account? Login </p>
    </div>
  </form>
);

export default Login;
