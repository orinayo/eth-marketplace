import { useAccount } from "@components/hooks/web3";
import { Breadcrumbs } from "../Common";
import { EthRates, WalletBar } from "../Web3";

const LINKS = [
  {
    href: "/marketplace",
    value: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/manage",
    value: "Manage Courses",
    requireAdmin: true,
  },
];

export default function Header() {
  const {
    account: { isAdmin },
  } = useAccount();
  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumbs isAdmin={isAdmin} items={LINKS} />
      </div>
    </>
  );
}
