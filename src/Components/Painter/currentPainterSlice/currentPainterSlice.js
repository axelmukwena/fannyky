import { createSlice } from '@reduxjs/toolkit'

export const currentPainterSlice = createSlice({
  name: 'painter',
  initialState: {
    painter: {},
  },
  reducers: {
    updatePainter: (state, action) => {
      state.painter = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updatePainter } = currentPainterSlice.actions

export default currentPainterSlice.reducer
