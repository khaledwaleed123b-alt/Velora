import Home from "./pages/home"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Thankyou } from "./pages/Thankyou"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logout, setUser } from "./store/userslice"



import { BrowserRouter as Router, Routes, Route, Outlet, BrowserRouter } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"


import AllProducts from "./pages/AllProducts"
import TermsOfService from "./pages/TermsService"
import PrivacyPolicy from "./pages/PrivacyPolicy"




const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>


  )
}




const App = () => {

const dispatch = useDispatch()

useEffect(() => {

const auth = getAuth()

const unsubscribe = onAuthStateChanged(auth, (user) => {

  if (user) {

    dispatch(setUser({
      userName: user.displayName,
      userEmail: user.email,
      userId: user.uid,
    }))

  } else {

    dispatch(logout())

  }

})

return () => unsubscribe()

}, [dispatch])


useEffect(() => {
  const auth = getAuth();

  console.log("Current user:", auth.currentUser);
}, []);


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
        </Route>

          <Route path="thankyou" element={<Thankyou />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />



        </Routes>


    </BrowserRouter>
  )
}

export default App
