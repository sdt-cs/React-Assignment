import React,{useState,useEffect} from 'react';
import './App.css';
import {
    useNavigate,
} from "react-router-dom";


const Dashboard = () => {

    const navigate = useNavigate();
   
    console.log('Dashboard');
    let data = JSON.parse(localStorage.getItem('login'))
    
   

    function backData(){
        navigate('/auth/details');
    }

    function task(){
        navigate('/task');
    }



    return (
        
        <div className="">
            <center>
                <h2 className="text-white">User Dashboard</h2>
                <table className="table table-dark table-striped w-75">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Total Task</th>
                            <th scope="col">Total Complete</th>
                            <th scope="col">Pending Task</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                                <tr>
                                    <td scope="col">{data.name}</td>
                                    <td scope="col">{5}</td>
                                    <td scope="col">{3}</td>
                                    <td scope="col">{2}</td>
                                   
                                </tr>
                            
                        }
                    </tbody>

                </table>
                <button className="login d-inline w-25 m-2 btn btn-success" onClick={()=>{backData()}}>Go Back</button> 
                <button className="login d-inline w-25 m-2 btn btn btn-success" onClick={()=>{task()}}>Task Mangement</button>  
            </center>
        </div>
    )

}

export default Dashboard;