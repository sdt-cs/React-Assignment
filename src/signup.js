import React,{useState,useEffect} from 'react';

import { useNavigate } from "react-router-dom";

const Signup = () =>{
  const [userRegistration,setUserRegistration] = useState({
    name:'',
    username:'',
    email:'',
    phone:'',
    password:''
  });

  const [records,setRecords] = useState([]);

  const [status,setStatus] = useState([]);

  const navigate = useNavigate();

  

  function backData(){
    //alert('test');
    //window.back();
    
    //history.back();
    navigate('/app');
  }

 

  function handleInput(e){
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    setUserRegistration({...userRegistration, [name]: value})
  }


  useEffect(()=>{
    if(records.length > 0) {
      console.log(records);
      localStorage.setItem("data",JSON.stringify(records));
      setStatus(true);
    }
  },[records])

  function handleSubmit(e) {
    e.preventDefault();
    const newRecords = {...userRegistration,id:new Date().getTime().toString()};
   // console.log(records);  
    setRecords([...records, newRecords]);
    
  }

    return(
        <div>  
          <form action="" onSubmit={handleSubmit}>
            <section className="bg">
                <div className="content">
                  <div className="from-content">
                    <h1><div className="user">Registration Form</div></h1>
                    <span className="text-primary">{(status === true) ? "You have successfully registered..." : ''}</span>
                    <div className="from">
                    <div className="from-list">
                        <input type="text" id="name" name="name" autoComplete='off' placeholder="Name" data-text="Please enter a name." 
                        value={userRegistration.name} onChange={handleInput} required />
                      </div>
                      <div className="from-list">
                        <input type="text" id="username" name="username" autoComplete='off' placeholder="Username" data-text="Please enter a user name." value={userRegistration.username} onChange={handleInput} required />
                      </div>
                      <div className="from-list">
                        <input type="text" id="email" name="email" autoComplete='off' placeholder="Email" data-text="Please enter a valid email address." value={userRegistration.email} onChange={handleInput} required />
                      </div>

                      <div className="from-list">
                        <input type="Number" id="phone" name="phone" autoComplete='off' placeholder="Contact Number" data-text="Please enter a valid phone number." value={userRegistration.phone} onChange={handleInput} required />
                      </div>
                      <div className="from-list">
                        <input type="password" id="password" name="password" autoComplete='off' placeholder="Password" data-text="The password must be between 6-20 characters long." value={userRegistration.password} onChange={handleInput} required />
                      </div>
                      <p className="error-message">&nbsp;</p>
                      <p className="tip signup-tip">
                      </p>
                      <div className="submit-btn">
                        <button className="login d-inline w-25 m-2 btn btn btn-success" onClick={()=>{backData()}}>Go Back</button> 
                        <button id="login" className="d-inline w-25 m-2 btn btn btn-success">Register</button>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
          </form>
        </div>
    )
}

export default Signup;