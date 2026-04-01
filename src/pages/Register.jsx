

import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import {  CheckCircle2, Eye, EyeOff, Mail, MailPlus, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogoDark from '../assets/LogoDark.png'
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userslice';

const Register = () => {

  const dispatch = useDispatch()


    const { loginWithGoogle } = useAuth()

    {/* Use States */}
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [passwordValue, setPasswordValue] = useState('')
    const [firebaseError, setFirebaseError] = useState('')



    const navigate = useNavigate()
    const checks =[
    { label: 'At least 8 characters',        test: (password) => password.length >= 8 },
    { label: 'One uppercase letter (A-Z)',    test: (password) => /[A-Z]/.test(password) },
    { label : "One special character (@$!%*?&#)", test: (password) => /[@$!%*?&]/.test(password) }
  ]






  const RegisterSchema =  Yup.object().shape({

  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email Address is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters')
                        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                        .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&#)')
                        .required('Password is required'),

  repeatPassword: Yup.string().oneOf([Yup.ref('password'), null] , 'Passwords must match').required('Re-Enter Password is required'),
                      })




const handleGoogleSignIn = async () => {
  try {

    const result = await loginWithGoogle()

    const user = result.user

    const userData = {
      userName: user.displayName || "User",
      userEmail: user.email,
      userId: user.uid,
    }

    dispatch(setUser(userData))

    localStorage.setItem("userInfo", JSON.stringify(userData))

    navigate("/")

  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      setFirebaseError("Google sign in was cancelled.")
    } else {
      setFirebaseError("Google sign in failed.")
    }


  }
}





  const handleSubmit = async (value) => {
    const auth = getAuth();
   
    try {


      const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
          console.log(userCredential.user)


      await updateProfile(auth.currentUser, {
        displayName: value.name,
      })

      Swal.fire({
        icon: 'success',
        title: 'Account created successfully',
        showConfirmButton: false,
        timer: 1500
        
      }).then(() => (navigate('/')))




    }catch (error) {

  if (error.code === "auth/email-already-in-use") {
    setFirebaseError("An account with this email already exists.");
  }

  else if (error.code === "auth/invalid-email") {
    setFirebaseError("Invalid email address.");
  }

  else if (error.code === "auth/weak-password") {
    setFirebaseError("Password is too weak.");
  }

  else {
    setFirebaseError("Something went wrong. Please try again.");
  }

}
  
  
  
  };













  return (
    <div className='bg-gray-100 min-h-screen grid md:grid-cols-2 grid-cols-1 gap-10   items-center justify-center p-4'>


    
    <div className='flex flex-col  container mx-auto  md:bg-white md:h-screen justify-center items-center relative pt-10 md:mt-0'>
    <img src={LogoDark} alt="Velora Logo" className='lg:w-50 md:w-40 absolute lg:top-35 md:top-45  md:flex hidden ' />

    <div className='flex flex-col lg:-mt-10  items-center justify-center gap-7 '>

      <h1 className='  text-2xl  lg:text-3xl font-bold text-center font-serif text-Black'>Welcome To Velora
      </h1>
            <p className='text-gray-600 text-center max-w-md'>
            Create an account to continue your shopping journey with Velora.
          </p>
    </div>
    </div>

    <div className='flex flex-col items-center justify-center '>
    
    <Formik
    
    initialValues={{
        name : ""
      , email : ""
      , password : ""
      , repeatPassword : ""
    }} 
    
    
    validationSchema={
      RegisterSchema
    }

    onSubmit={handleSubmit}

    >

    {({isSubmitting}) => (

      <Form className='w-full mb-5 md:mb-0 max-w-md  md:max-w-sm lg:max-w-md'>

        <div>
          <label htmlFor="name" className='block text-gray-700 mb-2' >Full Name</label>
        
        <div className='relative'>
        <Field 
        type="text"
        name="name"
        placeholder= "John Doe"
        id="name"
        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500'
        />
        <User  className='absolute right-3 top-3 text-gray-400 w-5 h-5'/>
        </div>
        <ErrorMessage
        name="name"
        component="div"
        className='text-red-500 text-sm mt-1'
        />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>

          <div className='relative'>
          <Field 
            type="email"
            name="email"
            placeholder= "john@example.com"
            id="email"
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500'
          />
          <Mail className='absolute right-3 top-3 text-gray-400 w-5 h-5' />
          
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className='text-red-500 text-sm mt-1'
          />
        </div>


        <div>

          <label htmlFor="password">Password</label>


          <div className='relative'>
          <Field 
            type={`${showPassword ? 'text' : 'password'}`}
            name="password"
            placeholder= "Enter your password"
            id="password"
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500'
            onInput={(e) => setPasswordValue(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
          >
            {showPassword ? (
              <Eye className='h-5 w-5 text-gray-400 ' />
            ) : (
              <EyeOff className='h-5 w-5 text-gray-400 ' />
            )}
          </button>
          </div>


          <ErrorMessage
            name="password"
            component="div"
            className='text-red-500 text-sm mt-1'
          />


          <div className='flex flex-col gap-2 mt-3 mb-5'>
            {checks.map ((check , index) => {
              const isValid = check.test(passwordValue)
              return (
                <div key={index} className='flex items-center gap-1'> 
                   {/* Check icon */}
                  <CheckCircle2 className={`h-6 w-6 ${isValid ? 'text-green-500' : 'text-gray-700'}`} />
                  {/* Condition text */}
                  <span className={`${isValid ? 'text-green-500' : 'text-gray-700'}`}>{check.label}</span>                
                </div>
              )
            }
            )}
          </div>



        </div>

        <div>
          <label htmlFor="repeatPassword">Re-Enter Password</label>

          <div className='relative'>
          <Field 
            type={`${showRepeatPassword ? 'text' : 'password'}`}
            name="repeatPassword"
            placeholder= "Re-Enter your password"
            id="repeatPassword"
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500'
          />
          <button
            type="button"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
          >
            {showRepeatPassword ? (
              <Eye className='h-5 w-5 text-gray-400 ' />
            ) : (
              <EyeOff className='h-5 w-5 text-gray-400 ' />
            )}
          </button>


          </div>



          <ErrorMessage
            name="repeatPassword"
            component="div"
            className='text-red-500 text-sm mt-1'
          />
        </div>

         <button
              type="submit"
              disabled={isSubmitting}
              className='w-full py-2 mt-4 bg-gray-700 text-white rounded-md hover:bg-gray-900 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
            
            {firebaseError && (
              <div className="text-red-500 text-sm mt-3 text-center">
                {firebaseError}
                  </div>
            )}


            {/* Divider */}
<div className='flex items-center gap-3 my-4'>
  <div className='flex-1 h-px bg-gray-200'></div>
  <span className='text-sm text-gray-400'>or</span>
  <div className='flex-1 h-px bg-gray-200'></div>
</div>

{/* Google Button */}
<button
  type="button"
  onClick={handleGoogleSignIn}
  className='w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-all cursor-pointer '
>
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  <span className='text-sm'>Continue with Google</span>
</button>

    <div className='items-center w-full justify-center text-center mt-4'>
    <p className='text-gray-500 text-sm '> 
      Already have an account? <Link to="/login" className='text-blue-500 hover:underline cursor-pointer'>Login here</Link>
    </p>
    </div>


      </Form>



    ) 
    
      
    }







    </Formik>
</div>
</div>

  )
}

export default Register