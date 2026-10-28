import { Outlet } from 'react-router'
import Header from "./components/Headr"
import Footer from "./components/Footer"
import AuthGate from './components/AuthGate'
import Toast from './components/Toast'

function App() {

  return (
    <AuthGate>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toast />
    </AuthGate>
  )
}

export default App
