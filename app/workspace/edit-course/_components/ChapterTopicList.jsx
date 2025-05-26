import { Gift } from "lucide-react";
import React from "react";

const ChapterTopicList = ({ courses }) => {
  const courseLayout = courses?.courseJson?.course;

  return (
    <div>
      <h2 className="font-bold text-3xl mt-10">Chapters & Topics</h2>
      <div className="flex flex-col items-center justify-center mt-10">
        {courseLayout?.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="flex flex-col items-center mb-16">
            {/* Chapter Header */}
            <div className="p-4 border shadow rounded-xl bg-primary text-white">
              <h2 className="text-center text-lg">
                Chapter {chapterIndex + 1}
              </h2>
              <h2 className="text-center font-bold text-2xl mb-4">
                {chapter.chapterName}
              </h2>
              <div className="text-xs flex justify-between gap-8">
                <span>Duration: {chapter?.duration}</span>
                <span>No. Of Topics: {chapter?.topics?.length}</span>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="relative flex flex-col items-center pt-8 w-full">
              {/* Continuous vertical line - now fully dynamic */}
              <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-gray-300 top-0 bottom-0"></div>

              {chapter?.topics.map((topic, topicIndex) => (
                <div
                  className="relative flex flex-col items-center mb-8"
                  key={topicIndex}
                >
                  <div className="flex items-center gap-5 w-full max-w-4xl">
                    {/* Left side content */}
                    <div className="flex-1 flex justify-end pr-5">
                      <span
                        className={`${
                          topicIndex % 2 === 0
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                        } max-w-xs text-right rounded-lg p-4 font-medium text-gray-800 `}
                      >
                        {topic}
                      </span>
                    </div>

                    {/* Center circle with number - positioned over the line */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-400 text-white font-semibold text-lg">
                        {topicIndex + 1}
                      </div>
                    </div>

                    {/* Right side content */}
                    <div className="flex-1 flex justify-start pl-5">
                      <span
                        className={`${
                          topicIndex % 2 === 1
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                        } max-w-xs text-left rounded-lg p-4 font-medium text-gray-800`}
                      >
                        {topic}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Gift icon at the end of each chapter */}
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterTopicList;
