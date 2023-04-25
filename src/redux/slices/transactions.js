import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getTransactions = createAsyncThunk(
  "transaction/post",
  async ({ receiverId, amount, notes, image, firstName, lastName, noTelp }) => {
    try {
      return { receiverId, amount, notes, image, firstName, lastName, noTelp };
    } catch (err) {
      return err;
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    filter: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getTransactions.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getTransactions.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const transactionActions = {
  ...transactionSlice.actions,
  getTransactions,
};
export default transactionSlice.reducer;
