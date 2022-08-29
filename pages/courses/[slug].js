import { Modal } from "@components/Common";
import { Curriculum, CourseHero, Keypoints } from "@components/Course";
import { BaseLayout } from "@components/Layout";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({
  course: { title, description, coverImage, wsl },
}) {
  const lectures = [
    "How to init App",
    "How to get a help",
    "Introduction to Solidity",
    "Programing in C++",
    "How to write For Loops",
    "Safe operator",
  ];

  return (
    <>
      <div className="py-4">
        <CourseHero
          title={title}
          description={description}
          image={coverImage}
        />
      </div>
      <Keypoints points={wsl} />
      <Curriculum lectures={lectures} locked={true} />
      <Modal />
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const [course] = data.filter(({ slug }) => slug === params.slug);

  return {
    props: {
      course,
    },
  };
}

Course.Layout = BaseLayout;
