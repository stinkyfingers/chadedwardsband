import React from 'react';
import ImageGallery from 'react-image-gallery';
import '../css/media.css';

import AWS from 'aws-sdk';

const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const imageBucket = 'chadedwardsbandimages';
const bucketUrl = `https://chadedwardsbandimages.s3.us-west-1.amazonaws.com/`;

// randomize randomizes an array
const randomize = (arr) => {
  // swap swaps 2 array elements
  const swap = (arr, i1, i2) => {
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
  };
  
  let index = arr.length - 1;
  while (index > 0) {
    const rand = Math.floor(Math.random() * index);
    swap(arr, index, rand);
    index--;
  }
  return arr;
};

const Photos = ({ setErr }) => {
  const [images, setImages] = React.useState([]);
  
  AWS.config.update({ region: 'us-west-1', secretAccessKey, accessKeyId });
  React.useEffect(() => {
    const credentials = new AWS.Credentials(accessKeyId, secretAccessKey);
    const s3 = new AWS.S3({ apiVersion: '2006-03-01', credentials });
    s3.listObjects({Bucket: imageBucket}, (err, data) => {
      if (err) {
        console.warn(err)
        return
      }
      const img = [];
      data.Contents.forEach(datum => {
        img.push({ original: `${bucketUrl}${datum.Key}`, thumbnail: `${bucketUrl}${datum.Key}`, originalTitle: datum.Key });
      });      
      setImages(randomize(img));
    });
  }, []);
  

  return <div className='media'>  
    <ImageGallery items={images} />
  </div>
};

export default Photos;