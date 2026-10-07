import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { sendData, fetchData } from "./store/cartActionCreators";

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const hasChanged = useSelector((state) => state.cart.hasChanged);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (hasChanged) {
      dispatch(sendData(cartItems));
    }
  }, [cartItems, dispatch, hasChanged]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

//Async code and side effects in component method:

// useEffect(() => {
//   if (firstRender) {
//     firstRender = false;
//     return;
//   }

//   async function sendData() {
//     dispatch(
//       uiActions.setNotificationData({
//         status: "sending",
//         title: "Sending...",
//         message: "Sending data to the backend.",
//       })
//     );

//     const response = await fetch(
//       "https://advanced-redux-project-backend-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
//       { method: "PUT", body: JSON.stringify(cartItems) }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to send data");
//     }

//     dispatch(
//       uiActions.setNotificationData({
//         status: "success",
//         title: "Success!",
//         message: "Sent data successfully to the backend.",
//       })
//     );
//   }

//   sendData().catch((error) =>
//     dispatch(
//       uiActions.setNotificationData({
//         status: "error",
//         title: "Error!",
//         message: "Failed to send data to the backend.",
//       })
//     )
//   );
// }, [cartItems, dispatch]);
