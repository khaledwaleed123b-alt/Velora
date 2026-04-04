import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export const Thankyou = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-md">

        {/* Animated checkmark */}
        <div className="w-20 h-20 rounded-full border-2 border-gray-900 flex items-center justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-900"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Text */}
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Order confirmed</p>
        <h1 className="text-3xl font-medium text-gray-900 mb-4">Thank you!</h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-10">
          Your order has been placed successfully.
          We appreciate your trust in Velora.
        </p>

        {/* Order summary pill */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-full px-6 py-3 mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M20 12V22H4V12" />
            <path d="M22 7H2v5h20V7z" />
            <path d="M12 22V7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
          <span className="text-xs text-gray-500">
            Estimated delivery in 3–5 business days
          </span>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate('/products')}
          className="w-full max-w-xs h-11 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Continue shopping
        </button>

        {/* Back home link */}
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-xs text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          Back to home
        </button>

      </div>
    </motion.div>
  )
}


export default Thankyou