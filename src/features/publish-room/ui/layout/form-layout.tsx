import { Outlet } from 'react-router'

export default function FormLayout() {
  return (
    <div className='bg-primary/10 min-h-screen flex flex-col items-center justify-center'>
      form-layout

      <Outlet />
    </div>
  )
}
