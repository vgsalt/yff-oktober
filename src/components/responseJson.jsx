import { createSignal } from "solid-js";


export const [responseJson, setResponseJson] = createSignal("");
// Denne blir brukt for koordinatene for stedet brukeren søkte for.
export const [location, setLocation] = createSignal([]);
