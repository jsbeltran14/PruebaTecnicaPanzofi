import React from 'react'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/users' element={<UsersPage/>}></Route>
        <Route path='/user/:id' element={<UserPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
