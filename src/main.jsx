import React, { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import Login from './components/Login page/Login'
import Signup from './components/Signup page/Signup'
import Layout from './Layout.jsx'
import CreateForum from './components/Forum/CreateForum.jsx'
import ListForum from './components/Forum/ListForum.jsx'

// Define isLoggedIn state
const App = () => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Login/>} />
        <Route path="signup" element={<Signup />} />
        <Route path="create-forum" element={ <CreateForum />} />
        <Route path="list-forum" element={ <ListForum />} />
      </Route>
    )
  )

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<App />);
