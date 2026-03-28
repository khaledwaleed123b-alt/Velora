import React from 'react'
import Banner from "../assets/Banner.png"
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='w-full h-fit justify-center items-center flex flex-col'>
      <div className='relative w-full h-150 bg-center bg-cover ' style={{ backgroundImage: `url(${Banner})` }}>

    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center'>
      <h1 className='text-4xl md:text-6xl font-bold mb-4'>Discover Your Style</h1>
      <p className='text-lg md:text-2xl mb-8'>Shop the latest trends in fashion and accessories.</p>
      <Link to="/products">
        <button className='bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition-colors cursor-pointer'>
          Shop Now
        </button>
      </Link>
    </div>

</div>

    





    </div>
  )
}

export default Hero