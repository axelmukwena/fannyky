import { createSlice } from "@reduxjs/toolkit";

export const currentMenuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: [],
    siteName: ["Buda Fans", "/"],
  },
  reducers: {
    updateMenu: (state, action) => {
      state.menu = action.payload;
    },
    updateSiteName: (state, action) => {
      state.siteName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateMenu, updateSiteName } = currentMenuSlice.actions;

export default currentMenuSlice.reducer;
