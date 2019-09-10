import { ISet, IActiveSet, IStep, IWeight } from "./util";

export type NewTypes = (
  "BLANK" | "CUSTOM"
)

export type DefinedTypes = (
  "ENDURANCE" | "TARGET" |
  "REPETITION"
)

export type ExerciseTypes = (NewTypes | DefinedTypes)

interface Exercise {
  type: ExerciseTypes
  index?: number
}

export interface BlankExercise extends Exercise {
  type: "BLANK"
  search: string
  selected: string
}

export interface CustomExercise extends Exercise {
  type: "CUSTOM"
  selected: ("ENDURANCE" | "TARGET" | "REPETITION" | null)
}

export interface DefinedExercise extends Exercise {
  id?: string
  name?: string
  owner: string
  description?: string
  steps?: IStep[]
}

export type GoalMeasures = "TIME" | "AMOUNT" | null

export interface Goal {
  measure: GoalMeasures
  target: string | number | null
  weight?: IWeight
}

export interface EnduranceGoal extends Goal {

}

export interface TargetGoal extends Goal {
  target: number
}

export interface ActiveEnduranceGoal extends EnduranceGoal {
  result?: number
}

export interface ActiveTargetGoal extends TargetGoal {
  target: number
}

export interface EnduranceExercise extends DefinedExercise {
  type: "ENDURANCE";
  goal?: EnduranceGoal
}

export interface TargetExercise extends DefinedExercise {
  type: "TARGET";
  goal?: TargetGoal
}

export interface RepetitionExercise extends DefinedExercise {
  type: "REPETITION";
  sets: ISet[]
}

export interface ActiveExercise {
  timeBegin: Date | string | null;
  timeActive: number;
  timeEnd: Date | string | null;
  rating: number;
  comments: string;
  isActive: true
}

const exercise: ActiveExercise = {
  timeBegin: null,
  timeActive: 0,
  timeEnd: null,
  rating: 0,
  comments: "",
  isActive: true
}

export interface ActiveEnduranceExercise extends EnduranceExercise {
  result?: number
}

export interface ActiveTargetExercise extends TargetExercise {
  result?: number
}

export interface RepetitionProgress extends ActiveExercise {
  setsQueue: ISet[]
  setsCompleted: IActiveSet[]
  currentSet: IActiveSet
}

export interface ActiveRepetitionExercise extends RepetitionExercise {
  progress: RepetitionProgress
}

export type NewExercises = (BlankExercise | CustomExercise)
export type DefinedExercises = (EnduranceExercise | TargetExercise | RepetitionExercise)
export type ActiveExercises = (ActiveEnduranceExercise | ActiveTargetExercise | ActiveRepetitionExercise)

export type EnduranceExercises = (EnduranceExercise | ActiveEnduranceExercise)
export type TargetExercises = (TargetExercise | ActiveTargetExercise)
export type RepetitionExercises = (RepetitionExercise | ActiveRepetitionExercise)
export type AllDefinedExercises = (EnduranceExercises | TargetExercises | RepetitionExercises)

export type InactiveExercises = (NewExercises | DefinedExercises)

export type AllExercises = (
  NewExercises | DefinedExercises | ActiveExercises
)