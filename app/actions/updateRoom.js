"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function updateRoom(formData) {
  const cookie = await cookies();
  const sessionCookie = cookie.get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { account, databases } = await createSessionClient(sessionCookie.value);

    // Obtener el usuario autenticado
    const user = await account.get();
    const userId = user.$id;

    // Obtener los datos del formulario
    const roomId = formData.get("id");
    const name = formData.get("name");
    const description = formData.get("description");
    const sqft = formData.get("sqft");
    const capacity = formData.get("capacity");
    const price_per_hour = formData.get("price_per_hour");
    const address = formData.get("address");
    const location = formData.get("location");
    const availability = formData.get("availability");
    const amenities = formData.get("amenities");

    // Comprobar si el usuario es el dueño de la habitación
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomId
    );

    if (!room || room.user_id !== userId) {
      return { error: "Unauthorized: You don't own this room." };
    }

    // Actualizar la habitación
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomId,
      {
        name,
        description,
        sqft,
        capacity,
        price_per_hour,
        address,
        location,
        availability,
        amenities,
      }
    );


    revalidatePath("/rooms/my", "layout");
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Failed to update room", error);
    return { error: "Failed to update room" };
  }
}

export default updateRoom;
