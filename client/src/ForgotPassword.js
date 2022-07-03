import React,{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import Axios from "axios";
const ForgotPassword = () =>{
    const [ICNumber, setICNumber] = useState("");
    const [formErros, setFormErrors] = useState({});
    const validate = (ICNumber) =>{
        var errors = {}
        if(!ICNumber)
            errors.ICNumber = 'Please enter your ICard Number'
    //     else{
    //     Axios.post('http://localhost:3002/validateICNumber', {
    //         ICNumber: ICNumber,
    //     }).then((response) =>{
    //         var result = JSON.parse(JSON.stringify(response)).data;
    //         console.log(typeof result)
            
    //         if(result === "does not exist"){
    //             errors.ICNumber = 'This ICNumber does not exist'
    //         }
    //     })
    // }
        return errors
    }
    const forgotPassword = () =>{
        //e.preventDefault();
        var errors = {}
        errors = validate(ICNumber)
        setFormErrors(validate(ICNumber))
        //console.log(Object.keys(errors).length)
        if(Object.keys(errors).length === 0){
            Axios.post('http://localhost:3002/validateICNumber', {
            ICNumber: ICNumber,
        }).then((response) =>{
            var result = JSON.parse(JSON.stringify(response)).data;
            console.log(typeof result)
            
            if(result === "does not exist"){
                errors.ICNumber = 'This ICNumber does not exist'
                setFormErrors(errors)
            }
            else{
                Axios.post('http://localhost:3002/resetPassword',{
                    ICNumber: ICNumber
                }).then(() =>{
                    alert("Reset password link sent on your registered Email Address")
                })
            }
        })
       
    }
    }
    return(
        <>
        <div className="container">
        <h2 className="header">Forgot Password</h2>
            <div>
                <label className="form-label">Password</label>
                <div class="input-group mb-3">
                <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                    <input type="text" value={ICNumber} className="form-control" placeholder="Enter your ICard number" onChange={(e) => { setICNumber(e.target.value) }} />
                
            </div>
            <p>{formErros.ICNumber}</p>
            <Link to="/">Go back to login</Link>
            <button type="submit" onClick={forgotPassword} className="btn btn d-grid mx-auto mb-7" style={{ backgroundColor: "#1e317e", color: "whitesmoke" }}>Send Password Reset Link</button>
            </div>
        </div>
        </>
    )
}

export default ForgotPassword