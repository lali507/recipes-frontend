import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from "./store/store.ts"

import './index.css'

import { RouterProvider } from 'react-router'
import routes from './routes/routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={routes}></RouterProvider>
    </Provider>
  </StrictMode>,
)
