import { createContext, useState, useEffect } from "react"

const addCartItem = (cartItems, productToAdd) => {
  // check if cartItems contains productToAdd
  // only return item that matches productToAdd id
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )
  // if we found a match in the cartItems, then we return a new cartItems array
  if (existingCartItem) {
    // the mapping goes through the whole array checking for which product to update
    // and it only updates if there's a match
    // so to add at least one item to the cartItems array, you need return [...cartItems, { ...productToAdd, quantity: 1 }]
    return cartItems.map(
      (cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // if cartItem matches productToAdd, add it to the array and increment quantity
          : cartItem // if it's not the case, return the original item
    )
  }
  // return new array with the new modified cartItems or new cart item
  // this handles the case where it's a new product
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )
  // check if quantity is equal to 1, if it is , remove that item from the cart
  if (existingCartItem.quantity === 1) {
    // return a new array where the item  does not match the cartItem id
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }
  //  if it isn't, return back cartItems with matching cart item with reduced quantity
  return cartItems.map(
    (cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 } // if cartItem matches productToAdd, add it to the array and decrement quantity
        : cartItem // if it's not the case, return the original item
  )
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [], // similar to product but it has quantity property
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )
    setCartCount(newCartCount)
  }, [cartItems])

  // this method is triggered whenever a user clicks on "add to cart" button
  // it receives productToAdd from product card
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    cartItems,
    cartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
