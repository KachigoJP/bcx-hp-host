import { FETCH_HEADER_DATA } from "../actions/headerActions";
import { HeaderData } from "@components/layout/Header";

const initialState = {
  data: {} as HeaderData,
};

const headerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_HEADER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default headerReducer;
