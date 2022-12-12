import { createContext, useState } from "react"

const addCartItem = (cartItems, productToAdd) => {
  // find it cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )
  // if found, increment quality
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }
  // return new array with modified cartItems/ new cart item
  // this handles the case where it's a new product
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const value = { isCartOpen, setIsCartOpen, addCartItem, cartItems }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
