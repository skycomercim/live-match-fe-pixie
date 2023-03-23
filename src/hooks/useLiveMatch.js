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
  const [period, setPeriod] = useState(periodMap[MATCH_STATUS_PREMATCH]);
  const [score, setScore] = useState(null);
  const [event, setEvent] = useState(null);
  const [timeline, addMainEventToTimeline] = useState([]);

  const eventsSubscription = useRef();
  const history = useRef([]);

  useEffect(() => {
    const service = new MatchService(matchId);
    (async () => {
      const matchInfo = await service.getInfo();
      const { status, teamHome, teamAway } = matchInfo;

      setPeriod(periodMap[status]);
      setScore({
        teamHome,
        teamAway
      });

      if (status !== MATCH_STATUS_END) {
        service.subEvents((event) => {
          logger("[useLiveMatch]", "new event from subscription", event.id);
          logger("[useLiveMatch]", "event type", event?.type);
          mainEventTypes.includes(event.type) &&
            addMainEventToTimeline((state) => [...state, event]);
          setEvent(event);
          event.type in periodMap && setPeriod(periodMap[event.type]);
          // TODO: come gestiamo il goal? Dove trovo lo score aggiornato, sotto payload.score o payload.match?
          event.type === EVENT_TYPE_SCORE && setScore(event.payload.score);
        });
      }

      return () => {
        logger("[useLiveMatch]", "unsubscribe");
        if (eventsSubscription.current) {
          eventsSubscription.current.unsubscribe();
        }
      };
    })();
  }, [matchId]);
  return {
    period,
    score,
    event,
    timeline
  };
};

export default useLiveMatch;
