import React from 'react';
import { chatGptCompletion } from '../../Api';
import '../../css/chadgpt/chadgpt.css';


const ChadGPT = ({ setErr }) => {
	const [request, setRequest] = React.useState('');
	const [response, setResponse] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const getCompletion = () => {
		setLoading(true);
		setErr(null);
		chatGptCompletion({ message: request })
			.then(resp => {
				if (!resp || resp.error || !resp.response) {
					setErr(resp ? resp.error : 'No response from ChadGPT');
					return;
				}
				setResponse(resp.response);
				setRequest('');
			})
			.catch(setErr)
			.finally(() => setLoading(false));
	};

	return (
		<div className='chadGPT'>
			<div className='directions'>
				<p>ChadGPT is the the latest in CI (cowboy intelligence). Pose a question or request (max length 100 characters) in the 
					box below and Chad will respond with all his Coors Light-swillin', camo hat wearin', Dodge Ram-drivin' wisdom.</p>
				<p>NOTE: Chad sleeps a lot, so this feature can be buggy. Don't hesitate to retry.</p>
			</div>
			<div className='response'>
				<div className='message' key={`message`}>{response}</div>
			</div>
			{ loading && <div className='loading'>Thinking...</div> }
			<textarea
				className='prompt'
				disabled={loading}
				onChange={(e) => setRequest(e.target.value)}
				value={request}
				maxLength="100"
				placeholder="Enter your question/prompt"
			/>
			<button disabled={loading || !request.length} onClick={() => getCompletion()} className='submit'>Ask Chad</button>
		</div>
	);
};

export default ChadGPT;
