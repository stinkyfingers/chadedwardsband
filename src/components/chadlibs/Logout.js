import React from 'react';
import {decodeUser} from "../../utils";
import {UserContext} from "../../Context";
import '../../css/chadlibs/login.css';

const Logout = () => {
  const [user, setUser] = React.useContext(UserContext)
  const handleClick = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const userName = () => {
    const u = decodeUser(user);
    return u.name;
  };
  
  return (
    <div className='Logout'>
      <button className='login' onClick={handleClick}>Log Out <small className={'username'}>{userName()}</small></button>
    </div>
  )
};

export default Logout;