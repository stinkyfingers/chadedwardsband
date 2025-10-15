import React from 'react';
import { UpcomingDates } from './Tour';

import img from '../images/band/100.jpg';

import '../css/home.css';

const Home = ({
  upcomingDates,
}) => {
  return <div className='Home'>
    <div className='imageContainer'>
      <img className='bandImage' src={img} alt='Chad Edwards Band' />
    </div>
    <UpcomingDates dates={upcomingDates} />
  </div>
};

export default Home;