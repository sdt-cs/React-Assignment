import React, { useState, useEffect } from 'react';
import {
    useNavigate,
} from "react-router-dom";
import Protect from './Protected';


const AddTask = () => {

    const navigate = useNavigate();

    const [task, addTask] = useState({
        name: '',
        priority: '',
        stage: '',
        deadline: ''
    })


    const [name, setName] = useState();
    const [priority, setPriority] = useState();
    const [stage, setStage] = useState();
    const [deadline, setDeadline] = useState();
    const [email, setEmail] = useState();
    const [taskRecords, setTaskRecords] = useState([]);
    const [status, setStatus] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);


    async function getLogin() {
        await fetch('http://localhost:3000/loginUser').then(res => res.json()).then((res) => {
            if (res.length > 0) {
                //updateList(res)
                setEmail(res[0].email);
                //console.log('Test',res);
                setLoginStatus(true);
            } else {
                setLoginStatus(false);
            }
        })
    }

    useEffect(() => {
        getLogin();
    })

    // const handleInput = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;

    //     addTask({ ...task, [name]: value });

    // }




    let newRecords = '';
    // useEffect(() => {
    //     if (taskRecords.length > 0) {
    //         let data = JSON.stringify(taskRecords)
    //         console.log('taskRecords', taskRecords);
    //         //localStorage.setItem('task', data);
    //         setStatus(true);
    //     }
    // }, [taskRecords])


    let id = 0;
    const handleSubmit = (e) => {
        id = id + 1;
        let data = { id, name, stage, priority, deadline, email }
        fetch("http://localhost:3000/task", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                //console.log('task', resp);
                setStatus(true)
            })
        })

        // newRecords = {...task,id:new Date().getTime().toString()};
        // setTaskRecords([...taskRecords,newRecords]);

        // //console.log(taskRecords);
        // if(newRecords) {

        // //    let data = JSON.stringify(taskRecords)
        // //    localStorage.setItem('task',data);
        // //    setStatus(true);
        //     //addTask({name:'',priority:'',stage:'',deadline:''});
        // }
        // e.preventDefault();
    }

    function backData() {
        navigate('/task');
    }

    function viewTask() {
        navigate('/task');
    }


    return (
        <div>
            {(loginStatus) ?
                <section className="bg">
                    <div className="content">
                        <div className="from-content">
                            <h1><div className="user">Create New Task</div></h1>
                            <span className="text-primary">{(status) ? 'Task has been created...' : ''}</span>
                            <div className="from">


                                <div className="form-group">
                                    <label htmlFor="name" className="float-left">Task Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Name" data-text="Please enter a name." onChange={(e) => { setName(e.target.value) }} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="priority" className="float-left">Priority</label>
                                    {/* <input type="text" className="form-control" id="priority" name="priority" value={priority} placeholder="High/Medium/Low" onChange={(e) => { setPriority(e.target.value) }} data-text="Please enter a priority." required /> */}
                                    <select class="form-control form-select-lg" value={priority} onChange={(e)=>{setPriority(e.target.value)}}>
                                        <option selected>Please select priority</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stage" className="float-left">Stage</label>
                                    {/* <input type="text" className="form-control" id="stage" name="stage" value={stage} placeholder="Backlog/To Do/Ongoing/Done" onChange={(e) => { setStage(e.target.value) }} data-text="Please enter a stage."
                                        required /> */}
                                        <select class="form-control form-select-lg" value={stage} onChange={(e)=>{setStage(e.target.value)}}>
                                        <option selected>Please select priority</option>
                                        <option value="Backlog">Backlog</option>
                                        <option value="To Do">To Do</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="deadline" className="float-left">Deadline</label>
                                    <input type="date" className="form-control" id="deadline" name="deadline" value={deadline} autoComplete='off' placeholder="dd/mm/yyyy" onChange={(e) => { setDeadline(e.target.value) }} data-text="Please enter a date."
                                        required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="float-left">Email</label>
                                    <input type="email" className="form-control" id="email" name="deadline" value={email} autoComplete='off' placeholder="john@mail.com" onChange={(e) => { setEmail(e.target.value) }} data-text="Please enter a date."
                                        readOnly disabled />
                                </div>

                                <p className="error-message">&nbsp;</p>
                                <p className="tip signup-tip">
                                </p>
                                <div className="submit-btn">
                                    <button className="login d-inline w-25 m-2 btn btn btn-success" onClick={() => { backData() }}>Go Back</button>
                                    <button id="login" className="login d-inline w-50 m-2 btn btn btn-success" onClick={handleSubmit}>Create Task</button>
                                    <span className="text-primary">{(status) ? <button id="login" className="login d-inline w-50 m-2 btn btn btn-success" onClick={viewTask}>View Task</button> : ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : <Protect />
            }


        </div>
    )
}

export default AddTask;