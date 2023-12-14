import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectSettings, setCardsSize, toggleSpoiler } from "../app/settingsSlice";
import { ClassesEnum, spoilerClasses } from "../data/classes";

export function Settings() {
    const dispatch = useAppDispatch();
    const { cardsSize, spoilers } = useAppSelector(selectSettings);

    return (
        <div className="ml-auto">
            <div className="flex gap-x-1">
                    {spoilerClasses.map(code => (
                        <Icon code={code} key={`${code}-icon`} />
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
    code: ClassesEnum;
};

function Icon({ code }: IconProps) {
    const { spoilers } = useAppSelector(selectSettings);
    const dispatch = useAppDispatch();
    const checked = spoilers[code];
    const id = `${code}-checkbox`;
    const style = checked ? "" : "";

    return (
            <label htmlFor={id} className={`p-1`}>
                <input
                    type="checkbox"
                    id={id}
                    className={`hidden peer`}
                    defaultChecked={checked}
                    onClick={() => dispatch(toggleSpoiler(code))}
                />
                <img
                    srcSet={`icons/fh-${code}-icon.png 20x`}
                    alt={`${code}-icon`}
                    className={"border-2 border-transparent peer-checked:border-blue-800"}
                />
            </label>
    );
}
