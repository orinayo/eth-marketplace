import { Breadcrumbs } from "../Common";
import { EthRates, WalletBar } from "../Web3";

export default function Header() {
  return (
    <>
      <WalletBar />
      <EthRates />
      <div className="flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
    </>
  );
}
