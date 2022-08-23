import { ICourse, IOwnedCourse } from "./../types/course";
import Web3 from "web3";
import useSWR from "swr";
import { useAccount } from "./web3.hooks";
import { useWeb3 } from "providers/web3-provider/web3-provider";
import { contractParamsFromCourse } from "@utils/contract-params-from-course";
import { normilizeOwnedCourse } from "@utils/nomalize-owned-course";

export const useOwnedCourses = (courses: ICourse[]) => {
  const { web3, contract } = useWeb3();
  const { account } = useAccount();

  const { data, ...swrRes } = useSWR(
    () =>
      web3 && contract && account.data
        ? `web3/ownedCourses/${account.data}`
        : null,
    async () => {
      const ownedCourses = [];

      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        if (!course.id) {
          continue;
        }

        const { courseHash } = contractParamsFromCourse({
          web3: web3 as Web3,
          account: account.data,
          courseId: course.id,
        });

        const ownedCourse: IOwnedCourse = await contract.methods
          .getCourseByHash(courseHash)
          .call();

        if (ownedCourse.owner === account.data) {
          const normilized = normilizeOwnedCourse({
            web3: web3 as Web3,
            course,
            ownedCourse,
          });

          ownedCourses.push(normilized);
        }
      }

      return ownedCourses;
    }
  );

  return {
    ...swrRes,
    hasInitialResponse: !!data || !!swrRes.error,
    ownedCourses: data,
  };
};
