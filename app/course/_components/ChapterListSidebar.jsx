import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

const ChapterListSidebar = ({ enrolledCourses }) => {
  const course = enrolledCourses?.courses;
  const enrollCourse = enrolledCourses?.enrollCourse;
  const courseContent = enrolledCourses?.courses?.courseContent;
  const completedChapters =
    enrolledCourses?.enrollCourse?.completedChapters ?? [];
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );

  return (
    <div className=" p-5 w-80 bg-secondary h-screen flex-shrink-0">
      <h2 className="my-3 font-bold text-xl">
        Chapters ({courseContent?.length})
      </h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => (
          <AccordionItem
            value={chapter?.coourseData?.chapterName}
            key={index}
            onClick={() => {
              setSelectedChapterIndex(index);
            }}
          >
            <AccordionTrigger
              className={`font-medium px-5 ${
                completedChapters.includes(index)
                  ? "bg-green-100 text-green-800"
                  : ""
              }`}
            >
              {index + 1}. {chapter?.coourseData?.chapterName}
            </AccordionTrigger>
            <AccordionContent asChild>
              <div>
                {chapter?.coourseData?.topics.map((topic, index_) => {
                  return (
                    <h2
                      key={index_}
                      className={`p-3 my-1 rounded-lg ${
                        completedChapters.includes(index)
                          ? "bg-green-100 text-green-800"
                          : "bg-white"
                      }`}
                    >
                      {topic?.topicName}
                    </h2>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ChapterListSidebar;
