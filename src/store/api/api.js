export const getCategories = async () => {
  const res = await fetch('https://dummyjson.com/products/categories');
  return res.json();
};

export const getProducts = async () => {
  const res = await fetch('https://dummyjson.com/products?limit=100');
  return res.json();
};

export const getProductsByCategory = async (category) => {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
};


import { db } from "../../firebaseConfig"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore"


export const getCartFromFirestore = async (userId) => {
  try {
    const docRef = doc(db, "carts", userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data().products || []
    }
    return []
  } catch (error) {
    console.error("Error fetching cart:", error)
    return []
  }
}


export const saveCartToFirestore = async (userId, products) => {
  try {
    const docRef = doc(db, "carts", userId)
    await setDoc(docRef, {
      products,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error saving cart:", error)
  }
}

export const addProductToFirestore = async (userId, products) => {
  try {
    const docRef = doc(db, "carts", userId)
    await setDoc(docRef, {
      products,
      updatedAt: serverTimestamp(),
    }, { merge: true })
  } catch (error) {
    console.error("Error adding product:", error)
  }
}

export const removeProductFromFirestore = async (userId, products) => {
  try {
    const docRef = doc(db, "carts", userId)
    await updateDoc(docRef, {
      products,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error removing product:", error)
  }
}


export const clearCartFromFirestore = async (userId) => {
  try {
    const docRef = doc(db, "carts", userId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error clearing cart:", error)
  }
}