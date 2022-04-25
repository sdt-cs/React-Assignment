import React from 'react';
import {
    BrowserRouter as Router,
    useNavigate
} from "react-router-dom";

const Protect = (props) => {

    const navigate = useNavigate();
    const login = () =>{
        navigate('/auth')
    }
    return(
        <div>
            <h3 className="text-danger">Please login first...</h3>
            <div><button className="login d-inline w-25 m-2 btn btn-success" onClick={()=>{login()}}>Login</button> </div>
        </div>
    )
}

export default Protect;