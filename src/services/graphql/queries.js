export const matchInfoQuery = `query MatchInfoQuery($matchId: ID!) {
    getMatchInfo(matchId: $matchId) {
      competitionId
      date
      matchId
      seasonId
      seasonName
      status
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