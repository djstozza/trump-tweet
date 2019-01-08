import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import Alert from 'react-s-alert';

const App = (props) => (
  <Router>
    <div>
      <Alert stack={ { limit: 3 } } />
      <Route exact path='/' component={ LandingPage } />
    </div>
  </Router>
)
export default App;
