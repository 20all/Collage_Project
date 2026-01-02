import React from 'react'

const Card = ({imagePath, title}) => {
  return (
    <div className='flex flex-col p-6'>
        <img className='max-h-65 max-w-60 min-h-65 min-w-60 bg-cover bg-center border border-gray-200 rounded hover:scale-105 cursor-pointer ' 
        src={imagePath} alt={title} />
        <p className='text-[16px] p-1'>{title}</p>
    </div>
  )
}

export default Card