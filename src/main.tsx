import { createRoot } from 'react-dom/client'
import "./scss/main.scss"
import { RouterProvider } from 'react-router/dom'
import { router } from './routes'




createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
