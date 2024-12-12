
import rooms from '@/data/rooms.json';
import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';
export default function Home() {
  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? (
        <div className='flex justify-center space-evenly'>
          <div className="grid grid-cols-1 ml-5 mt-5 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <RoomCard room={room} key={room.$id} />
            ))}
          </div>
        </div>
      ) : (
        <p>No rooms available</p>
      )}
    </>

  );
}
