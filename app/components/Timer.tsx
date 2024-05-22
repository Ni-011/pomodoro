"use client";
import { Button } from "@/components/ui/button";
import { withRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRecoilValue } from "recoil";
import { breakTimeState, workTimeState } from "../Recoil/Atoms";
import { Percent } from "react-feather";

const Timer: () => React.JSX.Element = () => {
  const [paused, setPause] = useState<boolean>(true);
  const percentage: number = 60;
  const workTimeValue: number = useRecoilValue(workTimeState);
  const breakTimeValue: number = useRecoilValue(breakTimeState);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [working, setWorking] = useState<boolean>(true);
  const pausedRef = useRef(paused);
  const workTimeValueRef = useRef(workTimeValue);
  const breakTimeValueRef = useRef(breakTimeValue);
  const secondsLeftRef = useRef(secondsLeft);
  const workingRef = useRef(working);

  // starts the timer by setting remaining time to user entered time
  const startTimer = () => {
    setSecondsLeft(
      workingRef.current
        ? workTimeValueRef.current * 60
        : breakTimeValueRef.current * 60
    );
    console.log("started");
  };

  const tick = () => {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(secondsLeftRef.current - 1);
    console.log(secondsLeftRef.current);
  };

  const timerOver = () => {
    workingRef.current = !workingRef.current;
    setWorking((prev) => !prev);

    setSecondsLeft(
      workingRef.current
        ? workTimeValueRef.current * 60
        : breakTimeValueRef.current * 60
    );
    secondsLeftRef.current = workingRef.current
      ? workTimeValueRef.current * 60
      : breakTimeValueRef.current * 60;
  };

  useEffect(() => {
    startTimer();

    const interval = setInterval(() => {
      if (pausedRef.current == true) {
        console.log("time is paused");
        return;
      }

      if (secondsLeftRef.current == 0) {
        timerOver();
      }

      tick();
    }, 1);

    return () => clearInterval(interval);
  }, [workTimeValue, breakTimeValue]);

  const totalSeconds = (working ? workTimeValue : breakTimeValue) * 60;

  const loadingPercent = Math.round((secondsLeft / totalSeconds) * 100);

  const minutesLeft = Math.floor(secondsLeft / 60);

  return (
    <div className="flex flex-col gap-10 p-5 justify-center align-center items-center">
      <div style={{ width: 400, height: 400 }}>
        <CircularProgressbar
          value={loadingPercent}
          text={`${minutesLeft} : ${
            secondsLeft % 60 < 10 ? "0" + (secondsLeft % 60) : secondsLeft % 60
          }`}
          styles={buildStyles({
            pathColor: `${working ? "#90D26D" : "#7F27FF"}`,
            textColor: "white",
          })}
        />
      </div>
      <div className="p-5">
        <Button
          onClick={() => {
            setPause((prev) => !prev);
            pausedRef.current = !paused;
          }}
          variant="default"
          className="h-[2.5em] w-[5.5em] text-2xl bg-white text-black font-sans shadow-inner rounded-xl shadow-6xl hover:text-white"
        >
          {paused ? "Start" : "Stop"}
        </Button>
      </div>
    </div>
  );
};

export default Timer;
