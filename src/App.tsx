import { Cards } from "./Cards";
import { ChooseClass } from "./header/ChooseClass";
import { Settings } from "./header/Settings";


function App() {
    return (
        <>
            <header>
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
