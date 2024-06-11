import { ParticipantHeroType } from '@/utils/types/client/form'
import React from 'react'

const Hero = ({title, description}:ParticipantHeroType) => {
  return (
    <div className="p-4 space-y-3 bg-white border-t-4 border-primary rounded-lg">
        <h1 className='text-2xl font-medium' >{title}</h1>
        <p className='flex-wrap' >{description}</p>
  </div>
  )
}

export default Hero
