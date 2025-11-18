import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Edit_User from './Edit_User.jsx'
import Add_New_User from './Add_New_User.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/edit_user/:id' element={<Edit_User />} />
        <Route path='/add_new_user' element={<Add_New_User />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
