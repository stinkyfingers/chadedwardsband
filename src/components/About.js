import React from 'react';

import '../css/about.css';
import fb from '../images/fb_logo.png'

import img from '../images/band/IMG_0822.jpg';

const About = () => {
  return <div className={"About"}>
    <a href={'https://www.facebook.com/ChadEdwardslive'} target='_'><img className='fb' src={fb} alt='Chad Edwards Band' /></a>
    <div className={'summary'}>
      The Chad Edwards Band was formed in 2004 and has performed nationally for over 1,500,000 fans. 
    </div>
    <img className='bandImage' src={img} alt={'Chad Edwards Band'} />
  </div>
};

export default About;