//
import React, { useState, useEffect, useRef } from "react";
import styles from './StopWatchStyles.module.css'

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      //setInterval(callback, 10);
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 100);
    }

    //TO CLEAN UP
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true); // we want to this program to be running

    // updating refrence, DOSN'T couse our component to re-render. IF State changes it DOS our component to re-render
    startTimeRef.current = Date.now() - elapsedTime;
    // console.log(startTimeRef.current);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <section className={styles.container}>
    <div className={styles.stopwatchContainer}>
      <div className={styles.display}>{formatTime()}</div>
      <div className={styles.controls}>
        <button onClick={start} className={styles.startButton}>
          Start
        </button>
        <button onClick={stop} className={styles.stopButton}>
          Stop
        </button>
        <button onClick={reset} className={styles.resetButton}>
          Reset
        </button>
      </div>
    </div>
    </section>
  );
}

export default StopWatch;

