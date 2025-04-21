import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';
import getAllRooms from './actions/getAllRooms';
import RoomList from '@/components/RoomList';

export const dynamic = "force-dynamic";

export default async function Home() {
  const rooms = await getAllRooms(); 

  return (
    <>
      <RoomList rooms={rooms} /> 
    </>
  );
}
