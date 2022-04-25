import React,{useState,useEffect} from 'react';
import {
    useNavigate,
} from "react-router-dom";




const Task = () => {

    const [dataTask,setDataTask] = useState([]);
    const navigate = useNavigate();

    const addTask = () =>{
        navigate("/addTask");
    }

    function backData(){
        navigate('/dashboard');
    }

    let previousTask = [];

    //let tasksList = localStorage.getItem('task') && JSON.parse(localStorage.getItem('task'));

    const [tasks,setTasks] = useState(localStorage.getItem('task') && JSON.parse(localStorage.getItem('task')))
    
    //console.log('Tasks',tasks);

    useEffect(() => {
        if (tasks != previousTask) {
            //console.log('data')
            previousTask = JSON.parse(JSON.stringify(tasks));
            setDataTask(previousTask);
            //console.log('dataTask ',dataTask);
        }
    }, [tasks]);


    const handleDelete = (id)=> {
        
        let updateItems = tasks.filter((elem,ind) =>{
            return ind != id;
        })

        setDataTask(updateItems);

        if(dataTask) {
            let newData = JSON.stringify(updateItems);
            localStorage.setItem('task',newData);
            
        }
        
        //localStorage.setItem('task',updateItems);


    }

    
    

    return(
        <div>
            <center>
                <h2 className="text-light">Tasks</h2>
                <span></span>
                <table className="table table-dark table-striped w-75">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task Name</th>
                            <th>Priority</th>
                            <th>Stage</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody> 
                   
                       {
                           (tasks && dataTask) ?
                           dataTask.map((res,index) =>{
                               return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{res.name}</td>
                                        <td>{res.priority}</td>
                                        <td>{res.stage}</td>
                                        <td>{res.deadline}</td>
                                        <td><button onClick={()=>{handleDelete(index)}}>Delete</button></td>
                                    </tr>
                               )
                              
                           }) : ''
                       }
                    </tbody>
                </table>
                <button className="login d-inline w-25 m-2 btn btn-success" onClick={()=>{backData()}}>Go Back</button> 
                <button className="login d-inline w-25 m-2 btn btn btn-success" onClick={()=>{addTask()}}>Add Task</button>
            </center>
        </div>
    )
}

export default Task;