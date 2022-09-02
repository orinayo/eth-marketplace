import { useAccount, useManageCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/Providers";
import { Button } from "@components/UI/Common";
import { CourseFilter, ManageCourseCard } from "@components/UI/Course";
import { BaseLayout } from "@components/UI/Layout";
import { MarketHeader } from "@components/UI/Marketplace";
import { useState } from "react";

export default function ManageCourses() {
  const [email, setEmail] = useState("");
  const [proofedOwnership, setProofedOwnership] = useState({});
  const { web3 } = useWeb3();
  const {
    account: { data: address },
  } = useAccount();
  const {
    managedCourses: { data = [] },
  } = useManageCourses(address);

  const verifyCourse = (email, { hash, proof }) => {
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: hash }
    );

    proofToCheck === proof
      ? setProofedOwnership({
          [hash]: true,
        })
      : setProofedOwnership({
          [hash]: false,
        });
  };
  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {data.map((course) => (
          <ManageCourseCard key={course.ownedCourseId} course={course}>
            <div className="flex mr-2 relative rounded-md">
              <input
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                type="text"
                name="account"
                id="account"
                className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                placeholder="0x2341ab..."
              />
              <Button
                onClick={() => {
                  verifyCourse(email, {
                    hash: course.hash,
                    proof: course.proof,
                  });
                }}
              >
                Verify
              </Button>
            </div>
            {proofedOwnership[course.hash] && (
              <div className="mt-2">
                <Message>Verified!</Message>
              </div>
            )}
            {proofedOwnership[course.hash] === false && (
              <div className="mt-2">
                <Message type="danger">Wrong Proof!</Message>
              </div>
            )}
          </ManageCourseCard>
        ))}
      </section>
    </>
  );
}

ManageCourses.Layout = BaseLayout;
