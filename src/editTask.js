import React, { useState, useEffect } from 'react'

const EditTask = (props) => {
    
    let funChange = props.fun;

    console.log();
    const [name, setName] = useState();
    const [priority, setPriority] = useState();
    const [stage, setStage] = useState();
    const [deadline, setDeadline] = useState();
    const [email, setEmail] = useState();

    //const [data,setData] = useState([])


    // console.log('name',name);
    // console.log('priority',priority);
    // console.log('stage',stage);
    // console.log('deadline',deadline);
    // console.log('email',email);

    useEffect(()=>{
        console.log('props',props);
        if(props) {
            setName(props.data?.name);
            setPriority(props.data?.priority);
            setStage(props.data?.stage);
            setDeadline(props.data?.deadline);
            setEmail(props.data?.email);
        }
    },[])


    let data;
    const updateData = (id) => {
        data = {name,priority,stage,deadline,email}
        fetch(`http://localhost:3000/task/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                if(resp) {
                    //console.log('update',resp);
                    funChange();
                }
            })
        })
    }



    return (
        <div className="container">

            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">


                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Task</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>

                        </div>
                        <div className="modal-body">
                            <div className="from">


                                <div className="form-group">
                                    <label htmlFor="name" className="float-left">Task Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Name" data-text="Please enter a name." onChange={(e) => { setName(e.target.value) }} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="priority" className="float-left">Priority</label>
                                    {/* <input type="text" className="form-control" id="priority" name="priority" value={priority} placeholder="High/Medium/Low" onChange={(e) => { setPriority(e.target.value) }} data-text="Please enter a priority." required /> */}
                                    <select className="form-control form-select-lg" value={priority} onChange={(e) => { setPriority(e.target.value) }}>
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
                                    <select className="form-control form-select-lg" value={stage} onChange={(e) => { setStage(e.target.value) }}>
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
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-info" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-outline-info" onClick={(e)=>{updateData(props.data?.id)}} data-dismiss="modal" >Update</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default EditTask;