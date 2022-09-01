import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0xe06b21a2dd0524746cd9edceec94d2d014d80607dda9950d484b3ec677349228": true,
};

export const createUseAccount = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error(
          "Cannot retreive an account. Please refresh the browser."
        );
      }

      return account;
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
