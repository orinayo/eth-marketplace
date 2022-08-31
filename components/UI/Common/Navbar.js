import { useWeb3 } from "@components/Providers";
import Link from "next/link";
import { Button } from "@components/UI/Common";
import { useAccount } from "@components/hooks/web3";
import { useRouter } from "next/router";

export default function Navbar() {
  const { connect, isLoading, requireInstall } = useWeb3();
  const {
    account: { data: address, isAdmin },
  } = useAccount();
  const { pathname } = useRouter();

  const renderConnectButton = () => {
    if (isLoading) {
      return (
        <Button disabled={true} onClick={connect}>
          Loading...
        </Button>
      );
    }

    if (address) {
      return (
        <Button hoverable={false} className="cursor-default">
          Hi there {isAdmin && "Admin"}
        </Button>
      );
    }

    if (requireInstall) {
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

    return <Button onClick={connect}>Connect</Button>;
  };

  const renderAddress = () => {
    if (address && !pathname.includes("/marketplace")) {
      return (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {address}
          </div>
        </div>
      );
    }

    return null;
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
              <Link href="/marketplace">
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
              {renderConnectButton()}
            </div>
          </div>
        </nav>
      </div>
      {renderAddress()}
    </section>
  );
}
