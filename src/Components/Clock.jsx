import { useCountdown } from "../hooks/Timer";

const Clock = ({time}) => {
    const [minutes, seconds] = useCountdown(time);
    return (
    <div className="clock">
        <h2>{minutes}:{seconds}</h2>
    </div>
    )
}

export default Clock
