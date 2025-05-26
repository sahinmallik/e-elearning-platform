"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewCourseDiaglog from "./AddNewCourseDiaglog";
import { BookPlus } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    if (user) {
      getAllCoursesList();
    }
    setLoading(false);
  }, [user]);

  const getAllCoursesList = async () => {
    try {
      const result = await axios.get("/api/courses");
      setCourseList(result.data);
      console.log("Courses fetched:", result.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl">Course List</h2>

      {courseList.length === 0 ? (
        <div className="flex flex-col p-7 justify-center items-center border rounded-xl mt-2 bg-secondary">
          <Image
            src={"/online-education.png"}
            alt="edu"
            width={80}
            height={80}
          />
          <h2 className="my-2 text-xl font-bold">
            You are not enrolled in any courses
          </h2>

          <AddNewCourseDiaglog>
            <Button className="w-full">
              <BookPlus />
              Create your first Course
            </Button>
          </AddNewCourseDiaglog>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
          {courseList?.map((course, index) => {
            return <CourseCard course={course} index={index} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CourseList;
