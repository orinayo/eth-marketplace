import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const createManagedCourses = (web3, contract) => (address) => {
  const swrRes = useSWR(
    () =>
      web3 && contract && address ? `web3/managedCourses/${address}` : null,
    async () => {
      const courses = [1, 2, 3, 4];

      return courses;
    }
  );

  return swrRes;
};
