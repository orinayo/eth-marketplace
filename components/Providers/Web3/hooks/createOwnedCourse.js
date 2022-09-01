import useSWR from "swr";
import { createCourseHash } from "utils/hash";
import { normalizeOwnedCourse } from "utils/normalize";

export const createOwnedCourse = (web3, contract) => (course, address) => {
  const swrRes = useSWR(
    () => (web3 && contract && address ? `web3/ownedCourse/${address}` : null),
    async () => {
      const courseHash = createCourseHash(web3)(course.id, address);
      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();
      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return null;
      }

      return normalizeOwnedCourse(web3)(course, ownedCourse);
    }
  );

  return swrRes;
};
