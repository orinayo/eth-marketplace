import courses from "./index.json";

export const getAllCourses = () => {
  return {
    data: courses,
    courseMap: courses.reduce((acc, curr, index) => {
      return {
        ...acc,
        [curr.id]: {
          ...curr,
          index,
        },
      };
    }, {}),
  };
};
