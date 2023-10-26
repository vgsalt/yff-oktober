import { createSignal } from 'solid-js'

import './App.css'
import Navbar from './components/Navbar';
import Button from './components/Button';
import Search from './components/Search';
import Spinner from './components/Spinner';
import { setLocation, location } from './components/responseJson';

let crd = ""

export const [viewState, setViewState] = createSignal(0);

const [loading, setLoading] = createSignal(0);

function geoSuccess(pos) {
  crd = pos.coords;
  console.log(`Lat: ${crd.latitude}`, `Long: ${crd.longitude}`, `Nøyaktighet (i meter): ${crd.accuracy}`);
  setLocation([crd.latitude, crd.longitude])
  setLoading(0);
  setViewState(2);
}

export default function App() {
  return (
    <>
      <Navbar />
      {viewState() == 1 || viewState() == 0 ?
        <main>
            <p>Gi tilgang til plassering og</p>
            <Button name="Finn fra plassering" onClick={() => {setLoading(1); navigator.geolocation.getCurrentPosition(geoSuccess)}} />
            {loading() == 1 ?
              <p class="loading"><Spinner />henter plassering</p>
            : ''}
            <p>eller</p>
            <Search />
        </main>
      : ''}
      {viewState() == 2 ?
        <main>
          {
            () => {
              console.log("test")
              const request = fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location()[0]}&lon=${location()[1]}`)
            }
          }
          <h1>Test</h1>
          <p>{location()}</p>
          <a href="#" onClick={() => setViewState(0)}>Gå tilbake</a>
        </main>
      : ''}
    </>
  )
}