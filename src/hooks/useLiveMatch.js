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
  const [eventQueue, setEventQueue] = useState([]);
  const timeoutRef = useRef(null);

  const eventsSubscription = useRef();
  const history = useRef([]);

  useEffect(() => {
    const service = new MatchService(matchId);
    (async () => {
      try {
        const matchInfo = await service.getInfo();
        logger("[useLiveMatch]", "matchInfo", matchInfo)

        if (matchInfo && matchInfo.status) {
          const { status, teamHome, teamAway } = matchInfo;

          setPeriod(periodMap[status]);
          setScore({
            teamHome,
            teamAway
          });

          if (status !== MATCH_STATUS_END) {
            logger("[useLiveMatch]", "status", status);
            service.subEvents().subscribe(response => {
              const { data: { onPutEventList: events }} = response;
              logger("[useLiveMatch]", "subscribe", events);
              const event = events[0];
              mainEventTypes.includes(event.type) &&
              handleNewEvent(event);
              event.type in periodMap && setPeriod(periodMap[event.type]);
              // TODO: come gestiamo il goal? Dove trovo lo score aggiornato, sotto payload.score o payload.match?
              event.type === EVENT_TYPE_SCORE && setScore(event.payload.score);
            });
          }
        }

        return () => {
          logger("[useLiveMatch]", "unsubscribe");
          if (eventsSubscription.current) {
            eventsSubscription.current.unsubscribe();
          }
          clearTimeout(timeoutRef.current);
        };
      }
      catch (err) {
        logger("[useLiveMatch]", "err", err)
      }

    })();
  }, [matchId]);

  const handleNewEvent = (newEvent) => {
    setEventQueue((queue) => [...queue, newEvent]);

    if (!timeoutRef.current) {
      startEventProcessing();
    }
  };

  const startEventProcessing = () => {
    const [currentEvent, ...remainingEvents] = eventQueue;
    setEvent(currentEvent);
    setEventQueue(remainingEvents);

    const nextEvent = remainingEvents[0];
    if (nextEvent) {
      const timeUntilNextEvent = nextEvent.timestamp_utc - currentEvent.timestamp_utc;
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        startEventProcessing();
      }, timeUntilNextEvent);
    }
  };

  return {
    period,
    score,
    event,
    timeline
  };
};


export default useLiveMatch;
