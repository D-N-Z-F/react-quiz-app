import { useEffect, useState } from "react";

function Timer({ seconds, onTimerEnd }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    console.log("start");
    if (localStorage.getItem("next")) {
      localStorage.removeItem("next");
      setTime(seconds);
    }
    let countDown = setInterval(() => {
      setTime((time) => {
        const updatedTime = time - 1;
        if (updatedTime === -1) {
          clearInterval(countDown);
          onTimerEnd();
          setTimeout(() => {
            setTime(seconds);
          }, 500);
        } else return updatedTime;
      });
    }, 1000);

    return () => clearInterval(countDown);
  }, [time]);

  return <h1>Timer: {time} seconds left</h1>;
}

export default Timer;
