"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Source_Sans_3 } from "next/font/google";
async function deleteRoom(roomId) {
  const cookie = await cookies();
  const sessionCookie = cookie.get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value
    );

    // Get user's ID
    const user = await account.get();
    const userId = user.$id;

    // Fetch users rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal("user_id", userId)]
    );

    //find room to delete
    const roomToDelete=rooms.find((room)=>room.$id===roomId);

    if(roomToDelete){
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            roomToDelete.$id
        );
        
        revalidatePath('/rooms/my','layout');
        revalidatePath('/','layout');

        return {
            success:true,
        }
    }
    else{
        return {
            error:'Room not found',
        }
    }
  } catch (error) {
    console.log("Failed to delete room", error);
    return {
        error:'Failed to delete room'
    }
  }
}

export default deleteRoom;
