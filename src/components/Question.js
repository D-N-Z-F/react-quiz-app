import { useState } from "react";

function Question({ question, answers, setAnswers, setEnd, calc }) {
  const [temp, setTemp] = useState("");
  const alphabets = ["A", "B", "C", "D", "E", "F"];
  const blurBtn = temp === "";

  const onChangeHandler = (e) => setTemp(e.target.value);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("next", "true");
    answers.push(temp);
    calc();
    setAnswers([...answers]);
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

  return (
    <div
      style={{
        backgroundColor: "grey",
        padding: "10px",
        borderRadius: "8px",
        color: "darkgreen",
      }}
    >
      <h3 style={{ fontSize: "24px" }}>
        Question {parseInt(localStorage.getItem("question")) + 1}
      </h3>
      <hr />
      <div>
        <h2
          style={{ fontSize: question.question.length > 25 ? "20px" : "28px" }}
        >
          {question.question}
        </h2>
        <form
          onSubmit={onSubmitHandler}
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          {Object.keys(question.answers).map((answer, i) => {
            return question.answers[answer] !== null ? (
              <div key={i}>
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  onChange={onChangeHandler}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "5px",
                    verticalAlign: "middle",
                  }}
                />
                <label
                  style={{
                    fontSize:
                      question.answers[answer].length > 25 ? "16px" : "20px",
                    verticalAlign: "middle",
                  }}
                >{`${alphabets[i]}: ${question.answers[answer]}`}</label>
              </div>
            ) : null;
          })}
          <button
            disabled={blurBtn}
            style={{
              backgroundColor: "darkcyan",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: !blurBtn ? "pointer" : "default",
              opacity: !blurBtn ? "1" : "0.5",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Question;
