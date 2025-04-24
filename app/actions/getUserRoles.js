"use server";

import { createAdminClient } from "@/config/appwrite";
import { redirect } from "next/navigation";

async function getUserRoles() {
  try {
    const { databases, users } = await createAdminClient();

    // Step 1: Get user-role documents
    const { documents: userRoles } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER_ROLES
    );

    // Step 2: Group roles by user_id
    const grouped = {};
    userRoles.forEach((doc) => {
      const userId = doc.user_id;
      if (!grouped[userId]) {
        grouped[userId] = {
          user_id: userId,
          roles: [],
        };
      }

      doc.roles_id.forEach((role) => {
        grouped[userId].roles.push(role.name);
      });
    });

    
    const allUsers = await users.list(); 

    const userMap = {};
    allUsers.users.forEach((user) => {
      userMap[user.$id] = user;
    });

    // Step 4: Attach full user data to roles
    const result = Object.values(grouped).map(({ user_id, roles }) => ({
      user: userMap[user_id] || null,
      roles,
    }));

    return result;
  } catch (error) {
    console.error("Failed to get user roles", error);
    redirect("/error");
  }
}

export default getUserRoles;
