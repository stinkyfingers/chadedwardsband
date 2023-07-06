import React from 'react';

import '../css/about.css';
import fb from '../images/fb_logo.png'

const About = () => {
  return <div className={"About"}>
    <a href={'https://www.facebook.com/ChadEdwardslive'} target='_'><img className='fb' src={fb} alt='Chad Edwards Band' /></a>
    <div className={'summary'}>
      Well, howdy there, partner! The Chad Edwards Band from Minnesota, huh? Now, that's a group of talented musicians worth talkin' about! 
      They're like a wild stallion runnin' free on the prairie, bringin' their unique blend of country, rock, and Americana to folks near and far. 
      Chad Edwards, the lead singer, is a real troubadour with a voice as smooth as aged whiskey. He's got a way of tellin' stories through his songs 
      that'll give you goosebumps, I tell ya. And his bandmates, well, they're a tight-knit bunch who can play their instruments like nobody's business. 
      They've been tearin' up stages all across the great state of Minnesota, fillin' honky-tonks, dive bars, and even bigger venues with their foot-stompin' 
      tunes. Whether they're playin' their own original songs or puttin' their own spin on classic country hits, they sure know how to get a crowd hollerin' 
      and hootin' for more. Now, I reckon if you're lookin' for some good ol' Minnesota music with a touch of that cowboy spirit, the Chad Edwards Band is the 
      one to saddle up with. They'll take you on a wild ride through the heart of the Midwest, leavin' you with memories that'll last a lifetime. So grab your 
      hat, put on your boots, and get ready to two-step the night away with the Chad Edwards Band! Yeehaw!
    </div>
  </div>
};

export default About;