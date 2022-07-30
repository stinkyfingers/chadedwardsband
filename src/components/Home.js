import React from 'react';

import logo from '../images/ce_logo.jpg'

import '../css/home.css';

const testVar = process.env.REACT_APP_TEST_VAR;

const Home = () => {
  console.log(testVar)
  return <div className='Home'>
    <img className='logo' src={logo} alt='Chad Edwards Band' />
  </div>
};

export default Home;