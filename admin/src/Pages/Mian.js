import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Index from './AdminIndex'
const Mian = () => {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/index/' component={Index} />
    </Router>
  )

}

export default Mian;