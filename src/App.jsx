import { createSignal } from 'solid-js'

import './App.css'
import Navbar from './components/Navbar';
import Button from './components/Button';
import Search from './components/Search';
import Spinner from './components/Spinner';
import './colorchange.css'
import { setLocation, location, weatherData, setWeatherData } from './components/responseJson';
import dayjs from 'dayjs';

let crd = ""

export const [viewState, setViewState] = createSignal(0);

const [loading, setLoading] = createSignal(0);

function geoSuccess(pos) {
  crd = pos.coords;
  console.log(`Lat: ${crd.latitude}`, `Long: ${crd.longitude}`, `Nøyaktighet (i meter): ${crd.accuracy}`);
  const response = fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${crd.latitude}&lon=${crd.longitude}&zoom=18&format=jsonv2`).then(r => r.text()).then(text => {
    setLocation([crd.latitude, crd.longitude, JSON.parse(text).name])
    setLoading(0);
    setViewState(2);
  }).catch(e => {
    alert("Noe gikk galt med å finne plasseringen din. Prøv å søk det opp i stedet.")
    console.error(e)
    setLoading(0);
  })
}

export default function App() {
  return (
    <>
      <Navbar />
      {viewState() == 1 || viewState() == 0 ?
        <main>
          {()=>{
            document.body.classList.remove("sunnyWeather")
            document.body.classList.remove("coldWeather")
          }}
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
              console.log(location())
              const request = fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location()[0]}&lon=${location()[1]}`).then(r => r.text()).then(res => {
                let json = JSON.parse(res)
                console.log(json)
                console.log(json.properties.meta.units.air_temperature)
                json.properties.timeseries.forEach((timeserie) => {
                  console.log(timeserie);
                  // få tak i dagen akkurat nå
                  const dato = dayjs()
                  const timeserie_dato = dayjs(timeserie.time)
                  let difference = dato.diff(timeserie_dato, 'minutes');
                  if (difference <= 60 && difference > 0 ) {
                    console.log(`Fant tidspunkt å hente info fra: ${timeserie_dato}`)
                    setWeatherData(timeserie);
                    console.log(timeserie.data.instant.details)
                    if (timeserie.data.instant.details.air_temperature <= 0) {
                      // legg til kald vær klassen til body, også fortell brukeren at det fryser der
                      document.body.classList.add("coldWeather")
                      document.getElementById("vaeret").innerText = `Det fryser! ${timeserie.data.instant.details.air_temperature} grader ${json.properties.meta.units.air_temperature}`
                    } else if (timeserie.data.instant.details.air_temperature <= 10) {
                      document.body.classList.add("coldWeather")
                      document.getElementById("vaeret").innerText = `Det er kaldt ute. ${timeserie.data.instant.details.air_temperature} grader ${json.properties.meta.units.air_temperature}`;
                    } else if (timeserie.data.instant.details.air_temperature >= 15 ) {
                      document.body.classList.add("sunnyWeather")
                      document.getElementById("vaeret").innerText = `Det er fint vær ute! ${timeserie.data.instant.details.air_temperature} grader ${json.properties.meta.units.air_temperature}`;
                    } else {
                      document.getElementById("vaeret").innerText = `Det er greit vær. ${timeserie.data.instant.details.air_temperature} grader ${json.properties.meta.units.air_temperature}`;
                    }
                  } else {
                    return;
                  }
                  console.log(difference)
                })
              })
              console.log(request);
            }
          }
          <h1>{location()[2]}</h1>
          <p id="vaeret">vær</p>

          <a href="#" onClick={() => setViewState(0)}>Gå tilbake</a>
        </main>
      : ''}
    </>
  )
}