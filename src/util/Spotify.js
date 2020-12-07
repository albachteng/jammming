let token;
const clientID = '9ae636298e864b1fb0a20f48ad0e4613'; 
const uri = "http://tangy-orange.surge.sh/";
const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${uri}`

const Spotify = {
    getAccessToken() {
        if (token) {
            return token;
        }  // if there's already a token, use it
        
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expirationMatch = window.location.href.match(/expires_in=([^&]*)/);
        // if not, we're going to check the url for an embedded token and expiration

        if (tokenMatch && expirationMatch) {
            token = tokenMatch[1]; // NTS the match function returns an array
            const expiration = Number(expirationMatch[1]);
            // clear parameters and allow us to access a new token
            window.setTimeout(() => token = '', expiration * 1000);
            window.history.pushState('Access Token', null, '/'); 
        } else {
                window.location.href = redirect; 
            }
        },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { 
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }}).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                } 
                    return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                    }));
            });
        },
    savePlaylist(name, uris) {
        if (!name || !uris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userID;

        return fetch('https://api.spotify.com/v1/me', {
            headers: headers,
        }).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {   
                headers: headers,
                method: 'POST', 
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST', 
                    body: JSON.stringify({uris: uris})})
            });
        });
    },
}
export default Spotify;