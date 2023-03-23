import React from 'react';

const Scoreboard = ({ homeTeamName, homeTeamScore, awayTeamName, awayTeamScore }) => {
    return (
        <>
            <div className="scoreboard">
                <div className="team">
                    <div className="team-name">{homeTeamName}</div>
                    <div className="team-score">{homeTeamScore}</div>
                </div>
                <div className="team">
                    <div className="team-name">{awayTeamName}</div>
                    <div className="team-score">{awayTeamScore}</div>
                </div>
            </div>
        </>
    );
};

export default Scoreboard;
