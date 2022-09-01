import { COURSE_PRICE, useEthPrice } from "@components/hooks/web3";
import Image from "next/image";
import { Loader } from "../Common";

export default function EthRates() {
  const {
    eth: { data: ethPrice, perItem: ethPerItem },
  } = useEthPrice();
  return (
    <div className="flex flex-col xs:flex-row text-center">
      <div className="p-6 border drop-shadow rounded-md mr-2">
        <div className="flex items-center justify-center">
          {ethPrice ? (
            <>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
              />
              <span className="text-xl font-bold">= {ethPrice}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Current ETH Price</p>
      </div>
      <div className="p-6 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          {ethPrice ? (
            <>
              <span className="text-xl font-bold">{ethPerItem}</span>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
              />
              <span className="text-xl font-bold">= {COURSE_PRICE}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Price per course</p>
      </div>
    </div>
  );
}
