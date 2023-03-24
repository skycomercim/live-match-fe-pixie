import React from 'react';
import './Scoreboard.css';
import {getLogoTeam, getTeamLogoFromDataOrFetch} from "../../utils/match/utilsMatch";
import teamsList from "../../assets/teamsSA.json";

const Scoreboard = ({ matchData, score, period }) => {
    const match = score;
    const colorTeamHome = match?.teamHome?.color;
    const colorTeamAway = match?.teamAway?.color;
    const homeTeamLogo = getTeamLogoFromDataOrFetch(score?.teamHome);
    const awayTeamLogo = getTeamLogoFromDataOrFetch(score?.teamAway);

    return (
        <div className="scoreboard-container">
            <div className="scoreboard">
                <div className="team home-team">
                    <div className="container-team-logo">
                        <div className="team-logo">
                            <img src={homeTeamLogo} alt={score?.teamHome?.teamName} />
                        </div>
                    </div>
                    <div className="container-team-info">
                        <div className="team-name">{score?.teamHome?.teamName}</div>
                        <div className="team-score" style={{ borderBottom: `2px solid #${colorTeamHome}` }}>{score?.teamHome?.score}</div>
                    </div>
                </div>
                <div className="match-info">
                    <div className="period">{period}</div>
                </div>
                <div className="team away-team">
                    <div className="container-team-info">
                        <div className="team-name">{score?.teamAway?.teamName}</div>
                        <div className="team-score" style={{ borderBottom: `2px solid #${colorTeamAway}` }}>{score?.teamAway?.score}</div>
                    </div>
                    <div className="container-team-logo">
                        <div className="team-logo">
                            <img src={awayTeamLogo} alt={score?.teamAway?.teamName} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;
