import React, { Component, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import DefaultLayout from './layout/DefaultLayout'
import Register from './views/pages/register/Register'
import Page404 from './views/pages/page404/Page404'
import Page500 from './views/pages/page500/Page500'
import Login from './views/pages/login/Login'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {
  render() {
    return (
          <Routes>
            <Route exact path='*' element={<DefaultLayout />}/>
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" element={<Page404 />} />
            <Route exact path="/500" element={<Page500 />} />
            <Route path="/" element={<Login />} />
            {/* <Route exact path="/500" element={<Page500 />} /> */}
          
          </Routes>
     
    )
  }
}

export default App
