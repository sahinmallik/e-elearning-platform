import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const AppHeader = ({ hideSidebar = false }) => {
  return (
    <div className="flex p-4 justify-between items-center shadow-sm ">
      {!hideSidebar && <SidebarTrigger />}
      <UserButton />
    </div>
  );
};

export default AppHeader;
