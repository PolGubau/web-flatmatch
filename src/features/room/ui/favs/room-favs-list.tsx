import { ArrowUpRight03Icon, DeleteIcon, FavouriteIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from 'react-router'
import type { Room } from '~/entities/room/room'
type Props = {
  rooms: Room[]
}
export function RoomList({ rooms }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {rooms?.map((room) => (
        <li key={room.id} className="group group-hover:bg-foreground/10 bg-foreground/5 transition-opacity rounded-xl gap-4 grid grid-cols-[auto_1fr] overflow-hidden">

          <div className='relative group'>

            <img src={room.images.gallery[room.images.main]} alt={`Room ${room.id}`} className=" w-24 h-full object-cover" />

            <div className='absolute top-1 right-1 ring-neutral-200 group-hover:ring-neutral-300 text-foreground/50'>
              <HugeiconsIcon icon={FavouriteIcon} size={22} className="fill-red-400" />
            </div>
          </div>


          <Link to={`/room/${room.id}`} className="grid grid-cols-[1fr_auto] gap-4 items-start h-full">

            <div className='flex flex-col p-2 gap-1 justify-between'>
              <h2>{room.title}</h2>
              <p className="text-sm text-neutral-500 line-clamp-2">{room.description}</p>
              <p className="text-sm text-neutral-500">
                {new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: room.price.currency,
                  minimumFractionDigits: 0,
                }).format(room.price.amount)}
              </p>
            </div>


            <footer className='flex flex-col justify-end items-top gap-2 p-4 text-neutral-500 group-hover:text-neutral-700 transition-colors'>


              <HugeiconsIcon icon={ArrowUpRight03Icon} size={20} className="group-hover:pl-1 group-hover:pb-1 transition-all" />



            </footer>
          </Link>

        </li>


      ))}
    </ul>
  )
}
