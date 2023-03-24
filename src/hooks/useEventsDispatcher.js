import { useRef, useState, useEffect } from "react"
import logger from "../helpers/logger";

const useEventsDispatcher = () => {

    const eventsRef = useRef([]);
    const [event, setEvent] = useState();
    const lastEventDate = useRef();
    const timeoutId = useRef();

    const eventDispatcher = () => {
        const events = eventsRef.current;

        if (events.length > 0) {
            const nextEvent = events.shift();
            const { timestamp_utc } = nextEvent;
            const nextEventDate = new Date(timestamp_utc);

            let timeout = lastEventDate.current? nextEventDate.getTime() - lastEventDate.current.getTime(): 0;
            
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

    return {
        event,
        addEvents: (events) => {
            logger('[useEventsDispatcher]', 'new events', events);
            eventsRef.current.push(...events);
        }
    }
};

export default useEventsDispatcher;