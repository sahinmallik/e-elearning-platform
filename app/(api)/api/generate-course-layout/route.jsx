import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { Modality } from "@google/genai";
import axios from "axios";
import OpenAI from "openai";
const { has } = await auth();
const hasStarterAccess = has({ plan: "starter" });
import { NextResponse } from "next/server";
import { json } from "drizzle-orm/gel-core";
const PROMT = `Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description,Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include Ul/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name,, Topic under each chapters, Duration for each chapters etc, in JSON format only 

Schema:
{
    "course": {
        "name": "string",
        "description": "string",
        "category": "string",
        "level": "string",
        "includeVideo": "boolean",
        "noOfChapters": "number"
        "bannerlmagePrompt": "string",
        "chapters": [
            {
                "chapterName": "string",
                "duration": "string",
                "topics": [
                    "string"
                ],
                "imagePrompt": "string"
            }
        ]
    }
}       
, User Input:`;
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export async function POST(req) {
  const { courseId, ...formData } = await req.json();

  const user = await currentUser();

  const config = {
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: PROMT + JSON.stringify(formData),
        },
      ],
    },
  ];

  if (!hasStarterAccess) {
    const result = await db
      .select()
      .from(coursesTable)
      .where(
        coursesTable.userEmail.eq(user?.primaryEmailAddress?.emailAddress)
      );
    if (result.length >= 1) {
      return NextResponse.json(
        { error: "You have reached the maximum number of courses allowed." },
        { status: 403 }
      );
    }
  }

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  const RawResp = response?.candidates[0]?.content?.parts[0]?.text;
  const RawJson = RawResp.replace("```json", "").replace("```", "");
  const courseJson = JSON.parse(RawJson);
  const bannerImagePromt = courseJson?.course?.bannerImagePrompt;
  console.log(bannerImagePromt);
  const bannerImageUrl = await generateImage(bannerImagePromt);
  console.log("Response:", RawJson);
  const result = await db.insert(coursesTable).values({
    name: formData.courseName,
    description: formData.description,
    noOfChapters: formData.noOfChapter,
    includeVideo: formData.includeVideo,
    level: formData.level,
    category: formData.category,
    courseJson: courseJson,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid: courseId,
    bannerImageUrl: bannerImageUrl,
  });

  return NextResponse.json({ courseId: courseId });
}

const generateImage = async (prompt) => {
  const BASE_URL = "https://aigurulab.tech";
  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: prompt,
      model: "flux", //'flux'
      aspectRatio: "16:9", //Applicable to Flux model only
    },
    {
      headers: {
        "x-api-key": process.env.IMAGE_API_KEY, // Your API Key
        "Content-Type": "application/json", // Content Type
      },
    }
  );
  return result.data.image; //Output Result: Base 64 Image
};
