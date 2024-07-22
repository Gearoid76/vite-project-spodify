export const addTracksToPlaylist = async (accessToken, playlistId, trackUris) => {
    console.log('Access Token:', accessToken); // Log access token here
    console.log('Playlist ID:', playlistId);
    console.log('Track URIs:', trackUris);
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uris: trackUris,
            }),
        });
        console.log('accessToken', accessToken);
        console.log('playlist created ', playlistId);
        console.log(' :) ln18 addtracksTo Playlist ')

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error.message);
        }

        console.log('Tracks added to playlist:', playlistId);
        console.log('Response:', data);
    } catch (error) {
        console.error('Error adding tracks to playlist:', error);
    }
};