import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { removeFromCart } from '../store/addToCartslice';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';


const SubmitButton = () => {
  const { submitForm } = useFormikContext()
  return (
    <button
      type="button"
      onClick={submitForm}
      className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-black transition-colors text-sm cursor-pointer"
    >
      Order Now
    </button>
  )
}



const Checkout = () => {


const navigate = useNavigate()

const products = useSelector((state) => state.cart.products);

const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0)

const userInfo = useSelector((state) => state.user.userInfo)

const dispatch = useDispatch()

const handleSubmit = (values) => {

  console.log('Form values:', values);
  Swal.fire({
    icon: 'success',
    title: 'Order Placed!',
    text: 'Your order has been placed successfully.',
    timer: 1500,
    showConfirmButton: false,
  });
  setTimeout(() => {
    dispatch({ type: 'cart/clearCart' });
    navigate('/thankyou');
  }, 1500);



}

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().min(11, 'Phone number must be at least 11 characters').matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone number is required')
  })



  return (
      <>

      {products.length === 0 ? (
        <div className='md:py-20 py-32 h-screen flex items-center justify-center'>
          <p className="text-gray-600 text-2xl font-bold">Your cart is empty.</p>
        </div>
      ) : (

        <Formik
          initialValues={
            userInfo
              ? { name: userInfo.userName, email: userInfo.userEmail, address: '', phone: '' }
              : { name: '', email: '', address: '', phone: '' }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <section className='flex md:flex-row flex-col w-full items-center justify-around gap-10 px-5 py-10'>

              {/* Left — User Info */}
              <div className="grid grid-cols-1 gap-6 border p-4 rounded-lg border-gray-600 bg-gray-100 shadow-xl w-full">
                <h2 className='text-lg font-semibold text-black'>User Information</h2>

                <div className='flex flex-col gap-5'>

                  {userInfo ? (
                    <>
                      <p><span className='font-semibold text-black'>Name:</span> {userInfo.userName}</p>
                      <p><span className='font-semibold text-black'>Email:</span> {userInfo.userEmail}</p>
                    </>
                  ) : (
                    <>
                      <div className='relative'>
                        <label>Name</label>
                        <Field type="text" name="name" placeholder="Enter your name"
                          className='bg-white w-full px-3 py-2 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-black' />
                        <ErrorMessage name="name" component="div" className='text-red-500 text-sm mt-1' />
                      </div>

                      <div className='relative'>
                        <label>Email</label>
                        <Field type="email" name="email" placeholder="Enter your email"
                          className='bg-white w-full px-3 py-2 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-black' />
                        <ErrorMessage name="email" component="div" className='text-red-500 text-sm mt-1' />
                      </div>
                    </>
                  )}

                  <div className='relative'>
                    <label>Shipping Address</label>
                    <Field type="text" name="address" placeholder="Enter your address"
                      className='bg-white w-full px-3 py-2 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-black' />
                    <ErrorMessage name="address" component="div" className='text-red-500 text-sm mt-1' />
                  </div>

                  <div className='relative'>
                    <label>Phone Number</label>
                    <Field type="text" name="phone" placeholder="Enter your phone number"
                      className='bg-white w-full px-3 py-2 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-black' />
                    <ErrorMessage name="phone" component="div" className='text-red-500 text-sm mt-1' />
                  </div>

                  <div className='flex gap-1 items-center mt-2'>
                    <CheckCircle className='text-white fill-black w-5 h-5' />
                    <p className='text-sm text-gray-500'>Cash on Delivery</p>
                  </div>

                </div>
              </div>

              {/* Right — Order Summary */}
              <div className="grid grid-cols-1 gap-6 border p-4 rounded-lg border-gray-600 bg-gray-100 shadow-xl w-full">
                <h2 className='text-lg font-semibold text-black'>Order Summary</h2>

                <div className='flex flex-col gap-3'>
                  {products.map((product) => (
                    <div key={product.id} className="px-2 py-3 rounded-lg shadow-lg flex items-center justify-between bg-white">
                      <div className='md:flex-row flex flex-col items-center gap-2'>
                        <img src={product.image} alt={product.title} className="w-20 h-20 mb-4 object-contain" />
                        <h2 className="text-sm font-semibold w-[150px]">{product.title}</h2>
                      </div>
                      <div className='flex flex-col md:flex-row gap-5'>
                        <div className='flex flex-col'>
                          <h3 className="text-black mb-2 md:text-base text-sm">{product.quantity}x</h3>
                          <h3 className="text-black mb-2 md:text-base text-sm">
                            Total: <span className="font-semibold">${(product.price * product.quantity).toFixed(1)}</span>
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => dispatch(removeFromCart(product.id))}
                          className="bg-red-700 text-white py-2 px-4 w-fit rounded-lg hover:bg-red-800 text-xs cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className='rounded-lg shadow-lg w-full px-2 py-3 flex flex-col items-center gap-3 bg-white'>
                    <h2 className="text-lg font-bold">SubTotal: ${totalPrice.toFixed(1)}</h2>

                    
                    <SubmitButton />

                    <Link to="/shop">
                      <button type="button" className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors text-sm cursor-pointer">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

            </section>
          </Form>
        </Formik>




      )}

      
  
</>

  )
}

export default Checkout