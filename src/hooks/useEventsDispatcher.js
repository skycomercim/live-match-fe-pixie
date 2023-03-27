import { useRef, useState, useEffect } from "react"
import logger from "../helpers/logger";

const WAITING_FOR_DATA = 'WAITING_FOR_DATA';

const postponeEventPublishing = (event, timeout) => new Promise((res) => setTimeout(() => res(event), timeout));

const useEventsDispatcher = () => {

    const eventsRef = useRef([]);
    const isFulltimeRef = useRef(false);
    const [event, setEvent] = useState();
    const lastEventDispatched = useRef();

    const isFulltime = () => isFulltimeRef.current;

    const eventDispatcher = async function* () {

        while (!isFulltime()) {
            const events = eventsRef.current;
            if (events.length > 0) {
                const nextEvent = events.shift();
                const { timestamp_utc } = nextEvent;
                const nextEventTimestamp = new Date(timestamp_utc);
                const lastEventTimestamp = lastEventDispatched.current? (new Date(lastEventDispatched.current.timestamp_utc)).getTime(): nextEventTimestamp;
                logger('lastEventTimestamp', lastEventTimestamp)
                let timeout = nextEventTimestamp - lastEventTimestamp;
                yield postponeEventPublishing(nextEvent, timeout > 0 ? timeout : 2500);

            }
            else {
                yield postponeEventPublishing({
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
                }
            }
        })()
    }, [])

    return {
        event,
        addEvents: (events) => {
            logger('[useEventsDispatcher]', 'new events', events);
            eventsRef.current.push(...events);
        }
    }
};

export default useEventsDispatcher;