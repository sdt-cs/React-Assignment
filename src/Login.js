import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
//import Protect from './protected';
import {
    BrowserRouter as Router,

    Link
} from "react-router-dom";
import Dashboard from './Dashboard';
import Task from './Task';



function Login() {

    

   
    return (
        <>
                <div className="App text-center">

                    {/* <Details /> */}
                    <div className="d-flex justify-content-center btnStyle">
                        <Link to="auth"><button type="button" class="btn btn-outline-info m-2 btnS">Login</button></Link>
                        <Link to="Signup"><button type="button" class="btn btn-outline-info m-2 btnS">Signup</button></Link>
                    </div>
                </div>
        </>

    );
}

export default Login;
