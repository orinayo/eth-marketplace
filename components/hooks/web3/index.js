import { useHooks, useWeb3 } from "@components/Providers/Web3";
import { useRouter } from "next/router";
import { useEffect } from "react";

const _isEmpty = (data) => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};

const enhanceHook = (swrRes) => {
  const { data, error } = swrRes;
  const hasInitialResponse = !!(data || error);
  const isEmpty = hasInitialResponse && _isEmpty(data);

  return {
    ...swrRes,
    isEmpty,
    hasInitialResponse,
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

  const isConnecting =
    !account.hasInitialResponse && !network.hasInitialResponse;

  return {
    account,
    network,
    isConnecting,
    hasConnectedWallet: !!(account.data && network.isSupported),
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

export const useOwnedCourse = (...args) => {
  const swrRes = enhanceHook(
    useHooks(({ useOwnedCourse }) => useOwnedCourse)(...args)
  );

  return {
    ownedCourse: swrRes,
  };
};

export const useManageCourses = (...args) => {
  const swrRes = enhanceHook(
    useHooks(({ useManageCourses }) => useManageCourses)(...args)
  );

  return {
    managedCourses: swrRes,
  };
};

export const useAdmin = ({ redirectTo }) => {
  const { account } = useAccount();
  const { requireInstall } = useWeb3();
  const router = useRouter();
  const { hasInitialResponse, isAdmin, isEmpty } = account;

  useEffect(() => {
    if (requireInstall || (hasInitialResponse && !isAdmin) || isEmpty) {
      router.push(redirectTo);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return { account };
};

export * from "./useEthPrice";
