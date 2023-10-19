import "./Search.css"
import { createSignal } from "solid-js";

const [inputText, setInputText] = createSignal("");

export default function Search() {

    const handleInput = (e) => {
        setInputText(e.target.value);
    }

    return (
        <form onSubmit={LookForLoc}>
            <input type="text" placeholder="Søk..." id="search" onInput={handleInput} value={inputText()} required />
        </form>
    )
}

async function LookForLoc(event) {
    console.log("Hello?" + inputText());
    event.preventDefault();

    const response = fetch(`https://nominatim.openstreetmap.org/search.php?q=${inputText()}&format=jsonv2`).then(response => response.text()).then(text => console.log(text));
}