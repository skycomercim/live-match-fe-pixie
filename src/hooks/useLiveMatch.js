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

const useLiveMatch = (matchId) => {
  const [event, setEvent] = useState();
  const [period, setPeriod] = useState(periodMap[MATCH_STATUS_PREMATCH]);
  const [score, setScore] = useState(null);
  const [cronaca, addEventToCronaca] = useState([]);

  const eventsRef = useRef([]);
  const lastEventDate = useRef();
  const timeoutId = useRef();

  const eventDispatcher = () => {
    const events = eventsRef.current;

    if (events.length > 0) {
      const nextEvent = events.shift();
      const { timestamp_utc } = nextEvent;
      const nextEventDate = new Date(timestamp_utc);

      let timeout = lastEventDate.current ? nextEventDate.getTime() - lastEventDate.current.getTime() : 0;

      logger('[useEventsDispatcher]', 'lastEventDate', lastEventDate.current);
      logger('[useEventsDispatcher]', 'nextEventDate', nextEventDate);
      logger('[useEventsDispatcher]', 'timeout', timeout);

      timeoutId.current = setTimeout(() => {
        logger('[useEventsDispatcher]', 'next event', nextEvent)
        setEvent(nextEvent);
        lastEventDate.current = nextEventDate;
        eventDispatcher();
      }, 2500);
    }
    else {
      timeoutId.current = setTimeout(() => {
        logger('[useEventsDispatcher]', 'check', eventsRef.current?.length);
        eventDispatcher();
      }, 200);
    }

    return () => {
      clearTimeout(timeoutId.current);
    }
  }

  useEffect(() => {
    eventDispatcher();
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

        if (status !== MATCH_STATUS_END) {
          service.subEvents(events => eventsRef.current.push(...events));
        }

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
      event.type === EVENT_TYPE_SCORE && setScore(event.payload.score);
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
