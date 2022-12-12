import {ReactComponent as ShoppingIcons } from "../../assets/shopping-bag.svg"
import "./cart-icon.styles.scss"

const CardIcon = () => {
  return (
    <div className="cart-icon-container">
        <ShoppingIcons className="shopping-icon" />
        <span className="item-count">0</span>
    </div>
  )
}

export default CardIcon