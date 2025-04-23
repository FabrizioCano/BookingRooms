"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

async function getUserInfo() {
  const cookie = await cookies();
  const sessionCookie = cookie.get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { account} = await createSessionClient(
      sessionCookie.value
    );

    const user = await account.get();
    

    return user;
  } catch (error) {
    console.log("Failed to get user info", error);
    redirect("/error");
  }
}

export default getUserInfo;