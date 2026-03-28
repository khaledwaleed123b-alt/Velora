import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
    products: JSON.parse(localStorage.getItem("cart")) || [],
};



const addToCartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {
        addToCart: (state, action) => {
            const existingProducts = state.products.find(products => products.id === action.payload.id )

            if(existingProducts) {
                existingProducts.quantity += action.payload.quantity
            } else {
                state.products.push(action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.products))
        } ,

        incrementQuantity: (state, action) => {
            const product = state.products.find(product => product.id === action.payload)
            if(product) {
                product.quantity += 1
            }
            localStorage.setItem("cart", JSON.stringify(state.products))
        },

        decrementQuantity: (state, action) => {
            const product = state.products.find(product => product.id === action.payload)
            if(product && product.quantity > 1) {
                product.quantity -= 1
            }
            localStorage.setItem("cart", JSON.stringify(state.products))
        },




        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
            localStorage.setItem("cart", JSON.stringify(state.products))

        },

        clearCart: (state) => {
            state.products = []
            localStorage.setItem("cart", JSON.stringify(state.products))
        }








    }


})


export const { addToCart, removeFromCart, clearCart , incrementQuantity, decrementQuantity } = addToCartSlice.actions

export default addToCartSlice.reducer