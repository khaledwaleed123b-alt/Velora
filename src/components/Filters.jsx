import  { useState } from 'react'
import { motion } from 'framer-motion';
import { AnimatePresence } from "framer-motion";
import Categories from './Categories'
import { ArrowDownIcon } from 'lucide-react';


const Filters = ({
  selectedCategory,
  onSelectCategory,
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
}) => {


const [dropdownOpen2, setDropdownOpen2] = useState(false);
const [mobiledropdownOpen, setMobileDropdownOpen] = useState(false);


const sortOptions = [
                  "Featured",
                  "Highest Rated",
                  "Lowest Rated",
                  "Highest Price",
                  "Lowest Price",
                ]



  return (
    <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
    >

    <div className="w-full container flex flex-col items-center justify-center">
        

        <h1 className="text-2xl font-bold text-center mt-8 mb-4 ">All Products
        <div className="bg-gray-800 w-40 h-[2px] mt-2"></div>
        </h1>
       

    </div>




   <div className="flex md:flex-row flex-col space-y-5 items-center w-full justify-around px-10 mb-6 gap-4 mt-10  ">

    {/* Mobile Version */}


    {/* 🔍 Search Input */}
  <input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full max-w-md px-4 py-3 border border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black flex md:hidden transition-all duration-300 ease-in-out focus:transition-all focus:duration-300 focus:ease-in-out "
  />



<Categories
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
/>


 {/* Sort Dropdown */}
  <div
    className="relative px-4 py-3 bg-gray-100 rounded-lg cursor-pointer w-[200px] justify-between flex md:hidden "
    onClick={() => setMobileDropdownOpen(!mobiledropdownOpen)}
  >
    <span className="text-sm text-gray-700">{sortOption || "Featured"}</span>
    <ArrowDownIcon className={`w-4 h-4 transition-transform ${mobiledropdownOpen ? "rotate-180" : ""}`} />
      <AnimatePresence>
    {mobiledropdownOpen && (
      <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow z-10">
        <ul>
          {sortOptions.map((item) => (
            <li
              key={item}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSortOption(item);
                  setDropdownOpen2(false);
                }}
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    )}
    </AnimatePresence>
  </div>

















 
  {/* 🔍 Search Input */}
  <input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
     className="w-full max-w-md px-4 py-3 border border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black md:flex hidden "
  />

  {/* Sort Dropdown */}
  <div
    className="relative  px-4 py-3 bg-gray-100 rounded-lg cursor-pointer  w-[200px] justify-between md:flex hidden -mt-5 "
    onClick={() => setDropdownOpen2(!dropdownOpen2)}
  >
    <span className="text-sm text-gray-700">{sortOption || "Featured"}</span>
    <ArrowDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen2 ? "rotate-180" : ""}`} />
    <AnimatePresence>
    {dropdownOpen2 && (
      <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow z-10">
        <ul>
          {sortOptions.map((item) => (
            <li
              key={item}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSortOption(item);
                  setDropdownOpen2(false);
                }}
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    )}
    </AnimatePresence>
  </div>
</div>



    </motion.div>
  )
}

export default Filters