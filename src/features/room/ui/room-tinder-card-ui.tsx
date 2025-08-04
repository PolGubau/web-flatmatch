import { StarIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Room } from '~/entities/room/room'

export function RoomTinderCardUI({ room }: { room: Room }) {

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  }


  return (
    // gradient from black to transparent
    <article className='relative group w-full h-full bg-primary/10 pointer-events-none'>

      <div className='bg-gradient-to-tr from-black w-full h-full inset-0 absolute to-transparent rounded-lg' />


      <header className='absolute bottom-0 left-0 p-4 pb-6 flex flex-col gap-2 z-10'>


        {room.isVerified && <div className='gap-1 flex w-fit items-center rounded-full text-canvas/90 bg-primary/70 backdrop-blur-md px-2 py-1 text-xs'>
          <HugeiconsIcon icon={StarIcon} size={13} className='fill-canvas/80' />
          <span className='text-xs'>
            Verificada
          </span>
        </div>}

        <h2 className='text-canvas text-2xl text-pretty line-clamp-2'>{room.title} </h2>

        {room.price.amount && <p className='text-canvas/60 text-sm'>
          {formatPrice(room.price.amount, room.price.currency)}
        </p>}



        <p className='text-sm text-canvas/70 line-clamp-2'>{room.description}</p>
      </header>


      <img className="object-cover h-full object-bottom w-full"
        src={room.images.gallery[room.images.main]} alt={room.title}
      />
    </article >
  )
}
