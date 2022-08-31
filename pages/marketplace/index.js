import { CourseCard, CourseList } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { getAllCourses } from "@content/courses/fetcher";
import { EthRates, WalletBar } from "@components/UI/Web3";
import { useEthPrice, useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/UI/Common";
import { OrderModal } from "@components/UI/Order";
import { useState } from "react";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const {
    account: { data: address },
    network,
    canPurchaseCourse,
  } = useWalletInfo();
  const {
    eth: { data: ethPrice, perItem: ethPerItem },
  } = useEthPrice();

  return (
    <>
      <div className="py-4">
        <WalletBar address={address} network={network} />
        <EthRates eth={ethPrice} ethPerItem={ethPerItem} />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={() => (
              <div className="mt-4">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchaseCourse}
                  variant="lightPurple"
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
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
