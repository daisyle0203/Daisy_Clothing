import { useContext } from "react"

import { ReactComponent as ShoppingIcons } from "../../assets/shopping-bag.svg"

import { CartContext } from "../../contexts/cart.context"

import "./cart-icon.styles.scss"

const CardIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcons className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CardIcon
