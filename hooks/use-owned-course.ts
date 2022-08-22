import { ECourseState, ICourse, IOwnedCourse } from "../types/course";
import Web3 from "web3";
import useSWR from "swr";
import { useAccount } from "./web3.hooks";
import { useWeb3 } from "providers/web3-provider/web3-provider";
import { contractParamsFromCourse } from "@utils/contract-params-from-course";
import { normilizeOwnedCourse } from "@utils/nomalize-owned-course";

export const useOwnedCourse = (course: ICourse) => {
  const { web3, contract } = useWeb3();
  const { account } = useAccount();

  const { data, ...swrRes } = useSWR(
    () =>
      web3 && contract && account.data
        ? `web3/ownedCourse/${account.data}`
        : null,
    async () => {
      const { courseHash } = contractParamsFromCourse({
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
    ownedCourse: data,
    isLoading: !data && !swrRes?.error,
    isLocked:
      data?.state === ECourseState.Purchased ||
      data?.state === ECourseState.Deactivated,
  };
};
