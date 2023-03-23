import React from "react";

const Timeline = ({ timeline }) => {
  return (
    <>
      <h5>Timeline</h5>
      <ul>
        {timeline.map((event) => (
          <li key={event.id}>{event.type}</li>
        ))}
      </ul>
    </>
  );
};

const TimelineMemo = React.memo(
  Timeline,
  ({ timeline: oldTl }, { timeline: newTl }) => oldTl.length === newTl.length
);

export default TimelineMemo;
