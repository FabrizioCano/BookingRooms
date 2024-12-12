
import rooms from '@/data/rooms.json';
import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';
export default function Home() {
  return (
    <>
    <Heading title="Available Rooms"></Heading>
    {rooms.length > 0 ? (
      rooms.map((room) => 
        <RoomCard room={room}></RoomCard>
      )
    ) : (
      <p> No rooms available</p>
    )}
    </>
    
  );
}
