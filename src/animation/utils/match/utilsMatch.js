import {getPositionTeamInMatch, getTeamInMatch} from "../utils";


const API_KEY = '008792446213484194c64e9066ecede9';
const API_URL = 'https://api.football-data.org/v2';

import axios from 'axios';
import teamsList from "../../assets/teamsSA.json";

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


function getTeamLogoFromDataOrFetch(teamInput) {
    const teams = teamsList?.teams;
    const teamFind = teams.find((team) => team.shortName === teamInput?.teamName);
    const teamFindLogo = !!teamInput?.teamLogo ? teamInput?.teamLogo : teamFind?.crestUrl;
    return teamFindLogo;
}

function getOverlayChangeBall(event, matchData) {
    let textAlign = 'left';
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    const team = getTeamInMatch(event, matchData);
    const teamLogo = getTeamLogoFromDataOrFetch(team);
    const playerName = event?.playerName;
    if (team?.teamPosition === 'left') {
        overlay.style.left = '0';
        textAlign = 'right';
    } else {
        overlay.style.right = '0';
    }
    overlay.style.top = '0';
    overlay.style.width = '50%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(128, 128, 128, 0.7)';
    overlay.style.opacity = '1';
    overlay.style.zIndex = '10';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.className = 'changeBallContainer ' + team?.teamPosition;

    const logo = document.createElement('img');
    logo.src = teamLogo;
    logo.style.width = '40px';
    logo.style.height = '40px';
    logo.style.display = 'inline-block';
    logo.style.verticalAlign = 'middle';
    logo.style.marginRight = '12px';
    if (team?.teamPosition === 'left') {
        logo.style.borderRight = `2px solid ${team?.color}`;
    } else {
        logo.style.borderLeft = `2px solid ${team?.color}`;
    }


    const playerNameEl = document.createElement('div');
    const playerNameH3 = document.createElement('div');
    playerNameH3.innerText = playerName;
    const possessionP = document.createElement('div');
    possessionP.innerText = 'Possesso palla';
    possessionP.style.margin = '0 !important';
    possessionP.style.color = '#fff';
    possessionP.style.textAlign = textAlign;
    possessionP.style.fontSize = '12px';

    playerNameEl.appendChild(playerNameH3);
    playerNameEl.appendChild(possessionP);
    playerNameEl.style.display = 'inline-block';
    playerNameEl.style.verticalAlign = 'middle';
    playerNameEl.style.marginRight = '5px';
    playerNameEl.style.fontSize = '14px';
    playerNameEl.style.fontWeight = 'bold';
    playerNameEl.style.lineHeight = '20px';
    playerNameEl.style.marginBlockStart = '0 !important';
    playerNameEl.style.marginBlockEnd = '0 !important';
    playerNameEl.style.borderBottom = `2px solid ${team?.color}`;
    playerNameEl.style.textAlign = textAlign;

    if (team?.teamPosition === 'right') {
        overlay.appendChild(logo);
        overlay.appendChild(playerNameEl);
    } else {
        overlay.appendChild(playerNameEl);
        overlay.appendChild(logo);
    }

    return overlay;
}





export { getLogoTeam, getAllTeams, getOverlayChangeBall, getTeamLogoFromDataOrFetch };