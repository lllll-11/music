// This file contains the main JavaScript code for the music player application.
// It initializes the music player, handles user interactions, and manages the connection to the Spotify API.

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const playerContainer = document.getElementById('player-container');

    // Initialize the Spotify API connection
    const initSpotify = () => {
        // Check if the user is authenticated
        if (localStorage.getItem('access_token')) {
            playerContainer.style.display = 'block';
            loadUserPlaylists();
        } else {
            playerContainer.style.display = 'none';
        }
    };

    // Load user playlists from Spotify
    const loadUserPlaylists = () => {
        // Call the function from spotify.js to fetch playlists
        fetchPlaylists().then(playlists => {
            displayPlaylists(playlists);
        });
    };

    // Display playlists on the page
    const displayPlaylists = (playlists) => {
        const playlistsContainer = document.getElementById('playlists-container');
        playlistsContainer.innerHTML = '';

        playlists.forEach(playlist => {
            const playlistElement = document.createElement('div');
            playlistElement.className = 'playlist';
            playlistElement.innerText = playlist.name;
            playlistsContainer.appendChild(playlistElement);
        });
    };

    // Event listener for login button
    loginButton.addEventListener('click', () => {
        // Call the function from spotify.js to authenticate the user
        authenticateUser();
    });

    // Initialize the application
    initSpotify();
});