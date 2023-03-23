import React from "react";

const Score = ({ score }) => {
  return (
    <h3>
      {score.teamHome.teamName} {score.teamHome.score} - {score.teamAway.score}{" "}
      {score.teamAway.teamName}
    </h3>
  );
};

const ScoreMemo = React.memo(Score, (prevProps, nextProps) => {
  const {
    score: {
      teamHome: { score: prevScoreTeamHome },
      teamAway: { score: prevScoreTeamAway }
    }
  } = prevProps;

  const {
    score: {
      teamHome: { score: nextScoreTeamHome },
      teamAway: { score: nextScoreTeamAway }
    }
  } = nextProps;

  return !(
    prevScoreTeamHome !== nextScoreTeamHome ||
    prevScoreTeamAway !== nextScoreTeamAway
  );
});

export default ScoreMemo;
