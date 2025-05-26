import { Button } from "@/components/ui/button";
import { Book, LoaderCircle, PlayCircle, Settings } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Progress } from "@/components/ui/progress";

const EnrollCourseCard = ({ course, index, enrolledCourse }) => {
  const courseJson = course?.courseJson?.course;

  const calculatePerProgress = () => {
    return (
      (enrolledCourse?.completedChapters?.length ??
        0 / course?.courseContent?.length) * 100
    );
  };

  return (
    <div className="shadow-md rounded-xl w-full">
      <Image
        src={course?.bannerImageUrl}
        alt={course?.name}
        width={400}
        height={300}
        className="w-full aspect-video rounded-t-xl object-cover"
      />
      <div className="p-3 flex flex-col gap-3 ">
        <h2 className="font-bold text-lg">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-gray-400 text-sm">
          {courseJson?.description}
        </p>

        <div>
          <h2 className="flex justify-between text-sm text-primary">
            Progress <span>{calculatePerProgress()}%</span>
          </h2>
          <Progress value={calculatePerProgress()} />
          <Link href={`/workspace/course/${course?.cid}`}>
            <Button className="w-full mt-3">
              <PlayCircle /> Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseCard;
