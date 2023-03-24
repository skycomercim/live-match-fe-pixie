import React, {useEffect, useRef, useState} from "react";

import Score from "./Score";
import Period from "./Period";
import Court from "./Court";
import Celebration from "./Celebration";
import Timeline from "./Timeline";

import useLiveMatch from "../hooks/useLiveMatch";
import { EVENT_TYPE_CELEBRATION } from "../config";
import {useDispatch} from "react-redux";
import {setMatchData} from "../animation/store/matchSlice";
import matchFake from "../animation/assets/matchData.json";
import {getPositionTeamInMatch, getRealCoordinates, makeAnimation} from "../animation/utils/utils";
import Ball from "../animation/components/ball/ball";
import Field from "../animation/components/field/field";
import Scoreboard from "../animation/components/scoreboard/Scoreboard";
import logger from "../helpers/logger";
import {field_height, field_width} from "../config/config";
import Goal from "../animation/components/goal/Goal";
import {getTypeEvent} from "../animation/utils/match/utilsMatch";

const LiveMatch = ({ matchId }) => {
  const { period, score, event, timeline } = useLiveMatch(matchId);
  const [celebration, setCelebration] = useState(false);
  const [typeEvent, setTypeEvent] = useState(null);

  const ballRef = useRef(null);
  const dispatch = useDispatch();

    useEffect( () => {
        console.log("score :: ", score);
        if (score!==null) {
            dispatch(setMatchData(score));
            logger("init LiveMatch");
        }

    }, [score]);


  useEffect(() => {
      logger("event triggered LiveMatch :: ", event);
      if (event!==null) {
          setTypeEvent(getTypeEvent(event));
          // opzioni di set() per posizione iniziale
          makeAnimation(event).then(r => {
              /*logger("makeAnimation type :: ", r);
              if (type==="change_ball_team") {
                  const position = getPositionTeamInMatch(event, score);
                  logger("makeAnimation type :: ", r);
                  position==='left' ? setChangeBallLeft(true) : setChangeBallRight(true);
              }*/
          });
      }
  }, [event]);

  return (
    <div className="live-match">
      <Field className={"container-element-live-match"}>
          <Ball ref={ballRef}></Ball>
        <svg id="soccer-svg" width="400" height="250"></svg>
      </Field>
        <Scoreboard score={score} period={period} className={"container-element-live-match"}></Scoreboard>
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
