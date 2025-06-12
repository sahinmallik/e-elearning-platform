import React from "react";
import EnrollCourseList from "../_components/EnrollCourseList";
import WelcomeBanner from "../_components/WelcomeBanner";

const page = () => {
  return (
    <div>
      <WelcomeBanner />
      <h2 className="font-bold text-3xl mb-5 mt-5">My Learning</h2>
      <EnrollCourseList />
    </div>
  );
};

export default page;
