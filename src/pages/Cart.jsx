
import { Link } from 'react-router-dom';
import useCart from '../hook/useCart';
import { motion } from 'framer-motion';
import { AnimatePresence } from "framer-motion";


const Cart = () => {

  const {
    cartProducts,
    totalPrice,
    handleRemoveFromCart,
    handleIncrement,
    handleDecrement,
    handleClearCart,
  } = useCart()


const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.8
    }
  }
};

const item = {
  exit: {
    opacity: 0,
    y: 40
  }
};




  return (
    <div className='overflow-hidden flex flex-col items-center justify-center h-full w-full py-10 px-5'>




    <div className="w-full container flex flex-col items-center ">
      <div className="flex flex-col items-center justify-center">

      <h1 className="text-2xl font-bold text-center mt-8 mb-4 ">Your Cart
        <div className="bg-gray-800 w-40 h-[2px] mt-2"></div>
      </h1>
      </div>

    </div>

      {cartProducts.length === 0 ? (
          <div className='md:py-20 py-32'>
          <p className="text-gray-600 text-2xl font-bold">Your cart is empty.</p>
        </div>
      ) : ( 

        <div className='grid grid-cols-1 gap-5'>


        <motion.div 
        variants={container}
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-6 border p-4 rounded-lg  border-gray-600 justify-center items-center bg-gray-100 shadow-xl ">
          <AnimatePresence mode="popLayout">
          {cartProducts.map((product) => (

            <motion.div 
            layout
            varients={item}
            key={product.id} className=" p-4 rounded-lg shadow-lg flex gap-20 items-center justify-around bg-white" 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            exit={{ x: -100, opacity: 0 }}
            
            >

              <div className='flex flex-col items-center gap-2 justify-center'>
              <img src={product.image} alt={product.title} className="md:w-30 md:h-30 w-20 h-20 mb-4" />
              <h2 className="md:text-sm text-xs font-semibold w-[150px] ">{product.title}</h2>
              </div>

              <div className='flex flex-col md:flex-row gap-5 md:m-0 -ml-10'>

              <div className='flex items-center gap-2 justify-center'>
              <button onClick={() => handleIncrement(product.id)} className="bg-transparent text-black border border-gray-500 py-2 px-4 rounded-lg hover:bg-gray-300 md:text-base text-xs cursor-pointer">
                +
              </button>
              <button onClick={() => handleDecrement(product.id)} className="bg-transparent text-black border border-gray-500 py-2 px-4 rounded-lg hover:bg-gray-300 md:text-base text-xs cursor-pointer">
                -
              </button>
              </div>



             

              <div className='flex flex-col'>
              <h3 className="text-black mb-2 md:text-base text-sm">{product.quantity}x</h3>
              <h3 className="text-black mb-2 md:text-base text-sm">Total: <span className="font-semibold">${ (product.price * product.quantity).toFixed(1) }</span></h3>
              </div>

              <div>
              <button onClick={() => handleRemoveFromCart(product.id)
              
              } className="bg-red-700 text-white py-2 px-4  w-fit rounded-lg hover:bg-red-800 flex items-center gap-2 justify-center md:text-base text-xs cursor-pointer">
                Remove
              </button>
              </div>
</div>
            </motion.div>
          ))}
</AnimatePresence>

          <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className='  rounded-lg shadow-lg  w-full h-fit p-10 flex flex-col items-center justify-center gap-4 bg-white'>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">SubTotal: ${totalPrice.toFixed(1)}</h2>
          <Link to="/checkout">
          <button className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-black transition-colors cursor-pointer">
            Checkout
          </button>
          </Link>
          <button onClick={handleClearCart} className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition-colors cursor-pointer">
            Clear Cart
          </button>
          <Link to="/products" className="">
            <button className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors cursor-pointer">
              Continue Shopping
            </button>
          </Link>
          </motion.div>

        </motion.div>





        </div>
      )}

    </div>
  )
}

export default Cart