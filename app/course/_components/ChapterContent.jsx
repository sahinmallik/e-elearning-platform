import { Button } from "@/components/ui/button";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import axios from "axios";
import { CheckCircle, Cross, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext } from "react";
import YouTube from "react-youtube";
import { toast } from "sonner";

const ChapterContent = ({ enrolledCourses, refreshData }) => {
  const { courseId } = useParams();

  const { courses, enrollCourse } = enrolledCourses;
  const courseContent = enrolledCourses?.courses?.courseContent;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );

  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const topics = courseContent?.[selectedChapterIndex]?.coourseData?.topics;
  console.log(topics);

  let completedChapters =
    enrolledCourses?.enrollCourse?.completedChapters ?? [];
  const markChapterCompleted = async () => {
    // Only add if not already completed
    if (!completedChapters.includes(selectedChapterIndex)) {
      completedChapters.push(selectedChapterIndex);

      await axios.put("/api/enroll-course", {
        courseId: courseId,
        completedChapter: completedChapters,
      });

      refreshData();
      toast.success("Chapter marked as completed!");
    } else {
      toast.info("Chapter already marked as completed.");
    }
  };
  const markChapterIncompleted = async () => {
    const completedChap = completedChapters.filter(
      (item) => item !== selectedChapterIndex
    );
    await axios.put("/api/enroll-course", {
      courseId: courseId,
      completedChapter: completedChap,
    });

    refreshData();
    toast.success("Chapter marked as Incompleted!");
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">
          {selectedChapterIndex + 1}.{" "}
          {courseContent?.[selectedChapterIndex]?.coourseData?.chapterName}
        </h2>
        {!completedChapters.includes(selectedChapterIndex) ? (
          <Button onClick={() => markChapterCompleted()}>
            <CheckCircle />
            Mark as Completed
          </Button>
        ) : (
          <Button variant="outline" onClick={() => markChapterIncompleted()}>
            <X />
            Mark as Incomplete
          </Button>
        )}
      </div>

      <h2 className="my-2 font-bold text-lg ">Related Videos 🎬</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videoData?.map((video, index) => (
          <div key={index}>
            <YouTube
              videoId={video?.videoId}
              opts={{
                height: "260",
                width: "460",
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-7">
        {topics?.map((topic, index) => (
          <div
            className={`mt-10 p-5 rounded-2xl ${
              completedChapters.includes(selectedChapterIndex)
                ? "bg-green-100"
                : "bg-secondary"
            }`}
            key={index}
          >
            <h2 className="font-bold text-2xl text-primary">
              {index + 1}. {topic?.topicName}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: topic?.content }}
              style={{ lineHeight: "2.5" }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
