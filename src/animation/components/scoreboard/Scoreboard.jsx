import React, {useEffect} from 'react';
import './Scoreboard.css';
import {getLogoTeam, getTeamLogoFromDataOrFetch} from "../../utils/match/utilsMatch";
import teamsList from "../../assets/teamsSA.json";

const Scoreboard = ({ score, period }) => {
    const [match, setMatch] = React.useState(score);
    const teamHomeColor = '#FF0000';
    const teamAwayColor = '#FFFDD0';
    useEffect(() => {
        setMatch(score);
        /*const colorTeamHome = match?.teamHome?.color;
        const colorTeamAway = match?.teamAway?.color;
        const homeTeamLogo = getTeamLogoFromDataOrFetch(score?.teamHome);
        const awayTeamLogo = getTeamLogoFromDataOrFetch(score?.teamAway);*/
    },[score]);

    return (
        <div className="scoreboard-container">
            <div className="scoreboard">
                <div className="team home-team">
                    <div className="container-team-logo">
                        <div className="team-logo">
                            <img src={getTeamLogoFromDataOrFetch(match?.teamHome)} alt={score?.teamHome?.teamName} />
                        </div>
                    </div>
                    <div className="container-team-info">
                        <div className="team-name">{score?.teamHome?.teamName}</div>
                        <div className="team-score" style={{ borderBottom: `2px solid ${teamHomeColor}` }}>{score?.teamHome?.score}</div>
                    </div>
                </div>
                <div className="match-info">
                    <div className="period">{period}</div>
                </div>
                <div className="team away-team">
                    <div className="container-team-info">
                        <div className="team-name">{score?.teamAway?.teamName}</div>
                        <div className="team-score" style={{ borderBottom: `2px solid ${teamAwayColor}` }}>{score?.teamAway?.score}</div>
                    </div>
                    <div className="container-team-logo">
                        <div className="team-logo">
                            <img src={getTeamLogoFromDataOrFetch(match?.teamAway)} alt={score?.teamAway?.teamName} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;
