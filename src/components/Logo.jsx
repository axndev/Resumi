import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link className='text-3xl font-semibold relative' to='/'>
      <span>resumi</span>
      <span className='bg-(--primary) w-2 h-2 absolute bottom-2 rounded-full ml-1'></span>
    </Link>
  )
}

export default Logo