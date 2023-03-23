import Amplisky, { AppSyncAuthType } from "@sky-uk/ita-js-common-amplisky/lib/types/client";
import { MATCHSERVICE_ENDPOINT, MATCHSERVICE_REALTIME, MATCHSERVICE_TOKEN } from "../config/config";

import { Subject } from "rxjs";

import logger from "../helpers/logger";

import generateFakeMatch from "../helpers/match";
import matchInfoQuery from "./matchInfoQuery";

const m = generateFakeMatch();
console.log(m.getInfo());

const fakeEvents = [
  {
    "type": "pass",
    "timestamp_utc": "YYY-MM-DDTHH:MM:SSZ",
    "playerName": "Regeer",
    "jerseyNum": "8",
    "teamId": "123456",
    "x": "25",
    "y": "60",
    "min": "12",
    "sec": "12",
    "outcome": true,
    "payload":{
      "pass":{
        "passType" : "head",
        "x": "50",
        "y": "50"
      }
    }
  },
  {
    "type": "pass",
    "timestamp_utc": "YYY-MM-DDTHH:MM:SSZ",
    "playerName": "Kudus",
    "jerseyNum": "20",
    "teamId": "123456",
    "x": "35",
    "y": "50",
    "outcome": true,
    "payload":{
      "pass":{
        "passType" : "head",
        "x": "25",
        "y": "60"
      }
    }
  },
  {
    "type": "pass",
    "timestamp_utc": "YYY-MM-DDTHH:MM:SSZ",
    "playerName": "Conceição",
    "jerseyNum": "35",
    "teamId": "123456",
    "x": "80",
    "y": "40",
    "outcome": true,
    "payload":{
      "pass":{
        "passType" : "head",
        "x": "35",
        "y": "50"
      },
      "goal": {
        "GKX" : "80",
        "GKY" : "40",
        "ShootY" : "12",
        "ShootZ" : "12",
        "playerImage": "",
        "goalText": ""
      }
    }
  },
  {
    "type": "pass",
    "timestamp_utc": "YYY-MM-DDTHH:MM:SSZ",
    "playerName": "Gullit",
    "jerseyNum": "11",
    "teamId": "789102",
    "x": "120",
    "y": "40",
    "outcome": true,
    "payload":{
      "pass":{
        "passType" : "head",
        "x": "35",
        "y": "50"
      },
      "goal": {
        "GKX" : "80",
        "GKY" : "40",
        "ShootY" : "12",
        "ShootZ" : "12",
        "playerImage": "",
        "goalText": ""
      }
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
    this.amplisky = new Amplisky({
      authConfig: {
        type: AppSyncAuthType.Lambda,
        params: {
          authToken: MATCHSERVICE_TOKEN,
        },
      },
      endpoint: MATCHSERVICE_ENDPOINT,
      realtimeEndpoint: MATCHSERVICE_REALTIME,
      realtime: true,
    });
  }

  async getInfo(matchId) {
    return await this.amplisky.query(matchInfoQuery, {matchId});
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
