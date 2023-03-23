import { useEffect, useRef, useState } from "react";

const Pass = ({ event }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.remove();
  }, []);

  return <div ref={ref}>Passaggio</div>;
};

const Court = ({ event }) => {
  const eventHistoryRef = useRef([]);
  const [events, addEvent] = useState([]);

  useEffect(() => {
    eventHistoryRef.current.push(event);
    addEvent((state) => [...state, event]);
  }, [event]);

  return <div>Football Court</div>;
};

export default Court;
