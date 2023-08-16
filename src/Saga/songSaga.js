import { call, put, takeEvery } from "redux-saga/effects";
import { getSongs } from "../api";
import { fetchSongSuccess } from "../Redux/features/songSlice";

function* fetchSongsSaga() {
  try {
    const response = yield call(getSongs);
    console.log("response", response);
    yield put(fetchSongSuccess(response.data));
  } catch (e) {
    console.error("Error fetching songs: ", e);
  }
}

export function* watchSongSaga() {
  yield takeEvery("songs/fetchSongSuccess", fetchSongSuccess);
}
