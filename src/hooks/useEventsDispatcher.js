import { useRef, useState, useEffect } from "react"

const useEventsDispatcher = () => {

    const eventsRef = useRef([]);
    const [event, setEvent] = useState();
    const lastEventDate = useRef(new Date());
    const timeoutId = useRef();

    const eventDispatcher = () => {
        const events = eventsRef.current;

        if (events.length > 0) {
            const nextEvent = eventsRef.current.shift();
            const { timestamp_utc } = nextEvent;
            const nextEventDate = new Date(timestamp_utc);
            timeoutId.current = setTimeout(() => {
                setEvent(nextEvent);
                lastEventDate.current = nextEventDate;
                eventDispatcher();
            }, (nextEventDate.getTime() - lastEventDate.current.getTime()))
        }
        else {
            timeoutId.current = setTimeout(() => {
                eventDispatcher();
            }, 100);
        }
    }

    useEffect(() => {
        eventDispatcher();
    }, [])

    return {
        event,
        addEvents: (events) => eventsRef.current.push(...events)
    }
};

export default useEventsDispatcher;