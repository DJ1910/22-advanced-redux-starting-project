import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cartSlice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { id, title, quantity, price } = props;
  const total = quantity * price;

  function updateCartItemQuantity(amount) {
    dispatch(cartActions.updateCartItemQuantity({ id, amount }));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => updateCartItemQuantity(-1)}>-</button>
          <button onClick={() => updateCartItemQuantity(1)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
