import React from 'react';
import { AdminContext } from '../../Context';
import { listPhotos, updateMetadata, deletePhoto } from '../../Api';
import PhotoMetadata from './PhotoMetadata';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminPhotos = ({ setErr }) => {
  const [admin] = React.useContext(AdminContext);
  const [photos, setPhotos] = React.useState([]);
  const [deleting, setDeleting] = React.useState(false);
  const [metadata, setMetadata] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!admin) {
      return;
    }
    const fetchPhotos = async () => {
      try {
        const photoData = await listPhotos(admin.access_token);
        if (photoData.error) {
          setErr(photoData.error);
          return;
        }
        setPhotos(photoData.sort((a, b) => a.filename > b.filename ? 1 : -1));
        setMetadata(() => {
          const data = {}
          photoData.forEach((photo) => {
            data[photo.filename] = photo
          })
          return data;
        });
      } catch (err) {
        setErr(err);
      }
    }
    fetchPhotos();
   }, [admin, setErr]);

  const handleMetadata = ({ id, category, tags }) => {
    setMetadata((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        category,
        tags
      }
    }));
  };

  const handleSave = () => {
    setLoading(true)
    updateMetadata(admin.access_token, metadata).then((res) => {
      setMetadata(res)
    }).catch((err) => {
      setErr(err)
    }).finally(() => {
      setLoading(false)
    })
  };
  
  const handleDelete = (photo) => {
    setDeleting(true);
    deletePhoto(admin.access_token, photo.filename).then((res) => {
      setPhotos(photos.filter((p) => p.filename !== photo.filename))
    }).catch((err) => {
      setErr(err);
    }).finally(() => {
      setDeleting(false);
    });
  };
  
  if (!admin) {
    return <Navigate to="/admin" />;
  }
	return (
		<div className='adminPhotos'>
      <div className='controls'>
        <button onClick={handleSave} className='button'>Save</button>
        { deleting && <div>Deleting...</div> }
      </div>
      <div className='photosSelectContainer'>
      { !loading ? photos.map((photo) => (
        <div key={photo.filename}>
          <img src={photo.thumbnail} alt={photo.filename} />
          <div><FontAwesomeIcon className='deleteIcon' icon={faTrash} onClick={() => handleDelete(photo)} /></div>
          <PhotoMetadata id={photo.filename} metadata={metadata[photo.filename]} handleMetadata={handleMetadata} />
        </div>
        )) : <div>Loading...</div>
      }
      </div>
    </div>
	);
};

export default AdminPhotos;
