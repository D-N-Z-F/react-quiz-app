import { useState, useEffect } from "react";
import Question from "./components/Question";
import Options from "./components/Options";
import ScoreDisplay from "./components/ScoreDisplay";
import Timer from "./components/Timer";

function App() {
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [timer, setTimer] = useState("");
  const [seconds, setSeconds] = useState(0);

  const onTimerEnd = () => {
    answers.push("N/A");
    setTimeout(() => {
      setAnswers([...answers]);
      setTimer("timer");
      setSeconds(parseInt(localStorage.getItem("timer")));
    }, 500);
    if (
      parseInt(localStorage.getItem("question")) + 1 ===
      parseInt(localStorage.getItem("length"))
    )
      setEnd(true);
    else
      localStorage.setItem(
        "question",
        parseInt(localStorage.getItem("question")) + 1
      );
  };

  const calculateCurrentTotal = () => {
    let total = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === correct[i]) total++;
      else if (Array.isArray(correct[i]))
        for (let j = 0; j < correct[i].length; j++)
          if (answers[i] === correct[i][j].slice(0, 8)) total++;
    }
    localStorage.setItem("total", total);
  };

  useEffect(() => {
    if (!localStorage.getItem("token"))
      localStorage.setItem("token", "wVEQw2eZnuZfmPjMbe616RnYsU1ckNTowKCwLLP7");

    if (!localStorage.getItem("total")) localStorage.setItem("total", 0);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "36px" }}>React Quiz</h1>
      {!start && !questions.length ? (
        <Options
          setStart={setStart}
          setQuestions={setQuestions}
          setCorrect={setCorrect}
          timer={timer}
          setTimer={setTimer}
          seconds={seconds}
          setSeconds={setSeconds}
        />
      ) : !end ? (
        <>
          <Question
            key={localStorage.getItem("question")}
            question={questions[localStorage.getItem("question")]}
            answers={answers}
            setAnswers={setAnswers}
            setEnd={setEnd}
            calc={calculateCurrentTotal}
            setTimer={setTimer}
            setSeconds={setSeconds}
          />
          <h1>
            Current Score:
            {` ${localStorage.getItem("total")}/${questions.length}`}
          </h1>
          {timer && seconds ? (
            <Timer seconds={seconds} onTimerEnd={onTimerEnd} />
          ) : null}
        </>
      ) : (
        <ScoreDisplay
          correct={correct}
          answers={answers}
          setQuestions={setQuestions}
          setStart={setStart}
          setEnd={setEnd}
          setCorrect={setCorrect}
          setAnswers={setAnswers}
        />
      )}
    </div>
  );
}

export default App;
