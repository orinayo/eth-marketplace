import { createUseAccount } from "./createUseAccount";
import { createUseNetwork } from "./createUseNetwork";
import { createOwnedCourses } from "./createOwnedCourses";

export const setupHooks = ({ web3, provider, contract }) => {
  return {
    useAccount: createUseAccount(web3, provider),
    useNetwork: createUseNetwork(web3, provider),
    useOwnedCourses: createOwnedCourses(web3, contract),
  };
};
