import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../css/header.css';

const Header = ({ err }) => {
  const path = useLocation().pathname;
  return (
    <div className="Header">
      <h1 className='logo'>Chad Edwards Band</h1>
      <nav>
        <Link className={`link${path === '/' && ' selected'}`} to="/">Home</Link>
        <Link className={`link${path === '/tour' && ' selected'}`} to="/tour">Tour</Link>
        <Link className={`link${path === '/about' && ' selected'}`} to="/about">About</Link>
        <Link className={`link${path === '/songs' && ' selected'}`} to="/songs">Songs</Link>
        <Link className={`link${path === '/photos' && ' selected'}`} to="/photos">Photos</Link>
        <Link className={`link${path === '/video' && ' selected'}`} to="/video">Video</Link>
        <Link className={`link${path === '/tech' && ' selected'}`} to="/tech">Tech</Link>
        <Link className={`link${path === '/libs' && ' selected'}`} to="/libs">Chadlibs</Link>
        <Link className={`link${path === '/gpt' && ' selected'}`} to="/gpt">ChadGPT</Link>
      </nav>
        { err ? <div className={'error'}>{JSON.stringify(err)}</div> : null }
    </div>
  );
}

export default Header;
