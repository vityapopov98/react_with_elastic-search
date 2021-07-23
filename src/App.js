import React from 'react'
import './App.css';
import './index.css'

import {Route, BrowserRouter as Router} from 'react-router-dom'
import Home from './pages/Home';
import Comment from './pages/Comment';
import AddData from './pages/AddData';

function App (){
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/comments/:commentId">
        <Comment />
      </Route>
      <Route path="/addData" component={AddData} />
    </Router>
  )
}

export default App;
