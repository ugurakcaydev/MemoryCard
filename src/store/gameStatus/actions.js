import store from "../../store";
import { _setGameWon, _setLevel } from "../../store/gameStatus/index";

export const setGameWon = (data) => store.dispatch(_setGameWon(data));
export const setLevel = (data) => store.dispatch(_setLevel(data));
