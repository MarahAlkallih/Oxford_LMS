import './App.css'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import {BrowserRouter} from "react-router-dom"
import AppRoutes from './routes/routes'
import { AppToastContainer } from './components/global/Toast'
import { useFirebaseNotifications } from './hooks/useFirebaseNotifications'
const NotificationListener = () => {
  useFirebaseNotifications();
  return null;
};
function App() {
 
 
  return (
  <>
      <BrowserRouter>
       <div className="App">
       <NotificationListener />
        <AppRoutes />
       
      </div>
      </BrowserRouter>
      <AppToastContainer />
</>
  )
}

export default App
