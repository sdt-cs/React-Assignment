import React,{Suspense,lazy} from 'react';
import logo from './logo.svg';
import './App.css';
// import Auth from './Auth';
// import Signup from './signup'
// import Details from './Details';
// import AddTask from './addTask';

//import Protect from './protected';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
// import Dashboard from './Dashboard';
// import Task from './Task';
// import Login from './Login';


const Auth = lazy(()=>import('./Auth'))
const Signup = lazy(()=>import('./signup'))
const Details = lazy(()=>import('./Details'))
const AddTask = lazy(()=>import('./addTask'))
const Dashboard = lazy(()=>import('./Dashboard'))
const Task = lazy(()=>import('./Task'))
const Login = lazy(()=>import('./Login'))




function Component() {
   return (
    <div className="App text-center">
        <Routes>
            <Route path="" element={<Suspense fallback={<div className="lazyClass">Login page is loading...</div>}><Login /></Suspense>} />

            <Route path="/app" element={<Suspense fallback={<div className="lazyClass">Login page is loading...</div>}><Login /></Suspense>} />
            <Route path="/app/auth" element={<Suspense fallback={<div className="lazyClass">Please wait page is loading...</div>}><Auth /></Suspense>} />
            <Route path="/auth" element={<Suspense fallback={<div className="lazyClass">Please wait page is loading...</div>}><Auth /></Suspense>} />
            <Route path="/task/addTask" element={<Suspense fallback={<div className="lazyClass">Please wait create page is loading...</div>}><AddTask /></Suspense>} />
                
            <Route path="auth/details" element={<Suspense fallback={<div className="lazyClass">Please wait details page is loading...</div>}><Details /></Suspense>} />
            <Route path="dashboard" element={<Suspense fallback={<div className="lazyClass">Please wait dashboard page is loading...</div>}><Dashboard /></Suspense>} />
            <Route path="addTask" element={<Suspense fallback={<div className="lazyClass">Please wait create page is loading...</div>}><AddTask /></Suspense>} />
            <Route path="task" element={<Suspense fallback={<div className="lazyClass">Please wait task page is loading...</div>}><Task /></Suspense>} />
            <Route path="Signup" element={<Suspense fallback={<div className="lazyClass">Please wait signup page is loading...</div>}><Signup /></Suspense>} />
            <Route path="/app/Signup" element={<Suspense fallback={<div className="lazyClass">Please wait signup page is loading...</div>}><Signup /></Suspense>} />
        
        </Routes>
    </div>
   );
}

export default Component;
