import { AUTH } from "../constants/actionTypes.js";
import * as api from "../api/index";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate("/", { replace: true });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/", { replace: true });
  } catch (error) {
    console.log(error);
  }
};
