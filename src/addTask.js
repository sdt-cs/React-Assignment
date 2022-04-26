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
                <section className="bg">
                    <div className="content">
                        <div className="from-content">
                            <h1><div className="user">Create New Task</div></h1>
                            <span className="text-primary">{(status) ? 'Task has been created...' : ''}</span>
                            <div className="from">
                                

                            <div className="form-group">
                                <label for="name" className="float-left">Task Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={task.name}  placeholder="Name" data-text="Please enter a name." onChange={handleInput} required />
                            </div>

                            <div className="form-group">
                                <label for="priority" className="float-left">Priority</label>
                                <input type="text" className="form-control" id="priority" name="priority" value={task.priority}  placeholder="High/Medium/Low"  onChange={handleInput} data-text="Please enter a priority." required />
                            </div>

                            <div className="form-group">
                                <label for="stage" className="float-left">Stage</label>
                                <input type="text" className="form-control" id="stage" name="stage" value={task.stage}  placeholder="Backlog/To Do/Ongoing/Done"  onChange={handleInput} data-text="Please enter a stage."
                                        required />
                            </div>

                            <div className="form-group">
                                <label for="deadline" className="float-left">Deadline</label>
                                <input type="date" className="form-control" id="deadline" name="deadline" value={task.deadline} autoComplete='off' placeholder="dd/mm/yyyy"  onChange={handleInput} data-text="Please enter a date."
                                        required />
                            </div>
                                
                                <p className="error-message">&nbsp;</p>
                                <p className="tip signup-tip">
                                </p>
                                <div className="submit-btn">
                                    <button className="login d-inline w-25 m-2 btn btn btn-success" onClick={()=>{backData()}}>Go Back</button>
                                    <button id="login" className="login d-inline w-50 m-2 btn btn btn-success" onClick={handleSubmit}>Create Task</button>
                                    <span className="text-primary">{(status) ? <button id="login" className="login d-inline w-50 m-2 btn btn btn-success" onClick={viewTask}>View Task</button> : ''}</span>
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