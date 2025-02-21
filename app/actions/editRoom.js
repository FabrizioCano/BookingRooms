"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function editRoom(roomId, updateData) {
  const cookie = await cookies();
  const sessionCookie = cookie.get("appwrite-session");

  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value
    );


    const user = await account.get();
    const userId = user.$id;


    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal("user_id", userId)]
    );


    const roomToEdit = rooms.find((room) => room.$id === roomId);

    if (!roomToEdit) {
      return {
        error: "Room not found",
      };
    }


    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomToEdit.$id,
      updateData
    );


    revalidatePath("/rooms/my", "layout");
    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to edit room", error);
    return {
      error: "Failed to edit room",
    };
  }
}

export default editRoom;
