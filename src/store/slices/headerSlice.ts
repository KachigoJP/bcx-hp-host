import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMenuItem } from "@utils/interfaces/index";

interface HeaderState {
  menus: IMenuItem[];
}

const initialState: HeaderState = {
  menus: [],
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setMenus(state, action: PayloadAction<IMenuItem[]>) {
      state.menus = action.payload;
    },
  },
});

export const { setMenus } = headerSlice.actions;
export default headerSlice.reducer;
