import { ICourse, IOwnedCourse } from "./../types/course";
import Web3 from "web3";
import useSWR from "swr";
import { useAccount } from "./web3.hooks";
import { useWeb3 } from "providers/web3-provider/web3-provider";

import { normilizeOwnedCourse } from "@utils/nomalize-owned-course";
import { enhanceSwrHook } from "@utils/enhance-swr-hook";
import { createCourseHash } from "@utils/create-course-hash";

export const useOwnedCourses = (courses: ICourse[]) => {
  const { web3, contract } = useWeb3();
  const { account } = useAccount();

  const swrRes = useSWR(
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

        const courseHash = createCourseHash({
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
    ...enhanceSwrHook(swrRes),
    ownedCourses: swrRes.data,
  };
};
