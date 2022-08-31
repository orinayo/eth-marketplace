import { CourseList } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { getAllCourses } from "@content/courses/fetcher";
import { WalletBar } from "@components/UI/web3";
import { useAccount, useNetwork } from "@components/hooks/web3";

export default function Marketplace({ courses }) {
  const {
    account: { data: address },
  } = useAccount();
  const {
    network,
  } = useNetwork();

  return (
    <>
      <div className="py-4">
        <WalletBar address={address} network={network} />
      </div>
      <CourseList courses={courses} />
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
