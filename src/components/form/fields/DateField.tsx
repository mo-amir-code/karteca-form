import React from 'react'

const DateField = ({ isDisable }:{isDisable?: boolean}) => {
  return (
    <div className='flex border-b w-full' >
        <input disabled={isDisable} type={"date"} className='outline-none w-full' />
    </div>
  )
}

export default DateField
