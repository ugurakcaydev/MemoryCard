import { configureStore } from "@reduxjs/toolkit";
import gameStatus from "./gameStatus";

const store = configureStore({
  reducer: {
    gameStatus,
  },
});
export default store;
