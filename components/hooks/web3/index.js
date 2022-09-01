import { useHooks } from "@components/Providers/Web3";

const enhanceHook = (swrRes) => {
  return {
    ...swrRes,
    hasInitialResponse: swrRes.data || swrRes.error,
  };
};

export const useNetwork = () => {
  const swrRes = enhanceHook(useHooks(({ useNetwork }) => useNetwork)());
  return {
    network: swrRes,
  };
};

export const useAccount = () => {
  const swrRes = enhanceHook(useHooks(({ useAccount }) => useAccount)());
  return {
    account: swrRes,
  };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return {
    account,
    network,
    canPurchaseCourse: !!(account.data && network.isSupported),
  };
};

export const useOwnedCourses = (...args) => {
  const swrRes = enhanceHook(
    useHooks(({ useOwnedCourses }) => useOwnedCourses)(...args)
  );

  return {
    ownedCourses: swrRes,
  };
};

export * from "./useEthPrice";
