import React from 'react'
import cloud from '../assets/cloud.mp4'

const MainBG = () => {
  return (
    <div className='main'>
      <video src={cloud} autoPlay loop />
    </div>
  )
}

export default MainBG
