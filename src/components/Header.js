import React from 'react';
import { Link } from 'react-router-dom';

import '../css/header.css';

const Header = ({ err }) => {
  return (
    <div className="Header">
      <nav>
        <Link className={'link'} to="/">Home</Link>
        <Link className={'link'} to="/tour">Tour</Link>
        <Link className={'link'} to="/about">About</Link>
        <Link className={'link'} to="/songs">Songs</Link>
        <Link className={'link'} to="/media">Photos</Link>
      </nav>
        { err ? <div className={'error'}>{JSON.stringify(err)}</div> : null }
    </div>
  );
}

export default Header;
