import React from 'react';
import ImageGallery from 'react-image-gallery';
import '../css/media.css';

import { listPhotos } from '../Api';

const Photos = ({ setErr }) => {
  const [images, setImages] = React.useState([]);
  const [filteredImages, setFilteredImages] = React.useState([]);
  const [filter, setFilter] = React.useState({});
  const [filterOptions, setFilterOptions] = React.useState({});
  React.useEffect(() => {
    listPhotos(null)
      .then((res) => {
        const options = { category: new Set(), tags: new Set() };
        setImages(res.map((photoData) => ({
          ...photoData,
            original: photoData.image,
            thumbnail: photoData.thumbnail,
            originalTitle: photoData.filename,
          })))
        res.map((photoData) => {
          if (photoData.category) options.category.add(photoData.category);
          if (photoData.tags?.length) photoData.tags.forEach((tag) => options.tags.add(tag));
        })
        setFilterOptions(options)
      })
      .catch((err) => {
        console.warn(err)
        setErr(err)
      });
  }, [setErr, setImages, filter]);
  
  React.useEffect(() => {
    setFilteredImages(images.filter((photoData) => {
      return (!filter.category || photoData.category === filter.category) && (!filter.tags || (photoData.tags && photoData.tags.includes(filter.tags)));
    }));
  }, [filter, images])
  
  const handleChange = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return <div className='media'>  
    <div className="controls">
      <select value={filter.category} name="category" onChange={handleChange}>
        <option key="select-category" value="">--select category--</option>
        {
          filterOptions.category ? Array.from(filterOptions.category).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          )) : null
        }
      </select>
      <select value={filter.tags} name="tags" onChange={handleChange}>
        <option key="select-tag" value="">--select tag--</option>
        {
          filterOptions.tags ? Array.from(filterOptions.tags).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          )) : null
        }
      </select>
    </div>
    <ImageGallery items={filteredImages} />
  </div>
};

export default Photos;