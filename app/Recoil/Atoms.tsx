import { atom } from "recoil";

const workTimeState = atom({
  key: "workTimeState",
  default: 25,
});

const breakTimeState = atom({
  key: "breakTimeState",
  default: 25,
});

export { workTimeState, breakTimeState };
