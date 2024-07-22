import React, { useState } from 'react';
import '../App.css';
import { FaMinus } from 'react-icons/fa';

export const NewPlayList = ({ playlist, savePlaylist, removeSongFromPlaylist }) => {
  const [playlistName, setPlaylistName] = useState('');

  const handleChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleSave = () => {
    savePlaylist(playlistName, playlist);
  };
  return (
    <div className='new-playlist'>
      <input 
        onChange={handleChange}
        type='text'
        placeholder='New Playlist'
        value={playlistName}
        className='playlist-input'
      />
      <div className='playlist'>
        {playlist.map((song, index) => (
          <div key={index} className='search-result'>
            <div className='result-info'>
              <div className='result-name'>{song.song}</div>
              <div className='result-artist'>{song.artist}</div>
              <div className='result-album'>{song.album}</div>
            </div>
            <button className='remove-button' onClick={() => removeSongFromPlaylist(index)}>
              <FaMinus />
            </button>
          </div>
        ))}
      </div>
      <button className='save-button' onClick={handleSave}>Save to Spotify</button>
    </div>
  );
};