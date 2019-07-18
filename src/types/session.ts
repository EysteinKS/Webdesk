import { ISessionExercise } from "./exercise";

export interface ISession {
  id: number;
  name: string;
  timeBegin: string;
  timeEnd: string;
  currentExercise: ISessionExercise;
  queuedExercises: ISessionExercise[];
  finishedExercises: ISessionExercise[];
}
