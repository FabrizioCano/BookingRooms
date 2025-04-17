"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { redirect } from "next/navigation";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

async function bookRoom(previousState, formData) {
  const cookie = await cookies();
  const sessionCookie = cookie.get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    // Get user's ID
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "Must be logged in to book a room",
      };
    }

    //take the date and time from the form data
    const checkInDate = formData.get("check_in_date");
    const checkInTime = formData.get("check_in_time");
    const checkOutDate = formData.get("check_out_date");
    const checkOutTime = formData.get("check_out_time");

    //combine date and time to a format
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

    const bookingData = {
      user_id: user.id,
      room_id: formData.get("room_id"),
      check_in: checkInDateTime,
      check_out: checkOutDateTime,
    };

    // Create a new booking in the database
    const newBooking = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS,
      ID.unique(),
      bookingData
    );

    revalidatePath("/bookings", "layout");

    return {
        success:true,
    }
  } catch (error) {
    console.log("Failed to book room", error);
    return {
      error: "Something went wrong with the booking of the room",
    };
  }
}

export default bookRoom;
