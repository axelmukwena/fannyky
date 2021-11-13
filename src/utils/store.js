import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../currentUser/currentUserSlice";
import currentMenuReducer from "../Components/Menu/menuSlice/currentMenuSlice";
import currentPainterReducer from "../Components/Painter/painterSlice/currentPainterSlice";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    currentMenu: currentMenuReducer,
    currentPainter: currentPainterReducer,
  },
});

export default store;
