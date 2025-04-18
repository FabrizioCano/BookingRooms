import Link from "next/link";
import CancelBookingButton from "./CancelBookingButton";
const BookedRoomCard = ({booking}) => {

    const {room_id:room}=booking;

    const formatDate=(dateString)=>{
        const options = {month: 'short'};
        const date = new Date(dateString);
        const month=date.toLocaleDateString('en-US', options,{timeZone:'UTC'});
        
        const day=date.getUTCDate();
        
        const timeOptions={
            hour:'numeric',
            minute:'numeric',
            hour12:true,
        };

        const time=date.toLocaleString('en-US',timeOptions,{timeZone:'UTC'});

        return `${month} ${day} at ${time}`;
    }
    return ( 
        <div
        className="bg-main shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h4 className="text-lg font-semibold">{room.name}</h4>
          <p className="text-sm text-main">
            <strong>Check In:</strong> {formatDate(booking.check_in)}
          </p>
          <p className="text-sm text-main">
            <strong>Check Out:</strong> {formatDate(booking.check_out)}
          </p>
        </div>
        <div
          className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0"
        >
          <Link
            href={`/rooms/${room.$id}`}
            className="bg-primary-dark text-primary px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-text-link-hover"
          >
            View Room
          </Link>
          <CancelBookingButton bookingId={booking.$id}></CancelBookingButton>
        </div>
      </div>
    );
}
 
export default BookedRoomCard;