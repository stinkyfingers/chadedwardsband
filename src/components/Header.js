import React from 'react';
import { Link } from 'react-router-dom';

import '../css/header.css';

const Header = () => {
  return (
    <div className="Header">
      <nav>
        <Link className={'link'} to="/">Home</Link>
        <Link className={'link'} to="/tour">Tour</Link>
        <Link className={'link'} to="/about">About</Link>
        <Link className={'link'} to="/media">Media</Link>
      </nav>
    </div>
  );
}

export default Header;
