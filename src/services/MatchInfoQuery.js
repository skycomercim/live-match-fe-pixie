export default `query MatchInfoQuery($matchId: ID!) {
    getMatchInfo(matchId: $matchId) {
      competitionId
      date
      matchId
      seasonId
      seasonName
      teamHome {
        color
        score
        teamId
        teamLogo
        teamName
        teamPosition
      }
      teamAway {
        color
        score
        teamId
        teamLogo
        teamName
        teamPosition
      }
    }
}`;