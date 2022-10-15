import { useState, useEffect, useRef, time } from "react";

const Display = ({ setHasWon,timeToEnd, cpm, wpm, accuracy, startTime, endTime, endGame }) => {
  const [words, setWords] = useState([
    "Hello",
    "To",
    "You",
    "My",
    "Dear",
    "Viewer",
  ]);
  const [word, setWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const currentLetter = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // on load fetch words from https://random-word-api.herokuapp.com/word?number=10
    setLoading(true);
    fetchWords();
  }, []);

  useEffect(() => {
    if (wordIndex === words.length) {
      setHasWon(true);
      endTime.current = new Date().getTime();
      cpm.current = (((correct-incorrect)/((endTime.current-startTime.current)/1000)/60)).toFixed(2);
      wpm.current = ((correctWords/((endTime.current-startTime.current)/1000)/60)).toFixed(2);
      accuracy.current = ((correct/(correct+incorrect))*100).toFixed(2);
      return;
    }
    setLetterIndex(0);
    setCorrectWords(correctWords + 1);
  }, [wordIndex]);

  const fetchWords = async () => {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=5"
    );
    const data = await response.json();
    setWords(data);
    setWord(data[0]);
    setLoading(false);
    startTime.current = new Date().getTime();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value === " ") {
      e.target.value = "";
      return;
    }
    if (inputRef.current.value === word[letterIndex]) {
      setLetterIndex(letterIndex + 1);
      inputRef.current.value = "";
      currentLetter.current.classList.remove("letter-wrong");
      currentLetter.current.classList.add("letter-typed");
      if (letterIndex + 1 === word.length) {
        setWord(words[wordIndex + 1]);
        setWordIndex(wordIndex + 1);
      }
      setCorrect(correct + 1);
    } else {
      currentLetter.current.classList.remove("letter-typed");
      currentLetter.current.classList.add("letter-wrong");
      e.target.value = "";
      setIncorrect(incorrect + 1);
    }

  };

  return (
    <div>
      {loading ? (
        <div>...</div>
      ) : (
        <div className="center words-container">
          {words.map((word, index) => {
            return (
              <div key={index} className="word">
                {word.split("").map((letter, lIndex) => {
                  return (
                    <span
                      key={lIndex}
                      className="letter"
                      ref={
                        (lIndex === letterIndex) & (index === wordIndex)
                          ? currentLetter
                          : null
                      }
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            );
          })}
          <input
            className="center text-input"
            type="text"
            onChange={handleChange}
            ref={inputRef}
          />
        </div>
      )}
    </div>
  );
};

export default Display;
