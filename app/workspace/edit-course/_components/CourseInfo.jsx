"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Book,
  Clock,
  Loader2Icon,
  PlayCircleIcon,
  Settings,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const CourseInfo = ({ courses, viewCourse }) => {
  const courseLayout = courses?.courseJson?.course;
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const generateCourseContent = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-course-content", {
        courseJson: courseLayout,
        courseTitle: courses?.name,
        courseId: courses?.cid,
      });
      setLoading(false);
      toast.success("Course content generated successfully!");
      router.replace("/workspace");
    } catch (error) {
      console.error("Error generating course content:", error);
      setLoading(false);
      toast.error("Failed to generate course content. Please try again later.");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 p-5 bg-white rounded-2xl shadow-md">
      {/* Text Content */}
      <div className="flex flex-col gap-4 justify-between">
        <div>
          <h2 className="font-bold text-3xl">{courseLayout?.name}</h2>
          <p className="text-gray-600 mt-2 line-clamp-2">
            {courseLayout?.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
              <Clock className="text-blue-500" />
              <div>
                <p className="font-semibold">Duration</p>
                <p>2 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
              <Book className="text-green-500" />
              <div>
                <p className="font-semibold">Chapters</p>
                <p>{courses?.noOfChapters}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
              <TrendingUp className="text-red-500" />
              <div>
                <p className="font-semibold">Difficulty</p>
                <p>{courses?.level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-4 max-w-sm">
          {viewCourse ? (
            <Link href={`/course/${courses?.cid}`}>
              <Button className="w-full">
                <PlayCircleIcon className="mr-2" />
                Continue Learning
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full"
              onClick={generateCourseContent}
              disabled={loading}
            >
              {loading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                <Settings className="mr-2" />
              )}
              Generate Content
            </Button>
          )}
        </div>
      </div>

      {/* Banner Image */}
      <div className="flex items-center justify-center lg:justify-end">
        <Image
          src={courses?.bannerImageUrl}
          alt="Banner"
          width={400}
          height={240}
          className="rounded-2xl w-full h-[240px] object-cover"
        />
      </div>
    </div>
  );
};

export default CourseInfo;
