import { useHooks } from "@components/Providers/Web3";

export const useAccount = () => {
  return useHooks((hooks) => hooks.useAccount)();
};
