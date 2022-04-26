import React,{useState,useEffect} from 'react';
import './App.css';
import {
    useNavigate,
} from "react-router-dom";


const Dashboard = () => {

    const navigate = useNavigate();

    const [dataTask,setDataTask] = useState([]);
    const [total,setTotal] = useState(0)
    const [complete,setCompete] = useState(0);
    const [pending,setPending] = useState(0);
    
    let loginData = JSON.parse(localStorage.getItem('login'))
    
    let data = localStorage.getItem('data') && JSON.parse(localStorage.getItem('task')); 

    useEffect(()=>{
        if(dataTask.length === 0) {
            setDataTask({...dataTask,data})
            
        }
    },[dataTask])

    let completeData = 0;
    let pendingData = 0;
    if(data.length > 0) {
       
        console.log(dataTask.data);
        dataTask.data && dataTask.data.map((item,i)=>{
            if(item.stage === 'Done') {
                
                completeData = completeData + 1;
            } else if(item.stage == 'To Do' || item.stage == 'Ongoing' || item.stage == 'Backlog') {
                
                pendingData = pendingData + 1;
            }
        })

       

      


        
        
    } 
    

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
                                    <td scope="col">{loginData.name}</td>
                                    <td scope="col">{(dataTask.data) ? dataTask.data.length : '0'}</td>
                                    <td scope="col">{completeData}</td>
                                    <td scope="col">{pendingData}</td>
                                   
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