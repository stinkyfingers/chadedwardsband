import React from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';

import '../css/header.css';

const Header = ({ err, setErr }) => {
  const path = useLocation().pathname;
  const [burgerOpen, setBurgerOpen] = React.useState(false);
  
  const links = (handleClick) => (
    <>
      <Link className={`link${path === '/' && ' selected'}`} to="/" onClick={handleClick}>Home</Link>
      <Link className={`link${path === '/tour' && ' selected'}`} to="/tour" onClick={handleClick}>Tour</Link>
      <Link className={`link${path === '/about' && ' selected'}`} to="/about" onClick={handleClick}>About</Link>
      <Link className={`link${(path === '/songs' || path === '/request') && ' selected'}`} to="/songs" onClick={handleClick}>Songs</Link>
      <Link className={`link${path === '/photos' && ' selected'}`} to="/photos" onClick={handleClick}>Photos</Link>
      <Link className={`link${path === '/video' && ' selected'}`} to="/video" onClick={handleClick}>Videos</Link>
      <Link className={`link${path === '/tech' && ' selected'}`} to="/tech" onClick={handleClick}>Tech</Link>
      <Link className={`link${path === '/libs' && ' selected'}`} to="/libs" onClick={handleClick}>Chadlibs</Link>
      <Link className={`link${path === '/gpt' && ' selected'}`} to="/gpt" onClick={handleClick}>ChadGPT</Link>
    </>
  );
  const handleError = React.useCallback((error) => {
    // Handle different error types
    if (typeof error === 'string') {
      return error;
    } else if (error instanceof Error) {
      return error.message || error.toString();
    } else if (error && typeof error === 'object') {
      // Try to extract meaningful information from object
      if (error.message) {
        return error.message;
      } else if (error.error) {
        return typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
      } else if (error.statusText) {
        return error.statusText;
      } else {
        return JSON.stringify(error);
      }
    } else {
      return 'Unknown error occurred';
    }
  }, []);

  // reset err on path change
  React.useEffect(() => {
    setErr(null);
  }, [path, setErr]);
  return (
    <div className="Header">
      <img className='logoImg' src={logo} alt='Chad Edwards Band' />
      <nav className='listNav'>
        { links() }
      </nav>
      <nav className='burgerNav'>
        <HamburgerMenu isOpen={burgerOpen} menuClicked={() => setBurgerOpen(current => !current)} color="#eee" />
        { burgerOpen && <div className='burgerNavLinks'>
          { links(() => setBurgerOpen(false)) }
          </div> }
      </nav>
        { err ? <div className={'error'}>{handleError(err)}</div> : null }
    </div>
  );
}

export default Header;
