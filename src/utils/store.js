import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '../currentUser/currentUserSlice'
import currentMenuReducer from '../Components/Menu/menuSlice/currentMenuSlice'

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    currentMenu: currentMenuReducer,
  },
})

export default store
