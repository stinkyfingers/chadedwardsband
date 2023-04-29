import { Link } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Logout from './Logout';
import {ErrorContext, UserContext} from '../../Context';

import '../../css/chadlibs/header.css';

const Router = ({ user, setUser, setErr }) => {
  const path = window.location.pathname;
  const admin = path === '/libs/admin';
  return (
    <>
      { admin ?
        <>
          <Link to={'/libs/admin'}><button disabled={ path === '/'} className='menu'>List ChadLibs</button></Link>
          <Link to='/libs/edit'><button disabled={!user || path === '/libs/edit'}className='menu'>Create {!user && '(login)'}</button></Link>
          <LoginLogout user={user} setUser={setUser} setErr={setErr} />
        </>
        :
        <Link to={'/libs'}><button disabled={ path === '/'} className='menu'>List ChadLibs</button></Link>
      }
    </>
  );
};

const LoginLogout = ({ user, setUser, setErr }) => {
  if (user) return <Logout user={user} setUser={setUser} setErr={setErr} />;
  return <Login setUser={setUser} setErr={setErr} />;
}

const Header = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [, setErr] = React.useContext(ErrorContext);

  return (
    <div className='chadLibsHeader'>
      <div className='menu'>
        <Router user={user} setUser={setUser} setErr={setErr} />
      </div>
    </div>
  );
};

export default Header;