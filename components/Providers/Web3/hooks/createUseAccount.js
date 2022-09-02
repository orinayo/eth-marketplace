import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x815089f59dff532b8c1968cbc8cc89e0bb9cf1671e9b2a5fde8c8bca5d6de84a": true,
  "0x0a66b2b4c643962aa5c19f349fd90b8669adea138b0c896ade9ea180d25479a7": true,
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
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);

    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
