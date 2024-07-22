import React from 'react';
import '../App.css';
import { FaPlus } from 'react-icons/fa';
export const SearchResult = ({ result, addToPlayList }) => {
  const { song, artist, album } = result;
  const handleClick = () => {
    addToPlayList(result)
  };

  return (
      <div className='search-result' > 
        <div className='result-info' >
          <div className='result-name'>{song}</div>
          <div className='result-artist'>{artist}</div>
          <div className='result-album'>{album}</div>
        </div>
        <button className='add-button' onClick={handleClick}>
          <FaPlus />
        </button>
      </div>
  );
};

