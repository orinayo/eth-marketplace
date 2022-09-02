import { createUseAccount } from "./createUseAccount";
import { createUseNetwork } from "./createUseNetwork";
import { createOwnedCourses } from "./createOwnedCourses";
import { createOwnedCourse } from "./createOwnedCourse";
import { createManageCourses } from "./createManageCourses";

export const setupHooks = ({ web3, provider, contract }) => {
  return {
    useAccount: createUseAccount(web3, provider),
    useNetwork: createUseNetwork(web3, provider),
    useOwnedCourses: createOwnedCourses(web3, contract),
    useOwnedCourse: createOwnedCourse(web3, contract),
    useManageCourses: createManageCourses(web3, contract),
  };
};
