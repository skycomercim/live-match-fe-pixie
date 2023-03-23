import {
  MATCH_STATUS_END,
  MATCH_STATUS_FIRSTHALF,
  MATCH_STATUS_INTERVAL,
  MATCH_STATUS_PREMATCH,
  MATCH_STATUS_SECONDHALF
} from "../config";

const TEAMS = [
  { id: 1, teamName: "Atalanta" },
  { id: 2, teamName: "Bologna" },
  { id: 3, teamName: "Cremonese" },
  { id: 4, teamName: "Empoli" },
  { id: 5, teamName: "Fiorentina" },
  { id: 6, teamName: "Inter" },
  { id: 7, teamName: "Juventus" },
  { id: 8, teamName: "Lazio" },
  { id: 9, teamName: "Lecce" },
  { id: 10, teamName: "Milan" },
  { id: 11, teamName: "Monza" },
  { id: 12, teamName: "Napoli" },
  { id: 13, teamName: "Roma" },
  { id: 14, teamName: "Salernitana" },
  { id: 15, teamName: "Sampdoria" },
  { id: 16, teamName: "Sassuolo" },
  { id: 17, teamName: "Spezia" },
  { id: 18, teamName: "Torino" },
  { id: 19, teamName: "Udinese" },
  { id: 20, teamName: "Verona" }
];

const MATCH_STATUS = [
  MATCH_STATUS_PREMATCH,
  MATCH_STATUS_FIRSTHALF,
  MATCH_STATUS_INTERVAL,
  MATCH_STATUS_SECONDHALF,
  MATCH_STATUS_END
];

const getRandomNum = (min = 0, max = 1, exclude = []) => {
  const minV = Math.ceil(min);
  const maxV = Math.floor(max);
  let num = Math.floor(Math.random() * (max - min + 1) + min);
  while (exclude.includes(num)) {
    num = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return num;
};

const is = () => Boolean(getRandomNum());
const getNextAction = () => {};
const getPassList = (min, max) => {
  const passNum = getRandomNum(1, 3);
};
const isOutcome = () => is();
const isGoal = () => is();
const createId = () => getRandomNum(10000, 100000);

const generateFakeMatch = () => {
  const eventList = [];
  const match = createMatch();
  match.status = MATCH_STATUS[getRandomNum(0, MATCH_STATUS.length - 1)];
  match.id = createId();
  match.teamHome.score =
    match.status !== MATCH_STATUS_PREMATCH ? getRandomNum(0, 3) : 0;
  match.teamAway.score =
    match.status !== MATCH_STATUS_PREMATCH ? getRandomNum(0, 3) : 0;

  const getInfo = async () => Promise.resolve(match);
  const events = () => {};
  return {
    getInfo,
    events
  };
};

const createMatch = () => {
  const indexTeamA = getRandomNum(0, TEAMS.length - 1);
  const indexTeamB = getRandomNum(0, TEAMS.length - 1, [indexTeamA]);
  return {
    teamHome: TEAMS[indexTeamA],
    teamAway: TEAMS[indexTeamB]
  };
};

export default generateFakeMatch;
