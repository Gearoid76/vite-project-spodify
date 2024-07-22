import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import '../App.css';
import { getSpotifyToken, searchSpotify } from './Spotify'

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("")
    const [token, setToken] = useState("")

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getSpotifyToken();
            setToken(token);
        };
        fetchToken();
    }, []);


    const fetchData = async (value) => {
        if (token) {
            const results = await searchSpotify(token, value);
            setResults(results)
        } 
    }

    const handleChange = (value) => {
        setInput(value);
        if (value) {
            fetchData(value)
        } 
    }
//https://www.youtube.com/watch?v=sWVgMcz8Q44

  return (
    <div className='input-wrapper'>
        <FaSearch id="search-icon" />
        <input
         placeholder='Type a song.'
         value ={input} 
         onChange={(e) => handleChange(e.target.value)}
         />
    </div>
  )
}
