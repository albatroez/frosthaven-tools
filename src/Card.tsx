import { AbilityCard } from "./data/ability-cards";

export function Card({ card, alt, order }: { card: AbilityCard; alt: string; order: number }) {
    return (
        <img src={card.image} alt={`${alt} ${card.name}`} className={`m-2.5 inline-block`} style={{ order: order }} />
    );
}
