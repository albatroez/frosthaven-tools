import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AbilityCard, abilityCards } from "../data/ability-cards";
import { ClassesEnum } from "../data/classes";
import { RootState } from "./store";

interface CardsState {
  currentClass: ClassesEnum;
  availableCards: AbilityCard[];
  chosenCards: AbilityCard[];
  sortType: typeof SORT_TYPES[SortType];
}

const defaultClass = "BB";
export const SORT_TYPES = {
  INITIATIVE_ASC: "initiativeAsc",
  INITIATIVE_DESC: "initiativeDesc",
  LEVEL_ASC: "levelAsc",
  LEVEL_DESC: "levelDesc"
} as const;
export type SortType = keyof typeof SORT_TYPES;

const initialState: CardsState = {
  currentClass: defaultClass,
  availableCards: abilityCards.filter(el => el.image.startsWith(defaultClass) && el.level !== "-"),
  chosenCards: [],
  sortType: SORT_TYPES.LEVEL_ASC
};

export const selectCurrentClass = (state: RootState) => state.cards.currentClass;
export const selectAvailableCards = (state: RootState) => state.cards.availableCards;
// export const selectSortType = (state:RootState)
// export const selectSortedCards = createSelector(selectAvailableCards, (cards))

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setClass: (state, action: PayloadAction<CardsState["currentClass"]>) => {
      state.currentClass = action.payload;
      state.availableCards = abilityCards.filter(el => el.image.startsWith(action.payload) && el.level !== "-");
    },
    setAvailableCards: (state, action) => {
      state.availableCards = action.payload;
    },
    setChosenCards: (state, action) => {
      state.chosenCards = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload
    }
  }
});

export const { setClass, setAvailableCards, setChosenCards, setSortType } = cardsSlice.actions;

export default cardsSlice.reducer;
