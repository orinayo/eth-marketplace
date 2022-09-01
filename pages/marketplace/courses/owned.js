import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/Providers";
import { Button, Message } from "@components/UI/Common";
import { OwnedCourseCard } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { MarketHeader } from "@components/UI/Marketplace";
import { getAllCourses } from "@content/courses/fetcher";
import Link from "next/link";
import { useRouter } from "next/router";

export default function OwnedCourses({ courses }) {
  const {
    account: { data: address },
  } = useAccount();
  const {
    ownedCourses: { data = [], isEmpty },
  } = useOwnedCourses(courses, address);
  const { requireInstall } = useWeb3();
  const router = useRouter();
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {isEmpty && (
          <div className="w-1/2">
            <Message type="warning">
              <div>You don't own any courses</div>
              <Link href="/marketplace">
                <a className="font-normal hover:underline">
                  <i>Purchase Course</i>
                </a>
              </Link>
            </Message>
          </div>
        )}
        {requireInstall && (
          <div className="w-1/2">
            <Message type="warning">
              <div>Please install Metamask</div>
            </Message>
          </div>
        )}
        {data.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Button onClick={() => router.push(`/courses/${course.slug}`)}>
              Watch the course
            </Button>
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
