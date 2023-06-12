import React from 'react';
import Error from './Error';
import SongList from './SongList';
import { getIP, submitRequest } from '../Api';
import '../css/request.css';

const minutesPermittedBeforeGig = 999930;
const minutesPermittedAfterGig = -10;

const activeGig = (dates) => {
  const now = new Date();
  return dates.filter((date) => {
    const start = new Date(date.start.dateTime || date.start.date);
    start.setMinutes(start.getMinutes() - minutesPermittedBeforeGig);
    const end = new Date(date.end.dateTime || date.end.date);
    end.setMinutes(end.getMinutes() - minutesPermittedAfterGig);
    return start < now && end > now;
  }).length > 0;
};

const Request = ({
  songlist,
  songErr,
  dates,
  calendarErr,
}) => {
  const [request, setRequest] = React.useState({ song:'', artist:'', message:''});
  const [status, setStatus] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState();
  React.useEffect(() => {
    const active = activeGig(dates);
    setActive(active);
  }, [dates]);

  const handleClick = async() => {
    setLoading(true);
    try {
      const ip = await getIP();
      const req = { ...request, ip: ip.ip };
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
    const newSong = { song: song['Song'], artist: song['Artist Version'], message: request.message };
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
        { !active && <div className='inactive'>Requesting a song is only available during select times.</div> }
      </div>
      { active && open && 
        <div className='activeRequest'>
          { calendarErr && <Error err={calendarErr} />}
          { err && <Error err={err} />}
          { status && <div className='status'>{status}</div> }
          <h2>Request a Song</h2>
          <div className='controls'>
            <div className='directions'>
              Requesting a song is only available during select times. Users are limited in the number of requests they can make.
              To request a song, select a song from the list below or enter the song and artist in the fields below.
            </div>
            <div>
              <span className='label'>Song</span>
              <input type='text' name='song' value={request.song} onChange={handleChange} />
            </div>
            <div>
              <span className='label'>Artist</span>
              <input type='text' name='artist' value={request.artist} onChange={handleChange} />
            </div>
            <div>
              <span className='label'>Message to the Band</span>
              <input
                type='text'
                name='message'
                value={request.message}
                onChange={handleChange}
                placeholder={`example: "I'd like to give my phone number to the guitarist. It's 612-555..."`}
              />
            </div>
            <button onClick={handleClick} disabled={request.song === '' || status !== '' || loading}>Submit</button>
            { loading && <div className='status'>Processing...</div> }
          </div>
        </div>
      }
      <SongList songlist={songlist} songErr={songErr} onSelect={onSelect} />
    </div>
	);
};

export default Request;
