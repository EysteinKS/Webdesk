export interface ITag {
  id: string;
  name: string;
}

export interface IStep {
  id: string;
  shortText: string;
  longText?: string;
}

export interface IReps {
  amount: number;
  tags: ITag[];
}

export interface ISet {
  weight: number;
  reps: IReps;
  tags: ITag[];
}

export interface IActiveSet extends ISet {
  timeBegin: Date | null;
  timeActive: number;
  timeEnd: Date | null;
}

export interface IWeight {
  weight: number;
  tags: ITag[];
}