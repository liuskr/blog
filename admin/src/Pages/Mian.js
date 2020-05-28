import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Index from './AdminIndex'
import DoesNotExist from './404'
const Mian = () => {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/index/' component={Index} />
      <Route component={DoesNotExist} />
    </Router>
  )

}

export default Mian;