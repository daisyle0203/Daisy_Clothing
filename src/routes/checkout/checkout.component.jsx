import { useContext } from "react"

import { CartContext } from "../../contexts/cart.context"

const Checkout = () => {
  const { cartItems } = useContext(CartContext) 
  
  return (
    <div>
      <h1>Check out page</h1>
      <div>
        {cartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Checkout
