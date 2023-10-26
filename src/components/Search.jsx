import "./Search.css"
import { createSignal } from "solid-js";
import { responseJson, setLocation, setResponseJson } from "./responseJson";
import { setViewState } from "../App";

const [inputText, setInputText] = createSignal("");

export default function Search() {

    const handleInput = (e) => {
        setInputText(e.target.value);
    }

    return (
        <form onSubmit={LookForLoc}>
            <input type="text" placeholder="Søk..." id="search" onInput={handleInput} value={inputText()} required />
            {/* For hver plassering i svaret fra nominatim, vis dette */}
            <div class="results">
                <For each={responseJson()}>{(location, i) =>
                    <a href="#" onClick={() => {
                            console.log(`Trykket på ${location.display_name} (${location.lat} / ${location.lon})`)
                            setLocation([location.lat, location.lon]);
                            setViewState(2);
                        }}>
                        {location.display_name}
                    </a>
                }</For>
            </div>
        </form>
    )
}

async function LookForLoc(event) {
    event.preventDefault();

    const response = fetch(`https://nominatim.openstreetmap.org/search.php?q=${inputText()}&format=jsonv2`).then(response => response.text()).then(text => {
        console.log(JSON.parse(text));
        setResponseJson(JSON.parse(text));
    });
}