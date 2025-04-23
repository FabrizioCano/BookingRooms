"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { redirect } from "next/navigation";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";
import checkRoomAvailability from "./checkRoomAvailability";
async function bookRoom(previousState, formData) {
  const cookie = await cookies();
  const sessionCookie = cookie.get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    const roomId=formData.get("room_id");
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

    // check-in date must be today or any other future date
    const now = new Date();
    const checkInDateObj = new Date(checkInDateTime);
    const checkOutDateObj = new Date(checkOutDateTime);
    if (checkInDateObj < now) {
      return {
        error: "Check-in date cannot be in the past.",
      };
    }
    //check-out date must be after check-in date
    if (checkOutDateObj <= checkInDateObj) {
      return {
        error: "Check-out date must be after check-in date.",
      };
    }
    //check if the room is available for the given dates
    const isAvailable = await checkRoomAvailability(
      roomId,
      checkInDateTime,
      checkOutDateTime
    );

    if (!isAvailable) {
      return {
        error: "Room is not available for the selected date and time",
      }
    }

    const bookingData = {
      user_id: user.id,
      room_id: roomId,
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
