import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectSettings, setCardsSize } from "../app/settingsSlice";
import { spoilerClasses } from "../data/classes";

export function Settings() {
    const dispatch = useAppDispatch();
    const { cardsSize, spoilers } = useAppSelector(selectSettings);

    return (
        <div className="ml-auto">
            <div className="flex">
                {spoilerClasses.map(code => (
                    <Icon code={code} />
                ))}
            </div>
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

type IconProps = {
    code: string;
};

function Icon({ code }: IconProps) {
    return <img srcSet={`icons/fh-${code}-icon.png 20x`} alt={`${code}-icon`} className="m-0.5" />;
}
