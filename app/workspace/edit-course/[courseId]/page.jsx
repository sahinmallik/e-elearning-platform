"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseInfo from "../_components/CourseInfo";
import ChapterTopicList from "../_components/ChapterTopicList";

const EditCourse = ({ viewCourse = false }) => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    if (courseId) {
      getCourseDetails();
    } else {
      console.error("No courseId provided in the URL");
    }
  }, []);

  const getCourseDetails = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/api/courses?courseId=${courseId}`);
      setCourses(result.data);
      setLoading(false);
      console.log("Course Details: ", result.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching course details:", error);
    }
  };

  return (
    <div>
      <CourseInfo courses={courses} viewCourse={viewCourse} />
      <ChapterTopicList courses={courses} />
    </div>
  );
};

export default EditCourse;
