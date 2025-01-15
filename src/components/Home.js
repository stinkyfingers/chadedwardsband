import React from 'react';
import { UpcomingDates } from './Tour';

import img from '../images/band/IMG_0822.jpg';

import '../css/home.css';

const Home = ({
  pastDates,
  upcomingDates,
  err
}) => {
  return <div className='Home'>
    <img className='bandImage' src={img} alt='Chad Edwards Band' />
    <UpcomingDates dates={upcomingDates} />
  </div>
};

export default Home;