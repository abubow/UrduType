import { useState, useEffect, useRef } from 'react';

const Display = ( { setHasWon, setLoading } ) => {
    
    const [ words, setWords ] = useState ( [ 'Hello', 'To', 'You', 'My', 'Dear', 'Viewer' ] );
    const [ word, setWord ] = useState ( '' );
    const [ wordIndex, setWordIndex ] = useState ( 0 );
    const [ letterIndex, setLetterIndex ] = useState ( 0 );
    const [timeToEnd, setTimeToEnd] = useState(60);
    const [timer, setTimer] = useState (0);
    const currentLetter = useRef ( null );
    const inputRef = useRef ( null );


    useEffect ( ( ) => {
        // on load fetch words from https://random-word-api.herokuapp.com/word?number=10
        setLoading ( true );
        fetchWords ( );
      } , [ ] );
    
      useEffect ( ( ) => {
        if ( wordIndex === words.length ) {
          setHasWon ( true );
          return;
        }
        setLetterIndex ( 0 );
      }, [ wordIndex ] );
    
        const fetchWords = async ( ) => {
            const response = await fetch ( 'https://random-word-api.herokuapp.com/word?number=20' );
            const data = await response.json ( );
            setWords ( data );
            setWord ( data [ 0 ] );
            setLoading(false);
        };
    
      const handleChange = ( e ) => {
        const { value } = e.target;
        console.log(value);
        if(value === ' '){
          e.target.value = '';
          return;
        }
        if ( inputRef.current.value === word [ letterIndex ] ) {
          setLetterIndex ( letterIndex + 1 );
          inputRef.current.value = '';
          currentLetter.current.classList.remove ( 'letter-wrong' );
          currentLetter.current.classList.add ( 'letter-typed' );
          if ( letterIndex + 1 === word.length ) {
            setWord ( words [ wordIndex + 1 ] );
            setWordIndex ( wordIndex + 1 );
          }
        } else {
          currentLetter.current.classList.remove ( 'letter-typed' );
          currentLetter.current.classList.add ( 'letter-wrong' );
          e.target.value = '';
        }
      };


    return (
        <div className="center words-container">
            {
            words.map ( ( word, index ) => {
                return (
                    <div key={ index } className="word">
                        {
                        word.split ( '' ).map ( ( letter, lIndex ) => {
                                return (
                                <span key={ lIndex } className="letter"
                                ref={lIndex === letterIndex & index === wordIndex ? currentLetter : null}
                                >
                                    { letter }
                                </span>
                                );
                            } )
                        }
                    </div>
                    );
                }
                )
            }
            <input className="center text-input" type="text" onChange={ handleChange } ref={ inputRef }/> 
        </div>
    )
}

export default Display