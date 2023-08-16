import { call, put, takeEvery } from "redux-saga/effects";
import { getSongs } from "../api";
import { getSongSuccess } from "../Redux/features/songSlice";

// const URL = `https://64dc7c1be64a8525a0f68fd5.mockapi.io`;

// function* fetchSongsSaga() {
//   try {
//     const response = yield call(() =>
//       fetch(`https://64dc7c1be64a8525a0f68fd5.mockapi.io/songs`)
//     );
//     const formattedResponse = yield response.json();
//     yield put(getSongSuccess(formattedResponse));
//   } catch (e) {
//     console.error("Error fetching songs: ", e);
//   }
// }

function* fetchSongsSaga() {
  const songs = yield call(getSongs);
  yield put(getSongSuccess(songs.data));
}

// function* fetchSongsSaga() {
//   const response = yield call(fetch, `${URL}/songs`);
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const data = yield response.json();
//   console.log(data);
//   yield put(fetchSongSuccess(data));
// }

function* watchSongSaga() {
  yield takeEvery("songs/getSongFetch", fetchSongsSaga);
}

export default watchSongSaga;
