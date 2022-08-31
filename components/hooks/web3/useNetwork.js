import { useHooks } from "@components/Providers/Web3"

export const useNetwork = () => {
  return useHooks(hooks => hooks.useNetwork)()
}