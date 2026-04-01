
import { ArrowDownIcon, ArrowLeft, ArrowRight, Star } from "lucide-react"
import { useEffect, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { addToCart } from "../store/addToCartslice";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../store/productDetail";


const AllProducts = () => {


const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 6;

const [searchTerm, setSearchTerm] = useState("");
const [dropdownOpen, setDropdownOpen] = useState(false)
const [selectedCategory, setSelectedCategory] = useState("All")

const [dropdownOpen2, setDropdownOpen2] = useState(false)
const [selectedSort, setSelectedSort] = useState("Sort by")

const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)

const [activeCategory, setActiveCategory] = useState("All")
const [activeSort, setActiveSort] = useState("Featured")



useEffect(() => {

  const getProducts = async () => {
    try {
       const response = await fetch("https://dummyjson.com/products")
       const data = await response.json()
      
       setTimeout(() => {
        setProducts(data.products);
        console.log(data)
        setLoading(false);
       } , 1000 ) 

    } catch (error) {
      setLoading(false)
      console.error("Error fetching products:", error)
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500 text-lg">Error fetching products. Please try again later.</p>
        </div> 
      )
    }
  
  
  
  }

getProducts()

} , [])




const categories = ["All", ...new Set(products.map(p => p.category))].map(category => ({ label: category, value: category }));

const sortOptions = [
                  "Featured",
                  "Highest Rated",
                  "Lowest Rated",
                  "Highest Price",
                  "Lowest Price",
                ]




const filteredProducts = products
  .filter((p) => {
    // Category filter
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  })
  .filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (activeSort === "Featured") return 0;

  if (activeSort === "Highest Rated") {
    return (b.rating?.rate || 0) - (a.rating || 0);
  }

  if (activeSort === "Lowest Rated") {
    return (a.rating?.rate || 0) - (b.rating || 0);
  }

  if (activeSort === "Highest Price") {
    return b.price - a.price;
  }

  if (activeSort === "Lowest Price") {
    return a.price - b.price;
  }

  return 0;
});

const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const currentProducts = sortedProducts.slice(
  startIndex,
  startIndex + itemsPerPage
);

useEffect(() => {
  setCurrentPage(1);
}, [activeCategory, activeSort, searchTerm]);




const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

