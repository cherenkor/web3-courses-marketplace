import Web3 from "web3";

interface IArgs {
  web3: Web3;
  account?: string;
  courseId?: string;
}

export const createCourseHash = ({ web3, account, courseId }: IArgs) => {
  const hexCourseId = courseId ? web3.utils.utf8ToHex(courseId) : "";
  const courseHash =
    hexCourseId && account
      ? web3.utils.soliditySha3(
          {
            type: "bytes16",
            value: hexCourseId,
          },
          {
            type: "address",
            value: account,
          }
        )
      : "";

  return courseHash;
};
