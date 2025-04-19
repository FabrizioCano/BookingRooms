"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";



function toUTCDateTime(dateString){
  return DateTime.fromISO(dateString, { zone: 'utc' }).toUTC();
}

function dateOverlaps(checkIn, checkOut, bookingCheckIn, bookingCheckOut) {
  return (checkIn < bookingCheckOut && checkOut > bookingCheckIn);
}

async function checkRoomAvailability(roomId,checkIn,checkOut) {
  const cookie = await cookies();
  const sessionCookie = cookie.get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const {databases } = await createSessionClient(
      sessionCookie.value
    );

    const checkInDateTime=toUTCDateTime(checkIn);
    const checkOutDateTime=toUTCDateTime(checkOut);

    //fetch all bookings for the room

  
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS,
      [Query.equal("room_id", roomId)]
    );

    //check if the room is available for the given dates
    for(const booking of bookings){
      const bookingCheckIn=toUTCDateTime(booking.check_in);
      const bookingCheckOut=toUTCDateTime(booking.check_out);

      if(dateOverlaps(checkInDateTime,checkOutDateTime,bookingCheckIn,bookingCheckOut)){
        return false; //cant book the room, it is already booked for the given date and time
      }
    }
    //can book the room, it is available for the given date and time
    return true;

  } catch (error) {
    console.log("Failed to check room's availability", error);
    return {
      error:"Failed to check room's availability",
    }
  }
}

export default checkRoomAvailability;
