import { useEffect, useRef, useState } from "react";
import {
  EVENT_TYPE_RED_CARD,
  EVENT_TYPE_SCORE,
  EVENT_TYPE_YELLOW_CARD,
  MATCH_STATUS_END,
  MATCH_STATUS_FIRSTHALF,
  MATCH_STATUS_INTERVAL,
  MATCH_STATUS_PREMATCH,
  MATCH_STATUS_SECONDHALF
} from "../config";
import logger from "../helpers/logger";
import MatchService from "../services/MatchService";

const periodMap = {
  [MATCH_STATUS_PREMATCH]: "---",
  [MATCH_STATUS_FIRSTHALF]: "Primo Tempo",
  [MATCH_STATUS_END]: "Terminata",
  [MATCH_STATUS_SECONDHALF]: "Secondo Tempo",
  [MATCH_STATUS_INTERVAL]: "Intervallo"
};

const mainEventTypes = [
  EVENT_TYPE_SCORE,
  EVENT_TYPE_YELLOW_CARD,
  EVENT_TYPE_RED_CARD
];

const WAITING_FOR_DATA = 'WAITING_FOR_DATA';

const deferEventPublishing = (event, timeout) => new Promise((res) => setTimeout(() => res(event), timeout));

const useLiveMatch = (matchId) => {
  const [event, setEvent] = useState();
  const [period, setPeriod] = useState(periodMap[MATCH_STATUS_PREMATCH]);
  const [score, setScore] = useState(null);
  const [cronaca, addEventToCronaca] = useState([]);

  const eventsRef = useRef([]);
  const isFulltimeRef = useRef(false);
  const lastEventDispatched = useRef();

  const isFulltime = () => isFulltimeRef.current;

  const updateScore = (score) => {
    const { teamHome, teamAway } = score;
    const newScore = {
      teamHome: { ...teamHome },
      teamAway: { ...teamAway }
    }
    teamHome.id === event.teamId ? ++newScore.teamHome.score : ++newScore.teamAway.score;
    setScore(newScore);
  }

  const eventDispatcher = async function* () {

    while (!isFulltime()) {
      const events = eventsRef.current;
      logger('events to publish', events);
      if (events.length > 0) {
        const nextEvent = events.shift();
        const { timestamp_utc } = nextEvent;
        const nextEventTimestamp = new Date(timestamp_utc);
        const lastEventTimestamp = lastEventDispatched.current ? (new Date(lastEventDispatched.current.timestamp_utc)).getTime() : nextEventTimestamp;
        logger('lastEventTimestamp', lastEventTimestamp)
        let timeout = nextEventTimestamp - lastEventTimestamp;
        logger('timeout', timeout)
        //yield postponeEventPublishing(nextEvent, timeout > 0 ? timeout : 2500);
        yield deferEventPublishing(nextEvent, 2500);
        logger('event just published', nextEvent);
      }
      else {
        yield deferEventPublishing({
          type: WAITING_FOR_DATA
        }, 1000);
      }
    }
  }
  
  useEffect(() => {
    (async () => {
      for await (const eventDispatched of eventDispatcher()) {
        logger('event', eventDispatched)
        if (eventDispatched.type !== WAITING_FOR_DATA) {
          setEvent(eventDispatched);
          lastEventDispatched.current = eventDispatched;
          eventDispatched.type === MATCH_STATUS_END && (isFulltimeRef.current = true);
        }
      }
    })()
  }, [])

  useEffect(() => {
    const service = new MatchService(matchId);
    (async () => {
      try {
        const matchInfo = await service.getInfo();
        logger("[useLiveMatch]", "matchInfo", matchInfo)
        const { status, teamHome, teamAway } = matchInfo;

        setPeriod(periodMap[status]);
        setScore({
          teamHome,
          teamAway
        });

        status !== MATCH_STATUS_END? service.subEvents(events => eventsRef.current.push(...events)): isFulltimeRef.current = true;
        return () => service.unsubEvents();
      }
      catch (err) {
        logger("[useLiveMatch]", "err", err)
      }
    })();
  }, [matchId]);

  useEffect(() => {
    if (event) {
      setEvent(event);
      addEventToCronaca((state) => [event, ...state]);
      event.type in periodMap && setPeriod(periodMap[event.type]);
      event.type === EVENT_TYPE_SCORE && updateScore(score);
    }
  }, [event])

  return {
    period,
    score,
    event,
    cronaca,
  };
};

export default useLiveMatch;
