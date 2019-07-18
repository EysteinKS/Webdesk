export interface IExercise {
  name: string;
  owner: string;
  publicid: string;
  description: string;
  tags: ITag[];
  reps: IReps[];
  steps: IStep[];
  isFreeWeight: boolean;
  weights: IWeight[];
}

export interface IPublicExercise extends IExercise {
  publicRating: number;
  publicComments: any[];
}

export interface IPrivateExercise extends IExercise {
  personalRating: number;
  comments: any[];
}

export interface ISessionExercise extends IPrivateExercise {
  timeBegin: string;
  timeActive: string;
  timeEnd: string;
  progress: {
    sets: number,
    setsTarget: number,
    reps: number,
    repsTarget: number
  }
  setsQueue: [];
  setsCompleted: [];
  sessionRating: number,
  sessionComments: any[]
}

export interface ITag {
  id: string;
  name: string;
}

export interface IPublicTag {
  relatedTags: string[];
}

export interface IReps {
  amount: number;
  tags: ITag[];
}

export interface ISet {
  amount: number;
  reps: IReps;
  tags: ITag[];
}

export interface ISessionSet extends ISet {
  timeBegin: string;
  timeEnd: string;
}

export interface IStep {
  id: string;
  shortText: string;
  longText: string;
}

export interface IWeight {
  weight: number;
  tags: ITag[];
}