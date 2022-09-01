import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/Providers";
import { Button } from "../Common";

export default function WalletBar() {
  const { requireInstall } = useWeb3();
  const {
    address,
    network: {
      data: networkName,
      isSupported: networkIsSupported,
      target: targetNetwork,
      hasInitialResponse: networkHasInitialResponse,
    },
  } = useWalletInfo();
  return (
    <section className="text-white bg-indigo-600 rounded-lg">
      <div className="p-8">
        <h1 className="text-base xs:text-xl break-words">Hello, {address}</h1>
        <h2 className="subtitle mb-5 text-sm xs:text-base">
          I hope you are having a great day!
        </h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <Button className="mr-2 text-sm xs:text-lg p-2" variant="white">
              Learn how to purchase
            </Button>
          </div>
          <div>
            {networkHasInitialResponse && !networkIsSupported && (
              <div className="bg-red-400 p-4 rounded-lg">
                <div>Connected to wrong network</div>
                <div>
                  Connect to: {` `}
                  <strong className="text-2xl">{targetNetwork}</strong>
                </div>
              </div>
            )}
            {requireInstall && (
              <div className="bg-yellow-500 p-4 rounded-lg">
                Cannot connect to network. Please install Metamask.
              </div>
            )}
            {networkName && (
              <div>
                <span>Currently on </span>
                <strong className="text-2xl">{networkName}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
