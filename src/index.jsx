/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import Navbar from './components/Navbar'

render(() => (
<App />
), document.getElementById("app"))
