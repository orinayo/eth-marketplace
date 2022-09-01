import useSWR from "swr";
import { normalizeOwnedCourse } from "utils/normalize";

export const createOwnedCourses = (web3, contract) => (courses, address) => {
  const swrRes = useSWR(
    () => (web3 && contract && address ? `web3/ownedCourses/${address}` : null),
    async () => {
      const ownedCourses = [];

      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        if (!course.id) {
          continue;
        }

        const hexCourseId = web3.utils.utf8ToHex(course.id);
        const courseHash = web3.utils.soliditySha3(
          { type: "bytes16", value: hexCourseId },
          { type: "address", value: address }
        );

        const ownedCourse = await contract.methods
          .getCourseByHash(courseHash)
          .call();
        if (
          ownedCourse.owner !== "0x0000000000000000000000000000000000000000"
        ) {
          const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
          ownedCourses.push(normalized);
        }
      }

      return ownedCourses;
    }
  );
  return swrRes;
};