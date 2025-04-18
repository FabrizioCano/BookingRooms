'use client';
import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import bookRoom from "@/app/actions/bookRoom";

const BookingForm = ({room}) => {

  const [state, formAction] = useActionState(bookRoom, {});

  const router = useRouter();

  useEffect(() => {
    if(state.error){
      toast.error(state.error);
    }
    if(state.success){
      toast.success('Room Booked successfully');
      router.push('/bookings');
    }
  }, [state]);

  return ( 
      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-lg"> 
          <h2 className="text-xl font-bold text-center">Book this Room</h2>
          <form action={formAction} className="mt-4">
            <input type="hidden" name="room_id" value={room.$id}></input>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="check_in_date" className="block text-sm font-medium text-main">
                  Check-In Date
                </label>
                <input type="date" id="check_in_date" name="check_in_date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="check_in_time" className="block text-sm font-medium text-main">
                  Check-In Time
                </label>
                <input type="time" id="check_in_time" name="check_in_time" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="check_out_date" className="block text-sm font-medium text-main">
                  Check-Out Date
                </label>
                <input type="date" id="check_out_date" name="check_out_date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="check_out_time" className="block text-sm font-medium text-main">
                  Check-Out Time
                </label>
                <input type="time" id="check_out_time" name="check_out_time" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button type="submit" className="px-4 py-2 text-sm font-medium text-primary bg-primary-dark hover:bg-text-link-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded-md w-40">
                Book Room
              </button>
            </div>
          </form>
        </div>
      </div>
   );
}

export default BookingForm;
