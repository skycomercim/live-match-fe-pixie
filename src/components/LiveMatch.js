import React, {useEffect, useRef, useState} from "react";

import Score from "./Score";
import Period from "./Period";
import Court from "./Court";
import Celebration from "./Celebration";
import Timeline from "./Timeline";

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
  const { period, score, event, timeline } = useLiveMatch(matchId);
  const [celebration, setCelebration] = useState(false);
  const [typeEvent, setTypeEvent] = useState(null);
  const [scoreData, setScoreData] = useState(score);

  const ballRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    logger("LiveMatch score :: ", score);
    if (typeof score!=='undefined' && score!==undefined) {
      logger("LiveMatch enter for setting score to redux");
      setScoreData(score);
      dispatch(setMatchData(score));
    }
  }, [score]);

  useEffect(() => {
    (async () => {
      logger("event triggered LiveMatch :: ", event);
      if(event) {
        setTypeEvent(getTypeEvent(event));
        // opzioni di set() per posizione iniziale
        const r = await makeAnimation(event);
        /*logger("makeAnimation type :: ", r);
        if (type==="change_ball_team") {
            const position = getPositionTeamInMatch(event, score);
            logger("makeAnimation type :: ", r);
            position==='left' ? setChangeBallLeft(true) : setChangeBallRight(true);
        }*/
      }
    })();
  }, [event]);

  return (
    <div className="live-match">
      <Field className={"container-element-live-match"}>
          <Ball ref={ballRef}></Ball>
        <svg id="soccer-svg" width="400" height="250"></svg>
      </Field>
        <Scoreboard score={scoreData} period={period} className={"container-element-live-match"}></Scoreboard>
      <Goal typeEvent={typeEvent}></Goal>
      <br/>

     {/* {score ? <Score score={score} /> : null}
      {period ? <Period period={period} /> : null}*/}
      {/*{celebration ? <Celebration event={event} /> : <Court event={event} />}*/}
      {timeline ? <Timeline timeline={timeline} /> : null}
    </div>
  );
};

export default LiveMatch;
