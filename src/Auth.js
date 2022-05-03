import React, { useState, useEffect } from 'react';
import Signup from './signup';
import Details from './Details';
import App from './App.js';
import {
  BrowserRouter as Router,
  Routes,
  useNavigate,
  Navigate,
  Switch,
  Route,
  Link
} from "react-router-dom";

import login from './login1.png';


//import {browserHistory} from 'react-router';
//import { createBrowserHistory } from 'history'
const Auth = () => {

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [status, setStatus] = useState(false);
  const [Data, setData] = useState([]);

  const [userList, updateList] = useState([]);

  const navigate = useNavigate();

  function backData() {
    navigate('/app');
  }

  async function getUser() {
    await fetch('http://localhost:3000/users').then(res => res.json()).then(res => updateList(res))
  }

  useEffect(() => {
    if (userList.length == 0) {
      getUser();
    }
    console.log(userList);
  }, [])



  function handleSubmit(e) {
    e.preventDefault();


    //let data = JSON.parse(localStorage.getItem('data'));
    let flag = 0;
    let data;
    if (userList.length) {
      userList && userList.forEach((items) => {
        if (items.email === email) {

          if (items.password === password) {
            flag = 1;
            let data = {
              id: items.id,
              name: items.name,
              username: items.username,
              email: items.email,
              contact: items.contact,

            }
            fetch("http://localhost:3000/loginUser", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(items)
            }).then((result) => {
              result.json().then((resp) => {
                navigate('/auth/details');
              })
            })

            //localStorage.setItem('login',JSON.stringify(items));
            //navigate('/auth/details');
          } else {
            document.querySelector('.pass').style.display = "display";
            document.querySelector('.pass').innerHTML = "Password is incorrect "
          }

          //console.log('loginDetails =>',JSON.stringify(localStorage.getItem('login')))
        } else {
          document.querySelector('#userClass').style.display = "display";
          document.querySelector('#userClass').innerHTML = "User does not exist "
        }
      })
    } else {
      alert('Please signup then login')
    }


    if (flag === 0) {
      debugger;
      setStatus(true)
      //localStorage.setItem('login','');
      //document.querySelector('#status').innerHTML = 
    }

  }
  return (
    <div>

      <form action="" onSubmit={handleSubmit}>
        <section className="bg">
          <div className="contentForm">
            <div className="from-content">
              <div className="user"><img src={login} alt="login" height="50px" width="50px  " /></div>
              <div className="from">

                <div className="from-list">
                  <input type="text" id="email" name="email" placeholder="Email" data-text=
                    "Please enter a valid email address." onChange={(e) => { setEmail(e.target.value) }} required />
                  <span className="h text-danger" id="userClass"></span>

                </div>
                <div className="from-list">
                  <input type="password" id="password" name="email" placeholder="Password" data-text="The password must be between 6-20 characters long." onChange={(e) => { setPassword(e.target.value) }} required />
                  <span className="h text-danger pass"></span>
                </div>

                <p className="error-message">&nbsp;</p>
                <div className="submit-btn">
                  <button className="login d-inline w-25 m-2 btn btn-outline-info" onClick={() => { backData() }}>Go Back</button>

                  <button className="login d-inline w-25 m-2 btn btn-outline-info">Sign in</button>

                </div>
                <p className="tip signup-tip">
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