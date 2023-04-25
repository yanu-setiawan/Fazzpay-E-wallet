import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createPin from "pages/create-pin";

const initialState = {
  data: {
    id: null,
    token: null,
    pin: null,
  },
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const createPinUser = createAsyncThunk(
  "users/patch",
  async ({ id, pin, token }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await createPin(id, pin, token);
      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPinUser.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      })
      .addCase(createPinUser.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(createPinUser.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const usersAction = {
  ...userSlice.actions,
  createPinUser,
};

export default userSlice.reducer;
