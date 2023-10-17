import { capitalizeFirstWord } from "./utils/formatNames";
import { Card } from "./Card";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AbilityCard } from "./data/ability-cards";
import {
    selectAvailableCards,
    selectChosenCards,
    selectCurrentClass,
    selectCurrentLevel, selectSortType,
    setCurrentLevel,
    setSortType,
    SORT_TYPES
} from "./app/cardsSlice";

function sortAbilityCards(cards: AbilityCard[], sortType: string): AbilityCard[] {
    switch (sortType) {
        case "initiativeAsc":
            return [...cards].sort((a, b) => {
                return Number(a.initiative) - Number(b.initiative);
            });
        case "initiativeDesc":
            return [...cards].sort((a, b) => {
                return Number(b.initiative) - Number(a.initiative);
            });
        case "levelAsc":
            return [...cards].sort((a, b) => a.levelNo - b.levelNo);
        case "levelDesc":
            return [...cards].sort((a, b) => b.levelNo - a.levelNo);
    }
}

function ChosenCards() {
    const chosenCards = useAppSelector(selectChosenCards);
    const currentClass = useAppSelector(selectCurrentClass);
    const sortType = useAppSelector(selectSortType)
    const sortedCards = sortAbilityCards(chosenCards, sortType)
    return (
        <div className="flex-wrap">
            {sortedCards.map(card => (
                <Card key={card.points} alt={`${capitalizeFirstWord(currentClass)} ${card.name}`} card={card} />
            ))}
        </div>
    );
}

export function Cards() {
    const dispatch = useAppDispatch();
    const currentClass = useAppSelector(selectCurrentClass);
    const availableCards = useAppSelector(selectAvailableCards);
    const level = useAppSelector(selectCurrentLevel);
    const sortType = useAppSelector(selectSortType);
    const filteredCards = availableCards.filter(card => Number(card.levelNo) <= level);
    const sortedCards = sortAbilityCards(filteredCards, sortType);

    return (
        <>
            <select className="ml-2" value={sortType} onChange={e => dispatch(setSortType(e.currentTarget.value))}>
                {Object.values(SORT_TYPES).map(type => (
                    <option value={type} key={type}>
                        {type}
                    </option>
                ))}
            </select>
            <Level />
            <h1 className="mt-2">Your deck</h1>
            <ChosenCards />
            <h1 className="mt-2">Available cards</h1>
            <div className="flex-wrap">
                {sortedCards.map(card => (
                    <Card key={card.points} alt={`${capitalizeFirstWord(currentClass)} ${card.name}`} card={card} />
                ))}
            </div>
        </>
    );
}

function Level() {
    const dispatch = useAppDispatch();
    const level = useAppSelector(selectCurrentLevel);

    return (
        <select value={level} onChange={e => dispatch(setCurrentLevel(e.currentTarget.value))}>
            {Array.from({ length: 9 }, (_, k) => (
                <option value={k + 1} key={`${k + 1}-level`}>
                    {k + 1}
                </option>
            ))}
        </select>
    );
}
