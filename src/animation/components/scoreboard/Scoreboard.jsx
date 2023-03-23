import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ score, period }) => {
    return (
        <div className="scoreboard-container">
            <div className="scoreboard">
                <div className="team home-team">
                    <div className="team-name">{score?.teamHome?.teamName}</div>
                    <div className="team-score">{score?.teamHome?.score}</div>
                </div>
                <div className="match-info">
                    <div className="period">{period}</div>
                </div>
                <div className="team away-team">
                    <div className="team-name">{score?.teamAway?.teamName}</div>
                    <div className="team-score">{score?.teamAway?.score}</div>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;
