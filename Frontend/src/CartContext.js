import { createContext } from "react";

const CartContext = createContext({
  items: [],
  quotes: [],
  cartCount: 0,
  cartAnimationId: 0,
  subtotal: 0,
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  submitQuote: () => {},
});

export default CartContext;
