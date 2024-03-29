import React from 'react';
import '../../css/admin/photo_metadata.css'

const categories = [
	'band',
	'selfie',
	'audience',
	'bts'
];

const PhotoMetadata = ({ id, metadata, handleMetadata }) => {
	const handleChange = (e) => {
		handleMetadata({ id, category: metadata.category, tags: e.target.value.split(',').map((val) => val.trim()) })
	}
	return (
		<div>
			<div className='category'>
				<select value={metadata?.category} onChange={(e) => handleMetadata({ id, category: e.target.value, tags: metadata.tags })}>
					<option value=''>--category--</option>
					{categories.map((category) => (
						<option key={category} value={category}>{category}</option>
					))}
				</select>
			</div>
			<div className='tags'>
				<input type='text' placeholder="tags" defaultValue={metadata?.tags} onChange={handleChange}/>
			</div>
    </div>
	);
};

export default PhotoMetadata;
