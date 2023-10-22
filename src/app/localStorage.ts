import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { initialState as settings } from "./settingsSlice";
import { allClasses } from "../data/classes";
import { defaultClass, initialState as cards } from "./cardsSlice";

const storageKey = "fh-deckbuilder";

function init() {
    return Object.keys(allClasses).reduce((acc, char) => {
        acc[char] = { deck: [] };
        return acc;
    }, {});
}

export const saveToLocalStorage: Middleware = (api: MiddlewareAPI<AppDispatch, RootState>) => next => action => {
    const result = next(action);
    const state = api.getState();
    const storage = getItem(storageKey);
    if (storage) {
        const toSave = {
            settings: { ...state.settings },
            decks: {
                ...storage.decks,
                [state.cards.currentClass]: { deck: state.cards.chosenCards },
            },
            cards: { ...state.cards },
        };
        window.localStorage.setItem(storageKey, JSON.stringify(toSave));
    } else {
        window.localStorage.setItem(storageKey, JSON.stringify( {
            ...state,
            decks: init(),
        }));
    }
    return result;
};

export function preloadState() {
    const storage = window.localStorage.getItem(storageKey);
    if (storage) {
        const parsed = JSON.parse(storage);
        const currentClass = parsed?.cards?.currentClass ?? defaultClass;
        const chosenCards = parsed?.decks?.[currentClass]?.deck;
        return {
            settings: parsed?.settings ?? settings,
            cards: {
                ...parsed?.cards,
                chosenCards: chosenCards ?? [],
            },
        };
    }
    return null;
}

export function getCardsFromLocalStorage(className: string) {
    const storage = getItem(storageKey);
    return storage?.decks?.[className]?.deck ?? [];
}

function getItem(key: string) {
    try {
        const item = window.localStorage.getItem(key);
        return JSON.parse(item);
    } catch (e) {
        console.error(e);
        return null;
    }
}
