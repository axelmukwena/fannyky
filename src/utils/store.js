import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../currentUser/currentUserSlice";
//import userMiddleware from "./localStorage";

const store = configureStore({
	reducer: {
		currentUser: currentUserReducer,
	},

	//middleware: (getDefaultMiddleware) =>
	//	getDefaultMiddleware().concat(userMiddleware),
});

export default store;
