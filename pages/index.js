import { Hero } from "@components/UI/Common";
import { CourseList } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { getAllCourses } from "@content/courses/fetcher";

export default function Home({ courses }) {
  return (
    <>
      <Hero />
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

Home.Layout = BaseLayout;
