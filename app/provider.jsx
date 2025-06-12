"use client";

import React, { Children, useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

const Provider = ({ children }) => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState();
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  useEffect(() => {
    user && createNewUser();
  }, [user]);

  const createNewUser = async () => {
    const result = await axios.post("/api/user", {
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName,
    });
    setUserDetails(result.data);
  };

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <SelectedChapterIndexContext.Provider
        value={{ selectedChapterIndex, setSelectedChapterIndex }}
      >
        <div>{children}</div>
      </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Provider;
