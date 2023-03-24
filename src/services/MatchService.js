import { Subject } from "rxjs";

import logger from "../helpers/logger";

import generateFakeMatch from "../helpers/match";

const m = generateFakeMatch();
console.log(m.getInfo());

const fakeEvents = [
      {
        "id": "2510475113",
        "jerseyNum": "28",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Carnesecchi M.",
        "sec": "55",
        "teamId": "2174",
        "text": "Calcio d'inizio",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "50",
        "y": "50",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "60",
            "y": "45"
          }
        }
      },
      {
        "id": "2510475114",
        "jerseyNum": "17",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Sernicola L.",
        "sec": "55",
        "teamId": "2174",
        "text": "Sernicola si rifugia in difesa",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "60",
        "y": "45",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "70",
            "y": "30"
          }
        }
      },
      {
        "id": "2510475115",
        "jerseyNum": "3",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Valeri E..",
        "sec": "55",
        "teamId": "2174",
        "text": "Valeri rischia con un passaggio orizzontale che attraversa tutto il centrocampo",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "70",
        "y": "30",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "63",
            "y": "80"
          }
        }
      },
      {
        "id": "2510475116",
        "jerseyNum": "4",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Aiwu E.",
        "sec": "55",
        "teamId": "2174",
        "text": "Aiwu riceve palla e la passa avanti",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "63",
        "y": "80",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "45",
            "y": "76"
          }
        }
      },
      {
        "id": "2510475117",
        "jerseyNum": "34",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Aina O.",
        "sec": "55",
        "teamId": "135",
        "text": "Il Torino recupera palla grazie ad Aina",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "45",
        "y": "76",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "45",
            "y": "76"
          }
        }
      },
      {
        "id": "2510475118",
        "jerseyNum": "27",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Vojvoda M.",
        "sec": "55",
        "teamId": "135",
        "text": "Vojvoda riceve e passa di testa",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "45",
        "y": "76",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "30",
            "y": "57"
          }
        }
      },
      {
        "id": "2510475119",
        "jerseyNum": "66",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Rodríguez R.",
        "sec": "55",
        "teamId": "135",
        "text": "Rodríguez si appoggia al difensore",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "30",
        "y": "57",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "20",
            "y": "67"
          }
        }
      },
      {
        "id": "2510475120",
        "jerseyNum": "3",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Schuurs P.",
        "sec": "55",
        "teamId": "135",
        "text": "Schuurs allarga il gioco sulla fascia destra",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "20",
        "y": "67",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "24",
            "y": "13"
          }
        }
      },
      {
        "id": "2510475121",
        "jerseyNum": "26",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Djidji K.",
        "sec": "55",
        "teamId": "135",
        "text": "Djidji avanza e passa sulla stessa fascia",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "24",
        "y": "13",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "37",
            "y": "10"
          }
        }
      },
      {
        "id": "2510475122",
        "jerseyNum": "64",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Linetty K.",
        "sec": "55",
        "teamId": "135",
        "text": "Linetty cambia completamente gioco con un lancio lungo",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "37",
        "y": "10",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "90",
            "y": "90"
          }
        }
      },
      {
        "id": "2510475123",
        "jerseyNum": "14",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Ivan Ilic",
        "sec": "55",
        "teamId": "135",
        "text": "Ilicic mantiene il possesso in zona angolo",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "90",
        "y": "90",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "99",
            "y": "95"
          }
        }
      },
      {
        "id": "2510475124",
        "jerseyNum": "19",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Sanabria A.",
        "sec": "55",
        "teamId": "135",
        "text": "Calcio d'angolo",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "99",
        "y": "95",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "99",
            "y": "95"
          }
        }
      },
      {
        "id": "2510475125",
        "jerseyNum": "67",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Mira",
        "sec": "55",
        "teamId": "135",
        "text": "Batte Mira",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "99",
        "y": "95",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "99",
            "y": "95"
          }
        }
      },
      {
        "id": "2510475126",
        "jerseyNum": "10",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Karamoh Y.",
        "sec": "55",
        "teamId": "135",
        "text": "Karamoh riceve e passa",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "99",
        "y": "95",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "76",
            "y": "86"
          }
        }
      },
      {
        "id": "2510475127",
        "jerseyNum": "2",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Bayeye B.",
        "sec": "55",
        "teamId": "135",
        "text": "Bayeye appoggia in area",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "76",
        "y": "86",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "84",
            "y": "73"
          }
        }
      },
      {
        "id": "2510475128",
        "jerseyNum": "99",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Buongiorno A.",
        "sec": "55",
        "teamId": "135",
        "text": "Buongiorno appoggia indietro di petto",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "84",
        "y": "73",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "90",
            "y": "68"
          }
        }
      },
      {
        "id": "2510475129",
        "jerseyNum": "68",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Gravillon A.",
        "sec": "55",
        "teamId": "135",
        "text": "Gravillon tocca la palla",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "90",
        "y": "68",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "86",
            "y": "70"
          }
        }
      },
      {
        "id": "2510475130",
        "jerseyNum": "17",
        "matchId": "2302671",
        "min": "0",
        "outcome": true,
        "playerName": "Singo W.",
        "sec": "55",
        "teamId": "135",
        "text": "Singo sfodera un tiro potentissimo!",
        "timestamp_utc": "2023-02-20T19:47:45.099Z",
        "type": "pass",
        "x": "86",
        "y": "70",
        "payload": {
          "goal": null,
          "pass": {
            "passType": "pass type example",
            "x": "100",
            "y": "48"
          }
        }
      },
      {
        "id": "2510475131",
        "jerseyNum": "17",
        "matchId": "2302671",
        "min": "53",
        "outcome": true,
        "playerName": "Singo W.",
        "sec": "18",
        "teamId": "135",
        "text": "Ed è GOOAAAALLLL!",
        "timestamp_utc": "2023-02-20T20:58:50.050Z",
        "type": "goal",
        "x": "100",
        "y": "48",
        "payload": {
          "goal": {
            "GKX": "50",
            "GKY": "0",
            "ShootY": "12",
            "ShootZ": "12",
            "goalText": "pass type example",
            "playerImage": "https://static.sky.it/images/skysport/it/calcio/serie-a/probabili-formazioni/superscudetto/200/488253.png.transform/original/1679068800000/img.jpg"
          },
          "pass": null
        }
      }
    ];
const fakeInfo = {
  status: "firsthalf", // prematch, fulltime
  teamHome: {
    teamId: "123",
    teamName: "Inter",
    teamLogo: "",
    teamPosition: "left",
    color: "FFFFF",
    score: 1
  },
  teamAway: {
    teamId: "123",
    teamName: "Milan",
    teamLogo: "",
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
