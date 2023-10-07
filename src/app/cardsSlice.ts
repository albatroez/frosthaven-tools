import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AbilityCard, abilityCards } from "../data/ability-cards";
import { ClassesEnum } from "../data/classes";
import { RootState } from "./store";

interface CardsState {
    currentClass: ClassesEnum;
    availableCards: readonly AbilityCard[];
    chosenCards: AbilityCard[];
    sortType: (typeof SORT_TYPES)[SortType];
    currentLevel: number;
}

const defaultClass = "BB";
export const SORT_TYPES = {
    INITIATIVE_ASC: "initiativeAsc",
    INITIATIVE_DESC: "initiativeDesc",
    LEVEL_ASC: "levelAsc",
    LEVEL_DESC: "levelDesc",
} as const;
export type SortType = keyof typeof SORT_TYPES;

const initialState: CardsState = {
    currentClass: defaultClass,
    availableCards: abilityCards[defaultClass],
    chosenCards: [],
    sortType: SORT_TYPES.LEVEL_ASC,
    currentLevel: 1,
};

export const selectCurrentClass = (state: RootState) => state.cards.currentClass;
export const selectAvailableCards = (state: RootState) => state.cards.availableCards;
export const selectCurrentLevel = (state: RootState) => state.cards.currentLevel;
export const selectChosenCards = (state: RootState) => state.cards.chosenCards;
// export const selectSortType = (state:RootState)
// export const selectSortedCards = createSelector(selectAvailableCards, (cards))

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setClass: (state, action: PayloadAction<CardsState["currentClass"]>) => {
            state.currentClass = action.payload;
            state.availableCards = abilityCards[action.payload];
            state.chosenCards = [];
        },
        setAvailableCards: (state, action) => {
            state.availableCards = action.payload;
        },
        setChosenCards: (state, action) => {
            state.chosenCards = action.payload;
        },
        setSortType: (state, action) => {
            state.sortType = action.payload;
        },
        setCurrentLevel: (state, action) => {
            state.currentLevel = action.payload;
        },
        chooseCard: (state, action) => {
            const index = state.chosenCards.findIndex(card => card.cardno === action.payload.cardno);
            if (index !== -1) {
                state.chosenCards.splice(index, 1);
            } else {
                state.chosenCards.push(action.payload);
            }
        },
    },
});

export const { setClass, setAvailableCards, setChosenCards, setSortType, setCurrentLevel, chooseCard } =
    cardsSlice.actions;

export default cardsSlice.reducer;
