import Heading from '@/components/Heading';
import BookedRoomCard from '@/components/BookedRoomCard';
import getMyBookings from '../actions/getMyBookings';

const BookingsPage = async () => {
  const bookings = await getMyBookings();

  if (!Array.isArray(bookings)) {
    return (
      <>
        <Heading title="My Bookings" />
        <p className="text-red-600 mt-4">Failed to load your bookings.</p>
      </>
    );
  }

  return (
    <>
      <Heading title="My Bookings" />
      {bookings.length === 0 ? (
        <p className="text-main text-lg text-center mt-4">You have no bookings</p>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )}
    </>
  );
};

export default BookingsPage;
