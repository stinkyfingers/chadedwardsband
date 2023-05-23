import React from 'react';
import { chatGptCompletion } from '../../Api';
import '../../css/chadgpt/chadgpt.css';

const systemRole = {
	role: 'system',
	content: 'You are an assistant that speaks like a stereotypical cowboy.',
}

const ChadGPT = ({ setErr }) => {
	const [completion, setCompletion] = React.useState({});
	const [content, setContent] = React.useState('');
	const [messages, setMessages] = React.useState([systemRole]);
	const [loading, setLoading] = React.useState(false);
	const getCompletion = () => {
		setLoading(true);
		setErr(null);
		chatGptCompletion({ messages: [...messages, { role: 'user', content }]})
			.then(resp => {
				if (!resp.choices) { // chatGPT API seems to regularly produce unknown errors.
					setErr(resp.error || 'unknown error - try again');
					return;
				}
				setMessages((current) => ([...current, { role: 'user', content }]))
				setCompletion(resp);
				setContent('');
			})
			.catch(setErr)
			.finally(() => setLoading(false));
	};
	React.useEffect(() => {
		if (!completion || !completion.choices || !completion.choices.length) return;
		const defaultChoice = completion.choices[0];
		if (!defaultChoice.message) {
			setErr('ChadGPT response has no message');
			return;
		}
		setMessages(current => ([...current, defaultChoice.message]));
	}, [completion, setMessages, setErr]);

	return (
		<div className='chadGPT'>
			<div className='directions'>
				<p>ChadGPT is the the latest in CI (cowboy intelligence). Pose a question or request (max length 100 characters) in the 
					box below and Chad will respond with all his Coors Light-swillin', camo hat wearin', Dodge Ram-drivin' wisdom.</p>
				<p>NOTE: Chad sleeps a lot, so this feature can be buggy. Don't hesitate to retry.</p>
			</div>
			<div className='response'>
				{ messages.map((message, i) => {
					if (message.role === 'system') return null;
					return (
						<div className='message' key={`message-${i}`}>{message.content}</div>
					)
				})}
			</div>
			{ loading && <div className='loading'>Thinking...</div> }
			<textarea
				className='prompt'
				disabled={loading}
				onChange={(e) => setContent(e.target.value)}
				value={content}
				maxLength="100"
				placeholder="Enter your question/prompt"
			/>
			<button disabled={loading || !content.length} onClick={() => getCompletion()} className='submit'>Ask Chad</button>
		</div>
	);
};

export default ChadGPT;
