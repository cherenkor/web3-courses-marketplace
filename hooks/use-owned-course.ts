import { enhanceSwrHook } from './../utils/enhance-swr-hook';
import { ECourseState, ICourse, IOwnedCourse } from "../types/course";
import Web3 from "web3";
import useSWR from "swr";
import { useAccount } from "./web3.hooks";
import { useWeb3 } from "providers/web3-provider/web3-provider";
import { normilizeOwnedCourse } from "@utils/nomalize-owned-course";
import { createCourseHash } from '@utils/create-course-hash';

export const useOwnedCourse = (course: ICourse) => {
  const { web3, contract } = useWeb3();
  const { account } = useAccount();

  const swrRes = useSWR(
    () =>
      web3 && contract && account.data
        ? `web3/ownedCourse/${account.data}`
        : null,
    async () => {
      const courseHash = createCourseHash({
        web3: web3 as Web3,
        account: account.data,
        courseId: course.id,
      });

      const ownedCourse: IOwnedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();

      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return;
      }

      return normilizeOwnedCourse({
        web3: web3 as Web3,
        course,
        ownedCourse,
      });
    }
  );

  return {
    ...swrRes,
    ...enhanceSwrHook(swrRes),
    ownedCourse: swrRes.data,
    isLocked:
      swrRes.data?.state === ECourseState.Purchased ||
      swrRes.data?.state === ECourseState.Deactivated,
  };
};
