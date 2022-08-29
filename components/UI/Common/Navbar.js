import { useWeb3 } from "@components/Providers";
import Link from "next/link";
import { Button } from "@components/UI/Common";
import { useAccount } from "@components/Web3/hooks/useAccount";

export default function Navbar() {
  const { connect, isLoading, isWeb3Loaded } = useWeb3();
  const {
    account: { data: accountData },
  } = useAccount();

  const renderContent = () => {
    if (isLoading) {
      return (
        <Button disabled={true} onClick={connect}>
          Loading...
        </Button>
      );
    }

    if (!isWeb3Loaded) {
      return (
        <Button
          onClick={() =>
            window.open("https://metamask.io/download.html", "_blank")
          }
        >
          Install Metamask
        </Button>
      );
    }

    if (accountData) {
      return (
        <Button hoverable={false} className="cursor-default">
          Hi there
        </Button>
      );
    }

    return <Button onClick={connect}>Connect</Button>;
  };

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              {renderContent()}
            </div>
          </div>
        </nav>
      </div>
      {accountData && (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {accountData}
          </div>
        </div>
      )}
    </section>
  );
}
