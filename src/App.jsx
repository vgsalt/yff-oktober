import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar';
import Button from './components/Button';
import Search from './components/Search';

export function HaveGeolocation() {
  if ("geolocation" in navigator) {
    return (
      <p>✅ Geolocation</p>
    )
  } else {
    return (
      <h1>❌ Geolocation</h1>
    )
  }
}

function Hello() {
  console.log("hi")
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
          <p>Gi tilgang til plassering og</p>
          <Button name="Finn fra plassering" />
          <p>eller</p>
          <Search />
      </main>
    </>
  )
}