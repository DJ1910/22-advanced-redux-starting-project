import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

export function fetchData() {
  return async (dispatch) => {
    async function sendHttpRequest() {
      const response = await fetch(
        "https://advanced-redux-project-backend-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json");

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      return response.json();
    }

    try {
      const cartItems = await sendHttpRequest();
      dispatch(cartActions.replaceCart({cartItems}));
    } catch (error) {
      dispatch(
        uiActions.setNotificationData({
          status: "error",
          title: "Error!",
          message: "Failed to fetch data from the backend.",
        })
      );
    }
  };
}

export function sendData(cartItems) {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotificationData({
        status: "sending",
        title: "Sending...",
        message: "Sending data to the backend.",
      })
    );

    async function sendHttpRequest(cartItems) {
      const response = await fetch(
        "https://advanced-redux-project-backend-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cartItems) }
      );

      if (!response.ok) {
        throw new Error("Failed to send data.");
      }
    }

    try {
      await sendHttpRequest(cartItems);
      dispatch(
        uiActions.setNotificationData({
          status: "success",
          title: "Success!",
          message: "Sent data successfully to the backend.",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotificationData({
          status: "error",
          title: "Error!",
          message: "Failed to send data to the backend.",
        })
      );
    }
  };
}
