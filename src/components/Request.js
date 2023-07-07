import React from 'react';
import Error from './Error';
import SongList from './SongList';
import { submitRequest } from '../Api';
import { useSearchParams } from 'react-router-dom';
import '../css/request.css';
import useSession from '../hooks/useSession';

const minutesPermittedBeforeGig = 30;
const minutesPermittedAfterGig = -10;

const activeGig = (dates) => {
  const now = new Date();
  let nextGig = null;
  const active = dates.filter((date) => {
    const start = new Date(date.start.dateTime || date.start.date);
    start.setMinutes(start.getMinutes() - minutesPermittedBeforeGig);
    const end = new Date(date.end.dateTime || date.end.date);
    end.setMinutes(end.getMinutes() - minutesPermittedAfterGig);
    if ((nextGig === null && start > now) || (start < nextGig && start > now)) {
      nextGig = start;
    }
    return start < now && end > now;
  }).length > 0;
  
  return { active, nextGig: nextGig };
};

const Request = ({
  songlist,
  songErr,
  dates,
  calendarErr,
}) => {
  const [request, setRequest] = React.useState({ song:'', artist:'', message:'', name: '' });
  const [status, setStatus] = React.useState('');
  const [nextGig, setNextGig] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState();
  const [searchParams] = useSearchParams();
  const session = useSession();
  React.useEffect(() => {
    const { active, nextGig } = activeGig(dates);
    if (searchParams.get("admin") === 'true') {
      setActive(true);
      setNextGig(nextGig);
      return;
    }
    setActive(active);
    setNextGig(nextGig);
  }, [dates, searchParams]);

  const handleClick = async() => {
    setLoading(true);
    try {
      const req = { ...request, session };
      const resp = await submitRequest({ request: req });
      if (resp.error) {
        setErr(resp.error);
        return;
      }
      setStatus('Request submitted!');
    } catch (err) {
      console.log(err);
      setErr('Error: ' + err);
    } finally {
      setLoading(false);
    }
  }
  const onSelect = (song) => {
    setStatus('');
    setErr(null);
    const newSong = { song: song['Song'], artist: song['Artist Version'], message: request.message, name: request.name };
    setRequest(newSong);
  }
  const handleChange = (e) => {
    setStatus('');
    setErr(null);
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  }
	return (
		<div className="request">
      <div>
        <button onClick={() => setOpen(!open)} disabled={!active}>{open ? 'Hide' : 'Request a Song'}</button>
        { !active && 
          <div className='inactive'>
            Requesting a song is only available during select times.
            { nextGig && <p>Next available time: {nextGig.toLocaleString()}</p> }
          </div> }
      </div>
      { active && open && 
        <div className='activeRequest'>
          { calendarErr && <Error err={calendarErr} />}
          { err && <Error err={err} />}
          { status && <div className='status'>{status}</div> }
          <h2>Request a Song</h2>
          <div className='controls'>
            <div className='directions'>
              Requesting a song is only available during select times. Y'all are limited in the number of requests y'all can make.
              To request a song, enter your name and select a song from the list below or enter the song and artist manually. We reserve the right
              to ignore and/or ridicule requests.
            </div>
            <div>
              <span className='label'>Your Name</span>
              <input type='text' name='name' value={request.name} onChange={handleChange} maxLength={50} />
            </div>
            <div>
              <span className='label'>Song</span>
              <input type='text' name='song' value={request.song} onChange={handleChange} maxLength={50} />
            </div>
            <div>
              <span className='label'>Artist</span>
              <input type='text' name='artist' value={request.artist} onChange={handleChange} maxLength={50} />
            </div>
            <div>
              <span className='label'>Message to the Band</span>
              <input
                type='text'
                name='message'
                value={request.message}
                onChange={handleChange}
                maxLength={100}
                placeholder={`example: "Give my phone number to the guitarist. It's 612-555..."`}
              />
            </div>
            <button onClick={handleClick} disabled={request.song === '' || request.name === '' || status !== '' || loading}>Submit</button>
            { loading && <div className='status'>Processing...</div> }
          </div>
        </div>
      }
      <div className='pastRequests'>
        <a href='/requests'>View Past Requests</a>
      </div>
      <SongList songlist={songlist} songErr={songErr} onSelect={onSelect} />
    </div>
	);
};

export default Request;
