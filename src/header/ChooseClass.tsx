import { allClasses } from "../data/classes";
import { capitalizeFirstWord } from "../utils/formatNames";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ChangeEvent } from "react";
import { setClass } from "../app/cardsSlice";

export function ChooseClass() {
    const currentClass = useAppSelector(state => state.cards.currentClass);
    const dispatch = useAppDispatch();
    const selectClass = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setClass(event.currentTarget.value));
        console.log("class selected");
    };
    return (
        <select onChange={selectClass} value={currentClass} className='text-3xl border-2' name='select-class'>
            {Object.entries(allClasses).map(([shortCode, { name }], index) => (
                <option value={shortCode} key={index}>
                    {capitalizeFirstWord(name || shortCode)}
                </option>
            ))}
        </select>
    );
}
