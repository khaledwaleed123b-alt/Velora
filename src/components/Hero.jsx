import React from 'react'
import Banner from "../assets/Banner.png"
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
const Hero = () => {
  return (
    <div className='w-full h-fit justify-center items-center flex flex-col'>
      <motion.div 
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='relative w-full h-150 bg-center bg-cover ' style={{ backgroundImage: `url(${Banner}) ` }}>
        <div className='absolute inset-0 bg-black/20'></div>
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center'>
      <motion.h1 
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='text-4xl md:text-6xl font-bold mb-4'>Choose Your Style</motion.h1>
      <motion.p   
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className='text-lg md:text-2xl mb-8'>Find everything you need in one convenient location.</motion.p>
      <Link to="/products">
        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        className='bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition-all cursor-pointer'>
          Shop Now
        </motion.button>
      </Link>
    </div>

</motion.div>







    </div>
  )
}

export default Hero