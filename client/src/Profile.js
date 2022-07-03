import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './profile.css'
import Axios from "axios"
import React, { useState, useEffect } from "react";

const Profile = () => {

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [designation, setDesignation] = useState("");
    const [laboratory, setLaboratory] = useState("");
    const [email, setEmail] = useState("");

    const [formErrors, setFormErrors] = useState("");
    const validate = (username, phone, email, designation) => {
        const errors = {}
        const regex = /^[6789]{1}[0-9]{9}$/i;
        const regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!username) {
            errors.username = 'Please enter your username'
        }
        if (!phone || !regex.test(phone)) {
            errors.phone = 'Please enter a valid phone number'
        }
        if (!email || !regex_email.test(email)) {
            errors.email = 'Please enter a valid email address'
        }
        if (!designation) {
            errors.designation = 'Please select your designation'
        }
        return errors;
    }
    const getData = () => {

        Axios.post('http://localhost:3002/profile', {
            ICNumber: localStorage.getItem("ICNumber"),
        }).then((response) => {
            var result = JSON.parse(JSON.stringify(response)).data;
            setUsername(result[0].username);
            setPhone(result[0].phone)
            setDesignation(result[0].designation)
            setLaboratory(result[0].laboratory)
            setEmail(result[0].email)
        })

    }
    useEffect(() => {
        getData();
    }, [])

    const updateProfile = (e) => {
        var errors = {}
        errors = validate(username, phone, email, designation)
        setFormErrors(validate(username, phone, email, designation))
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            Axios.post('http://localhost:3002/updateProfile', {
                username: username,
                phone: phone,
                designation: designation,
                email: email,
                ICNumber: localStorage.getItem("ICNumber")
            }).then((response) => {
                alert("Details updated successfully");
                getData();
                localStorage.setItem("user", username);
                localStorage.setItem("mobile", phone)
                window.location.reload();
            })
        }
    }
    const resetPass = (e) => {
        e.preventDefault();
       
            Axios.post('http://localhost:3002/resetPassword', {
               ICNumber: localStorage.getItem("ICNumber"),
            }).then(() => {
                alert("Link sent");

            })
        
    }

    return (
        <>
            <div className="container my-4">

                <h2 className="header">My profile
                    <span>
                    <button type="submit" onClick={resetPass} className="btn btn-danger" style={{ color: "whitesmoke", float: "right" }}>Reset Password</button>
                        {/* <button type="submit" onclick={resetPass} className="btn btn-danger" style={{ color: "whitesmoke", float: "right" }}>Reset password</button> */}
                    </span>
                </h2>
                <div className="mb-7">
                    <label className="form-label">Full Name</label>
                    <input id="username" value={username} type="text" className="form-control"
                        onChange={(e) => { setUsername(e.target.value) }} placeholder="Enter your name" />
                    <p>{formErrors.username}</p>
                </div>
                <div className="mb-7">
                    <label className="form-label">IC Number</label>
                    <input type="text" className="form-control" value={localStorage.getItem("ICNumber")} readOnly />
                </div>
                <div className="mb-7">
                    <label className="form-label">Lab/Estt.</label>
                    <input type="text" className="form-control"
                        onChange={(e) => { setLaboratory(e.target.value) }} value={laboratory} readOnly />

                </div>
                <div className="mb-7">
                    <label className="form-label">Mobile</label>
                    <input value={phone} type="text" placeholder="Enter your mobile number here"
                        className="form-control"
                        onChange={(e) => { setPhone(e.target.value) }} />
                    <p>{formErrors.phone}</p>
                </div>
                <div className="mb-7">
                    <label className="form-label">Email</label>
                    <input value={email} type="text" placeholder="Enter your email address here"
                        className="form-control"
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <p>{formErrors.email}</p>
                </div>
                <div className="mb-7">
                    <label className="form-label">Designation</label>
                    <select className="form-select" value={designation} onChange={(e) => setDesignation(e.target.value)} required="">
                        <option value="" data-select2-id="select2-data-2-m3ed">Select Designation</option>
                        <option value="Accountant" data-select2-id="select2-data-12-cs4c">Accountant</option>
                        <option value="Accounts Officer" data-select2-id="select2-data-13-26b7">Accounts Officer</option>
                        <option value="Additional Director" data-select2-id="select2-data-14-s3ra">Additional Director</option>
                        <option value="Addl. Advisor (Navy)" data-select2-id="select2-data-15-o4ks">Addl. Advisor (Navy)</option>
                        <option value="Addl. CCE" data-select2-id="select2-data-16-5myb">Addl. CCE</option>
                        <option value="Addl. FA &amp; JS" data-select2-id="select2-data-17-r69k">Addl. FA &amp; JS</option>
                        <option value="ADFO" data-select2-id="select2-data-18-0h6u">ADFO</option>
                        <option value="Admin Asst. A" data-select2-id="select2-data-19-eqcm">Admin Asst. A</option>
                        <option value="Admin Asst. B" data-select2-id="select2-data-20-t7fh">Admin Asst. B</option>
                        <option value="Admin Officer" data-select2-id="select2-data-21-7oov">Admin Officer</option>
                        <option value="Advisor (Navy)" data-select2-id="select2-data-22-3uli">Advisor (Navy)</option>
                        <option value="Air Commodore - IAF" data-select2-id="select2-data-23-kwdq">Air Commodore - IAF</option>
                        <option value="ALS II" data-select2-id="select2-data-24-tvdr">ALS II</option>
                        <option value="ALS III" data-select2-id="select2-data-25-l1tj">ALS III</option>
                        <option value="AMS III" data-select2-id="select2-data-26-wehj">AMS III</option>
                        <option value="Assistant Director" data-select2-id="select2-data-27-5re0">Assistant Director</option>
                        <option value="Assistant Section Officer" data-select2-id="select2-data-28-0v07">Assistant Section Officer
                        </option>
                        <option value="Assistant Section Officer - AFHQ" data-select2-id="select2-data-29-bnyp">Assistant Section
                            Officer - AFHQ</option>
                        <option value="Asst Mgr cum Store Keeper" data-select2-id="select2-data-30-ajtc">Asst Mgr cum Store Keeper
                        </option>
                        <option value="Asst. Advisor (Navy)" data-select2-id="select2-data-31-yvx1">Asst. Advisor (Navy)</option>
                        <option value="Asstt. Section Officer" data-select2-id="select2-data-32-6tm1">Asstt. Section Officer</option>
                        <option value="Cant Attendant A" data-select2-id="select2-data-33-j73r">Cant Attendant A</option>
                        <option value="Captain - IN" data-select2-id="select2-data-34-zemr">Captain - IN</option>
                        <option value="CCE" data-select2-id="select2-data-35-d1wu">CCE</option>
                        <option value="Chief Admin Officer" data-select2-id="select2-data-36-pu3z">Chief Admin Officer</option>
                        <option value="Chief Construction Engineer" data-select2-id="select2-data-37-6fuo">Chief Construction Engineer
                        </option>
                        <option value="Chief engineer(NFG)" data-select2-id="select2-data-38-o8ax">Chief engineer(NFG)</option>
                        <option value="Chief Security Officer" data-select2-id="select2-data-39-lv9q">Chief Security Officer</option>
                        <option value="Colonel - IA" data-select2-id="select2-data-40-27c9">Colonel - IA</option>
                        <option value="Commander - IN" data-select2-id="select2-data-41-3aaj">Commander - IN</option>
                        <option value="Construction Engineer" data-select2-id="select2-data-42-1k3j">Construction Engineer</option>
                        <option value="Cook" data-select2-id="select2-data-43-gfsp">Cook</option>
                        <option value="Corporal - IAF" data-select2-id="select2-data-44-qsoh">Corporal - IAF</option>
                        <option value="Cos Attendant A" data-select2-id="select2-data-45-50sz">Cos Attendant A</option>
                        <option value="DDFO" data-select2-id="select2-data-46-5vwg">DDFO</option>
                        <option value="Dean" data-select2-id="select2-data-47-pznc">Dean</option>
                        <option value="DEO" data-select2-id="select2-data-48-eu8u">DEO</option>
                        <option value="DEO D" data-select2-id="select2-data-49-qn5z">DEO D</option>
                        <option value="Deputy Director - AFHQ" data-select2-id="select2-data-50-s0c2">Deputy Director - AFHQ</option>
                        <option value="Deputy Secretary" data-select2-id="select2-data-51-5827">Deputy Secretary</option>
                        <option value="DPMT - AFHQ" data-select2-id="select2-data-52-hny0">DPMT - AFHQ</option>
                        <option value="Dy IFA" data-select2-id="select2-data-53-9iec">Dy IFA</option>
                        <option value="Dy. CCE" data-select2-id="select2-data-54-2tin">Dy. CCE</option>
                        <option value="Fire Engine Driver A" data-select2-id="select2-data-55-xb0b">Fire Engine Driver A</option>
                        <option value="Fire Engine Driver B" data-select2-id="select2-data-56-2igp">Fire Engine Driver B</option>
                        <option value="Fire Engine Driver C" data-select2-id="select2-data-57-mpie">Fire Engine Driver C</option>
                        <option value="Fireman" data-select2-id="select2-data-58-ienq">Fireman</option>
                        <option value="Garden Attendant" data-select2-id="select2-data-59-bw7y">Garden Attendant</option>
                        <option value="General Manager" data-select2-id="select2-data-60-q4a5">General Manager</option>
                        <option value="Gp Capt" data-select2-id="select2-data-61-ogmz">Gp Capt</option>
                        <option value="Group Captain - IAF" data-select2-id="select2-data-62-2ohn">Group Captain - IAF</option>
                        <option value="Halwai cum Cook" data-select2-id="select2-data-63-s2zl">Halwai cum Cook</option>
                        <option value="Havaldar - IA" data-select2-id="select2-data-64-tas0">Havaldar - IA</option>
                        <option value="Head Cook" data-select2-id="select2-data-65-60vl">Head Cook</option>
                        <option value="Hindi Asstt." data-select2-id="select2-data-66-auno">Hindi Asstt.</option>
                        <option value="Hindi Officer" data-select2-id="select2-data-67-f0q4">Hindi Officer</option>
                        <option value="IFA" data-select2-id="select2-data-68-pnn7">IFA</option>
                        <option value="Joint Advisor (Navy)" data-select2-id="select2-data-69-nlze">Joint Advisor (Navy)</option>
                        <option value="Joint Director" data-select2-id="select2-data-70-bqv6">Joint Director</option>
                        <option value="Joint Director Admin" data-select2-id="select2-data-71-kzaf">Joint Director Admin</option>
                        <option value="JRF" data-select2-id="select2-data-72-x9yr">JRF</option>
                        <option value="Junior Secretariat Assistant" data-select2-id="select2-data-73-zr26">Junior Secretariat Assistant
                        </option>
                        <option value="Junior Warrant Officer - IAF" data-select2-id="select2-data-74-n6ha">Junior Warrant Officer - IAF
                        </option>
                        <option value="Lance Naik - IA" data-select2-id="select2-data-75-j1zr">Lance Naik - IA</option>
                        <option value="Leading Aircraftsman - IAF" data-select2-id="select2-data-76-dqk0">Leading Aircraftsman - IAF
                        </option>
                        <option value="Leading Fireman" data-select2-id="select2-data-77-fio8">Leading Fireman</option>
                        <option value="Lieutenant Colonel - IA" data-select2-id="select2-data-78-pak0">Lieutenant Colonel - IA</option>
                        <option value="Lt Col" data-select2-id="select2-data-79-yt6m">Lt Col</option>
                        <option value="Major - IA" data-select2-id="select2-data-80-l81g">Major - IA</option>
                        <option value="Major General - IA" data-select2-id="select2-data-81-nttm">Major General - IA</option>
                        <option value="Master Warrant Officer - IAF" data-select2-id="select2-data-82-mc99">Master Warrant Officer - IAF
                        </option>
                        <option value="Motor Boat Engine Driver" data-select2-id="select2-data-83-p8zl">Motor Boat Engine Driver
                        </option>
                        <option value="MTS" data-select2-id="select2-data-84-t5cz">MTS</option>
                        <option value="Naib Subedar - IA" data-select2-id="select2-data-85-uzk3">Naib Subedar - IA</option>
                        <option value="Office Attendant B" data-select2-id="select2-data-86-1dy3">Office Attendant B</option>
                        <option value="Office Attendant D" data-select2-id="select2-data-87-ruaw">Office Attendant D</option>
                        <option value="Others" data-select2-id="select2-data-88-keu2">Others</option>
                        <option value="PA" data-select2-id="select2-data-89-yw8b">PA</option>
                        <option value="PA C" data-select2-id="select2-data-90-vlcp">PA C</option>
                        <option value="PA to PS" data-select2-id="select2-data-91-68bj">PA to PS</option>
                        <option value="Personal Assistant" data-select2-id="select2-data-92-bhcf">Personal Assistant</option>
                        <option value="PPS" data-select2-id="select2-data-93-agcf">PPS</option>
                        <option value="Principal Director" data-select2-id="select2-data-94-d929">Principal Director</option>
                        <option value="Private Secretary" data-select2-id="select2-data-95-yfns">Private Secretary</option>
                        <option value="PS" data-select2-id="select2-data-96-rf35">PS</option>
                        <option value="Ps to RM- IAS" data-select2-id="select2-data-97-88vl">Ps to RM- IAS</option>
                        <option value="SA to CAS" data-select2-id="select2-data-98-mcxv">SA to CAS</option>
                        <option value="SAO I" data-select2-id="select2-data-99-m8j4">SAO I</option>
                        <option value="SAO II" data-select2-id="select2-data-100-o34d">SAO II</option>
                        <option value="Scientist B" data-select2-id="select2-data-101-65ll">Scientist B</option>
                        <option value="Scientist C" data-select2-id="select2-data-102-v81q">Scientist C</option>
                        <option value="Scientist D" data-select2-id="select2-data-103-u3zs">Scientist D</option>
                        <option value="Scientist E" data-select2-id="select2-data-104-ypph">Scientist E</option>
                        <option value="Scientist F" data-select2-id="select2-data-105-51cb">Scientist F</option>
                        <option value="Scientist G" data-select2-id="select2-data-106-k1s1">Scientist G</option>
                        <option value="Scientist H" data-select2-id="select2-data-107-m7mt">Scientist H</option>
                        <option value="Scientist H / OS" data-select2-id="select2-data-108-o989">Scientist H / OS</option>
                        <option value="Sec Attendant A" data-select2-id="select2-data-109-0qaa">Sec Attendant A</option>
                        <option value="Section Officer" data-select2-id="select2-data-110-3x4y">Section Officer</option>
                        <option value="Security Assistant A" data-select2-id="select2-data-111-0zjv">Security Assistant A</option>
                        <option value="Security Assistant B" data-select2-id="select2-data-112-isux">Security Assistant B</option>
                        <option value="Security Attendant" data-select2-id="select2-data-113-xmup">Security Attendant</option>
                        <option value="Security Officer" data-select2-id="select2-data-114-mmhx">Security Officer</option>
                        <option value="Senior Account Officer" data-select2-id="select2-data-115-chyp">Senior Account Officer</option>
                        <option value="Senior Accounts Officer Grade - I" data-select2-id="select2-data-116-bmu3">Senior Accounts
                            Officer Grade - I</option>
                        <option value="Senior Accounts Officer Grade - II" data-select2-id="select2-data-117-jwfv">Senior Accounts
                            Officer Grade - II</option>
                        <option value="Senior Admin Asstt." data-select2-id="select2-data-118-88hj">Senior Admin Asstt.</option>
                        <option value="Senior Principal Private Secretary" data-select2-id="select2-data-119-n9gl">Senior Principal
                            Private Secretary</option>
                        <option value="Senior Private Secretary" data-select2-id="select2-data-120-swav">Senior Private Secretary
                        </option>
                        <option value="Senior Secretariat Assistant" data-select2-id="select2-data-121-ruq0">Senior Secretariat
                            Assistant</option>
                        <option value="Senior Security Assistant" data-select2-id="select2-data-122-n6bf">Senior Security Assistant
                        </option>
                        <option value="Senior Security Officer" data-select2-id="select2-data-123-0rrb">Senior Security Officer</option>
                        <option value="Senior Store Asstt." data-select2-id="select2-data-124-2otv">Senior Store Asstt.</option>
                        <option value="Senior Technical Assistant B" data-select2-id="select2-data-125-4n3z">Senior Technical Assistant
                            B</option>
                        <option value="Senior Translation Officer" data-select2-id="select2-data-126-ixgz">Senior Translation Officer
                        </option>
                        <option value="Senior Translator" data-select2-id="select2-data-127-fo6m">Senior Translator</option>
                        <option value="Sepoy - IA" data-select2-id="select2-data-128-98ai">Sepoy - IA</option>
                        <option value="SRF" data-select2-id="select2-data-129-hyg3">SRF</option>
                        <option value="SSO - I" data-select2-id="select2-data-130-dtz5">SSO - I</option>
                        <option value="SSO - II" data-select2-id="select2-data-131-c44h">SSO - II</option>
                        <option value="Staff Officer" data-select2-id="select2-data-132-0j7a">Staff Officer</option>
                        <option value="Station Officer" data-select2-id="select2-data-133-4qwv">Station Officer</option>
                        <option value="Steno - D" data-select2-id="select2-data-134-9atv">Steno - D</option>
                        <option value="Stenographer Grade - I" data-select2-id="select2-data-135-nq2b">Stenographer Grade - I</option>
                        <option value="Stenographer Grade - II" data-select2-id="select2-data-136-cmx1">Stenographer Grade - II</option>
                        <option value="Store Asstt. A" data-select2-id="select2-data-137-4lmu">Store Asstt. A</option>
                        <option value="Store Asstt. B" data-select2-id="select2-data-138-5pwj">Store Asstt. B</option>
                        <option value="Stores Officer" data-select2-id="select2-data-139-a1cw">Stores Officer</option>
                        <option value="Subedar - IA" data-select2-id="select2-data-140-ovzk">Subedar - IA</option>
                        <option value="Subedar Major - IA" data-select2-id="select2-data-141-xlz4">Subedar Major - IA</option>
                        <option value="Technical Assistant B" data-select2-id="select2-data-142-b2ur">Technical Assistant B</option>
                        <option value="Technician A" data-select2-id="select2-data-143-ylb5">Technician A</option>
                        <option value="Technician B" data-select2-id="select2-data-144-06lx">Technician B</option>
                        <option value="Technician C" data-select2-id="select2-data-145-pvgp">Technician C</option>
                        <option value="TO" data-select2-id="select2-data-146-i18l">TO</option>
                        <option value="TO - A" data-select2-id="select2-data-147-tuyp">TO - A</option>
                        <option value="TO - B" data-select2-id="select2-data-148-3728">TO - B</option>
                        <option value="TO - C" data-select2-id="select2-data-149-31vb">TO - C</option>
                        <option value="TO - D" data-select2-id="select2-data-150-hmes">TO - D</option>
                        <option value="Trainee" data-select2-id="select2-data-151-mc4h">Trainee</option>
                        <option value="TSO" data-select2-id="select2-data-152-skyw">TSO</option>
                        <option value="Vehicle Operator A" data-select2-id="select2-data-153-33wj">Vehicle Operator A</option>
                        <option value="Vehicle Operator B" data-select2-id="select2-data-154-9x2z">Vehicle Operator B</option>
                        <option value="Vehicle Operator C" data-select2-id="select2-data-155-gc2q">Vehicle Operator C</option>
                        <option value="Wing Commander - IAF" data-select2-id="select2-data-156-amp8">Wing Commander - IAF</option>
                    </select>
                    <p>{formErrors.designation}</p>
                </div>
                <br />
                <div>
                    <button type="submit" onClick={updateProfile} className="btn d-grid mx-auto mb-7" style={{ backgroundColor: "green", color: "whitesmoke" }}>Update Profile</button>
                </div>
            </div>
        </>
    )
}

export default Profile;