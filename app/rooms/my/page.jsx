import Heading from '@/components/Heading';
import MyRoomCard from '@/components/MyRoomCard';
import getMyRooms from '@/app/actions/getMyRooms';

const MyRoomsPage = async () => {
  const rooms = await getMyRooms();

  return (
    <>
      <Heading title='My Rooms ' />
      <div className="max-w-3xl mx-auto">
      {rooms.length > 0 ? (
        rooms.map((room, index) => (
          <MyRoomCard key={room.id || `room-${index}`} room={room} />
        ))
      ) : (
        <p className="text-main text-lg text-center mt-4">You have no room listings</p>
      )}
      </div>
    </>
  );
};

export default MyRoomsPage;