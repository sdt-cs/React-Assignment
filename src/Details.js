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
    let data = localStorage.getItem('login') && JSON.parse(localStorage.getItem('login'))

    const navigate = useNavigate();


    useEffect(() => {
        if (!data) {
            setLoginStatus(false);
        } else {
            setLoginStatus(true);
        }
    }, [loginStatus])

    function backData() {
        navigate('/app');
    }


    function dashboard() {
        navigate('/dashboard');
    }

    function logout() {
        localStorage.setItem('login', '');
        navigate('/');

    }

    return (

        <div>
            {(loginStatus) ?
                <div>
                    <h2><span className="text-light">Users Details</span></h2>
                    <center>
                        <table className="table table-dark table-striped w-50">

                            <tr>
                                <th scope="col">Id</th>
                                <td scope="col">{data.id}</td>
                            </tr>
                            <tr>
                                <th> Name : </th>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <th> username : </th>
                                <td>{data.username}</td>
                            </tr>
                            <tr>
                                <th> Email : </th>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <th> Phone : </th>
                                <td>{data.phone}</td>
                            </tr>
                            <tr>
                                <th> Password : </th>
                                <td>{data.password}</td>
                            </tr>
                            <tr>
                                <th colSpan="2">  <button className="login d-inline w-25 m-2 btn btn-warning" onClick={() => { logout() }}>Logout</button> </th>
                            </tr>


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