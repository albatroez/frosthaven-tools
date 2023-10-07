import { AbilityCard } from "./data/ability-cards";
import { useAppDispatch } from "./app/hooks";
import { chooseCard } from "./app/cardsSlice";

export function Card({ card, alt, order }: { card: AbilityCard; alt: string; order: number }) {
    const dispatch = useAppDispatch();
    return (
        <img src={card.image} alt={`${alt} ${card.name}`} className={`m-2.5 inline-block`} style={{ order: order }} onClick={() => dispatch(chooseCard(card))} />
    );
}
