function ScoreDisplay({
  correct,
  answers,
  setQuestions,
  setCorrect,
  setAnswers,
  setStart,
  setEnd,
}) {
  const onClickHandler = (e) => {
    e.preventDefault();
    setQuestions([]);
    setCorrect = [];
    setAnswers = [];
    setStart(false);
    setEnd(false);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "grey",
          padding: "10px",
          borderRadius: "8px",
          color: "darkgreen",
        }}
      >
        <h1>
          Total Score: {localStorage.getItem("total")}/
          {localStorage.getItem("length")}
        </h1>
        <hr />
        <div style={{ maxHeight: "50vh", overflowY: "scroll" }}>
          {correct.map((each, i) => {
            return (
              <div
                key={i}
                style={{
                  backgroundColor: "white",
                  margin: "10px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                <h1>Question {i + 1}</h1>
                <h2 style={{ color: "darkblue" }}>
                  Correct Answer:
                  {Array.isArray(correct[i])
                    ? correct[i].map((each, j) => {
                        return (
                          <span key={j}>
                            <span>{` ${each.slice(0, 8)}${
                              j === correct[i].length - 1 ? "" : ","
                            }`}</span>
                          </span>
                        );
                      })
                    : correct[i]}
                </h2>
                <h2 style={{ color: "brown" }}>Your Answer: {answers[i]}</h2>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={onClickHandler}
        style={{
          backgroundColor: "darkcyan",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "10px",
        }}
      >
        Try Again
      </button>
    </>
  );
}

export default ScoreDisplay;
