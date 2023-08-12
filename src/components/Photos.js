import React from 'react';
import ImageGallery from 'react-image-gallery';
import '../css/media.css';

import { listPhotos } from '../Api';

const extractDate = (datetimeStr) => { 
  const date = new Date(datetimeStr);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

const Photos = ({ setErr }) => {
  const [images, setImages] = React.useState([]);
  const [filteredImages, setFilteredImages] = React.useState([]);
  const [filter, setFilter] = React.useState({});
  const [filterOptions, setFilterOptions] = React.useState({});
  
  const getCityState = (photoData) => {
    return photoData.location.label.replace(photoData.location.name + ', ', '');
  };

  React.useEffect(() => {
    listPhotos(null)
      .then((res) => {
        const options = { category: new Set(), tags: new Set(), location: new Set(), date: new Set() };
        setImages(res.map((photoData) => ({
          ...photoData,
            original: photoData.image,
            thumbnail: photoData.thumbnail,
            originalTitle: photoData.filename,
          })))
        res.forEach((photoData) => {
          if (photoData.category) options.category.add(photoData.category);
          if (photoData.tags?.length) photoData.tags.forEach((tag) => {
            if (!tag) return;
            options.tags.add(tag);
          });
          if (photoData.location?.label && photoData.location?.name) options.location.add(getCityState(photoData));
          if (photoData.datetimeOriginal) options.date.add(extractDate(photoData.datetimeOriginal))
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
      return (
        !filter.category || photoData.category === filter.category
      ) && (
        !filter.tags || (photoData.tags && photoData.tags.includes(filter.tags))
      ) && (
        !filter.location || getCityState(photoData) === filter.location
      ) && (
        !filter.date || extractDate(photoData.datetimeOriginal) === filter.date
      )
    }));
  }, [filter, images])
  
  const handleChange = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };

  return <div className='media'>  
    <div className="controls">
      <select className='photoSelector' value={filter.category} name="category" onChange={handleChange}>
        <option key="select-category" value="">--category--</option>
        {
          filterOptions.category ? Array.from(filterOptions.category).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          )) : null
        }
      </select>
      <select className='photoSelector' value={filter.tags} name="tags" onChange={handleChange}>
        <option key="select-tag" value="">--tag--</option>
        {
          filterOptions.tags ? Array.from(filterOptions.tags).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          )) : null
        }
      </select>
      <select className='photoSelector' value={filter.location} name="location" onChange={handleChange}>
        <option key="select-location" value="">--location--</option>
        {
          filterOptions.location ? Array.from(filterOptions.location).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          )) : null
        }
      </select>
      <select className='photoSelector' value={filter.date} name="date" onChange={handleChange}>
        <option key="select-date" value="">--date--</option>
        {
          filterOptions.date ? Array.from(filterOptions.date).sort((a, b) => (
            a < b ? 1 : -1
          )).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          )) : null
        }
      </select>
    </div>
    <ImageGallery items={filteredImages} />
  </div>
};

export default Photos;