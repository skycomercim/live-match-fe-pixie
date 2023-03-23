import React, {useEffect, useRef, useState} from "react";

import Score from "./Score";
import Period from "./Period";
import Court from "./Court";
import Celebration from "./Celebration";
import Timeline from "./Timeline";

import useLiveMatch from "../hooks/useLiveMatch";
import { EVENT_TYPE_CELEBRATION } from "../config";
import FootballAnimation from "../animation/page/FootballAnimation/FootballAnimation";
import {useDispatch} from "react-redux";
import {setMatchData} from "../animation/store/matchSlice";
import match from "../animation/assets/matchData.json";
import anime from "animejs";
import {fadeInBall} from "../animation/utils/animations/animationsPassage";
import events from "../animation/assets/fakeEvents.json";
import {createAnimationTimeline} from "../animation/utils/utils";
import Ball from "../animation/components/ball/ball";
import Field from "../animation/components/field/field";
import Scoreboard from "../animation/components/scoreboard/Scoreboard";

const LiveMatch = ({ matchId }) => {
  const { period, score, event, timeline } = useLiveMatch(matchId);
  const [celebration, setCelebration] = useState(false);

  const ballRef = useRef(null);
  const dispatch = useDispatch();

  console.log("init");


  const [eventGame, setEventGame] = React.useState(null);

  useEffect( () => {
    dispatch(setMatchData(match));
    async function makeAnimation() {
      const newTimeline = anime.timeline({
        autoplay: true, // imposto autoplay a false per eseguire manualmente la timeline
      }); // creazione di una nuova istanza di anime.timeline()
      fadeInBall();
      for (const event of events) {
        setEventGame(event)
        await createAnimationTimeline(newTimeline, event);
      }
      newTimeline.finished.then(() => {
        //fadeOutBall();
      })
    }

    window.addEventListener('click', makeAnimation);
    return () => {
      window.removeEventListener('click', makeAnimation);
    };
  }, []);

  useEffect(() => {
    setCelebration(event && event.type === EVENT_TYPE_CELEBRATION);
  }, [event]);

  return (
    <div className="live-match">
      <Scoreboard></Scoreboard>
      <Field>
        <Ball ref={ballRef}></Ball>
        <svg id="soccer-svg" width="400" height="250"></svg>
      </Field>

      {score ? <Score score={score} /> : null}
      {period ? <Period period={period} /> : null}
      {celebration ? <Celebration event={event} /> : <Court event={event} />}
      {timeline ? <Timeline timeline={timeline} /> : null}
    </div>
  );
};

export default LiveMatch;
