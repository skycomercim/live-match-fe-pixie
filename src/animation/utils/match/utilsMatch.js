const API_KEY = '008792446213484194c64e9066ecede9';
const API_URL = 'https://api.football-data.org/v2';

import axios from 'axios';

async function getAllTeams() {
    try {
        const response = await axios.get(`${API_URL}/teams`, {
            headers: {'X-Auth-Token': API_KEY},
        });
        return response.data.teams;
    } catch (error) {
        console.error(error);
    }
}

function getLogoTeam(teamName) {
    const url = `${API_URL}/teams/` + teamName;
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_KEY,
        },
    })
        .then(response => response.json())
        .then(data => {
            return data?.crestUrl; // l'URL del logo della squadra
            // Utilizzare l'URL dell'immagine per visualizzare il logo della squadra
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

export { getLogoTeam, getAllTeams };