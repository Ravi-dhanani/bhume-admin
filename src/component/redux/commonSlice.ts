import { createSlice } from "@reduxjs/toolkit";
import AuthServices from "../services/AuthServices";
interface IState {
  isLogged: Boolean;
  isLoading?: Boolean;
  error: any;
}
const initialState: IState = {
  isLogged: !!AuthServices.getToken(),
  error: undefined,
};
export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
      state.error = undefined;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogged, setLoading } = commonSlice.actions;

export default commonSlice.reducer;
