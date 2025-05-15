import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const makeStore = () => createStore(rootReducer);

export const wrapper = createWrapper(makeStore);
