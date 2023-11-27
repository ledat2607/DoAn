import axios from "axios";
import { server } from "../../server";

export const loadAdminRequest = () => ({
  type: "LoadAdminRequest",
});

export const loadAdminSuccess = (data) => ({
  type: "LoadAdminSuccess",
  payload: data.admin,
});

export const loadAdminFail = (error) => ({
  type: "LoadAdminFail",
  payload: error.response.data.message,
});

export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch(loadAdminRequest());
    const { data } = await axios.get(`${server}/user/get-admin`, {
      withCredentials: true,
    });
    dispatch(loadAdminSuccess(data));
  } catch (error) {
    dispatch(loadAdminFail(error));
  }
};
