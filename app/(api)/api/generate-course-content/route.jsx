import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const prompt = `Depends on the Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:{
    chapterName:<>,
    {
        topicName:<>,
        content:<>
    }
}
    :User Input:
`;

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  const promises = courseJson?.chapters?.map(async (chapter) => {
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-2.0-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt + JSON.stringify(chapter),
          },
        ],
      },
    ];
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const RawResp = response?.candidates[0]?.content?.parts[0]?.text;

    const RawJson = RawResp?.replace(/```json/, "")
      ?.replace(/```/, "")
      ?.trim();

    let JSONresp;
    try {
      JSONresp = JSON.parse(RawJson);
    } catch (err) {
      console.error("Error:", err.message);
    }

    console.log("Response:", chapter?.chapterName);
    const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
    console.log("Youtube Data: ", {
      youtubeVideo: youtubeData,
      coourseData: JSONresp,
    });
    return {
      youtubeVideo: youtubeData,
      coourseData: JSONresp,
    };
  });

  const courseContent = await Promise.all(promises);

  //save to database

  const dbResp = await db
    .update(coursesTable)
    .set({
      courseContent: courseContent,
    })
    .where(eq(coursesTable.cid, courseId));

  return NextResponse.json({
    courseName: courseTitle,
    courseContent: courseContent,
  });
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const GetYoutubeVideo = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
    maxResults: 2,
  };

  const response = await axios.get(YOUTUBE_BASE_URL, { params });

  const youtubeVideoListResp = response.data.items;
  const youtubeVideoList = [];
  youtubeVideoListResp.forEach((item) => {
    const data = {
      title: item?.snippet?.title,
      videoId: item?.id?.videoId,
      thumbnail: item?.snippet?.thumbnails?.default?.url,
    };
    youtubeVideoList.push(data);
  });
  console.log("Youtube Video List: ", youtubeVideoList);
  return youtubeVideoList;
};
