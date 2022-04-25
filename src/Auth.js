import React,{useState} from 'react';
import Signup from './signup';
import Details from './Details';
import App from './App.js';
import {
  BrowserRouter as Router,
  Routes ,
  useNavigate ,
  Navigate,
  Switch,
  Route,
  Link
} from "react-router-dom";

//import {browserHistory} from 'react-router';
//import { createBrowserHistory } from 'history'
const Auth = () => {

  const [email,setEmail] = useState([]);
  const [password,setPassword] = useState([]);
  const [status, setStatus] = useState(false);
  const [Data, setData] = useState([]);

  const navigate = useNavigate();

  function backData(){
    navigate('/app');
  }




  

  function handleSubmit(e) {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem('data'));
    let flag = 0;
    data.forEach((items)=>{
      if(items.email === email && items.password === password) {
        flag = 1;
        console.log('Data',items);
        localStorage.setItem('login',JSON.stringify(items));
        navigate('/auth/details');
        //console.log('loginDetails =>',JSON.stringify(localStorage.getItem('login')))
      }
    })

    if(flag === 0 ) {
      debugger;
      setStatus(true)
      localStorage.setItem('login','');
      //document.querySelector('#status').innerHTML = 
    }
  
  }
  return (
    <div>
      
      <form action="" onSubmit={handleSubmit}>
        <section class="bg">
          <div class="contentForm">
            <div class="from-content">
              <h1><div class="user">User Login</div></h1>
              <div class="from">
              <span class="text-danger float-left" id="status">{(status === true) ? "username does't exist." : ''}</span>
                <div class="from-list">
                  <input type="text" id="email" name="email" placeholder="Email" data-text="Please enter a valid email address." onChange={(e)=>{setEmail(e.target.value)}} required />
                </div>
                <div class="from-list">
                  <input type="password" id="password" name="email" placeholder="Password" data-text="The password must be between 6-20 characters long." onChange={(e)=>{setPassword(e.target.value)}}  required />
                </div>
                
                <p class="error-message">&nbsp;</p>
                <div class="submit-btn">
                    <button class="login d-inline w-25 m-2 btn btn-outline-info" onClick={()=>{backData()}}>Go Back</button> 
                    
                    <button class="login d-inline w-25 m-2 btn btn-outline-info">Sign in</button>
                    
                </div>
                <p class="tip signup-tip">
                  {/* <Router>
                    <Link to="/Signup">Sign up</Link>

                    <Routes>
                      <Route path="/signup" element={<Signup />} />
                    </Routes>
                  </Router> */}

                </p>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default Auth;