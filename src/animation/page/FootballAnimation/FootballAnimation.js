import React, { useRef, useEffect } from 'react';
import Field from "../../components/field/field";
import events from '../../assets/fakeEvents.json';
import match from '../../assets/matchData.json';
import { useDispatch } from 'react-redux';


import './FootballAnimation.css';
import {
    createAnimationTimeline
} from "../../utils/utils";
import Ball from "../../components/ball/ball";
import anime from "animejs";
import {fadeInBall, fadeOutBall} from "../../utils/animations/animationsPassage";
import {setMatchData} from "../../store/matchSlice";


function FootballAnimation() {
    const playerRef = useRef(null);
    const ballRef = useRef(null);
    const dispatch = useDispatch();


    const [event, setEvent] = React.useState(null);

    useEffect( () => {
        dispatch(setMatchData(match));
        async function makeAnimation() {
            const newTimeline = anime.timeline({
                autoplay: true, // imposto autoplay a false per eseguire manualmente la timeline
            }); // creazione di una nuova istanza di anime.timeline()
            fadeInBall();
            for (const event of events) {
                setEvent(event)
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

    return (
        <Field>
            <Ball ref={ballRef}></Ball>

            <svg id="soccer-svg" width="700" height="450"></svg>
        </Field>
    );
}

export default FootballAnimation;
