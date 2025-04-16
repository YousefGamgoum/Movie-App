
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store  from './store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
  
)
// https://api.themoviedb.org/3/movie/now_playing?api_key=33faf8f966f0a01f5334e6ee43da19f8