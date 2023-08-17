import { call, put, takeEvery } from "redux-saga/effects";
import { getSongsApi, createSongApi, deleteSongApi } from "../api";
import {
  getSongSuccess,
  addSong,
  deleteSongSuccess,
  addSongSuccess,
} from "../Redux/features/songSlice";

function* fetchSongsSaga() {
  const songs = yield call(getSongsApi);
  yield put(getSongSuccess(songs.data));
}

function* addSongSaga(action) {
  try {
    const newSongData = action.payload;
    const response = yield call(createSongApi, newSongData);

    yield put(addSongSuccess(response.data));
  } catch (error) {
    console.error("Error adding song: ", error);
  }
}

function* deleteSongSaga(action) {
  try {
    const deleteSongId = action.payload.id;
    yield call(deleteSongApi, deleteSongId);

    yield put(deleteSongSuccess(deleteSongId));
  } catch (error) {
    console.error("Deleting Error: ", error);
  }
}

function* watchSongSaga() {
  yield takeEvery("songs/getSongFetch", fetchSongsSaga);
  yield takeEvery("songs/addSong", addSongSaga);
  yield takeEvery("songs/deleteSongFetch", deleteSongSaga);
}

export default watchSongSaga;
