import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    useNavigate,
    Route,
    Link
} from "react-router-dom";
import Protect from './Protected';


const Details = () => {

    const [loginStatus, setLoginStatus] = useState(false);
    const [loginDetails,setLoginDetails] = useState({});
    const [userList, updateList] = useState([]);
    
    //let data = localStorage.getItem('login') && JSON.parse(localStorage.getItem('login'))

    const navigate = useNavigate();


    // useEffect(() => {
    //     if (!data) {
    //         setLoginStatus(false);
    //     } else {
    //         setLoginStatus(true);
    //     }
    // }, [loginStatus])

    async function getLogin() {
        await fetch('http://localhost:3000/loginUser').then(res => res.json()).then((res)=>{
            
            if(res.length > 0) {
                updateList(res)
                setLoginStatus(true);
            } else {
                setLoginStatus(false);
            }
           
        })
        
    }


    useEffect(() => {
        if (userList.length == 0) {
            getLogin();
        }
    },[loginStatus])



    function backData() {
        navigate('/app');
    }


    function dashboard() {
        navigate('/dashboard');
    }

    function logout(id) {
       
        fetch(`http://localhost:3000/loginUser/${id}`,{
            method:"DELETE"
        }).then((result)=>{
            result.json().then((resp)=>{
                getLogin();
                navigate('/');
            })
        })
        //localStorage.setItem('login', '');
        //
    }

    return (
        <div>
            {(loginStatus) ?
                <div>
                    <h2><span className="text-light">Users Details</span></h2>
                    <center>
                        <table className="table table-dark table-striped w-50">
                        <tbody>
                            <tr>
                            <th scope="col">Id</th>
                                <td scope="col">{userList[0]?.id}</td>
                            </tr>
                            <tr>
                                <th> Name : </th>
                                <td>{userList[0]?.name}</td>
                            </tr>
                            <tr>
                                <th> username : </th>
                                <td>{userList[0]?.username}</td>
                            </tr>
                            <tr>
                                <th> Email : </th>
                                <td>{userList[0]?.email}</td>
                            </tr>
                            <tr>
                                <th> Phone : </th>
                                <td>{userList[0]?.phone}</td>
                            </tr>
                            <tr>
                                <th> Password : </th>
                                <td>{userList[0]?.password}</td>
                            </tr>
                            <tr>
                                <th colSpan="2">  <button className="login d-inline w-25 m-2 btn btn-warning" onClick={() => { logout(userList[0]?.id) }}>Logout</button> </th>
                            </tr>
                            </tbody>
                        </table>
                        <div>
                            <button className="login d-inline w-25 m-2 btn btn-success" onClick={() => { backData() }}>Go Back</button>
                            <button className="login d-inline w-25 m-2 btn btn btn-success" onClick={() => { dashboard() }}>Dashboard</button>
                        </div>


                    </center>
                </div>
                : <Protect />
            }
        </div>
    )
}

export default Details;