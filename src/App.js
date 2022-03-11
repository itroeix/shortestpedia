import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Main from './pages/Main'
import Wikies from './pages/Wikies'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={< Main />}></Route>
          <Route exact path='/es' element={< Wikies />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;