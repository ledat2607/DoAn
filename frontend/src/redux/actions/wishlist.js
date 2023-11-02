import axios from "axios";
import { server } from "../../server";

export const addToWishlist =
  (userId, shopId, productId) => async (dispatch) => {
    try {
      dispatch({
        type: "wishlistCreateRequest",
      });

      const { data } = await axios.post(`${server}/wishlist/add-to-wishlist`, {
        userId,
        shopId,
        productId,
      });

      dispatch({
        type: "wishlistCreateSuccess",
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: "wishlistCreateFail",
        payload: error.response.data.message,
      });
    }
  };
export const getAllWishlistItemsUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllwishlistItemsUserRequest",
    });

    const { data } = await axios.get(
      `${server}/wishlist/get-items-in-wishlist-of-user/${id}`
    );
    dispatch({
      type: "getAllwishlistItemsUserSuccess",
      payload: data.wishlistItems,
    });
  } catch (error) {
    dispatch({
      type: "getAllwishlistItemsUserFailed",
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
      `${server}/wishlist/delete-items-in-wishlist/${id}`,
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
