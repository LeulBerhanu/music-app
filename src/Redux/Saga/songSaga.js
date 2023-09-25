import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getSongsApi,
  createSongApi,
  deleteSongApi,
  updateSongApi,
  getSongApi,
} from "../../api";
import {
  getSongsSuccess,
  deleteSongSuccess,
  addSongSuccess,
  updateSongSuccess,
  getSongIdSuccess,
} from "../features/songSlice";

function* fetchSongIdSaga(action) {
  try {
    const songId = action.payload;
    const response = yield call(getSongApi, songId);

    yield put(getSongIdSuccess(response.data));
  } catch (error) {
    console.error("Error fetching song: ", error);
  }
}

function* fetchSongsSaga() {
  try {
    const songs = yield call(getSongsApi);
    yield put(getSongsSuccess(songs.data));
  } catch (error) {
    console.error("Error fetching songs: ", error);
  }
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
    const deleteSongId = action.payload;
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

    console.log("response", response);

    yield put(updateSongSuccess(response.data));
  } catch (error) {
    console.error("Updating Error: ", error);
  }
}

function* watchSongSaga() {
  yield takeEvery("songs/getSongIdFetch", fetchSongIdSaga);
  yield takeEvery("songs/getSongsFetch", fetchSongsSaga);
  yield takeLatest("songs/addSong", addSongSaga);
  yield takeEvery("songs/updateSongFetch", updateSongSaga);
  yield takeEvery("songs/deleteSongFetch", deleteSongSaga);
}

export default watchSongSaga;
