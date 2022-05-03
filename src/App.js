import React, { Suspense, lazy } from 'react';
import logo from './logo.svg';
import './App.css';
import LogoImage from './neosoft.png';
//import Component from './Component';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Component = lazy(() => import('./Component'));


function App() {

  return (
    <div> 
      {/* <img src={LogoImage} alt="Logo Image" height="60px;" width="200px" /> */}

        <div className="App text-center">
        
            <Suspense fallback={<div>Please wait...Lazy load is working now.</div>}>
                <Component />
            </Suspense>
        </div>
    </div>
  );
}

export default App;
