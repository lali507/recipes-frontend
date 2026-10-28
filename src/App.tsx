import { Outlet } from 'react-router'
import Header from "./components/Headr"
import AuthGate from './components/AuthGate'
import Toast from './components/Toast'

function App() {

  return (
    <AuthGate>
      <Header />
      <Outlet />
      <Toast />
    </AuthGate>
  )
}

export default App
