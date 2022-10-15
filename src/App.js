import './App.css';
import Clock from './Components/Clock';
import { useState, useEffect, useRef } from 'react';
import Display from './Components/Display';

function App() {
    const [ hasWon, setHasWon ] = useState ( false );
    const [ playing, setPlaying ] = useState ( false );
    const [ timeToEnd, setTimeToEnd ] = useState(30);
    const cpm = useRef(0);
    const wpm = useRef(0);
    const accuracy = useRef(0);
    const startTime = useRef(null);
    const endTime = useRef(null);

    useEffect(() => {
        startGame();
    }, []);

    const startGame = ( ) => {
        setHasWon(false);
        cpm.current = 0;
        wpm.current = 0;
        accuracy.current = 0;
        startTime.current = new Date();
    };

    const endGame = ( ) => {
        setHasWon(true);
        endTime.current = new Date();
        const timeTaken = (endTime.current.getTime() - startTime.current.getTime())/1000;
        console.log(timeTaken);
        const words = cpm.current / 5;
        wpm.current = Math.round(words / timeTaken * 60);
        accuracy.current = Math.round((cpm.current / 5) / 5 * 100);
    };
    
    const restartGame = ( ) => {
        setHasWon(false);
        cpm.current = 0;
        wpm.current = 0;
        accuracy.current = 0;
        startTime.current = new Date();
    };
    // Map each word to a div and each letter to a span
    return (
        <div className="container">
            { hasWon ? (
                <div className="end-game-container">
                    <div className="stats">
                        <h2>
                            WPM: { wpm.current } <br />
                            CPM: { cpm.current } <br />
                            Accuracy: { accuracy.current }
                        </h2>
                    </div>
                    <button onClick={ restartGame }>Play again</button>
                </div>
                ) : (
                    <div>
                        <div className="buttonCrate">
                            <Clock time={ new Date().getTime() + timeToEnd * 1000 } endGame={ endGame } />
                            <div>
                                <button onClick={ startGame }>Start</button>
                                <button onClick={ endGame }>End</button>
                            </div>
                        </div>
                        <Display hasWon={hasWon} setHasWon={setHasWon} timeToEnd={timeToEnd} cpm={cpm} wpm={wpm} accuracy={accuracy}
                                startTime={startTime}
                                endTime={endTime}
                                endGame={endGame} />
                    </div>
            ) }
            <div style={{ bottom: 10, position: 'absolute', width: '100%', fontSize: '0.8rem' }}>
                under construction by <a href="www.abubow.me">Abuzar</a>
            </div>
        </div>
    );
}

export default App;
