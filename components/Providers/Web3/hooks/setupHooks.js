import { createUseAccount } from "./createUseAccount";

export const setupHooks = (...deps) => {
  return {
    useAccount: createUseAccount(...deps)
  }
}