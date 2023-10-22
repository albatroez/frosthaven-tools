import { configureStore } from "@reduxjs/toolkit";
import cardsReducer, { initialState as cards } from "./cardsSlice";
import settingsReducer, { initialState as settings } from "./settingsSlice";
import { preloadState, saveToLocalStorage } from "./localStorage";

const preloadedState = preloadState() ?? {
    cards,
    settings,
};

const store = configureStore({
    reducer: {
        cards: cardsReducer,
        settings: settingsReducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(saveToLocalStorage),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
