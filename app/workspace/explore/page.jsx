"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
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
      const result = await axios.get("/api/courses?courseId=all");
      setCourseList(result.data);
      console.log("Courses fetched:", result.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setLoading(false);
    }
  };
  return (
    <div>
      <h2 className="font-bold text-3xl mb-6">Explore More Courses</h2>
      <div className="flex gap-5 max-w-md">
        <Input placeholder="Search" />
        <Button>
          <Search /> Search
        </Button>
      </div>
      {courseList.length > 0 ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
          {courseList?.map((course, index) => {
            return <CourseCard course={course} index={index} key={index} />;
          })}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
          {[0, 1, 2, 3]?.map((item, index) => {
            return <Skeleton key={index} className="w-full h-[240px]" />;
          })}
        </div>
      )}
    </div>
  );
};

export default page;
