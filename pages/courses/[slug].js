import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Message, Modal } from "@components/UI/Common";
import { Curriculum, CourseHero, Keypoints } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({ course }) {
  const lectures = [
    "How to init App",
    "How to get a help",
    "Introduction to Solidity",
    "Programing in C++",
    "How to write For Loops",
    "Safe operator",
  ];

  const {
    account: { data: address },
  } = useAccount();
  const {
    ownedCourse: { data = {} },
  } = useOwnedCourse(course, address);
  const { state } = data;

  const renderCourseState = () => {
    if (state === "purchased") {
      return (
        <Message type="warning">
          Course is purchased and waiting for the activation. Process can take
          up to 24 hours.
          <em className="block font-normal">
            In case of any questions, please contact info@eincode.com
          </em>
        </Message>
      );
    }

    if (state === "activated") {
      return (
        <Message type="success">
          Eincode wishes you happy watching of the course.
        </Message>
      );
    }

    if (state === "deactivated") {
      return (
        <Message type="danger">
          Course has been deactivated, due the incorrect purchase data. The
          functionality to watch the course has been temporaly disabled.
          <em className="block font-normal">Please contact info@eincode.com</em>
        </Message>
      );
    }
  };

  const { title, description, coverImage, wsl } = course;
  const isLocked = state === "purchased" || state === "deactivated";

  return (
    <>
      <div className="py-4">
        <CourseHero
          hasOwner={!!state}
          title={title}
          description={description}
          image={coverImage}
        />
      </div>
      <Keypoints points={wsl} />
      {state && <div className="max-w-5xl mx-auto">{renderCourseState()}</div>}
      <Curriculum lectures={lectures} locked={isLocked} courseState={state} />
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
