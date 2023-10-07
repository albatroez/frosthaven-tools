import { Cards } from "./Cards";
import { ChooseClass } from "./header/ChooseClass";
import { Settings } from "./header/Settings";

function App() {
    return (
        <>
            <header className="flex">
                <ChooseClass />
                <Settings />
            </header>
            <main>
                <Cards />
            </main>
        </>
    );
}

export default App;
