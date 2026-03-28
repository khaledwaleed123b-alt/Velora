import { createContext, useContext, useEffect, useState } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { auth, googleProvider } from "../firebaseConfig"


// 1. Create the context
const AuthContext = createContext()

// 2. Custom hook for easy access
export const useAuth = () => useContext(AuthContext)

// 3. The provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Listen to auth state changes (login, logout, page refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe // cleanup on unmount
  }, [])

  // Login with email & password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Register with email & password
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login with Google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  // Logout
  const logout = () => {
    return signOut(auth)
  }

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider