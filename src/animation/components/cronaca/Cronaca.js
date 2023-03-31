import React, { useEffect, useRef, useState } from "react";
import './cronaca.css';
const Cronaca = ({ cronaca }) => {
    const [cronacaEvents, setCronacaEvents] = useState([]);
    const [isNewEvent, setIsNewEvent] = useState(false);
    const ulRef = useRef(null);

    useEffect(() => {
        setCronacaEvents(cronaca);
    }, [cronaca]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const now = Date.now();
            setCronacaEvents(cronacaEvents.filter(event => now - event.timestamp <= 4000));
        }, 4000);

        return () => clearTimeout(timer);
    }, [cronacaEvents, setCronacaEvents]);

    useEffect(() => {
        if (ulRef.current && isNewEvent) {
            ulRef.current.classList.add("slide-down");
            setTimeout(() => {
                ulRef.current.classList.remove("slide-down");
            }, 1000);
            setIsNewEvent(false);
        }
    }, [cronacaEvents, isNewEvent]);

    const handleAddEvent = (event) => {
        setCronacaEvents(prevCronaca => {
            const updatedCronaca = prevCronaca.map(item => {
                return {
                    ...item,
                    isRemoved: false
                };
            });
            updatedCronaca.push(event);
            return updatedCronaca;
        });
        setIsNewEvent(true);
    };

    useEffect(() => {
        setCronacaEvents(prevCronaca => {
            return prevCronaca.map(item => {
                if (!item.isRemoved && Date.now() - item.timestamp > 4000) {
                    return {
                        ...item,
                        isRemoved: true
                    };
                } else {
                    return item;
                }
            });
        });
    }, [cronacaEvents, setCronacaEvents]);

    const handleAnimationEnd = (event) => {
        setCronacaEvents(prevCronaca => {
            return prevCronaca.filter(item => item.id !== parseInt(event.target.dataset.id));
        });
    };

    return (
        <>
            <h5>Cronaca Testuale</h5>
            <ul
                ref={ulRef}
                className="cronaca"
                style={{
                    maxHeight: "100px", /* altezza massima della lista degli eventi */
                }}
            >
                {cronacaEvents.slice(0, 5).map((event) => (
                    <li
                        key={event.id}
                        className={`cronaca-${event.type}`}
                        style={{
                            opacity: event.isRemoved ? 0 : 1,
                            transition: "opacity 0.5s ease-out",
                            pointerEvents: event.isRemoved ? "none" : "auto"
                        }}
                        data-id={event.id}
                        onAnimationEnd={handleAnimationEnd}
                    >
                        {event.text}
                    </li>
                ))}
            </ul>
            <button onClick={() => handleAddEvent({
                id: cronacaEvents.length + 1,
                type: "new",
                text: "Nuovo evento",
                timestamp: Date.now(),
                isRemoved: false
            })}>Aggiungi evento</button>
        </>
    );
};

const CronacaLiveDemo = React.memo(
    Cronaca,
    ({ cronaca: oldCronaca }, { cronaca: newCronaca }) => oldCronaca.length === newCronaca.length
);

export default CronacaLiveDemo;

