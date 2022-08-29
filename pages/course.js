import { Modal } from "@components/Common";
import { Curriculum, CourseHero, Keypoints } from "@components/Course";
import { BaseLayout } from "@components/Layout";

export default function Course() {
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
        <CourseHero />
      </div>
      <Keypoints />
      <Curriculum lectures={lectures} />
      <Modal />
    </>
  );
}

Course.Layout = BaseLayout