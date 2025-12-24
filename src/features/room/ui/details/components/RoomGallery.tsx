import { RoomDetailsImage } from "../image";

type RoomGalleryProps = {
  images: string[];
  title: string;
};

export const RoomGallery = ({ images, title }: RoomGalleryProps) => {
  return (
    <ul className="room-details-gallery max-h-[40vh] md:max-h-[50vh] gap-2 flex overflow-x-auto rounded-xl">
      {images.map((src) => (
        <li key={src}>
          <RoomDetailsImage alt={title} src={src} />
        </li>
      ))}
    </ul>
  );
};
