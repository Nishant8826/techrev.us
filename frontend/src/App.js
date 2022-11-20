import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import "./styles/App.css"
import AddUser from './components/AddUser'
import DeleteUser from './components/DeleteUser'
import NavBar from './components/NavBar'
import UpdateUser from './components/UpdateUser'
import AllUser from './components/AllUser'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className='App'>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<AllUser/>}/>
            <Route path='/adduser' element={<AddUser/>}/>
            <Route path='/deleteuser' element={<DeleteUser/>}/>
            <Route path='/updateuser' element={<UpdateUser/>}/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
