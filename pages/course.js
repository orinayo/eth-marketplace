import Modal from "@components/Course/Modal";
import Hero from "@components/Course/Hero";
import Keypoint from "@components/Course/Keypoint";
import Lectures from "@components/Course/Lectures";

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
      <Hero />
      <Keypoint />
      <Lectures lectures={lectures} />
      <Modal />
    </div>
  );
}
