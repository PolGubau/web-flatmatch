import { RoomDetailsImage } from "../image";

type RoomGalleryProps = {
  images: string[];
  title: string;
};

export const RoomGallery = ({ images, title }: RoomGalleryProps) => {
  return (
    <ul className="room-details-gallery max-h-[50vh] gap-2 w-full flex overflow-x-auto rounded-xl">
      {images.map((src) => (
        <li key={src}>
          <RoomDetailsImage alt={title} src={src} />
        </li>
      ))}
    </ul>
  );
};
