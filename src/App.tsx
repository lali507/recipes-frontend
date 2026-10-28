import { Outlet } from 'react-router'
import Header from "./components/Headr"
import AuthGate from './components/AuthGate'

function App() {

  return (
    <AuthGate>
      <Header />
      <Outlet />
    </AuthGate>
  )
}

export default App
