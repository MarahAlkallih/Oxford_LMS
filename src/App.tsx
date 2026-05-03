import './App.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter as  BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/routes'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
