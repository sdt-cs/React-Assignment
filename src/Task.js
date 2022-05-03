import React, { useState, useEffect } from 'react';
import {
    useNavigate,
} from "react-router-dom";
import Protect from './Protected';
import AddTask from './addTask'
import EditTask from './editTask';


const Task = () => {
    const [dataTask, setDataTask] = useState([]);
    const navigate = useNavigate();
    const [login, loginStatus] = useState(false);
    const [userList, updateList] = useState([]);
    const [editStatus, setEditState] = useState(false);
    const [assessment, setAssessment] = useState();


    async function getTask() {
        await fetch('http://localhost:3000/task').then(res => res.json()).then((res) => {
            setDataTask(res)
        })
    }



    async function getLogin() {
        await fetch('http://localhost:3000/loginUser').then(res => res.json()).then((res) => {
            if (res.length > 0) {
                updateList(res)

                loginStatus(true);
            } else {
                loginStatus(false);
            }
        })

    }

    useEffect(() => {

        if (dataTask.length == 0) {
            getTask();
            getLogin();
        }
    }, [editStatus])

    const addTask = () => {
        navigate("/addTask");
    }

    function backData() {
        navigate('/dashboard');
    }

    let previousTask = [];



    const handleDelete = (id) => {
        fetch(`http://localhost:3000/task/${id}`, {
            method: "DELETE"
        }).then((result) => {
            result.json().then((resp) => {
                getTask();
            })
        })
    }

    const editData = (id) => {
        //navigate(`./addTask/${id}`);
        fetch(`http://localhost:3000/task/${id}`, {
            method: "GET"
        }).then((result) => {
            result.json().then((resp) => {
                if (resp) {
                    setAssessment(resp);
                    setEditState(true);
                }

            })
        })

    }


    return (
        <div>
            {(login == true) ?

                <center>
                    <h2 className="text-light">Tasks</h2>
                    <span></span>
                    <div className="container1">
                        <div className='items1 items11'>
                            <div className='items2'>Task Name</div>
                            <div className='items2'>Priority</div>
                            <div className='items2'>Stage</div>
                            <div className='items2'>Deadline</div>
                            <div className='items2'>Action</div>
                        </div>
                        {
                            (dataTask.length > 0) ?
                                    dataTask.map((res, index) => {
                                        if (res.email == userList[0]?.email) {
                                            return (
                                                <>
                                                    <div className='items1 items-radius bg-info text-light'>{res.name}</div>
                                                   
                                                    <div className={`items1 items-radius ${(res.priority=='High')?'bg-danger text-light':((res.priority=='Medium') ? 'bg-warning' : 'bg-gradient-success')}` }>{res.priority}</div>
                                                    <div className={`items1 items-radius ${(res.stage=='Backlog')?'bg-danger':((res.stage=='Ongoing') ? 'bg-secondary text-light' : ((res.stage == 'To Do')? 'bg-secondary text-light':'bg-success'))}`}>{res.stage}</div>
                                                    <div className={`items1 fontWight items-radius bg-light ${(res.priority=='High')?'text-danger':''}`}>{res.deadline}</div>
                                                    <div className='items1 items-radius'><button className="btn btn-outline-info" onClick={() => { handleDelete(res.id) }}>Delete</button><button className="ml-2 btn btn-outline-info" data-toggle="modal" data-target="#myModal" onClick={(e) => { editData(res.id) }}>Edit</button></div>
                                                </>
                                            )
                                        }


                                    }) : ''
                        }
                        

                    </div>
                    

                    {(editStatus == true) ?

                        <EditTask data={assessment} fun={getTask} />
                        : ''}

                    <button className="login d-inline w-25 m-2 btn btn-success" onClick={() => { backData() }}>Go Back</button>
                    <button className="login d-inline w-25 m-2 btn btn btn-success" onClick={() => { addTask() }}>Add Task</button>
                </center>

                : <Protect />


            }

        </div>
    )
}

export default Task;