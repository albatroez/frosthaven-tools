import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ClassesEnum, spoilerClasses } from "../data/classes";

type Spoilers = {
    [code in ClassesEnum]: boolean;
}

export const initialState = {
    cardsSize: 60,
    spoilers: spoilerClasses.reduce((acc, curr) => {
        acc[curr] = true;
        return acc;
    }, {}) as Spoilers,
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
        toggleSpoiler: (state, action) => {
            state.spoilers[action.payload] = !state.spoilers[action.payload];
        }
    },
});

export const { setCardsSize, toggleSpoiler } = settingsSlice.actions;

export default settingsSlice.reducer;
