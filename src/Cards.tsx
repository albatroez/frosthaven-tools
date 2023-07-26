import { capitalizeFirstWord } from "./utils/formatNames";
import { Card } from "./Card";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AbilityCard } from "./data/ability-cards";
import { selectAvailableCards, selectCurrentClass, setSortType, SORT_TYPES } from "./app/cardsSlice";

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
            return [...cards].sort((a, b) => {
                let A = a.level,
                    B = b.level;
                if (a.level === "X") A = 1.5;
                if (b.level === "X") B = 1.5;
                return Number(A) - Number(B);
            });
        case "levelDesc":
            return [...cards].sort((a, b) => {
                if (b.level === "X" && a.level === "X") return 0;
                if (b.level === "X") return -1;
                if (a.level === "X") return 1;
                return Number(b.level) - Number(a.level);
            });
    }
}

export function Cards() {
    const dispatch = useAppDispatch();
    const currentClass = useAppSelector(selectCurrentClass);
    const availableCards = useAppSelector(selectAvailableCards);
    const sortType = useAppSelector(state => state.cards.sortType);
    const sortedCards = sortAbilityCards(availableCards, sortType);

    return (
        <>
            <select value={sortType} onChange={e => dispatch(setSortType(e.currentTarget.value))}>
                {Object.values(SORT_TYPES).map(type => (<option value={type} key={type}>{type}</option>))}
            </select>
            <div className='flex-wrap'>
                {sortedCards.map(card => (
                    <Card key={card.points} alt={`${capitalizeFirstWord(currentClass)} ${card.name}`} card={card} />
                ))}
            </div>
        </>
    );
}
