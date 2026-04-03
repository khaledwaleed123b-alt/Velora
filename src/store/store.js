import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userslice'
import addToCartSlice from './addToCartslice'



export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: addToCartSlice

  },

})
