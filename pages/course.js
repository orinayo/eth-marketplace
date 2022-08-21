import { Modal } from "@components/Common";
import { Curriculum, CourseHero, Keypoints } from "@components/Course";

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
    <div className="relative max-w-7xl mx-auto px-4">
      <CourseHero />
      <Keypoints />
      <Curriculum lectures={lectures} />
      <Modal />
    </div>
  );
}
