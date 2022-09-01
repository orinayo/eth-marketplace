import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { Button, Message } from "@components/UI/Common";
import { OwnedCourseCard } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { MarketHeader } from "@components/UI/Marketplace";
import { getAllCourses } from "@content/courses/fetcher";

export default function OwnedCourses({ courses }) {
  const {
    account: { data: address },
  } = useAccount();
  const {
    ownedCourses: { data = [] },
  } = useOwnedCourses(courses, address);
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {data.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Button>Watch the course</Button>
          </OwnedCourseCard>
        ))}
      </section>
    </>
  );
}

export function getStaticProps() {
  const { data: courses } = getAllCourses();
  return {
    props: {
      courses,
    },
  };
}

OwnedCourses.Layout = BaseLayout;
