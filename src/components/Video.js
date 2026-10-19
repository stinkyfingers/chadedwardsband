import React from 'react';
import epk from '../videos/epk2.mov';
import '../css/video.css';

const youtubeVideos = [
  { id: '-8ByeyPtqnY', title: 'Fireman/Chattahoochie' },
  { id: '81snkLhrQn4', title: 'Cover Me Up' },
  { id: 'wNyy2h6PwY0', title: 'Fast Car' },
  { id: 'ol5o4_IB7Xw', title: 'Head Over Boots' },
  { id: 'M8n8Hvirr5w', title: 'Dust On The Bottle' },
];

const Video = () => {
  return (
    <div className='video'>
      <ul className='video-list'>
        {youtubeVideos.map(({ id, title }) => (
          <li key={id}>
            <h5>{title}</h5>
            <iframe
              className='video-player'
              src={`https://www.youtube.com/embed/${id}`}
              title={title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
          </li>
        ))}
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