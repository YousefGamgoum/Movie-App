import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentLang: localStorage.getItem("appLang") || "en",
  availableLangs: ["ar", "en", "fr", "zh"],
};

const languageSlice = createSlice({
  name: "language",
  initialState: INITIAL_STATE,
  reducers: {
    updateCurrentLang: (state, action) => {
      state.currentLang = action.payload;
      document.documentElement.dir = action.payload === "ar" ? "rtl" : "ltr";
      localStorage.setItem("appLang", action.payload);
    },
  },
});

export const { updateCurrentLang } = languageSlice.actions;

export default languageSlice.reducer;