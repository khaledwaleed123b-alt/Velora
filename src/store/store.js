import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userslice'
import addToCartSlice from './addToCartslice'
import ProductDetail from './productDetail'


export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: addToCartSlice,
    product: ProductDetail
    
  },

})
