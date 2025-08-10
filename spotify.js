const clientId = 'b634745c74f44bc3b20f4f751ed6cc24'; // Reemplaza con tu Client ID
const redirectUri = 'https://lllll-11.github.io/music'; // URL de GitHub Pages
const scopes = 'user-read-private playlist-read-private streaming';

function authenticateUser() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
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

// Muestra las playlists en la página
async function showPlaylists() {
    const playlists = await fetchPlaylists();
    const container = document.getElementById('playlists');
    if (!container) return;
    container.innerHTML = '';
    playlists.forEach(playlist => {
        const li = document.createElement('li');
        li.textContent = playlist.name;
        container.appendChild(li);
    });
}

// Llama a la función si el usuario está autenticado
if (localStorage.getItem('access_token')) {
    showPlaylists();
}