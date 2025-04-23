"use server";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

async function checkAuth() {
  const cookie = await cookies();
  const sessionCookie = cookie.get('appwrite-session');

  if (!sessionCookie) {
    return {
      isAuthenticated: false,

    };
  }

  try {
    const { account,databases } = await createSessionClient(sessionCookie.value);
    const user = await account.get();


    const { documents: userRoles } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER_ROLES,
      [
        Query.equal("user_id", user.$id),
      ]
    );
    const rolesObj = userRoles.map((doc) => doc.roles_id);
   
    const roles = rolesObj.flat().map(role => role.name);
   
    
    return {
      isAuthenticated: true,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email,
        roles:roles
      },
      
    };
  } catch (error) {
    return {
      isAuthenticated: false,
    };
  }
}

export default checkAuth;
