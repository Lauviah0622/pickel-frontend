import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios";

const statusSlice = createSlice({
  name: "useState",
  initialState: {
    isLoading: false,
    errMessage: "",
  },
  reducers: {
    /* eslint-disable */
    setError(state, { payload }) {
      state.isLoading = true;
      state.errMessage = payload;
    },
    resetError(state) {
      state.isLoading = false;
      state.errMessage = "";
    },
    /* eslint-enable */
  },
});

export default statusSlice.reducer;
export const { setError } = statusSlice.actions;


// TODO: 內容驗證改好了記得把 distpatch 加上去，然後串上回傳值做錯誤判斷
// eslint-disable-next-line no-unused-vars
export const createEventReq = (eventData) => async (dispatch) => {
  try {
    if (eventData.name.length === 0) throw Error();
    const createEventRes = await axios.post("event", eventData);
    console.log(createEventRes);
  } catch (err) {
    if (!err.response) {
      setError(err.message);
    }
    console.log(err.response);
  }
};
