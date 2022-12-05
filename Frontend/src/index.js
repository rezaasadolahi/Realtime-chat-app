import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from "@material-tailwind/react"
import './index.css'
import store from './Redux/store'
import App from './App'







/* // Disable Right Click 
document.addEventListener('contextmenu', (event) => event.preventDefault())

// Disable ctrl and alt key
document.onkeydown = function (e) {
  if (e.ctrlKey &&
    (e.keyCode === 67 ||
      e.keyCode === 79 ||
      e.keyCode === 80 ||
      e.keyCode === 82 ||
      e.keyCode === 83 ||
      e.keyCode === 85 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 117 ||
      e.keyCode === 187 ||
      e.keyCode === 189
    )) {
    return false
  }

  if (e.altKey &&
    (e.keyCode === 37 ||
      e.keyCode === 39 ||
      e.keyCode === 36 ||
      e.keyCode === 69 ||
      e.keyCode === 68 ||
      e.keyCode === 70
    )) {
    return false
  }

  if (e.keyCode === 123 ||
    e.keyCode === 117 ||
    e.keyCode === 116 ||
    e.keyCode === 118 ||
    e.keyCode === 112 ||
    e.keyCode === 18
  ) {
    return false
  }
}

// Disable zoom in and zoom out
document.addEventListener('wheel', (e) => {
  if (e.ctrlKey) {
    e.preventDefault()
    e.stopPropagation()
  }
}, {
  passive: false
}) */





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
