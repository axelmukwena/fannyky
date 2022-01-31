import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUser/currentUserSlice";
import currentMenuReducer from "./menuSlice/currentMenuSlice";
import currentPainterReducer from "./painterSlice/currentPainterSlice";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    currentMenu: currentMenuReducer,
    currentPainter: currentPainterReducer,
  },
});

export default store;
