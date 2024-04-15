import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome'
import SignInSide from './pages/signIn'

function App() {

  return (
    <Router>
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/login' element={<SignInSide />} />
    </Routes>
  </Router>
  )
}

export default App
