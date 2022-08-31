import { useEthPrice } from "@components/hooks/web3";
import Image from "next/image";

export default function EthRates() {
  const {
    eth: { data: ethPrice, perItem: ethPerItem },
  } = useEthPrice();
  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex items-center">
            <Image
              layout="fixed"
              height="35"
              width="35"
              src="/small-eth.webp"
            />
            <span className="text-2xl font-bold">= {ethPrice}$</span>
          </div>
          <p className="text-xl text-gray-500">Current ETH Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div>
            <span className="text-2xl font-bold">{ethPerItem} = 15$</span>
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
}
