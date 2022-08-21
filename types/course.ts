export interface ICourse {
  id: string;
  type: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  link: string;
  slug: string;
  wsl: string[];
  createdAt?: string;
}

export interface ICourseWithIndex extends ICourse {
  index: number;
}

export enum ECourseState {
  Purchased = "Purchased",
  Activated = "Activated",
  Deactivated = "Deactivated",
}

export interface ICourseStates {
  0: ECourseState.Purchased;
  1: ECourseState.Activated;
  2: ECourseState.Deactivated;
}

export interface IOwnedCourse {
  id: string;
  proof: string;
  owner: string;
  price: string;
  state: 0 | 1 | 2;
}

export type TCourseNormilized = ICourse &
  Omit<IOwnedCourse, "state" | "id"> & {
    ownedCourseId: string;
    state: ECourseState;
  };
