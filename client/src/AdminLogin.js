import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import usePasswordToggle from './usePasswordToggle'
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const validate = (username, password) => {
        const errors = {}
        let user_captcha = document.getElementById('user_captcha_input').value;
        if (!username) {
            errors.username = "Please enter your ICard Number"
        }
        if (!password) {
            errors.password = "Please enter your password"
        }
        if(username !== "Admin")
            errors.username = "Invalid username"
        if(password !== "sai786gaja")
            errors.password = 'Invalid password'
        if (validateCaptcha(user_captcha) === false) {
            errors.captcha = 'Captcha does not match'
            document.getElementById('user_captcha_input').value = "";
        }
        if(username === "Admin" && password ==="sai786gaja" && validateCaptcha(user_captcha) === true){
            window.location.replace('http://localhost:3000/bookingGrid');
        }

        return errors;
    }

    const checkLogin = () => {
        setFormErrors(validate(username, password))
    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const [passwordInputType, ToggleIcon] = usePasswordToggle();
    return (
        <>
            <div className="container">
                <h2 className="header">Admin Login</h2>
                <div>
                    <label className="form-label">username</label>
                    <input type="text" value={username} className="form-control" placeholder="Enter your username" onChange={(e) => { setUsername(e.target.value) }} />
                    <p>{formErrors.username}</p>
                </div>
                <div>
                    <label className="form-label">Password</label>
                    <div class="input-group mb-3">
                        <input type={passwordInputType} value={password} className="form-control" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value) }} />
                        <span className="input-group-text">{ToggleIcon}</span>
                    </div>

                    <p>{formErrors.password}</p>
                    <p>{formErrors.invalid}</p>

                </div>
                <div className="form-group">
                    <div className="col mt-3">
                        <LoadCanvasTemplate />
                    </div>

                    <div className="col mt-3">
                        <div><input className="form-control" placeholder="Enter Captcha Value" id="user_captcha_input" type="text"></input></div>
                    </div>
                    <p>{formErrors.captcha}</p>
                </div>
                <Link to="/">Back to user Login</Link>
                <button type="submit" className="btn btn d-grid mx-auto mb-7" style={{ backgroundColor: "#1e317e", color: "whitesmoke" }} onClick={checkLogin}> Log In</button>
            </div>
        </>
    )
}

export default AdminLogin