export const MatchEventsSubscription = `subscription MatchEventsSubscription {
    onPutEventList {
      id
      jerseyNum
      matchId
      min
      outcome
      playerName
      sec
      teamId
      text
      timestamp_utc
      type
      x
      y
      payload {
        goal {
          GKX
          GKY
          ShootY
          ShootZ
          goalText
          playerImage
        }
        pass {
          passType
          x
          y
        }
      }
    }
  }`;