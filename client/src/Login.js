import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { isMobile } from "react-device-detect"
import usePasswordToggle from './usePasswordToggle'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
    const getDetails = () => {
        Axios.get('https://geolocation-db.com/json/', {

        }).then((response) => {
            localStorage.setItem("country", response.data.country_name)
            localStorage.setItem("ip", response.data.IPv4)
        })
    }
    const [ICNumber, setICNumber] = useState("");
    const [password, setPassword] = useState("");
    var device;
    var dateTime;
    const [formErrors, setFormErrors] = useState({});
    const validate = (ICNumber, password) => {
        const errors = {}
        let user_captcha = document.getElementById('user_captcha_input').value;
        if (!ICNumber) {
            errors.icnumber = "Please enter your ICard Number"
        }
        if (!password) {
            errors.password = "Please enter your password"
        }
 
       if(validateCaptcha(user_captcha) === false){
            errors.captcha = 'Captcha does not match'
            document.getElementById('user_captcha_input').value = "";
        }
        return errors;
    }
    getDetails();


    const checkLogIn = () => {
        var errors = {}
        errors = validate(ICNumber, password)
        setFormErrors(validate(ICNumber, password))
        console.log(formErrors)
        console.log(Object.keys(errors).length)
        if (Object.keys(errors).length === 0) {
            Axios.post('http://localhost:3002/login', {
                ICNumber: ICNumber,
                password: password,
            }).then((response) => {
                if (response.data === "failed") {
                    errors.invalid  = "Invalid username or password"
                    setFormErrors(errors)
                    setICNumber("")
                    setPassword("")
                    localStorage.setItem('loginStatus', "Login failed")
                }
                else {
                    const user = response.data[0].username
                    const mobile = response.data[0].phone
                    const ICNumber = response.data[0].ICNumber
                    console.log(user)
                    localStorage.setItem('user', user);
                    localStorage.setItem('mobile', mobile);
                    localStorage.setItem('ICNumber', ICNumber)
                    localStorage.setItem('loginStatus', "Login success")
                }
                Axios.post('http://localhost:3002/loginActivity', {
                    country: localStorage.getItem("country"),
                    IPAddress: localStorage.getItem("ip"),
                    device: device,
                    status: localStorage.getItem("loginStatus"),
                    ICNumber: ICNumber,
                    dateTime: dateTime
                }).then(() => {
                    console.log("hello2")
                    if (localStorage.getItem("loginStatus") === "Login success") {
                        window.location.replace('http://localhost:3000/booking/newbooking');
                        //alert("Login successful")
                    }
                })
            })
        }
        var current = new Date();
        dateTime = current.getDate() + "-" + (current.getMonth() + 1) + "-" + current.getFullYear() + " " +
            current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
        console.log(ICNumber)
        if (isMobile) {
            device = "Mobile"
        }
        else {
            device = "Desktop"
        }
        console.log(dateTime, device)
    }

    useEffect(() => {
        loadCaptchaEnginge(6); 
     },[]);

    const [passwordInputType, ToggleIcon] = usePasswordToggle();
    return (
        <div className="container">

            <h2 className="header">Login</h2>
            <div>
                <label className="form-label">Icard Number</label>
                <input type="text" value={ICNumber} className="form-control" placeholder="Enter your ICard Number" onChange={(e) => { setICNumber(e.target.value) }} />
                <p>{formErrors.icnumber}</p>
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
                   {/* <div className="col mt-3">
                       <div><button class="btn btn-primary" onClick={() => doSubmit()}>Submit</button></div>
                   </div> */}
            </div>
            <Link to="forgotPassword">Forgot Password</Link>
            <div>Don't have account&nbsp;<Link to="register">Register here</Link></div>
            <div><Link to="adminLogin">Admin Login</Link></div>
            <button type="submit" className="btn btn d-grid mx-auto mb-7" style={{ backgroundColor: "#1e317e", color: "whitesmoke" }} onClick={checkLogIn}>Log In</button>
            
        </div>
    )
};

export default Login;