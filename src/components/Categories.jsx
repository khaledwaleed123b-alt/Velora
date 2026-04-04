
import { ArrowDownIcon } from "lucide-react"
import { useState } from "react"
import { motion } from 'framer-motion';
import { AnimatePresence } from "framer-motion";



const Categories = ({ onSelectCategory, selectedCategory }) => {



  const [dropdownOpen, setDropdownOpen] = useState(false)



const categories = [
    { slug: "mens-shirts", name: "Men's Shirts" },
    { slug: "fragrances", name: "Fragrances" },
    { slug: "mens-watches", name: "Men's Watches" },
    { slug: "womens-watches", name: "Women's Watches" },
    { slug: "womens-dresses", name: "Women's Dresses" },
    { slug: "womens-bags", name: "Women's Bags" },
    { slug: "womens-jewellery", name: "Women's Jewellery" },
    { slug: "sunglasses", name: "Sunglasses" },
    { slug: "mens-shoes", name: "Men's Shoes" },
    { slug: "womens-shoes", name: "Women's Shoes" },
    
  ]





  return (
    <div>





<div
    className="relative px-4 py-3 bg-gray-100 rounded-lg cursor-pointer w-[200px] justify-between flex "
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    <span className="text-sm text-gray-700">{selectedCategory
          ? categories.find((c) => c.slug === selectedCategory)?.name
          : "All"}</span>
    <ArrowDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
    <AnimatePresence>
    {dropdownOpen && (
      <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow z-10">
        <ul>
         
            <li
              
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCategory("");
                  setDropdownOpen(false);
                }}
            >
              All
            </li>
                {categories.map((item) => (
              <li
                key={item.slug}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm capitalize"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectCategory(item.slug)  
                  setDropdownOpen(false)
                }}
              >
                {item.name}  
              </li>
            ))}
        </ul>
      </motion.div>
    )}
    </AnimatePresence>
  </div>








    </div>




  )
}

export default Categories