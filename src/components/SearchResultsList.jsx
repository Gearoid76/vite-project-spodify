import React from 'react'
import '../App.css';
import { SearchResult } from './SearchResult';

export const SearchResultsList = ({ results, addToPlayList }) => {
  return (
    <div className='results-list'>
        {results.map((result, id) => {
            return <SearchResult result={result} key={id} addToPlayList={addToPlayList} />;
        })}
        </div>
  );
};
