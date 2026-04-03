
import { useDispatch } from "react-redux";
import { addToCart } from "../store/addToCartslice";
import { ArrowLeft, Check, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../store/api/api";
import useCart from "../hook/useCart";

function ProductDetail() {

const {handleAddToCart} = useCart();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {id} = useParams();

  const [product , setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });

  }, [id]);



  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
  </div>
    )
  }


   if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-6 py-12">


       <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 cursor-pointer"
      >
        <span><ArrowLeft className="w-4 h-4" /></span> Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">

        
        <div className="bg-gray-50 rounded-2xl p-10 flex items-center justify-center border">
          <img
            src={product.thumbnail || product.images[0]}
            alt={product.title}
            className="max-h-[400px] object-contain"
          />
        </div>

     
        <div className="flex flex-col gap-6">

       
          <span className="text-sm text-gray-400 uppercase tracking-wide">
            {product.category}
          </span>

      
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.title}
          </h1>


          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{product.rating}</span>
          </div>

          
          <div className="text-2xl font-bold text-gray-900">
            ${product.price}
          </div>

          
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          
          <div className="flex gap-4 pt-4">

          
            <button
              onClick={() => handleAddToCart(product)}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Add To Cart
            </button>

            <button className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition cursor-pointer"
            onClick={() => {handleAddToCart(product); navigate("/checkout")}}
            >

              Buy Now
            </button>

          </div>

          
          <div className="border-t pt-6 text-sm text-gray-500 space-y-2 ">
            <p className="flex"><span><Check/></span> Free worldwide shipping</p>
            <p className="flex"><span><Check/></span> 30-day return guarantee</p>
            <p className="flex"><span ><Check/></span> Secure checkout</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;