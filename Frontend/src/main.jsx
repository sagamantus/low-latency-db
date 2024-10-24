import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './screens/Home';
import Try from './screens/Try'
import Fetch from './screens/Fetch';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className='text-3xl'>Hello world!</div>,
  },
  {
    path: "/home/",
    element: <Home/>,
  },
  {
    path: "/try/",
    element: <Try/>,
  },
  {
    path: "/fetch/",
    element: <Fetch/>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
