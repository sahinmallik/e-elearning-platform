"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";

const EnrollCourseList = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getEnrolledCourses();
    }
  }, [user]);

  const getEnrolledCourses = async () => {
    try {
      const result = await axios.get("/api/enroll-course");
      setEnrolledCourses(result.data);
      console.log("Enrolled courses:", result.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  return (
    enrolledCourses?.length > 0 && (
      <div className="mt-10">
        <h2 className="font-bold text-xl">Continue Learning Your Courses</h2>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
          {enrolledCourses?.map((course, index) => (
            <EnrollCourseCard
              key={index}
              course={course.courses}
              enrolledCourse={course.enrolledCourse}
              index={index}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default EnrollCourseList;
