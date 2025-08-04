import { Outlet } from 'react-router';
import "../app.css";


export const BaseLayout = () => {

  return (
    <div className='bg-canvas text-foreground'>
      <Outlet />
    </div>
  )
}

