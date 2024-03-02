import { useSelector } from "react-redux";

export const useGameStatus = () =>
  useSelector((state) => state.gameStatus);
