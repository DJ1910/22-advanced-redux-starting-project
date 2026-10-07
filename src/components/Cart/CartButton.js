import { useSelector, useDispatch } from "react-redux";

import { uiActions } from "../../store/uiSlice";
import classes from "./CartButton.module.css";

const CartButton = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity , 0);

  function toggleCartVisibility() {
    dispatch(uiActions.toggleCartVisibility());
  }

  return (
    <button className={classes.button} onClick={toggleCartVisibility}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItemsInCart}</span>
    </button>
  );
};

export default CartButton;
