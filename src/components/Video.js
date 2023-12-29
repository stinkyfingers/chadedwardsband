import React from 'react';
import epk from '../videos/epk25.mp4';
import '../css/video.css';

const Video = () => {
  return (
    <div className='video'>
      <ul className='video-list'>
        <li>
          <h5>EPK</h5>
          <video
            className='video-player'
            controls
            >
            <source src={epk} type='video/mp4' />
          </video>
        </li>
      </ul>
    </div>
  );
};

export default Video;