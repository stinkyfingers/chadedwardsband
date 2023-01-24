import React from 'react';

const YouTubeEmbed = ({ id }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${id}`}
      border="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

const Video = () => {
  return (
    <div className='video'>
      <ul>
        <li>
          <YouTubeEmbed id='1WlBkyeZvlE' />
        </li>
      </ul>
    </div>
  );
};

export default Video;