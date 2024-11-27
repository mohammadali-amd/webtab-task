import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileIdState {
   fileId: "1" | "2";
}

const initialState: FileIdState = {
   fileId: "1"
};

const fileIdSlice = createSlice({
   name: "fileId",
   initialState,
   reducers: {
      setFileId: (state, action: PayloadAction<"1" | "2">) => {
         state.fileId = action.payload;
      },
   },
});

export const { setFileId } = fileIdSlice.actions;

export default fileIdSlice.reducer;
