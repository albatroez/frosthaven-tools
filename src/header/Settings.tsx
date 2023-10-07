import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCardSize, setCardsSize } from "../app/settingsSlice";

export function Settings() {
    const dispatch = useAppDispatch();
    const cardsSize = useAppSelector(selectCardSize);

    return (
        <div className="ml-auto">
            <label htmlFor="cardsSize">Choose the size of cards</label>
            <input
                value={cardsSize}
                onChange={e => dispatch(setCardsSize(e.currentTarget.value))}
                type="range"
                id="cardsSize"
                name="cardsSize"
                list="markers"
            />
        </div>
    );
}
