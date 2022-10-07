import './App.css';
import Clock from './Componants/Clock';
import { useState, useEffect, useRef } from 'react';
import Display from './Componants/Display';

function App() {
    const [ hasWon, setHasWon ] = useState ( false );
    const [loading, setLoading] = useState ( false );

    const startGame = ( ) => {
    };

    const endGame = ( ) => {
    };
    
    const restartGame = ( ) => {
    };
    // Map each word to a div and each letter to a span
    return (
        <div className="container">
            { hasWon ? (
                <div className="end-game-container">
                    <h1>You have won!</h1>
                    <button onClick={ restartGame }>Play again</button>
                </div>
                ) : (
                loading?
                (
                    <div>
                        ...
                    </div>
                ):(
                    <div>
                        <div className="buttonCrate">
                            <Clock time={new Date().getTime()+61*1000} />
                            <button onClick={ startGame }>Start</button>
                            <button onClick={ endGame }>End</button>
                        </div>
                        <Display loading={loading} hasWon={hasWon} setHasWon={setHasWon} setLoading={setLoading} />
                    </div>
            )
            ) }

        </div>
    );
}

export default App;
