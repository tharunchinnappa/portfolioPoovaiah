import axios from "axios";
import {
  SHOWCASE_LIST_REQUEST,
  SHOWCASE_LIST_SUCCESS,
  SHOWCASE_LIST_FAIL,
  SHOWCASE_CREATE_REQUEST,
  SHOWCASE_CREATE_SUCCESS,
  SHOWCASE_CREATE_FAIL,
} from "../constants/showcaseConstants";

export const listShowcaseItems = () => async (dispatch) => {
  try {
    dispatch({ type: SHOWCASE_LIST_REQUEST });
    const { data } = await axios.get("/api/showcase");
    dispatch({
      type: SHOWCASE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOWCASE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createShowcaseItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOWCASE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/showcase`, {}, config);

    dispatch({
      type: SHOWCASE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOWCASE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
