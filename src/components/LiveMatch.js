import React, { useEffect, useRef, useState } from "react";

import Cronaca from "../animation/components/cronaca/Cronaca";

import useLiveMatch from "../hooks/useLiveMatch";
import { useDispatch } from "react-redux";
import { setMatchData } from "../animation/store/matchSlice";
import { makeAnimation } from "../animation/utils/utils";
import Ball from "../animation/components/ball/ball";
import Field from "../animation/components/field/field";
import Scoreboard from "../animation/components/scoreboard/Scoreboard";
import logger from "../helpers/logger";
import Goal from "../animation/components/goal/Goal";
import { getTypeEvent } from "../animation/utils/match/utilsMatch";

const LiveMatch = ({ matchId }) => {
  const { period, score, event, cronaca } = useLiveMatch(matchId);
  const [typeEvent, setTypeEvent] = useState(null);

  const ballRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    score && dispatch(setMatchData(score));
  }, [score]);

  useEffect(() => {
    (async () => {
      logger("event triggered LiveMatch :: ", event);
      if (event) {
        setTypeEvent(getTypeEvent(event));
        await makeAnimation(event);
      }
    })();
  }, [event]);

  return (
    <div className="live-match">
      <Field className={"container-element-live-match"}>
        <Ball ref={ballRef}></Ball>
        <svg id="soccer-svg" width="400" height="250"></svg>
      </Field>
      
      { score ? <Scoreboard score={score} period={period} className={"container-element-live-match"} />: null}
      
      <Goal typeEvent={typeEvent}></Goal>
      
      <br />
      
      {cronaca ? <Cronaca cronaca={cronaca} /> : null}

    </div>
  );
};

export default LiveMatch;
