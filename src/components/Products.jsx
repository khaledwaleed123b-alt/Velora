import { Star, StarHalf } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { addToCart } from "../store/addToCartslice"
import { setSelectedProduct } from "../store/productDetail"



const Products = () => {

const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)



const dispatch = useDispatch()





useEffect(() => {
 const getProducts = async () => {
    try {
        const response = await fetch ("https://dummyjson.com/products")
        const data = await response.json()

  
    const shuffled = data.products.sort(() => 0.5 - Math.random())

    
    const randomProducts = shuffled.slice(0, 8)



setTimeout(() => {
  setProducts(randomProducts);
  setLoading(false);
  console.log(data);
}, 1000);





        
    } catch (error) {
        console.error("Error fetching products:", error)
    }
 }

getProducts()
}, [])


  const navigate = useNavigate();

  const handleProductClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.id}`);
  };




  return (
    <section id="products">

    <div className="flex flex-col">

    <div className="flex  w-full  px-10 relative">
      <h1 className="md:text-xl text-lg lg:text-2xl font-bold text-center pt-8 pb-4 justify-start">Featured Products</h1>
      <Link to="/products" className="md:pt-8 pt-9 pb-4 absolute right-10">
        <p className="md:text-lg text-sm lg:text-xl  text-gray-600">View All</p>
      </Link>
    </div>

    <div className='bg-black  w-[100%] h-[1px]  self-center justify-center shadow-lg'></div>

</div>




{loading ? (

  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
  </div>

) : (

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">

    {products.map((product) => (

       <div 
       
        className="flex flex-col bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
         onClick={() => handleProductClick(product)}
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

  </div>

)}




    </section>
  )
}

export default Products