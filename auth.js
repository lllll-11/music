const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const clientId = 'b634745c74f44bc3b20f4f751ed6cc24';
const clientSecret = '477d77ef34a2471291a94e4428adc293'; // Reemplaza con tu client secret
const redirectUri = 'https://lllll-11.github.io/music';

app.post('/get-token', async (req, res) => {
    const code = req.body.code;
    const params = new URLSearchTU_CLIENT_SECRETParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Backend running on port 3000'));