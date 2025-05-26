"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Book,
  BookPlus,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCircle2Icon,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import AddNewCourseDiaglog from "./AddNewCourseDiaglog";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "My Learning",
    icon: Book,
    path: "/workspace/my-courses",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/workspace/explore",
  },
  {
    title: "AI Tools",
    icon: PencilRulerIcon,
    path: "/workspace/ai-tools",
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/billing",
  },
  {
    title: "Profile",
    icon: UserCircle2Icon,
    path: "/workspace/profile",
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Image src="/logo.svg" alt="logo" width={130} height={120} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDiaglog>
            <Button className="w-full">
              <BookPlus />
              Create New Course
            </Button>
          </AddNewCourseDiaglog>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="p-5">
                    <Link
                      href={item.path}
                      className={`text-[17px] ${
                        pathname == item.path && "text-blue-500 bg-blue-50"
                      }`}
                    >
                      <item.icon className="h-7 w-7" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
