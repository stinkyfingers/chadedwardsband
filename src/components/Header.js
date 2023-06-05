import React from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import { Link, useLocation } from 'react-router-dom';

import '../css/header.css';

const Header = ({ err }) => {
  const path = useLocation().pathname;
  const [burgerOpen, setBurgerOpen] = React.useState(false);
  
  const links = () => (
    <>
      <Link className={`link${path === '/' && ' selected'}`} to="/">Home</Link>
      <Link className={`link${path === '/tour' && ' selected'}`} to="/tour">Tour</Link>
      <Link className={`link${path === '/about' && ' selected'}`} to="/about">About</Link>
      <Link className={`link${path === '/songs' && ' selected'}`} to="/songs">Songs</Link>
      <Link className={`link${path === '/photos' && ' selected'}`} to="/photos">Photos</Link>
      <Link className={`link${path === '/video' && ' selected'}`} to="/video">Video</Link>
      <Link className={`link${path === '/tech' && ' selected'}`} to="/tech">Tech</Link>
      <Link className={`link${path === '/libs' && ' selected'}`} to="/libs">Chadlibs</Link>
      <Link className={`link${path === '/gpt' && ' selected'}`} to="/gpt">ChadGPT</Link>
    </>
  );
  
  return (
    <div className="Header">
      <h1 className='logo'>Chad Edwards Band</h1>
      <nav className='listNav'>
        { links() }
      </nav>
      <nav className='burgerNav'>
        <HamburgerMenu isOpen={burgerOpen} menuClicked={() => setBurgerOpen(current => !current)} />
        { burgerOpen && <div className='burgerNavLinks'>
          { links() }
          </div> }
      </nav>
        { err ? <div className={'error'}>{JSON.stringify(err)}</div> : null }
    </div>
  );
}

export default Header;
