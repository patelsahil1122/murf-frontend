import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="w-3/4 flex justify-center items-center p-8">
      <Outlet />
    </div>
  )
}

export default Layout