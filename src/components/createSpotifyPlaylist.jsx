export const createSpotifyPlaylist = async (name, accessToken) => {
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },        
    });

    const userData = await userResponse.json();
    const userId = userData.id;

    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {       
    method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: 'New playlist created from the app',
            public: false,
        }),
    });

    const playlistData = await playlistResponse.json();
    return playlistData.id;
};
