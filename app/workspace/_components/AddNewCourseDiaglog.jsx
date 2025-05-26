import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2Icon, Sparkle } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
const AddNewCourseDiaglog = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    noOfChapter: 1,
    includeVideo: false,
    level: "",
    category: "",
  });

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log("Form Data", formData);
  };

  const onGenerate = async () => {
    // Call the API to generate the course
    // Pass the formData to the API
    const courseId = uuidv4();
    console.log("Generating Course with data: ", formData, courseId);
    try {
      setLoading(true);
      const result = await axios.post("/api/generate-course-layout", {
        ...formData,
        courseId: courseId,
      });
      setLoading(false);
      router.push(`/workspace/edit-course/${result.data?.courseId}`);
    } catch (error) {
      setLoading(false);
      console.error("Error generating course: ", error);
      alert("Failed to generate course. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label>Course Name</label>
                <Input
                  placeholder="Enter Course Name"
                  onChange={(e) => {
                    onHandleInputChange("courseName", e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Course Description (optional)</label>
                <Textarea
                  placeholder=" Enter Course Description"
                  onChange={(e) => {
                    onHandleInputChange("description", e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Number of Chapter</label>
                <Input
                  placeholder="Enter Number of Chapter"
                  type="number"
                  onChange={(e) => {
                    onHandleInputChange("noOfChapter", e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch
                  onCheckedChange={() =>
                    onHandleInputChange("includeVideo", !formData?.includeVideo)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Difficulty Level</label>
                <Select
                  onValueChange={(value) => {
                    onHandleInputChange("level", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Dificulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label>Category</label>
                <Input
                  placeholder="Enter Category (Spearated by Comma)"
                  onChange={(e) => {
                    onHandleInputChange("category", e.target.value);
                  }}
                />
              </div>
              <div className="mt-5 w-full">
                <Button
                  className="w-full"
                  onClick={onGenerate}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <Sparkle />
                  )}
                  Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourseDiaglog;
