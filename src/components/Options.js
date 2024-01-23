import { useState } from "react";

function Options({
  setStart,
  setQuestions,
  setCorrect,
  timer,
  setTimer,
  seconds,
  setSeconds,
}) {
  const selectHeaderCSS = {
    display: "block",
    fontSize: "26px",
    color: "darkgreen",
  };

  const selectCSS = {
    padding: "10px",
    marginTop: "5px",
    width: "100%",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    appearance: "none",
    backgroundColor: " #fff",
    cursor: "pointer",
  };

  const [options, setOptions] = useState({
    category: "none",
    difficulty: "none",
    limit: "20",
  });

  const onCheckboxChangeHandler = (e) => {
    const { checked } = e.target;
    setTimer(checked ? "timer" : "");
  };

  const onSecondChangeHandler = (e) => setSeconds(e.target.value);

  const onChangeHandler = (e) =>
    setOptions({ ...options, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const category =
      options["category"] !== "none"
        ? `?category=${options["category"]}`
        : null;

    const difficulty =
      options["difficulty"] !== "none"
        ? `${category ? "&" : "?"}difficulty=${options["difficulty"]}`
        : null;

    const limit =
      options["limit"] !== "20"
        ? `${category || difficulty ? "&" : "?"}limit=${options["limit"]}`
        : null;

    console.log(
      `https://quizapi.io/api/v1/questions${!category ? "" : category}${
        !difficulty ? "" : difficulty
      }${!limit ? "" : limit}`
    );

    const res = await fetch(
      `https://quizapi.io/api/v1/questions${!category ? "" : category}${
        !difficulty ? "" : difficulty
      }${!limit ? "" : limit}`,
      {
        headers: {
          "X-Api-Key": localStorage.getItem("token"),
        },
      }
    );

    const data = await res.json();

    console.log(data);

    localStorage.setItem("question", 0);
    localStorage.setItem("length", data.length);
    localStorage.setItem("total", 0);
    if (timer && seconds) localStorage.setItem("timer", seconds);
    setCorrect(passCorrectAnswers(data));
    setQuestions(data);
    setStart(true);
  };

  const passCorrectAnswers = (data) => {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].correct_answer) arr.push(data[i].correct_answer);
      else {
        const correctAns = Object.keys(data[i].correct_answers).filter(
          (each) => data[i].correct_answers[each] === "true"
        );
        arr.push(correctAns);
      }
    }
    return arr;
  };

  return (
    <div
      style={{ backgroundColor: "grey", padding: "10px", borderRadius: "8px" }}
    >
      <form onSubmit={onSubmitHandler}>
        <div>
          <label style={selectHeaderCSS}>Select Category</label>
          <select
            style={selectCSS}
            name="category"
            defaultValue="none"
            onChange={onChangeHandler}
          >
            <option value="none">Random</option>
            <option value="Linux">Linux</option>
            <option value="DevOps">DevOps</option>
            <option value="SQL">SQL</option>
            <option value="Code">Code</option>
            <option value="CMS">CMS</option>
            <option value="Docker">Docker</option>
            <option value="Uncategorized">Uncategorized</option>
          </select>
        </div>

        <div>
          <label style={selectHeaderCSS}>Select Difficulty</label>
          <select
            style={selectCSS}
            name="difficulty"
            defaultValue="none"
            onChange={onChangeHandler}
          >
            <option value="none">Random</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label style={selectHeaderCSS}>Number Of Questions</label>
          <select
            style={selectCSS}
            name="limit"
            defaultValue="none"
            onChange={onChangeHandler}
          >
            <option value="none">20</option>
            <option value="15">15</option>
            <option value="10">10</option>
            <option value="5">5</option>
          </select>
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            onChange={onCheckboxChangeHandler}
            type="radio"
            name="timer"
            checked={timer === "timer"}
            style={{
              width: "20px",
              height: "20px",
              marginRight: "5px",
              verticalAlign: "middle",
            }}
          />
          <label
            style={{
              fontSize: "20px",
              color: "darkgreen",
              marginRight: "5px",
              verticalAlign: "middle",
            }}
          >
            {`Timer(seconds)`}
          </label>
          <input
            onChange={onSecondChangeHandler}
            type="number"
            name="seconds"
            placeholder="10 - 60"
            min="10"
            max="60"
            style={{
              width: "30%",
              height: "30px",
              marginRight: "5px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              appearance: "none",
              backgroundColor: " #fff",
              verticalAlign: "middle",
            }}
          />
        </div>

        <button
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
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default Options;
