import React, { useEffect } from 'react';
import { listRequests } from '../Api';
import '../css/requests.css';

const Requests = () => {
  const [requests, setRequests] = React.useState([]);
  useEffect(() => {
    const getRequests = async () => {
      const resp = await listRequests();
      setRequests(resp);
    };
    getRequests();
  }, []);
	return (
		<div className='requests'>
      <table className='requestTable'>
        <thead>
          <tr>
            <th>Time</th>
            <th>Artist</th>
            <th>Song</th>
            <th>Name</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.time}>
              <td className='requestData'>{new Date(request.time).toLocaleString()}</td>
              <td className='requestData'>{request.artist}</td>
              <td className='requestData'>{request.song}</td>
              <td className='requestData'>{request.name}</td>
              <td className='requestData'>{request.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
	);
};

export default Requests;
