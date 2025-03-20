import React from 'react'

function Property({icon,name,desc}) {
  return (
    <div className='flex flex-col justify-between items-center space-y-3 w-[33%] py-5 rounded-2xl bg-zinc-900'>
      <img src={icon} alt="" />
      <h3 className='font-semibold text-soft-gray'>{name}</h3>
      <p className='text-soft-gray'>{desc}</p>
    </div>
  )
}

export default Property
