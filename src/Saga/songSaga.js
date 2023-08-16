import { call, put, takeEvery } from "redux-saga/effects";
import { getSongs, createSong } from "../api";
import { getSongSuccess, addSong } from "../Redux/features/songSlice";

function* fetchSongsSaga() {
  const songs = yield call(getSongs);
  yield put(getSongSuccess(songs.data));
}

function* addSongSaga() {
  yield put(addSong(createSong));
}

function* watchSongSaga() {
  yield takeEvery("songs/getSongFetch", fetchSongsSaga);
  yield takeEvery("songs/getAdd", addSongSaga);
}

export default watchSongSaga;
