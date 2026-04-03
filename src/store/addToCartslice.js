import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getCartFromFirestore,
  saveCartToFirestore,
  addProductToFirestore,
  removeProductFromFirestore,
  clearCartFromFirestore,
} from "./api/api"


export const fetchCartFromFirestoreAsync = createAsyncThunk(
  "cart/fetchCartFromFirestore",
  async (userId) => {
    const products = await getCartFromFirestore(userId)
    return products
  }
)


export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ userId, product }, { getState }) => {
    const state = getState()
    const currentProducts = state.cart.products
    const existing = currentProducts.find((p) => p.id === product.id)

    if (existing) return currentProducts

    const updatedProducts = [...currentProducts, { ...product, quantity: 1 }]
    await addProductToFirestore(userId, updatedProducts)
    return updatedProducts
  }
)


export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async ({ userId, productId }, { getState }) => {
    const state = getState()
    const updatedProducts = state.cart.products.filter(
      (p) => p.id !== productId
    )
    await removeProductFromFirestore(userId, updatedProducts)
    return updatedProducts
  }
)


export const incrementQuantityAsync = createAsyncThunk(
  "cart/incrementQuantityAsync",
  async ({ userId, productId }, { getState }) => {
    const state = getState()
    const updatedProducts = state.cart.products.map((p) =>
      p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
    )
    await saveCartToFirestore(userId, updatedProducts)
    return updatedProducts
  }
)


export const decrementQuantityAsync = createAsyncThunk(
  "cart/decrementQuantityAsync",
  async ({ userId, productId }, { getState }) => {
    const state = getState()
    const updatedProducts = state.cart.products.map((p) =>
      p.id === productId && p.quantity > 1
        ? { ...p, quantity: p.quantity - 1 }
        : p
    )
    await saveCartToFirestore(userId, updatedProducts)
    return updatedProducts
  }
)


export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (userId) => {
    await clearCartFromFirestore(userId)
    return []
  }
)

const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem("cart")
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

const initialState = {
  products: getCartFromStorage(), 
  loading: false,
  error: null,
}

export const addToCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

   
addToCart(state, action) {
  const existing = state.products.find((p) => p.id === action.payload.id)


  if (existing) return

  state.products.push({ ...action.payload, quantity: 1 })
  localStorage.setItem("cart", JSON.stringify(state.products))
},

    removeFromCart(state, action) {
      state.products = state.products.filter((p) => p.id !== action.payload)
      localStorage.setItem("cart", JSON.stringify(state.products))
    },

    increaseQuantity(state, action) {
      const product = state.products.find((p) => p.id === action.payload)
      if (product) product.quantity += 1
      localStorage.setItem("cart", JSON.stringify(state.products))
    },

    decreaseQuantity(state, action) {
      const product = state.products.find((p) => p.id === action.payload)
      if (product && product.quantity > 1) product.quantity -= 1
      localStorage.setItem("cart", JSON.stringify(state.products))
    },

    clearCart(state) {
      state.products = []
      localStorage.removeItem("cart")
    },
  },

  extraReducers: (builder) => {

 
    builder
      .addCase(fetchCartFromFirestoreAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCartFromFirestoreAsync.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload && action.payload.length > 0) {
          state.products = action.payload
          localStorage.setItem("cart", JSON.stringify(action.payload))
        }
      })
      .addCase(fetchCartFromFirestoreAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        localStorage.setItem("cart", JSON.stringify(action.payload))
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    
    builder
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        localStorage.setItem("cart", JSON.stringify(action.payload))
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    
    builder
      .addCase(incrementQuantityAsync.fulfilled, (state, action) => {
        state.products = action.payload
        localStorage.setItem("cart", JSON.stringify(action.payload))
      })

   
    builder
      .addCase(decrementQuantityAsync.fulfilled, (state, action) => {
        state.products = action.payload
        localStorage.setItem("cart", JSON.stringify(action.payload))
      })

    builder
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.products = []
        localStorage.removeItem("cart")
      })
  },
})


export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = addToCartSlice.actions

export default addToCartSlice.reducer
