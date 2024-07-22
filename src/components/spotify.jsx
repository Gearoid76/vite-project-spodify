import axios from 'axios';


const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET
const authEndpoint = 'https://accounts.spotify.com/api/token';

export const getSpotifyToken = async () => {
  const response = await axios.post(authEndpoint, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    },
    params: {
      grant_type: 'client_credentials'
    }
  });
  return response.data.access_token;
};

export const searchSpotify = async (token, query) => {
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      q: query,
      type: 'track'
    }
  });
  console.log("response.data.tracks.items",response.data.tracks.items);
  console.log("response.data.tracks",response.data.tracks);
  return response.data.tracks.items.map(track => ({
   id: track.id,
   song: track.name,
   artist: track.artists[0].name,
   //artist: track.artists.map(artist => artist.name).join(", ")
   album: track.album.name,
   uri: track.uri
  }));
  
};
