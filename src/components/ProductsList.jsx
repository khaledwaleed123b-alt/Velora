import { useEffect, useState } from "react"
import { getProductsByCategory } from "../store/api/api"
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import useCart from "../hook/useCart"




const ProductsList = ({ selectedCategory, sortOption, searchQuery }) => {



const FASHION_CATEGORIES = [
  "mens-shirts",
  "fragrances",
  "mens-watches",
  "womens-watches",
  "womens-dresses",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "mens-shoes",
  "womens-shoes",
  
]




  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(true);

useEffect(() => {
    setLoading(true)

    if (selectedCategory) {
      
      getProductsByCategory(selectedCategory)
        .then((data) => setProducts(data.products || []))
        .finally(() => setLoading(false))
    } else {
      
      Promise.all(
        FASHION_CATEGORIES.map((cat) =>
          getProductsByCategory(cat).then((data) => data.products || [])
        )
      )
        .then((results) => {
          const allFashionProducts = results.flat()
          setProducts(allFashionProducts)
        })
        .finally(() => setLoading(false))
    }
  }, [selectedCategory])



    const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(( searchQuery || "").toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Highest Rated") return b.rating - a.rating;
    if (sortOption === "Lowest Rated") return a.rating - b.rating;
    if (sortOption === "Highest Price") return b.price - a.price;
    if (sortOption === "Lowest Price") return a.price - b.price;
    return 0;
  });




const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const currentProducts = sortedProducts.slice(
  startIndex,
  startIndex + itemsPerPage
);

useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOption , searchQuery]);




const navigate = useNavigate();

const handleProductClick = (product) => {
  navigate(`/product/${product.id}`);
};




const {handleAddToCart} = useCart();




  return (
    <div>


        {loading ? (

  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
  </div>

) : (



    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6  mx-auto overflow-hidden">

    {currentProducts.map((product) => (

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
              handleAddToCart(product);
            }}
            className=" h-9 bg-gray-900 border-none rounded-lg text-xs text-white hover:bg-gray-700 transition w-full shadow-lg cursor-pointer"
          >
            Add to cart
          </button>
        </div>

      </div>
    </div>

    ))}

<div className="w-screen overflow-x-auto justify-center ">
<div className="flex w-full items-center justify-center gap-30 -ml-5 mt-10 ">

  {/* Prev */}
  <button
    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
    disabled={currentPage === 1}
    hidden={sortedProducts.length <= itemsPerPage}
    className={`px-3 py-3 border rounded-full disabled:opacity-50 cursor-pointer`}
  >
    <ArrowLeft className="w-4 h-4" />
  </button>


  {/* Next */}
  <button 
    
    onClick={() =>
      setCurrentPage((p) => Math.min(p + 1, totalPages))
    }
    disabled={currentPage === totalPages}
    hidden={sortedProducts.length <= itemsPerPage}
    className={`px-3 py-3 border rounded-full disabled:opacity-50 cursor-pointer`}
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


  







</div>



  )
}

export default ProductsList