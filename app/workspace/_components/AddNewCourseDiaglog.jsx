"use client";

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
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePathname, useRouter } from "next/navigation";

const AddNewCourseDialog = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // controls Dialog open/close
  const router = useRouter();
  const pathname = usePathname();

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
  };

  const onGenerate = async () => {
    const courseId = uuidv4();
    try {
      setLoading(true);
      const result = await axios.post("/api/generate-course-layout", {
        ...formData,
        courseId,
      });
      if (
        result.data.error ==
        "You have reached the maximum number of courses allowed."
      ) {
        toast.warning(
          "You have reached the maximum number of courses allowed. Please upgrade your plan to create more courses."
        );
        router.push("/workspace/billing");
        setLoading(false);
        return;
      }
      setLoading(false);
      router.push(`/workspace/edit-course/${result.data?.courseId}`);
    } catch (error) {
      setLoading(false);
      console.error("Error generating course: ", error);
      alert("Failed to generate course. Please try again.");
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label>Course Name</label>
                <Input
                  placeholder="Enter Course Name"
                  onChange={(e) =>
                    onHandleInputChange("courseName", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Course Description (optional)</label>
                <Textarea
                  placeholder="Enter Course Description"
                  onChange={(e) =>
                    onHandleInputChange("description", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Number of Chapters</label>
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter Number of Chapters"
                  onChange={(e) =>
                    onHandleInputChange("noOfChapter", e.target.value)
                  }
                />
              </div>
              <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch
                  checked={formData.includeVideo}
                  onCheckedChange={(checked) =>
                    onHandleInputChange("includeVideo", checked)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Difficulty Level</label>
                <Select
                  onValueChange={(value) => onHandleInputChange("level", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Difficulty Level" />
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
                  placeholder="Enter Category (separated by comma)"
                  onChange={(e) =>
                    onHandleInputChange("category", e.target.value)
                  }
                />
              </div>
              <div className="mt-5 w-full">
                <Button
                  className="w-full"
                  onClick={onGenerate}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin mr-2" />
                  ) : (
                    <Sparkle className="mr-2" />
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

export default AddNewCourseDialog;
