import React,{useState} from 'react';
import Auth from './Auth';
import {
  BrowserRouter as Router,
  Routes,
  useNavigate,
  Route,
  Link
} from "react-router-dom";

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

  function handleSubmit(e) {
    e.preventDefault();

    const newRecords = {...userRegistration,id:new Date().getTime().toString()};
   // console.log(records);  
    setRecords([...records, newRecords]);
    console.log(records);  
    setTimeout(function(){
      localStorage.setItem("data",JSON.stringify(records));
      setStatus(true);
    },50)
    
  }

    return(
        <div>  
          <form action="" onSubmit={handleSubmit}>
            <section class="bg">
                <div class="content">
                  <div class="from-content">
                    <h1><div class="user">Registration Form</div></h1>
                    <span class="text-primary">{(status === true) ? "You have successfully registered..." : ''}</span>
                    <div class="from">
                    <div class="from-list">
                        <input type="text" id="name" name="name" autoComplete='off' placeholder="Name" data-text="Please enter a name." 
                        value={userRegistration.name} onChange={handleInput} required />
                      </div>
                      <div class="from-list">
                        <input type="text" id="username" name="username" autoComplete='off' placeholder="Username" data-text="Please enter a user name." value={userRegistration.username} onChange={handleInput} required />
                      </div>
                      <div class="from-list">
                        <input type="text" id="email" name="email" autoComplete='off' placeholder="Email" data-text="Please enter a valid email address." value={userRegistration.email} onChange={handleInput} required />
                      </div>

                      <div class="from-list">
                        <input type="Number" id="phone" name="phone" autoComplete='off' placeholder="Contact Number" data-text="Please enter a valid phone number." value={userRegistration.phone} onChange={handleInput} required />
                      </div>
                      <div class="from-list">
                        <input type="password" id="password" name="password" autoComplete='off' placeholder="Password" data-text="The password must be between 6-20 characters long." value={userRegistration.password} onChange={handleInput} required />
                      </div>
                      <p class="error-message">&nbsp;</p>
                      <p class="tip signup-tip">
                      </p>
                      <div class="submit-btn">
                        <button class="login d-inline w-25 m-2 btn btn btn-success" onClick={()=>{backData()}}>Go Back</button> 
                        <button id="login" class="d-inline w-25 m-2 btn btn btn-success">Register</button>
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