"use client";

import { Edit } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import EditCourse from "../../edit-course/[courseId]/page";

const Page = () => {
  return (
    <div>
      <EditCourse viewCourse={true} />
    </div>
  );
};

export default Page;
