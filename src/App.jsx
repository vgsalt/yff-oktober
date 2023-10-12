import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

export function HaveGeolocation() {
  if ("geolocation" in navigator) {
    return (
      <p>✅ geoloc</p>
    )
  } else {
    return (
      <h1>No.</h1>
    )
  }
}

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <Navbar />
      <main>
          <HaveGeolocation />
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} class="logo" alt="Vite logo" />
          </a>
          <a href="https://solidjs.com" target="_blank">
            <img src={solidLogo} class="logo solid" alt="Solid logo" />
          </a>
        <h1>Vite + Solid</h1>
        <div class="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count()}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p class="read-the-docs">
          Click on the Vite and Solid logos to learn more
        </p>
      </main>
    </>
  )
}

export default App
