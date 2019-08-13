import { ISessionExercise } from "./exercise";
import { endianness } from "os";

export interface ITime {
  beginDate: number,
  endDate: number,
  secondsActive: number
}

export interface ISession {
  id: number;
  name: string;
  time: ITime;
}

