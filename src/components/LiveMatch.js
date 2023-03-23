import React, { useEffect, useState } from "react";

import Score from "./Score";
import Period from "./Period";
import Court from "./Court";
import Celebration from "./Celebration";
import Timeline from "./Timeline";

import useLiveMatch from "../hooks/useLiveMatch";
import { EVENT_TYPE_CELEBRATION } from "../config";
import FootballAnimation from "../animation/page/FootballAnimation/FootballAnimation";

const LiveMatch = ({ matchId }) => {
  const { period, score, event, timeline } = useLiveMatch(matchId);
  const [celebration, setCelebration] = useState(false);

  useEffect(() => {
    setCelebration(event && event.type === EVENT_TYPE_CELEBRATION);
  }, [event]);

  return (
    <div className="live-match">
      <FootballAnimation></FootballAnimation>

      {score ? <Score score={score} /> : null}
      {period ? <Period period={period} /> : null}
      {celebration ? <Celebration event={event} /> : <Court event={event} />}
      {timeline ? <Timeline timeline={timeline} /> : null}
    </div>
  );
};

export default LiveMatch;
