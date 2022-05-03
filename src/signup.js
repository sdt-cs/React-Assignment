import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import logoImage from './register.png';

const Signup = () => {
  const [userRegistration, setUserRegistration] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });


  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");


  async function getCheckEmail() {
    await fetch('http://localhost:3000/users').then(res => res.json()).then((res)=>{
        
      
        if(res.length > 0) {
          res.forEach((data,i)=>{
            if(data.email == email) {
              alert('Already exist email id....')
              return false;
            }
          })
        }
      
    })
    
}


function checkEmail(data) {

  setEmail(data)

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    document.querySelector(".emailBlock").style.display = 'none';
    // document.querySelector('.emailBlock').classList.remove('text-danger');
    // document.querySelector('.emailBlock').classList.add('text-primary');
    // document.querySelector(".emailBlock").innerHTML = 'Your email is valid..'
  } else {
    document.querySelector(".emailBlock").style.display = 'block';
    document.querySelector(".emailBlock").innerHTML = 'You have entered an invalid email address!'
    document.querySelector('.emailBlock').classList.remove('text-primary');
    document.querySelector('.emailBlock').classList.add('text-danger');
    return (false)
  } 
}

function checkPhone(data) {
  console.log("Tes");
  if(data.length <=10 ) setPhone(data)

  let num = /^[6-9]\d{9}$/;
    if (!num.test(phone)) {
      document.querySelector(".phoneBlock").style.display = 'block';
      document.querySelector(".phoneBlock").innerHTML = 'Please insert valid contact...';
      return false;
    } else {
      document.querySelector(".phoneBlock").style.display = 'none';
    }
}


  let id = 1;
  function saveUser(e) {

    e.preventDefault();

    getCheckEmail();

    let num = /^[6-9]\d{9}$/;

    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    //   document.querySelector(".emailBlock").style.display = 'none';
    // } else {
    //   document.querySelector(".emailBlock").style.display = 'block';
    //   document.querySelector(".emailBlock").innerHTML = 'You have entered an invalid email address!'
    //   return (false)
    // } 
    if (!num.test(phone)) {
      document.querySelector(".phoneBlock").style.display = 'block';
      document.querySelector(".phoneBlock").innerHTML = 'Please insert valid contact...';

      return false;
    } else {
      document.querySelector(".phoneBlock").style.display = 'none';
    }

    if(password.length < 6) {
      document.querySelector(".passBlock").style.display = 'block';
      document.querySelector(".passBlock").innerHTML = 'Please set the password 6 digit or greater then';
      return false;
    } else {
      document.querySelector(".passBlock").style.display = 'none';
    }

    id = id + 1;
    let data = { id, name, username, email, phone, password }
    //console.log({ id, name, username, email, phone, password });

    fetch("http://localhost:3000/users", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    }).then((result) => {
      result.json().then((resp) => {
        console.log('Signup', resp);
        setStatus(true);
      })
    })

  }

  const [records, setRecords] = useState([]);

  const [status, setStatus] = useState([]);

  const navigate = useNavigate();



  function backData() {
    navigate('/app');
  }

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    setUserRegistration({ ...userRegistration, [name]: value })
  }


  useEffect(() => {
    if (records.length > 0) {
      console.log(records);
      //localStorage.setItem("data", JSON.stringify(records));
      //setStatus(true);
    }
  }, [records])

  function handleSubmit(e) {
    e.preventDefault();
    const newRecords = { ...userRegistration, id: new Date().getTime().toString() };
    // console.log(records);  
    setRecords([...records, newRecords]);

  }

  return (
    <div>
      <form action="">
        <section className="bg">
          <div className="content">
            <div className="from-content">
              <div className="user"><img src={logoImage} alt="login" height="50px" width="50px  " /></div>
              <span className="text-primary">{(status === true) ? "You have successfully registered..." : ''}</span>
              <div className="from">
                <div className="from-list">
                  <input type="text" id="name" name="name" autoComplete='off' placeholder="Name" data-text="Please enter a name."
                    value={name} onChange={(e) => { setName(e.target.value) }} required />
                </div>
                <div className="from-list">
                  <input type="text" id="username" name="username" autoComplete='off' placeholder="Username" data-text="Please enter a user name." value={username} onChange={(e) => { setUsername(e.target.value) }} required />
                </div>
                <div className="from-list">
                  <input type="text" id="email" name="email" autoComplete='off' placeholder="Email" data-text="Please enter a valid email address." value={email} onChange={(e) => { checkEmail(e.target.value) }} required />
                  <div className="h emailBlock text-danger"></div>

                  </div>

                <div className="from-list">
                  <input type="Number" id="phone" name="phone" autoComplete='off' placeholder="Contact Number" data-text="Please enter a valid phone number."  value={phone} onChange={(e) => { checkPhone(e.target.value) }} required />
                  <div className="h phoneBlock text-danger"></div>
                </div>
                <div className="from-list">
                  <input type="password" id="password" name="password" autoComplete='off' placeholder="Password" data-text="The password must be between 6-20 characters long." value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                </div> <div className="h passBlock text-danger"></div>
                <p className="error-message">&nbsp;</p>
                <p className="tip signup-tip">
                </p>
                <div className="submit-btn">
                  <button className="login d-inline w-25 m-2 btn btn btn-success" onClick={() => { backData() }}>Go Back</button>
                  <button id="login" className="d-inline w-25 m-2 btn btn btn-success" onClick={saveUser}>Register</button>
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