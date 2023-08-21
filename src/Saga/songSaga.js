import { call, put, takeEvery } from "redux-saga/effects";
import {
  getSongsApi,
  createSongApi,
  deleteSongApi,
  updateSongApi,
} from "../api";
import {
  getSongSuccess,
  deleteSongSuccess,
  addSongSuccess,
  updateSongSuccess,
} from "../Redux/features/songSlice";

function* fetchSongsSaga() {
  const songs = yield call(getSongsApi);
  yield put(getSongSuccess(songs.data));
}

function* addSongSaga(action) {
  try {
    const newSongData = action.payload;
    const response = yield call(createSongApi, newSongData);
    console.log("Response: ", response);

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

function* updateSongSaga(action) {
  try {
    const updatedData = action.payload.data;
    const updatedId = action.payload.id;
    const response = yield call(updateSongApi, updatedId, updatedData);

    yield put(updateSongSuccess(response.data));
  } catch (error) {
    console.error("Updating Error: ", error);
  }
}

function* watchSongSaga() {
  yield takeEvery("songs/getSongFetch", fetchSongsSaga);
  yield takeEvery("songs/addSong", addSongSaga);
  yield takeEvery("songs/updateSongFetch", updateSongSaga);
  yield takeEvery("songs/deleteSongFetch", deleteSongSaga);
}

export default watchSongSaga;
