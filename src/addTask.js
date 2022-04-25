import React,{useState,useEffect} from 'react';
import {
    useNavigate,
} from "react-router-dom";

const AddTask = () => {

    const navigate = useNavigate();

    const [task,addTask] = useState({
        name: '',
        priority: '',
        stage: '',
        deadline: ''
    })

    const [taskRecords, setTaskRecords] = useState([]);
    const [status,setStatus] = useState(false);




    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        addTask({...task, [name]: value});

    }


    let newRecords ='';
    useEffect(()=>{
        if(taskRecords.length>0) {
            let data = JSON.stringify(taskRecords)
            console.log('taskRecords',taskRecords);
            localStorage.setItem('task',data);
            setStatus(true);
        }
    },[taskRecords])

    const handleSubmit = (e) => {
       
        newRecords = {...task,id:new Date().getTime().toString()};
        setTaskRecords([...taskRecords,newRecords]);
        
        //console.log(taskRecords);
        if(newRecords) {
           
        //    let data = JSON.stringify(taskRecords)
        //    localStorage.setItem('task',data);
        //    setStatus(true);
            //addTask({name:'',priority:'',stage:'',deadline:''});
        }
        e.preventDefault();
    }

    function backData(){
        navigate('/task');
    }

    function viewTask() {
        navigate('/task');
    }

   
    return (
        <div>
            <form action="#">
                <section class="bg">
                    <div class="content">
                        <div class="from-content">
                            <h1><div class="user">Create New Task</div></h1>
                            <span className="text-primary">{(status) ? 'Task has been created...' : ''}</span>
                            <div class="from">
                                

                            <div class="form-group">
                                <label for="name" class="float-left">Task Name</label>
                                <input type="text" class="form-control" id="name" name="name" value={task.name}  placeholder="Name" data-text="Please enter a name." onChange={handleInput} required />
                            </div>

                            <div class="form-group">
                                <label for="priority" class="float-left">Priority</label>
                                <input type="text" class="form-control" id="priority" name="priority" value={task.priority}  placeholder="High/Medium/Low"  onChange={handleInput} data-text="Please enter a priority." required />
                            </div>

                            <div class="form-group">
                                <label for="stage" class="float-left">Stage</label>
                                <input type="text" class="form-control" id="stage" name="stage" value={task.stage}  placeholder="Backlog/To Do/Ongoing/Done"  onChange={handleInput} data-text="Please enter a stage."
                                        required />
                            </div>

                            <div class="form-group">
                                <label for="deadline" class="float-left">Deadline</label>
                                <input type="date" class="form-control" id="deadline" name="deadline" value={task.deadline} autoComplete='off' placeholder="dd/mm/yyyy"  onChange={handleInput} data-text="Please enter a date."
                                        required />
                            </div>
                                
                                <p class="error-message">&nbsp;</p>
                                <p class="tip signup-tip">
                                </p>
                                <div class="submit-btn">
                                    <button class="login d-inline w-25 m-2 btn btn btn-success" onClick={()=>{backData()}}>Go Back</button>
                                    <button id="login" class="login d-inline w-50 m-2 btn btn btn-success" onClick={handleSubmit}>Create Task</button>
                                    <span className="text-primary">{(status) ? <button id="login" class="login d-inline w-50 m-2 btn btn btn-success" onClick={viewTask}>View Task</button> : ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    )
}

export default AddTask;