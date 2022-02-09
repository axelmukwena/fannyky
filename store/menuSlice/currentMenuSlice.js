import { createSlice } from "@reduxjs/toolkit";

export const currentMenuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: null,
    siteName: ["", "/"],
    activeMenu: null,
  },
  reducers: {
    updateMenu: (state, action) => {
      state.menu = action.payload;
    },
    updateSiteName: (state, action) => {
      state.siteName = action.payload;
    },
    updateActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateMenu, updateSiteName, updateActiveMenu } =
  currentMenuSlice.actions;

export default currentMenuSlice.reducer;
