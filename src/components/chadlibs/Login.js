import React from 'react';
import { clientId } from '../../Config';
import { auth } from '../../Api';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import '../../css/chadlibs/login.css';
import {ErrorContext, UserContext} from "../../Context";

const Login = () => {
  const [, setUser] = React.useContext(UserContext)
  const [, setErr] = React.useContext(ErrorContext);
  const onSuccess = async(res) => {
    setErr(null);
    const token = jwt_decode(res.credential);
    try {
      await auth({user: {token: res.credential, user: {id: token.sub, name: token.name, email: token.email}}});
    } catch (err) {
      setErr(err);
      return;
    }
    localStorage.setItem('user', JSON.stringify(res));
    setUser(res);
  };

  const onFailure = (res) => {
    setErr('failed to log in');
  };

  return (
    <div className='Login'>
      <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
      />
      </GoogleOAuthProvider>
    </div>
  )
};

export default Login;