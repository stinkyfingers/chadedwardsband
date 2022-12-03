import React from 'react';
import Error from './Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faArrowsV } from '@fortawesome/free-solid-svg-icons'
import '../css/songlist.css';

const SongList = ({
  songlist,
  err,
}) => {
    const [sort, setSort] = React.useState({ field: 'title' });
  const rows = () => {
    if (!songlist.length) return null;
    return songlist
        .sort((a, b) => {
            if (a[sort.field] > b[sort.field]) {
                return sort.asc ? 1 : -1
            } else {
                return sort.asc ? -1 : 1
            }
        })
        .map((song) => (
      <tr key={song.Song}>
        <td>{song.Song}</td>
        <td>{song['Artist Version']}</td>
        <td>{song['Genre/Decade']}</td>
        <td>{song['Year']}</td>
      </tr>
    ))
  };
  
  const sortIcon = (field) => {
      if (field !== sort.field) return faArrowsV;
      return sort.asc ? faArrowUp : faArrowDown;
  };
  
  const handleClick = (field) => {
      if (field !== sort.field) {
          setSort({ field, asc: true });
          return;
      }
      setSort({ field, asc: !sort.asc });
  };
  
  if (!songlist) return null;
  return (
    <div className="songlist">
      { err && <Error err={err} />}
      <table>
        <thead>
          <tr>
            <th>Title
                <FontAwesomeIcon icon={sortIcon('Song')} onClick={() => handleClick('Song')}/>
            </th>
            <th>Artist
                <FontAwesomeIcon icon={sortIcon('Artist Version')} onClick={() => handleClick('Artist Version')}/>
            </th>
            <th>Genre/Decade
                <FontAwesomeIcon icon={sortIcon('Genre/Decade')} onClick={() => handleClick('Genre/Decade')}/>
            </th>
            <th>Year
                <FontAwesomeIcon icon={sortIcon('Year')} onClick={() => handleClick('Year')}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows()}
        </tbody>
      </table>
    </div>
  )
};

export default SongList;