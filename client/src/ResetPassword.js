import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from "react";
import {Link} from "react-router-dom"
import { useParams } from "react-router-dom"
import usePasswordToggle from './usePasswordToggle'
import Axios from 'axios';


const ResetPassword = () => {
    const [passwordInputType, ToggleIcon] = usePasswordToggle();
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("")
    const { token } = useParams();
    const [formErrors, setFormErrors] = useState({});
    const validate = (password, confPassword) => {
        var errors = {}
        if (!password)
            errors.password = 'Please enter your password'
        if (!confPassword)
            errors.confPassword = 'Please confirm your password'
        if (password !== confPassword)
            errors.match_pass = 'Password and confirm password must be same'
        return errors;
    }
    console.log(token);

    const resetPass = (e) => {
        e.preventDefault()
        var errors = {}
        errors = validate(password, confPassword)
        setFormErrors(validate(password, confPassword))
        if (Object.keys(errors).length === 0) {
            Axios.post('http://localhost:3002/newPassword', {
                token: token,
                password: password
            }).then((response) => {
                var result = JSON.parse(JSON.stringify(response)).data;
                alert(result)
            })
        }
    }

    return (
        <div className="container">

            <h2 className="header">Reset Password</h2>
            <div>
                <label className="form-label">Password</label>
                <div class="input-group mb-3">
                    <input type={passwordInputType} value={password} className="form-control" placeholder="Enter your new password" onChange={(e) => { setPassword(e.target.value) }} />
                    <span className="input-group-text">{ToggleIcon}</span>
                    <p>{formErrors.password}</p>
                </div>
            </div>
            <label className="form-label">Confirm Password</label>
            <input type={passwordInputType} value={confPassword} className="form-control" placeholder="Cofirm your password" onChange={(e) => { setConfPassword(e.target.value) }} />
            <p>{formErrors.confPassword}</p>
            <p>{formErrors.match_pass}</p>          
            <Link to="/">Go back to login</Link>
            <button type="submit" onClick={resetPass} className="btn btn d-grid mx-auto mb-7" style={{ backgroundColor: "#1e317e", color: "whitesmoke" }} >Reset password</button>

        </div>
    )
};

export default ResetPassword;