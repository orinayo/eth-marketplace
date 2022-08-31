import { OwnedCourseCard } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { MarketHeader } from "@components/UI/Marketplace";

export default function OwnedCourses() {
  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
    </>
  );
}

OwnedCourses.Layout = BaseLayout;
