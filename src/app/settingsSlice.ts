import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
    cardsSize: 100,
    spoilers: {},
};

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