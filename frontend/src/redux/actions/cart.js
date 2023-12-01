import axios from "axios";
import { server } from "../../server";

export const addToCart =
  (userId, shopId, productId, qty, priceToAdd) => async (dispatch) => {
    try {
      dispatch({
        type: "cartCreateRequest",
      });

      const { data } = await axios.post(`${server}/cart/add-to-cart`, {
        userId,
        shopId,
        productId,
        qty,
        priceToAdd,
      });

      dispatch({
        type: "cartCreateSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "cartCreateFail",
        payload: error.response.data.message,
      });
    }
  };
export const getAllCartItemsUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCartItemsUserRequest",
    });

    const { data } = await axios.get(
      `${server}/cart/get-items-in-cart-of-user/${id}`
    );
    dispatch({
      type: "getAllCartItemsUserSuccess",
      payload: data.cartItems,
    });
  } catch (error) {
    dispatch({
      type: "getAllCartItemsUserFailed",
      payload: error.response.data.message,
    });
  }
};
//delete items in cart
export const deleteItems = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteItemsRequest",
    });

    const { data } = await axios.delete(
      `${server}/cart/delete-items-in-cart/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteItemsSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteItemsFailed",
      payload: error.response.data.message,
    });
  }
};
