import React from 'react';
import epk from '../videos/epk2.mov';
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
            type='video/mp4'
          >
            <source src={epk} type='video/webm' />
            Your browser does not support the video tag.
          </video>
        </li>
      </ul>
    </div>
  );
};

export default Video;