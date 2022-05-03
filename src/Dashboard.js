import React,{useState,useEffect} from 'react';
import './App.css';
import {
    useNavigate,
} from "react-router-dom";
import Protect from './Protected';


const Dashboard = () => {

    const navigate = useNavigate();

    const [dataTask,setDataTask] = useState([]);
    const [login,loginStatus] = useState(false);
    const [loginUser,setLoginUser] = useState()


    async function getTask() {
        await fetch('http://localhost:3000/task').then(res => res.json()).then((res)=>{
            setDataTask(res)
        })
    }

    async function getLogin() {
        await fetch('http://localhost:3000/loginUser').then(res => res.json()).then((res)=>{
            if(res.length > 0) {
                setLoginUser(res);
                console.log(res);
                loginStatus(true);
            } else {
                loginStatus(false);
            }
        })
        
    }

    let completeData = 0;
    let pendingData = 0;
    let totalTask = 0;
    useEffect(() => {
        if (dataTask.length == 0) {
            getTask();
            getLogin();
        }
        if(dataTask.length>0)
        console.log('dataTask',dataTask);

            //console.log(dataTask);
  
    },[])


    dataTask.map((item,i)=>{
        // console.log('Test',item.email);
        // console.log(loginUser[0]?.email);
        if(loginUser && item.email == loginUser[0].email) {
            if(item.stage === 'Done' ) {
            
                completeData = completeData + 1;
                totalTask = totalTask + 1;
            } else if(item.stage.toLowerCase() == 'to do' || item.stage.toLowerCase() == 'ongoing' || item.stage.toLowerCase() == 'backlog') {
                totalTask = totalTask + 1;
                pendingData = pendingData + 1;
            }
        }
    })
    

    function backData(){
        navigate('/auth/details');
    }

    function task(){
        navigate('/task');
    }



    return (
        
        <div className="">
       
        {(login == true) ? 
            <center>
                <h2 className="text-white">User Dashboard</h2>
                <table className="table table-dark table-striped w-75">
                    <thead>
                        <tr>
                            
                            <th scope="col">Total Task</th>
                            <th scope="col">Total Complete</th>
                            <th scope="col">Pending Task</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                                <tr>
                                   
                                    <td scope="col">{(dataTask.length > 0) ? totalTask : 0}</td>
                                    <td scope="col">{completeData}</td>
                                    <td scope="col">{pendingData}</td>
                                   
                                </tr>
                            
                        }
                    </tbody>

                </table>
                <button className="login d-inline w-25 m-2 btn btn-success" onClick={()=>{backData()}}>Go Back</button> 
                <button className="login d-inline w-25 m-2 btn btn btn-success" onClick={()=>{task()}}>Task Mangement</button>  
            </center>
            : <Protect />
        }
            
        </div>
    )

}

export default Dashboard;