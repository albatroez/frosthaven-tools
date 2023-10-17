import { AbilityCard } from "./data/ability-cards";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { chooseCard } from "./app/cardsSlice";
import { selectCardSize } from "./app/settingsSlice";

export function Card({ card, alt, order }: { card: AbilityCard; alt: string; order: number }) {
    const dispatch = useAppDispatch();
    const cardsSize = useAppSelector(selectCardSize);
    return (
        <img
            // width={`${cardsSize}%`}
            src={card.image}
            srcSet={`${card.image} ${100/cardsSize}x`}
            alt={`${alt} ${card.name}`}
            className={`m-1 inline-block`}
            style={{ order: order }}
            onClick={() => dispatch(chooseCard(card))}
        />
    );
}
