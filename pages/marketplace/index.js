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

  const purchaseCourse = async ({ email, price }) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);

    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: address }
    );

    const emailHash = web3.utils.sha3(email);

    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    const value = web3.utils.toWei(String(price));

    try {
      await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: address, value });
    } catch {
      console.error("Failed to purchase course.");
    }
  };

  return (
    <>
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!hasConnectedWallet}
            Footer={() => {
              if (requireInstall) {
                return (
                  <Button disabled={true} variant="lightPurple">
                    Install
                  </Button>
                );
              }

              if (isConnecting) {
                return (
                  <Button disabled={true} variant="lightPurple">
                    <Loader size="sm" />
                  </Button>
                );
              }

              if (!hasInitialResponse) {
                return <div style={{ height: "50px" }}></div>;
              }

              const owned = lookup[course.id];
              if (owned) {
                return (
                  <>
                    <Button disabled={true} variant="green">
                      Owned
                    </Button>
                    <div className="mt-1">
                      {owned.state === "activated" && (
                        <Message size="sm">Activated</Message>
                      )}
                      {owned.state === "deactivated" && (
                        <Message type="danger" size="sm">
                          Deactivated
                        </Message>
                      )}
                      {owned.state === "purchased" && (
                        <Message type="warning" size="sm">
                          Waiting for Activation
                        </Message>
                      )}
                    </div>
                  </>
                );
              }

              return (
                <Button
                  onClick={() => setSelectedCourse(course)}
                  disabled={!hasConnectedWallet}
                  variant="lightPurple"
                >
                  Purchase
                </Button>
              );
            }}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onSubmit={purchaseCourse}
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
