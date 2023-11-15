import React, {useRef} from 'react';
import './ball.css';

const Ball = React.forwardRef((props, ref) => {
    const playerRef = useRef(null);
    const ballSoccerRef = useRef(null);

    return (
        <div ref={ref} id={"ball"} className={'ballref'}>
            <div
                ref={ballSoccerRef}
                className="football-ball"
                style={{ background: `url(/soccer-ball.png) no-repeat center center / cover` }}
            />
        </div>
    );
});

export default Ball;