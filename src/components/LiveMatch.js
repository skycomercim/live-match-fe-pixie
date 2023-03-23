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
import anime from "animejs";
import {fadeInBall, fadeOutBall} from "../animation/utils/animations/animationsPassage";
import events from "../animation/assets/fakeEvents.json";
import {createAnimationTimeline, getRealCoordinates, makeAnimation} from "../animation/utils/utils";
import Ball from "../animation/components/ball/ball";
import Field from "../animation/components/field/field";
import Scoreboard from "../animation/components/scoreboard/Scoreboard";
import logger from "../helpers/logger";
import {getAllTeams} from "../animation/utils/match/utilsMatch";
import {field_height, field_width} from "../config/config";

const LiveMatch = ({ matchId }) => {
  const { period, score, event, timeline } = useLiveMatch(matchId);
  const [celebration, setCelebration] = useState(false);

  const ballRef = useRef(null);
  const dispatch = useDispatch();


    const [animationQueue, setAnimationQueue] = useState([]);


    useEffect( () => {
        dispatch(setMatchData(matchFake));
        logger("init LiveMatch");

/*        window.addEventListener('click', makeAnimation);
        return () => {
            window.removeEventListener('click', makeAnimation);
        };*/
    }, []);


  useEffect(() => {
      logger("event triggered LiveMatch :: ", event);
      if (event!==null) {
          const startRealCoordinates = getRealCoordinates(field_width, field_height, event.x, event.y);
          // opzioni di set() per posizione iniziale
          makeAnimation(event).then(r => {
          });
      }
  }, [event]);

  return (
    <div className="live-match">
      <Scoreboard score={score} period={period} matchData={matchFake}></Scoreboard>
      <Field>
        <Ball ref={ballRef}></Ball>
        <svg id="soccer-svg" width="400" height="250"></svg>
      </Field>

      <br/>

     {/* {score ? <Score score={score} /> : null}
      {period ? <Period period={period} /> : null}*/}
      {celebration ? <Celebration event={event} /> : <Court event={event} />}
      {timeline ? <Timeline timeline={timeline} /> : null}
    </div>
  );
};

export default LiveMatch;
