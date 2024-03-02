import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: 1,
  gameWon: false,
};

export const gameStatus = createSlice({
  name: "gameStatus",
  initialState,
  reducers: {
    _setLevel: (state, action) => {
      state.level = action.payload;
    },
    _setGameWon: (state, action) => {
      state.gameWon = action.payload;
    },
  },
});

export const { _setGameWon, _setLevel } = gameStatus.actions;
export default gameStatus.reducer;
