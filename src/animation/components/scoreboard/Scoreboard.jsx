import React from 'react';
import './Scoreboard.css';
import {getLogoTeam} from "../../utils/match/utilsMatch";
import teamsList from "../../assets/teamsSA.json";

const Scoreboard = ({ matchData, score, period }) => {
    const match = matchData?.getMatchInfo;
    const colorTeamHome = match?.teamHome?.color;
    const colorTeamAway = match?.teamAway?.color;
    const teams = teamsList?.teams;
    const teamHome = teams.find((team) => team.shortName === score?.teamHome?.teamName);
    const homeTeamLogo = teamHome?.crestUrl;
    const teamAway = teams.find((team) => team.shortName === score?.teamAway?.teamName);
    const awayTeamLogo = teamAway?.crestUrl;
    //const homeTeamLogo = getLogoTeam(teamHomeId) ?? match?.teamHome?.teamLogo;
    //const awayTeamLogo = getLogoTeam(teamAwayId) ?? match?.teamAway?.teamLogo;

    return (
        <div className="scoreboard-container">
            <div className="scoreboard">
                <div className="team home-team">
                    <div className="container-team-logo">
                        <div className="team-logo">
                            <img src={homeTeamLogo} alt={score?.teamHome?.teamName} />
                        </div>
                    </div>
                    <div className="container-team-info" style={{ borderBottom: `2px solid ${colorTeamHome}` }}>
                        <div className="team-name">{score?.teamHome?.teamName}</div>
                        <div className="team-score">{score?.teamHome?.score}</div>
                    </div>
                </div>
                <div className="match-info">
                    <div className="period">{period}</div>
                </div>
                <div className="team away-team">
                    <div className="container-team-logo">
                        <div className="team-logo">
                            <img src={awayTeamLogo} alt={score?.teamAway?.teamName} />
                        </div>
                    </div>
                    <div className="container-team-info">
                        <div className="team-name">{score?.teamAway?.teamName}</div>
                        <div className="team-score">{score?.teamAway?.score}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;
