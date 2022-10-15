import { useEffect, useState } from "react";
import { useCountdown } from "../hooks/Timer";

const Clock = ({ time, endGame }) => {
    const [minutes, seconds] = useCountdown(time);
    const [isCountingDown, setIsCountingDown] = useState(true);

    useEffect(() => {
        if (minutes === 0 && seconds === 0 && isCountingDown) {
            endGame();
            setIsCountingDown(false);
        }
    }, [minutes, seconds, endGame]);
    return (
    <div className="clock">
        <h2>{minutes}:{seconds}</h2>
    </div>
    )
}

export default Clock
