import { Link } from "react-router-dom"

import { ShoppingCart, User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { logout } from "../store/userslice"

const Navbar = () => {






const cartProducts = useSelector((state) => state.cart.products)

const totalUniqueProducts = cartProducts.length

const dispatch = useDispatch()

const handleLogout = () => {

  dispatch(logout())

  localStorage.removeItem("userInfo")

}

const [userOpen , setUserOpen] = useState(false)

const userInfo = useSelector((state) => state.user.userInfo)



  return (
    <nav className="navbar px-10 py-5 bg-black text-white">

    <div className="w-full container mx-auto flex items-center justify-between ">
  
  {/*logo*/}
    
    <div className="flex gap-2 justify-center items-center" >

      <Link to="/"><img src="/public/LogoWhite.png" alt="Logo" className="md:w-18 w-12" /></Link>
      

    </div>


  {/*cart and user icons*/}

    <div className="relative flex items-center gap-4">

      <div className="relative">
      <div className="absolute -top-1 -right-1 bg-white px-[2px]  text-black rounded-full text-xs">{totalUniqueProducts}</div>
      <Link to="/cart"><ShoppingCart className="hover:text-gray-300" /></Link>
</div>


    <div className="flex gap-2">
      <User  className="hover:text-gray-300 cursor-pointer" onClick={() => setUserOpen(!userOpen)} />
      <h2>
{userInfo ? userInfo.userName || userInfo.email : "Guest"}
      </h2>
    </div>



{/* Dropdown */}

{userOpen && (

<div className="absolute right-0 top-10 w-40 bg-white text-black rounded-lg shadow-lg flex flex-col z-99999">

{userInfo ? (

<>




<button
onClick={handleLogout}
className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer rounded-lg"
>
Logout
</button>
</>

) : (

<div className="flex flex-col">
<Link
to="/login"
className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
>
Login
</Link> 



<Link
to="/register"
className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
>
Register
</Link>
</div>



)}

</div>

)}



</div> 



    </div>

    



    </nav>

  )
}

export default Navbar