import { Breadcrumb, Hero } from "@components/Common";
import { CourseList } from "@components/Course";
import { BaseLayout } from "@components/Layout";
import { OrderCard } from "@components/Order";
import { EthRates, WalletBar } from "@components/Web3";

export default function Home() {
  return (
    <>
      <Hero />
      <Breadcrumb />
      <WalletBar />
      <EthRates />
      <OrderCard />
      <CourseList />
    </>
  );
}

Home.Layout = BaseLayout