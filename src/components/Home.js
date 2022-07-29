import React from 'react';

import logo from '../images/ce_logo.jpg'

import '../css/home.css';

const Home = () => {
  return <div className='Home'>
    <img className='logo' src={logo} alt='Chad Edwards Band' />
  </div>
};

export default Home;