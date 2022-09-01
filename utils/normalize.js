export const COURSE_STATES = {
  0: "purchased",
  1: "activated",
  2: "deactivated",
};

export const normalizeOwnedCourse =
  (web3) =>
  (course, { id: ownedCourseId, proof, owner: owned, price, state }) => {
    return {
      ...course,
      ownedCourseId,
      proof,
      owned,
      price: web3.utils.fromWei(price),
      state: COURSE_STATES[state],
    };
  };
