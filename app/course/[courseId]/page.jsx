"use client";

import AppHeader from "@/app/workspace/_components/AppHeader";
import React, { useEffect, useState } from "react";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import ChapterContent from "../_components/ChapterContent";
import { useParams } from "next/navigation";
import axios from "axios";

const page = () => {
  const { courseId } = useParams();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getEnrolledCoursesById();
    setLoading(false);
  }, []);

  const getEnrolledCoursesById = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/api/enroll-course?courseId=" + courseId);
      setEnrolledCourses(result.data);
      setLoading(false);
      //   console.log("Enrolled courses:", result.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className="flex gap-10">
        <ChapterListSidebar enrolledCourses={enrolledCourses} />
        <ChapterContent
          enrolledCourses={enrolledCourses}
          refreshData={() => getEnrolledCoursesById()}
        />
      </div>
    </div>
  );
};

export default page;
