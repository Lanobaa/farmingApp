import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Login from './page/Login'
import Home from './page/Home';

const App = () => {
  return (
      <div>
        <BrowserRouter>
          <Route path="/" exact component={Login}/>
          <Route path="/home" component={Home}/>
        </BrowserRouter>
      </div>
  )
};

export default App;
