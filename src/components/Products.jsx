import { Star } from "lucide-react"
import { useEffect, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import {motion} from "framer-motion"

import useCart from "../hook/useCart"
import { getProductsByCategory } from "../store/api/api"




const Products = ({ selectedCategory}) => {


const {handleAddToCart} = useCart();


const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)



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


useEffect(() => {

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
                const shuffled = allFashionProducts.sort(() => 0.5 - Math.random())
                const randomProducts = shuffled.slice(0, 8)
                setProducts(randomProducts);
          
         })
         .finally(() => setLoading(false))
     }
   }, [selectedCategory])









  const navigate = useNavigate();

  const handleProductClick = (product) => {

    navigate(`/product/${product.id}`);
  };




  return (
    <section id="products">

    <div className="flex flex-col">

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
      className="flex  w-full  px-10 relative">
      <h1 className="md:text-xl text-lg lg:text-2xl font-bold text-center pt-8 pb-4 justify-start">Featured Products</h1>
      <Link to="/products" className="md:pt-8 pt-9 pb-4 absolute right-10">
        <p className="md:text-lg text-sm lg:text-xl  text-gray-600">View All</p>
      </Link>
    </motion.div>

    <div className='bg-black  w-[100%] h-[1px]  self-center justify-center shadow-lg'></div>

</div>




{loading ? (

  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
  </div>

) : (

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">

    {products.map((product) => (

        <motion.div 
        key={product.id}
        className="flex flex-col bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
        onClick={() => handleProductClick(product)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
      
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
    </motion.div>

    ))}

  </div>

)}




    </section>
  )
}

export default Products