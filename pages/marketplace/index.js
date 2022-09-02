import { CourseCard, CourseList } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useOwnedCourses, useWalletInfo } from "@components/hooks/web3";
import { Button, Loader, Message } from "@components/UI/Common";
import { OrderModal } from "@components/UI/Order";
import { useState } from "react";
import { MarketHeader } from "@components/UI/Marketplace";
import { useWeb3 } from "@components/Providers";

export default function Marketplace({ courses }) {
  const { web3, contract, requireInstall } = useWeb3();
  const {
    hasConnectedWallet,
    isConnecting,
    account: { data: address },
  } = useWalletInfo();
  const {
    ownedCourses: { hasInitialResponse, lookup },
  } = useOwnedCourses(courses, address);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);

  const purchaseCourse = async ({ email, price }) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);

    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: address }
    );

    const value = web3.utils.toWei(String(price));

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      );

      _purchaseCourse(hexCourseId, proof, value);
    } else {
      _repurchaseCourse(orderHash, value);
    }
  };

  const _purchaseCourse = async (hexCourseId, proof, value) => {
    try {
      await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: address, value });
    } catch {
      console.error("Failed to purchase course.");
    }
  };

  const _repurchaseCourse = async (courseHash, value) => {
    try {
      await contract.methods
        .repurchaseCourse(courseHash)
        .send({ from: address, value });
    } catch {
      console.error("Failed to purchase course.");
    }
  };

  return (
    <>
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => {
          const owned = lookup[course.id];
          return (
            <CourseCard
              key={course.id}
              course={course}
              disabled={!hasConnectedWallet}
              state={owned?.state}
              Footer={() => {
                if (requireInstall) {
                  return (
                    <Button size="sm" disabled={true} variant="lightPurple">
                      Install
                    </Button>
                  );
                }

                if (isConnecting) {
                  return (
                    <Button size="sm" disabled={true} variant="lightPurple">
                      <Loader size="sm" />
                    </Button>
                  );
                }

                if (!hasInitialResponse) {
                  return <div style={{ height: "42px" }}></div>;
                }
                if (owned) {
                  return (
                    <>
                      <div className="flex">
                        <Button
                          size="sm"
                          onClick={() => alert("You are owner of this course.")}
                          disabled={false}
                          variant="white"
                        >
                          Yours &#10004;
                        </Button>
                        {owned.state === "deactivated" && (
                          <div className="ml-1">
                            <Button
                              size="sm"
                              disabled={false}
                              onClick={() => {
                                setIsNewPurchase(false);
                                setSelectedCourse(course);
                              }}
                              variant="purple"
                            >
                              Fund to Activate
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                }

                return (
                  <Button
                    size="sm"
                    onClick={() => setSelectedCourse(course)}
                    disabled={!hasConnectedWallet}
                    variant="lightPurple"
                  >
                    Purchase
                  </Button>
                );
              }}
            />
          );
        }}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onSubmit={purchaseCourse}
          isNewPurchase={isNewPurchase}
          onClose={() => {
            setSelectedCourse(null);
            setIsNewPurchase(true);
          }}
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
