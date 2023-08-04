import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../../Context';
import { listGooglePhotos, getGooglePhotos, sendPhotos } from '../../Api';
import '../../css/admin/photos.css'
import PhotoMetadata from './PhotoMetadata';

const validFormat = (item) => {
	if (item.mediaItem.mimeType !== 'image/jpeg') return false;
	if (!item.mediaItem.filename.toLowerCase().endsWith('.jpg') && !item.mediaItem.filename.toLowerCase().endsWith('.jpeg')) return false;
	return true
}

const AdminPhotoUpload = ({ setErr }) => {
	const [admin, setAdmin] = React.useContext(AdminContext);
	const [loading, setLoading] = React.useState(false);
	const [mediaItems, setMediaItems] = React.useState(null);
	const [page, setPage] = React.useState({ index: 0, tokens: [null] });
	const [selectedPhotos, setSelectedPhotos] = React.useState({});
	const [msg, setMsg] = React.useState('');

	React.useEffect(() => {
		if (!admin || loading ) {
			return;
		}
		setLoading(true);

		const fetchPhotos = async () => {
			try {
				const photoData = await listGooglePhotos(admin.access_token, page.tokens[page.index]);
				if (photoData.error) {
					if (photoData.error.code === 401) {
						setAdmin(null); // logout
					}
					return;
				}
				setPage((prev) => ({
					...prev,
					tokens: [
						...prev.tokens.slice(0, prev.index + 1),
						photoData.nextPageToken
					]
				}));
				const ids = photoData.mediaItems.map((item) => item.id);
				const media = await getGooglePhotos(admin.access_token, ids);
				setMediaItems(media.mediaItemResults || null);
			} catch (err) {
				setErr(err);
			} finally {
				setLoading(false);
			}
		}
		fetchPhotos();
	}, [admin, page.index, page.tokens, setAdmin, setErr]);
	const handleNextPage = () => {
		setPage((prev) => ({
			...prev,
			index: prev.index < prev.tokens.length - 1 ? prev.index + 1 : prev.tokens.length - 1
		}));
	};
	const handlePrevPage = () => {
		setPage((prev) => ({
			...prev,
			index: prev.index > 0 ? prev.index - 1 : 0
		}));
	};
	
	const handleSelectPhoto = (item) => {
		setMsg('');
		setErr('');
		if (!validFormat(item)) {
			return;
		}
		setSelectedPhotos((prev) => {
			const exists = Object.keys(prev).find((id) => id === item.mediaItem.id);
			if (exists) {
				const updated = {};
				for (let key in prev) {
					if (key !== exists) {
						updated[key] = prev[key];
					}
				}
				return updated;
			} else {
				return ({...prev, [item.mediaItem.id]: item.mediaItem});
			}
		});
	};
	
	const handleSend = async () => {
		try {
			const res = await sendPhotos(admin.access_token, selectedPhotos);
			console.log(res);
			setMsg(`Uploaded ${res.length} photos`);
		} catch (err) {
			setErr(err);
		}
	};
	
	const handleMetadata = ({ id, category, tags }) => {
		setSelectedPhotos((prev) => {
			return {
				...prev,
				[id]: {
					...prev[id],
					metadata: {
						category,
						tags
					}
				}
			}
		});
	};
	
	if (!admin) {
		return <Navigate to={'/admin'} />
	}
	return (
		<div className='photoUpload'>
			<div className={'controls'}>
				<span onClick={handlePrevPage} className='page'>PREV PAGE</span>
				<span onClick={handleNextPage} className='page'>NEXT PAGE</span>
				<div>
					<button className='upload' onClick={handleSend} disabled={Object.keys(selectedPhotos).length === 0 ? 'disabled' : null}>Upload</button>
				</div>
			</div>
			{ msg && <div>{msg}</div> }
			{ loading ? <div>Loading...</div> : (
				<div className='photosSelectContainer'>
					{ mediaItems && mediaItems.map((item) => (
						<div key={item.mediaItem.id}>
							<img
								className={`
									photoSelect ${selectedPhotos[item.mediaItem.id] ? 'selected' : ''}
									${validFormat(item) ? '' : 'invalidFormat'}
								`}
								onClick={() => {handleSelectPhoto(item)}} src={item.mediaItem.baseUrl}
								alt={item.mediaItem.filename}
							/>
							<div>
								{item.mediaItem.filename}
							</div>
							{
								selectedPhotos[item.mediaItem.id] && <PhotoMetadata metadata={selectedPhotos[item.mediaItem.id]?.metadata || {}} handleMetadata={handleMetadata} id={item.mediaItem.id} />
             }
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AdminPhotoUpload;
