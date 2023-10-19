import "./Button.css";

export default function Button({action, name}) {
    console.log(action)

    return ( 
        <>
            <button class="button" onClick={action}>{name}</button>
        </>
    )
}