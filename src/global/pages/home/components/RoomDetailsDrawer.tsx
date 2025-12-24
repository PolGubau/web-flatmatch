import type { RoomWithMetadata } from "~/entities/room/room";
import RoomDetails from "~/features/room/ui/details/room-details";
import { Drawer } from "~/shared/components/ui/drawer";

type RoomDetailsDrawerProps = {
  room: RoomWithMetadata | null;
  onClose: () => void;
};

export const RoomDetailsDrawer = ({ room, onClose }: RoomDetailsDrawerProps) => {
  return (
    <Drawer className="md:max-w-7xl mx-auto" onClose={onClose} open={!!room}>
      {room && <RoomDetails room={room} />}
    </Drawer>
  );
};
