import React from 'react';
import '../css/songlist.css';

const SongList = ({
  songlist,
}) => {
  const rows = () => {
    if (!songlist.length) return null;
    return songlist.map((song) => (
      <tr key={song.Song}>
        <td>{song.Song}</td>
        <td>{song['Artist Version']}</td>
        <td>{song['Genre/Decade']}</td>
        <td>{song['Year']}</td>
      </tr>
    ))
  };
  
  if (!songlist) return null;
  return (
    <div className="songlist">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre/Decade</th>
            <th>Year</th>
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