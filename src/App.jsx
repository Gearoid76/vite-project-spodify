import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewPlayList } from './components/newPlayList';
import { redirectToAuthCodeFlow, getAccessToken } from '../authentication';
import { createSpotifyPlaylist } from './components/createSpotifyPlaylist';
import { addTracksToPlaylist } from './components/addTracksToPlaylist';
import './src/App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/searchResultsList';


function App() {
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      console.log('No code found, redirecting to auth flow');
      redirectToAuthCodeFlow(clientId);
    } else {
      console.log('Code found, fetching access token');
      (async () => {
        try {
          const token = await getAccessToken(clientId, code);
          console.log('Fetched Access Token:', token);
          setAccessToken(token);
          window.history.replaceState({}, document.title, "/");
        } catch (error) {
          console.error('Error fetching access token', error.message);
        }
      })();
    }
  }, []);

  const addToPlayList = (result) => {
    console.log('Adding result to playlist', result);

    if (!result.uri) {
      console.error('Result does not have a uri:', result);
      alert ('This track cannot be added to the playlist because it is missing a URI');
      return;
    }
    setPlaylist((prevPlaylist) => [...prevPlaylist, result]);
  };
  const removeSongFromPlaylist = (index) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((_, i) => i !== index));
  };
 
  const savePlaylist = async (name, playlist) => {
    console.log('Playlist before saving:', playlist);
    const trackUris = playlist.map(song => song.uri);
    console.log('Track URIs:', trackUris);

    if (!accessToken) {
      console.error('Access token is missing ');
      alert('Acccess token is missing. Please authenticate again');
      return;
    }

    if (trackUris.includes(undefined)) {
      console.error('Invalid track URIs detected:', trackUris);
      alert('Invalid track URIs detected.');
      return;
    }

    console.log('Using Access Token:', accessToken); 
    try {
      const playlistId = await createSpotifyPlaylist(name, accessToken);
      console.log('Created playlist ID:', playlistId);

      if (playlistId) {
        const trackUris = playlist.map(song => song.uri);
        await addTracksToPlaylist(accessToken, playlistId, trackUris);
        alert('Playlist saved to Spotify');
      } else {
        throw new Error('Failed to create playlist');
      }
    } catch (error) {
      console.error('Error saving playlist:', error);
      alert('Failed to save to playlist');
    }
  };

  const searchTracks = async (query) => {

    if (!accessToken) {
      console.error('Access token is missing 2');
      alert('Access token is missing. Please authenticate again');
      return;
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    const results = data.tracks.items.map(track => ({
      id: track.id,
      song: track.name,
      artist: track.artists.map(artist => artist.name).join(", "),
      album: track.album.name,
      uri: track.uri
    }));
    setResults(results);
  };

  return (
    <Router>
      <Routes>
        <Route path="/"element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  
  );
}
export default App;
