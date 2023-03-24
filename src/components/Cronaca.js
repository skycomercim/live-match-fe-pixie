import React from "react";

const Cronaca = ({ cronaca }) => {
  return (
    <>
      <h5>Cronaca Testuale</h5>
      <ul class="cronaca">
        {cronaca.map((event) => (
          <li key={event.id} class={`cronaca-${event.type}`}>
          {event.text}
        </li>
        ))}
      </ul>
      
    </>
  );
};

const CronacaLiveDemo = React.memo(
  Cronaca,
  ({ cronaca: oldTl }, { cronaca: newTl }) => oldTl.length === newTl.length
);

export default CronacaLiveDemo;
