import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./cardsSlice";
import settingsReducer from "./settingsSlice";

const store = configureStore({
    reducer: {
        cards: cardsReducer,
        settings: settingsReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
