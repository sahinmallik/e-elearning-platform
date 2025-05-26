"use client";

import React, { Children, useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

const Provider = ({ children }) => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    user && createNewUser();
  }, [user]);

  const createNewUser = async () => {
    const result = await axios.post("/api/user", {
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName,
    });
    setUserDetails(result.data);
    console.log(result.data);
  };

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;
