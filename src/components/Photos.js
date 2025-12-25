import React from 'react';
import '../css/photos.css';

import { listPublicPhotos } from '../Api';

const Photos = ({ setErr }) => {
  const [photoFilenames, setPhotoFilenames] = React.useState([]);
  React.useEffect(() => {
    listPublicPhotos()
      .then((res) => {
        setPhotoFilenames (res);
      })
      .catch((err) => {
        setErr(err);
      });
  }, [setErr]);
  const bucketUrl = 'https://chadedwardspublicimages.s3.amazonaws.com';

  return (
    <div className="publicPhotosPage">
      {photoFilenames.map((filename, index) => (
        <img 
          key={index}
          src={`${bucketUrl}/${filename}`}
          alt={`${index + 1}`}
          className="publicPhoto"
        />
      ))}
    </div>
  );
};

export default Photos;