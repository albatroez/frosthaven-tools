import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const initialState = {
    cardsSize: 60,
    spoilers: {},
};

export const selectSettings = (state: RootState) => state.settings;
export const selectCardSize = (state: RootState) => state.settings.cardsSize;

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setCardsSize: (state, action: PayloadAction<number>) => {
            state.cardsSize = action.payload;
        },
    },
});

export const { setCardsSize } = settingsSlice.actions;

export default settingsSlice.reducer;
