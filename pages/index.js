import { Breadcrumb, Footer, Hero, Navbar } from "@components/Common";
import { CourseList } from "@components/Course";
import { OrderCard } from "@components/Order";
import { EthRates, WalletBar } from "@components/Web3";

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            <Hero />
            <Breadcrumb />
            <WalletBar />
            <EthRates />
            <OrderCard />
            <CourseList />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
