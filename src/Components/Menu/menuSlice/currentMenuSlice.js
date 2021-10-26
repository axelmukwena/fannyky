import { createSlice } from '@reduxjs/toolkit'

export const currentMenuSlice = createSlice({
  name: 'menu',
  initialState: {
    menu: [],
  },
  reducers: {
    update: (state, action) => {
      state.menu = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { update } = currentMenuSlice.actions

export default currentMenuSlice.reducer
