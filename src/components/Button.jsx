import "./Button.css";

export default function Button({onClick, name}) {
    return ( 
        <button class="button" type="button" onClick={onClick}>{name}</button>
    )
}