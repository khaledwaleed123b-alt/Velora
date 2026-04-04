import { useDispatch, useSelector } from "react-redux"
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addToCartAsync,
  removeFromCartAsync,
  incrementQuantityAsync,
  decrementQuantityAsync,
  clearCartAsync,
} from "../store/addToCartslice"
import Swal from "sweetalert2"

const useCart = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo)
  const cartProducts = useSelector((state) => state.cart.products)
  const cartLoading = useSelector((state) => state.cart.loading)

  const totalPrice = cartProducts.reduce(
    (sum, p) => sum + p.price * p.quantity, 0
  )

  const totalItems = cartProducts.reduce(
    (sum, p) => sum + p.quantity, 0
  )

  
  const handleAddToCart = (product) => {
    const cartProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail || product.image,
        category: product.category,
        quantity: 1,
    }

const alreadyInCart = cartProducts.find((p) => p.id === product.id)
if (alreadyInCart) {
    Swal.fire({
    position: 'top-end',
    toast: true,
    icon: 'info',
    title: 'Already in cart!',
    text: 'This product is already in your cart.',
    showConfirmButton: false,
    timer: 1500,
    }
)
    return
} else {
    Swal.fire({
    icon: 'success',
    title: 'Added to cart!',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
}) }



    if (userInfo) {
        
        dispatch(addToCartAsync({ userId: userInfo.userId, product: cartProduct }))
        
    } else {
    
        dispatch(addToCart(cartProduct))
    }
    }  

    
    const handleRemoveFromCart = (productId) => {
    if (userInfo) {
        dispatch(removeFromCartAsync({ userId: userInfo.userId, productId }))
            Swal.fire({
    icon: 'success',
    title: 'Removed from cart!',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
})
    } else {
        dispatch(removeFromCart(productId))
    Swal.fire({
    icon: 'success',
    title: 'Removed from cart!',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
})
    }
    }

    
    const handleIncrement = (productId) => {
    if (userInfo) {
        dispatch(incrementQuantityAsync({ userId: userInfo.userId, productId }))
    } else {
        dispatch(increaseQuantity(productId))
    }
    }


    const handleDecrement = (productId) => {
    if (userInfo) {
        dispatch(decrementQuantityAsync({ userId: userInfo.userId, productId }))
    } else {
        dispatch(decreaseQuantity(productId))
    }
    }


  const handleClearCart = () => {
    if (userInfo) {
      dispatch(clearCartAsync(userInfo.userId))
    Swal.fire({
    icon: 'success',
    title: 'Cleared cart!',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
})
    } else {
    dispatch(clearCart())
    Swal.fire({
    icon: 'success',
    title: 'Cleared cart!',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
})

    }
  }

  return {
    cartProducts,
    cartLoading,
    totalPrice,
    totalItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncrement,
    handleDecrement,
    handleClearCart,
  }
}

export default useCart