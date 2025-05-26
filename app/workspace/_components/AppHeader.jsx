import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const AppHeader = () => {
  return (
    <div className="flex p-4 justify-between items-center shadow-sm ">
      <SidebarTrigger />
      <UserButton />
    </div>
  );
};

export default AppHeader;
