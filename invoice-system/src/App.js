import logo from './logo.svg';
import React from 'react';
import './App.css';
import {params} from "./params";
import { Router } from "./router";

function App() {
  document.title = params.title_main_page;

  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
