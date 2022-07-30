import React from 'react';
import ImageGallery from 'react-image-gallery';
import '../css/media.css';
import img40 from '../images/band/IMG_0040.jpg';
import img42 from '../images/band/IMG_0042.jpg';
import img101 from '../images/band/IMG_0101.jpg';
import img217 from '../images/band/IMG_0217.jpg';
import img818 from '../images/band/IMG_0818.jpg';
import img820 from '../images/band/IMG_0820.jpg';
import img822 from '../images/band/IMG_0822.jpg';
import img2038 from '../images/band/IMG_2038.jpg';
import img2046 from '../images/band/IMG_2046.jpg';

const images = [
  {
    original: img822,
    thumbnail: img822
  }, {
    original: img40,
    thumbnail: img40
  }, {
    original: img42,
    thumbnail: img42
  }, {
    original: img101,
    thumbnail: img101
  }, {
    original: img217,
    thumbnail: img217
  }, {
    original: img818,
    thumbnail: img818
  }, {
    original: img820,
    thumbnail: img820
  }, {
    original: img2038,
    thumbnail: img2038
  }, {
    original: img2046,
    thumbnail: img2046
  }
];

const Media = () => {
  return <div className='media'>  
    <ImageGallery items={images} />
  </div>
};

export default Media;