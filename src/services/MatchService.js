import { Subject } from "rxjs";

import logger from "../helpers/logger";

import generateFakeMatch from "../helpers/match";

const m = generateFakeMatch();
console.log(m.getInfo());

const fakeEvents = [
  {
    id: "1",
    type: "pass",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "pippo",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    min: "12",
    sec: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: "",
        shootType: "Tiro al volo"
      }
    }
  },
  {
    id: "2",
    type: "goal",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "daje",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    min: "12",
    sec: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: "",
        shootType: "Tiro al volo"
      },
      score: {
        teamHome: {
          teamId: "123",
          teamName: "Inter",
          teamLogo: "link",
          teamPosition: "left",
          color: "FFFFF",
          score: 1
        },
        teamAway: {
          teamId: "123",
          teamName: "Milan",
          teamLogo: "link",
          teamPosition: "left",
          color: "FFFFF",
          score: 1
        }
      }
    }
  },
  {
    id: "3",
    type: "celebration",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "pLUTO",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: ""
      }
    }
  },
  {
    id: "4",
    type: "pass",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "pLUTO",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: ""
      }
    }
  },
  {
    id: "5",
    type: "pass",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "pLUTO",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: ""
      }
    }
  },
  {
    id: "6",
    type: "pass",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "pLUTO",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: ""
      }
    }
  },
  {
    id: "7",
    type: "red-card",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "pLUTO",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: ""
      }
    }
  },
  {
    id: "8",
    type: "interval",
    timestamp_utc: "YYY-MM-DDTHH:MM:SSZ",
    playerName: "pLUTO",
    jerseyNum: "11",
    teamId: "123456",
    x: "12",
    y: "12",
    outcome: true,
    payload: {
      pass: {
        passType: "head",
        x: "12",
        y: "12"
      },
      goal: {
        GKX: "12",
        GKY: "12",
        ShootY: "12",
        ShootZ: "12",
        playerImage: "",
        goalText: ""
      }
    }
  }
];

const fakeInfo = {
  status: "firsthalf", // prematch, fulltime
  teamHome: {
    teamId: "123",
    teamName: "Inter",
    teamLogo: "link",
    teamPosition: "left",
    color: "FFFFF",
    score: 1
  },
  teamAway: {
    teamId: "123",
    teamName: "Milan",
    teamLogo: "link",
    teamPosition: "left",
    color: "FFFFF",
    score: 0
  }
};

class MatchService {
  #events = new Subject();
  #fakematch;
  constructor(matchId) {
    this._publishEvent();
    this._generateFakeMatch();
  }

  async _generateFakeMatch() {
    this.#fakematch = generateFakeMatch();
  }
  async getInfo() {
    return Promise.resolve(this.#fakematch.getInfo());
  }

  subEvents(callback) {
    return this.#events.subscribe({
      next: callback
    });
  }

  _publishEvent() {
    let intId = setInterval(() => {
      if (fakeEvents.length === 0) {
        clearInterval(intId);
        return;
      }
      const eventToPub = fakeEvents.shift();
      logger("[MatchService]", eventToPub.id);
      this.#events.next(eventToPub);
    }, 2000);
  }
}

export default MatchService;
