import { Dispatch } from "redux";
import { HeaderData } from "@components/layout/Header";

export const FETCH_HEADER_DATA = "FETCH_HEADER_DATA";

export const fetchHeaderData = () => async (dispatch: Dispatch) => {
  const res = await fetch("API_ENDPOINT_FOR_HEADER_DATA");
  const data: HeaderData = await res.json();
  dispatch({
    type: FETCH_HEADER_DATA,
    payload: data,
  });
};
