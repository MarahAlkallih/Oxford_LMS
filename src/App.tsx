import './App.css'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import {BrowserRouter} from "react-router-dom"
import AppRoutes from './routes/routes'
import { AppToastContainer } from './components/global/Toast'
import { useFirebaseNotifications } from './hooks/useFirebaseNotifications'

function App() {
  useFirebaseNotifications();
 
  return (
    <Provider store={store}>
      <BrowserRouter>
       <div className="App">
       
        <AppRoutes />
       
      </div>
      </BrowserRouter>
      <AppToastContainer />
    </Provider>
  )
}

export default App
