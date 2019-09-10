import { AllExercises, InactiveExercises, ActiveExercises } from "./exercises";

export interface NewSessionState {
  exercises: {
    queuedExercises: InactiveExercises[]
    currentExercise: InactiveExercises | null
  }
}

export interface ActiveSessionState {
  exercises: {
    queuedExercises: InactiveExercises[]
    currentExercise: AllExercises | null
    finishedExercises: ActiveExercises[]
  }
}

export type AllStates = (
  NewSessionState | ActiveSessionState
)