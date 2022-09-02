import { CourseCard, CourseList } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useOwnedCourses, useWalletInfo } from "@components/hooks/web3";
import { Button, Loader } from "@components/UI/Common";
import { OrderModal } from "@components/UI/Order";
import { useState } from "react";
import { MarketHeader } from "@components/UI/Marketplace";
import { useWeb3 } from "@components/Providers";
import { withToast } from "utils/toast";

export default function Marketplace({ courses }) {
  const { web3, contract, requireInstall } = useWeb3();
  const {
    hasConnectedWallet,
    isConnecting,
    account: { data: address },
  } = useWalletInfo();
  const {
    ownedCourses: { hasInitialResponse, lookup, mutate, data },
  } = useOwnedCourses(courses, address);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [busyCourseId, setBusyCourseId] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);

  const purchaseCourse = async ({ email, price }, course) => {
    const hexCourseId = web3.utils.utf8ToHex(course.id);

    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: address }
    );

    const value = web3.utils.toWei(String(price));

    setBusyCourseId(course.id);
    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(email);
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      );

      withToast(_purchaseCourse({ hexCourseId, proof, value }, course));
    } else {
      withToast(_repurchaseCourse({ courseHash: orderHash, value }, course));
    }
  };

  const _purchaseCourse = async ({ hexCourseId, proof, value }, course) => {
    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: address, value });

      mutate([
        ...data,
        {
          ...course,
          proof,
          state: "purchased",
          owner: address,
          price: value,
        },
      ]);
      return result;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setBusyCourseId(null);
    }
  };

  const _repurchaseCourse = async ({ courseHash, value }, course) => {
    try {
      const result = await contract.methods
        .repurchaseCourse(courseHash)
        .send({ from: address, value });

      const index = data.findIndex((c) => c.id === course.id);

      if (index >= 0) {
        data[index].state = "purchased";
        mutate(data);
      } else {
        mutate();
      }
      return result;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setBusyCourseId(null);
    }
  };

  const cleanupModal = () => {
    setSelectedCourse(null);
    setIsNewPurchase(true);
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
                  return (
                    <Button variant="white" disabled={true} size="sm">
                      {hasConnectedWallet ? "Loading State..." : "Connect"}
                    </Button>
                  );
                }

                const isBusy = busyCourseId === course.id;
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
                              disabled={isBusy}
                              onClick={() => {
                                setIsNewPurchase(false);
                                setSelectedCourse(course);
                              }}
                              variant="purple"
                            >
                              {isBusy ? (
                                <div className="flex">
                                  <Loader size="sm" />
                                  <div className="ml-2">In Progress</div>
                                </div>
                              ) : (
                                <div>Fund to Activate</div>
                              )}
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
                    disabled={!hasConnectedWallet || isBusy}
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
          isNewPurchase={isNewPurchase}
          onSubmit={(formData, course) => {
            purchaseCourse(formData, course);
            cleanupModal();
          }}
          onClose={cleanupModal}
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
