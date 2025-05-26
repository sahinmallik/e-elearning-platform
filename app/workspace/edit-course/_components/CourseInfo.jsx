import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Book,
  Clock,
  Loader2Icon,
  Settings,
  Sparkle,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const CourseInfo = ({ courses }) => {
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
      console.log(result.data);
      setLoading(false);
      router.replace("/workspace");
      toast.success("Course content generated successfully!");
    } catch (error) {
      console.error("Error generating course content:", error);
      setLoading(false);
      toast.error("Failed to generate course content. Please try again later.");
    }
  };

  return (
    <div className=" lg:flex gap-5 justify-between p-5 rounded-2xl shadow">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-3xl">{courseLayout?.name}</h2>
        <p className="line-clamp-2 text-gray-500">
          {courseLayout?.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex gap-2 items-center p-3 rounded-lg shadow">
            <Clock className="text-blue-500" />
            <section>
              <h2 className="font-bold">Duration</h2>
              <h2>2 Hours</h2>
            </section>
          </div>
          <div className="flex gap-2 items-center p-3 rounded-lg shadow">
            <Book className="text-green-500" />
            <section>
              <h2 className="font-bold">Chapters</h2>
              <h2>{courses?.noOfChapters}</h2>
            </section>
          </div>
          <div className="flex gap-2 items-center p-3 rounded-lg shadow">
            <TrendingUp className="text-red-500" />
            <section>
              <h2 className="font-bold">Difficulty</h2>
              <h2>{courses?.level}</h2>
            </section>
          </div>
        </div>
        <Button
          className="max-w-sm"
          onClick={generateCourseContent}
          disabled={loading}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <Settings />}{" "}
          Generate Content
        </Button>
      </div>
      <Image
        src={courses?.bannerImageUrl}
        alt="Banner Image"
        width={400}
        height={400}
        className="w-full mt-5 lg:mt-0 h-[240px] rounded-2xl object-cover aspect-auto"
      />
    </div>
  );
};

export default CourseInfo;
