import { createUseAccount } from "./createUseAccount";
import { createUseNetwork } from "./createUseNetwork";

export const setupHooks = (...deps) => {
  return {
    useAccount: createUseAccount(...deps),
    useNetwork: createUseNetwork(...deps),
  };
};
