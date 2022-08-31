import { CourseCard, CourseList } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { getAllCourses } from "@content/courses/fetcher";
import { WalletBar } from "@components/UI/Web3";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button } from "@components/UI/Common";

export default function Marketplace({ courses }) {
  const {
    account: { data: address },
  } = useAccount();
  const { network } = useNetwork();

  return (
    <>
      <div className="py-4">
        <WalletBar address={address} network={network} />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <Button variant="lightPurple">Purchase</Button>
              </div>
            )}
          />
        )}
      </CourseList>
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