const displayedProducts = isMobile ? currentProducts : sortedProducts;



 const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.id}`);
  };





  return (
    <>
    


    <div className="w-full container flex flex-col items-center ">
      <div className="flex flex-col items-center justify-center">

      <h1 className="text-2xl font-bold text-center mt-8 mb-4">All Products
        <div className="bg-gray-800 w-40 h-[2px] mt-2"></div>
      </h1>
      </div>

    </div>




   <div className="flex md:flex-row flex-col space-y-5 items-center w-full justify-between px-10 mb-6 gap-4 mt-10  ">

    {/* Mobile Version */}


    {/* 🔍 Search Input */}
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-md px-4 py-3 border border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black flex md:hidden"
  />



     <div
    className="relative px-4 py-3 bg-gray-100 rounded-lg cursor-pointer  w-[200px] justify-between flex md:hidden"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    <span className="text-sm text-gray-700">{selectedCategory}</span>
    <ArrowDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />

    {dropdownOpen && (
      <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow z-10">
        <ul>
          {categories.map((item) => (
            <li
              key={item.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedCategory(item.label);
                setActiveCategory(item.value);
                setDropdownOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>


 {/* Sort Dropdown */}
  <div
    className="relative px-4 py-3 bg-gray-100 rounded-lg cursor-pointer w-[200px] justify-between flex md:hidden "
    onClick={() => setDropdownOpen2(!dropdownOpen2)}
  >
    <span className="text-sm text-gray-700">{selectedSort}</span>
    <ArrowDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen2 ? "rotate-180" : ""}`} />

    {dropdownOpen2 && (
      <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow z-10">
        <ul>
          {sortOptions.map((item) => (
            <li
              key={item}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedSort(item);
                setActiveSort(item);
                setDropdownOpen2(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

















  {/* Category Dropdown */}
  <div
    className="relative px-4 py-3 bg-gray-100 rounded-lg cursor-pointer w-[200px] justify-between md:flex hidden"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    <span className="text-sm text-gray-700">{selectedCategory}</span>
    <ArrowDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />

    {dropdownOpen && (
      <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow z-10">
        <ul>
          {categories.map((item) => (
            <li
              key={item.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedCategory(item.label);
                setActiveCategory(item.value);
                setDropdownOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  {/* 🔍 Search Input */}
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-md px-4 py-3 border border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black md:flex hidden "
  />

  {/* Sort Dropdown */}
  <div
    className="relative px-4 py-3 bg-gray-100 rounded-lg cursor-pointer  w-[200px] justify-between md:flex hidden -mt-5 "
    onClick={() => setDropdownOpen2(!dropdownOpen2)}
  >
    <span className="text-sm text-gray-700">{selectedSort}</span>
    <ArrowDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen2 ? "rotate-180" : ""}`} />

    {dropdownOpen2 && (
      <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow z-10">
        <ul>
          {sortOptions.map((item) => (
            <li
              key={item}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedSort(item);
                setActiveSort(item);
                setDropdownOpen2(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>




    {loading ? (

  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
  </div>

) : (




  
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6  mx-auto overflow-hidden">

    {displayedProducts.map((product) => (

       <div
       onClick={() => handleProductClick(product)}
       key={product.id}
       className="flex flex-col bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
      
      {/* Image */}
      <div className="bg-gray-50 md:h-48 flex items-center justify-center p-4 h-38">
        <img
          src={product.thumbnail || product.images[0]}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="md:text-sm text-xs font-medium text-gray-900 leading-snug line-clamp-2">
            {product.title}
          </h3>
          <span className="md:text-sm text-xs font-medium text-gray-900 whitespace-nowrap">
            ${product.price}
          </span>
        </div>

        {/* Meta — stock, category, rating */}
        <div className="flex-col flex sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0"></span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            In stock · 
          </span>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">{product.category}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-current" /> {product.rating}</span>
        </div>

        {/* Actions */}
        <div className=" gap-2 mt-auto py-3 px-2 grid md:grid-cols-2 grid-cols-1 ">
        
          <button
  onClick={(e) => {
  e.stopPropagation();
  dispatch(addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.thumbnail || product.images[0],
    category: product.category,
    description: product.description,
    length: product.length,
    quantity: 1,
  }));
}}

            className=" h-9 bg-gray-900 border-none rounded-lg text-xs text-white hover:bg-gray-700 transition w-full shadow-lg cursor-pointer"
          >
            Add to cart
          </button>
        </div>

      </div>
    </div>

    ))}

<div className="w-screen overflow-x-auto justify-center md:hidden">
<div className="flex w-full items-center justify-center gap-30 -ml-5 mt-10 md:hidden">

  {/* Prev */}
  <button
    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
    disabled={currentPage === 1}
    hidden={currentProducts.length < 6}
    className={`px-3 py-3 border rounded-full disabled:opacity-50`}
  >
    <ArrowLeft className="w-4 h-4" />
  </button>


  {/* Next */}
  <button 
    
    onClick={() =>
      setCurrentPage((p) => Math.min(p + 1, totalPages))
    }
    disabled={currentPage === totalPages}
    hidden={currentProducts.length < 6}
    className={`px-3 py-3 border rounded-full disabled:opacity-50 `}
  >
    <ArrowRight className="w-4 h-4" />
  </button>

</div>


  </div>
</div>
)}

  {sortedProducts.length === 0 && !loading && (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg">No products found.</p>
    </div> 
  )}

    
    </>
  )
}

export default AllProducts