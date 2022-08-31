import { COURSE_PRICE, useEthPrice } from "@components/hooks/web3";
import Image from "next/image";
import { Loader } from "../Common";

export default function EthRates() {
  const {
    eth: { data: ethPrice, perItem: ethPerItem },
  } = useEthPrice();
  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex items-center">
            {ethPrice ? (
              <>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                />
                <span className="text-2xl font-bold">= {ethPrice}$</span>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Loader size="md" />
              </div>
            )}
          </div>
          <p className="text-xl text-gray-500">Current ETH Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex items-center">
            {ethPrice ? (
              <>
                <span className="text-2xl font-bold">{ethPerItem}</span>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                />
                <span className="text-2xl font-bold">= {COURSE_PRICE}$</span>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Loader size="md" />
              </div>
            )}
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
}
