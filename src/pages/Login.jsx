import * as Yup from 'yup'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import LogoDark from '../assets/LogoDark.png'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userslice'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loginWithGoogle } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [firebaseError, setFirebaseError] = useState('')

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  })

const handleGoogleSignIn = async () => {
  try {

    const result = await loginWithGoogle()

    const user = result.user

    const userData = {
      userName: user.displayName,
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

  const handleSubmit = async (values, { setSubmitting }) => {

    const auth = getAuth()
    setFirebaseError('')

    try {

      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )

      const user = userCredential.user

const userData = {
  userName: user.displayName || "User",
  userEmail: user.email,
  userId: user.uid,
};

dispatch(setUser(userData))

localStorage.setItem("userInfo", JSON.stringify(userData))

      await Swal.fire({
        icon: 'success',
        title: 'Login successful',
        showConfirmButton: false,
        timer: 1500
      })

      navigate('/')

    } catch (error) {

      if (error.code === "auth/invalid-email") {
        setFirebaseError("Invalid email address.")
      }

      else if (error.code === "auth/user-not-found") {
        setFirebaseError("User not found.")
      }

      else if (error.code === "auth/wrong-password") {
        setFirebaseError("Wrong password.")
      }

      else {
        setFirebaseError("Something went wrong.")
      }

    } finally {
      setSubmitting(false)
    }

  }





  return (

   <div className='bg-gray-100 min-h-screen grid md:grid-cols-2 grid-cols-1 gap-10   items-center justify-center'>

      {/* Left Section */}

     <div className='flex flex-col  container mx-auto  md:bg-white md:h-screen justify-center items-center relative pt-10 md:mt-0'>

       <img src={LogoDark} alt="Velora Logo" className='lg:w-50 md:w-40 absolute lg:top-35 md:top-45  md:flex hidden ' />

        <div className='flex flex-col    lg:-mt-10  items-center justify-center gap-7 '>

          <h1 className='  text-2xl  lg:text-3xl font-bold text-center font-serif text-Black'>
            Welcome Back To Velora
          </h1>

          <p className='text-gray-600 text-center max-w-md'>
            Sign in to continue your shopping journey with Velora.
          </p>

        </div>
      </div>

      {/* Right Section */}

      <div className='flex flex-col items-center justify-center container mx-auto'>

        <Formik

          initialValues={{
            email: "",
            password: ""
          }}

          validationSchema={LoginSchema}

          onSubmit={handleSubmit}

        >

          {({ isSubmitting }) => (

            <Form className='w-full max-w-md lg:max-w-md md:max-w-sm space-y-4'>

              {/* Email */}

              <div>

                <label>Email Address</label>

                <div className='relative'>

                  <Field
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className='w-full px-3 py-2 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-black'
                  />

                  <Mail className='absolute right-3 top-3 text-gray-400 w-5 h-5' />

                </div>

                <ErrorMessage
                  name="email"
                  component="div"
                  className='text-red-500 text-sm mt-1'
                />

              </div>

              {/* Password */}

              <div>

                <label>Password</label>

                <div className='relative'>

                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    className='w-full px-3 py-2 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-black'
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-3 cursor-pointer'
                  >
                    {showPassword
                      ? <Eye className='w-5 h-5 text-gray-400' />
                      : <EyeOff className='w-5 h-5 text-gray-400' />
                    }
                  </button>

                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className='text-red-500 text-sm mt-1'
                />

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={isSubmitting}
                className='w-full py-2 bg-gray-900 text-white rounded-md hover:bg-black transition cursor-pointer disabled:bg-gray-700 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Signing in...' : 'Login'}
              </button>

              {firebaseError && (
                <div className="text-red-500 text-sm text-center">
                  {firebaseError}
                </div>
              )}

              {/* Divider */}

              <div className='flex items-center gap-3 my-4'>
                <div className='flex-1 h-px bg-gray-300'></div>
                <span className='text-sm text-gray-400'>or</span>
                <div className='flex-1 h-px bg-gray-300'></div>
              </div>

{/* Google Button */}
<button
  type="button"
  onClick={handleGoogleSignIn}
  className='w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-all cursor-pointer'
>
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  <span className='text-sm'>Continue with Google</span>
</button>

              {/* Register */}

              <p className='text-center text-sm text-gray-500 mt-4'>
                Don't have an account?
                <Link to="/register" className='text-blue-500 ml-1 cursor-pointer hover:underline'>
                  Register
                </Link>
              </p>

            </Form>

          )}

        </Formik>

      </div>

    </div>
  )
}

export default Login