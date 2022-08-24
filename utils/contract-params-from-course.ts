import Web3 from 'web3';
import { createCourseHash } from './create-course-hash';

interface IArgs {
    web3: Web3;
    account?: string;
    email?: string;
    courseId?: string;
}

export const contractParamsFromCourse = ({
  web3,
  account,
  email,
  courseId,
}: IArgs) => {
  const hexCourseId = courseId ? web3.utils.utf8ToHex(courseId) : "";
  const courseHash = createCourseHash({
    web3, account, courseId
  })

  const emailHash = email ? web3.utils.sha3(email) : "";

  const proof =
    emailHash && courseHash
      ? web3.utils.soliditySha3(
          { type: "bytes32", value: emailHash },
          { type: "bytes32", value: courseHash }
        )
      : "";

  return {
    hexCourseId,
    courseHash,
    emailHash,
    proof,
  };
};
