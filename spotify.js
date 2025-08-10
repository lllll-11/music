const clientId = '708f3288c5d849948098b9a90df44967'; // Reemplaza con tu Client ID
const redirectUri = 'https://lllll-11.github.io/tralalerotralala/src/index.html'; // URL de GitHub Pages
const scopes = 'user-read-private playlist-read-private streaming';

function authenticateUser() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.location = authUrl;
}

// Extrae el token de la URL después de autenticación
function getAccessTokenFromUrl() {
    const hash = window.location.hash;
    if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        return params.get('access_token');
    }
    return null;
}

// Guarda el token en localStorage
(function () {
    const token = getAccessTokenFromUrl();
    if (token) {
        localStorage.setItem('access_token', token);
        window.location.hash = '';
        window.location.reload();
    }
})();

// Ejemplo de función para obtener playlists
async function fetchPlaylists() {
    const token = localStorage.getItem('access_token');
    if (!token) return [];
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data.items || [];
}