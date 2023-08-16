import { all } from "redux-saga/effects";
import { watchSongSaga } from "./songSaga";

export default function* rootSaga() {
  yield all([watchSongSaga()]);
}
