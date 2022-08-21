import {
  ECourseState,
  IOwnedCourse,
  TCourseNormilized,
} from "./../types/course";
import Web3 from "web3";
import { ICourse, ICourseStates } from "types/course";

export const COURSE_STATES: ICourseStates = {
  0: ECourseState.Purchased,
  1: ECourseState.Activated,
  2: ECourseState.Deactivated,
};

interface IArgs {
  web3: Web3;
  course: ICourse;
  ownedCourse: IOwnedCourse;
}

export const normilizeOwnedCourse = ({
  web3,
  course,
  ownedCourse,
}: IArgs): TCourseNormilized => {
  return {
    ...course,
    ownedCourseId: ownedCourse.id,
    proof: ownedCourse.proof,
    owner: ownedCourse.owner,
    price: web3.utils.fromWei(ownedCourse.price),
    state: COURSE_STATES[ownedCourse.state],
  };
};
