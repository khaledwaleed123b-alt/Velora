import React from 'react'
import { Link } from 'react-router-dom'






const Footer = () => {
  return (
    <footer className='bg-black w-full p-5 justify-center items-center h-full '>

    <div className='grid grid-cols-1 gap-0 justify-center items-center h-fit '>
    {/*Top section*/}

      <div className='flex md:flex-row flex-col justify-around pt-10 md:gap-0 gap-5' >

      {/* Mobile view */}

       <div className='md:hidden flex justify-between '>
        {/* Contact */}
        <div className='flex flex-col gap-2'>
          <p className='md:text-md text-sm font-medium text-white mb-1'>Contact</p>
          <a href="mailto:khaledwaleed123b@gmail.com">
            <p className='md:text-sm text-xs text-gray-400 hover:text-white transition-colors'>
              khaledwaleed123b@gmail.com
            </p>
          </a>
          <a href="tel:+201015555555">
            <p className='md:text-sm text-xs text-gray-400 hover:text-white transition-colors'>
              +20 101 555 5555
            </p>
          </a>
          <p className='md:text-sm text-xs text-gray-400'>123 Main Street, Cairo, Egypt</p>
        </div>


     <div className='flex flex-col gap-2'>
          <p className='md:text-md text-sm font-medium text-white mb-1'>Follow Us</p>
          <div className='flex flex-col gap-4 mt-1'>

            {/* Facebook */}
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer"
              className='text-gray-400 hover:text-white transition-colors flex justify-center items-center  gap-2 w-fit'>
              <span className='md:text-sm text-xs'>Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>

            {/* Twitter / X */}
            <a href="https://www.twitter.com/yourprofile" target="_blank" rel="noopener noreferrer"
              className='text-gray-400 hover:text-white transition-colors flex justify-center items-center  gap-2 w-fit'>
              <span className='md:text-sm text-xs'>Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l16 16M4 20L20 4"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"
              className='text-gray-400 hover:text-white transition-colors flex justify-center items-center  gap-2 w-fit'>
              <span className='md:text-sm text-xs'>Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

          </div>
        </div>
</div>



              {/* Contact */}
        <div className=' flex-col gap-2 md:flex hidden'>
          <p className='md:text-md text-sm font-medium text-white mb-1'>Contact</p>
          <a href="mailto:khaledwaleed123b@gmail.com">
            <p className='md:text-sm text-xs text-gray-400 hover:text-white transition-colors'>
              khaledwaleed123b@gmail.com
            </p>
          </a>
          <a href="tel:+201015555555">
            <p className='md:text-sm text-xs text-gray-400 hover:text-white transition-colors'>
              +20 101 555 5555
            </p>
          </a>
          <p className='md:text-sm text-xs text-gray-400'>123 Main Street, Cairo, Egypt</p>
        </div>


     <div className=' flex-col gap-2 md:flex hidden'>
          <p className='md:text-md text-sm font-medium text-white mb-1'>Follow Us</p>
          <div className='flex flex-col gap-4 mt-1'>

            {/* Facebook */}
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer"
              className='text-gray-400 hover:text-white transition-colors flex justify-center items-center  gap-2 w-fit'>
              <span className='md:text-sm text-xs'>Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>

            {/* Twitter / X */}
            <a href="https://www.twitter.com/yourprofile" target="_blank" rel="noopener noreferrer"
              className='text-gray-400 hover:text-white transition-colors flex justify-center items-center  gap-2 w-fit'>
              <span className='md:text-sm text-xs'>Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l16 16M4 20L20 4"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"
              className='text-gray-400 hover:text-white transition-colors flex justify-center items-center  gap-2 w-fit'>
              <span className='md:text-sm text-xs'>Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

          </div>
        </div>


      <div className='flex flex-col gap-2'>
          <p className='md:text-md text-sm font-medium text-white mb-1'>Shop</p>
          <Link to={"/"} className='md:text-sm text-xs text-gray-400 hover:text-white transition-colors w-fit'>
            Home
          </Link>

          <Link to="/products" className='md:text-sm text-xs text-gray-400 hover:text-white transition-colors w-fit'>
            View All Products
          </Link>
          <Link to="/cart" className='md:text-sm text-xs text-gray-400 hover:text-white transition-colors w-fit'>
            View Cart
          </Link>

      
      </div>


      </div>

      {/* Divider */}
      <div className='bg-white/60 w-full h-[1px] mt-10 mb-5 self-center justify-center shadow-lg'></div>


      {/*Bottom section*/}

      <div className='flex justify-around pt-5 pb-5'>

        <p className='md:text-sm text-xs text-gray-400'>&copy; 2026 VELORA. All rights reserved.</p>

        <div className='flex gap-5 justify-center items-center'>
          <Link to="/privacy" className='md:text-sm text-xs text-gray-400 hover:text-white transition-colors w-fit'>
            Privacy Policy
          </Link>
          <Link to="/terms" className='md:text-sm text-xs text-gray-400 hover:text-white transition-colors w-fit'>
            Terms of Service
          </Link>
        </div>

      </div>

      </div>

    </footer>
  )
}

export default Footer