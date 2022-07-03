import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import usePasswordToggle from './usePasswordToggle';

function App() {

  const [ICNumber, setICNumber] = useState("");
  const [userName, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userPass, setPassword] = useState("");
  const [conf_password, setConfPassword] = useState("");
  const [currentDesignation, setDesignation] = useState("");
  const [currentLaboratory, setLaboratory] = useState("");
  const [email, setEmail] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const validate = (ICNumber, userName, phoneNumber, email, userPass, conf_password, currentDesignation, currentLaboratory) => {
    const errors = {};
    const regex = /^[6789]{1}[0-9]{9}$/i;
    const regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!ICNumber) {
      errors.icnumber = "Please enter ICard Number"
    }
    if (!userName) {
      errors.name = "Please enter your name"

    }
    if (!phoneNumber || !regex.test(phoneNumber)) {
      errors.phone = "Please enter a valid phone number"

    }
    if(!email || !regex_email.test(email)){
      errors.email = "Please eneter a valid email address"
    }
    if (!currentDesignation) {
      errors.designation = "Please enter your designation"

    }
    if (!currentLaboratory) {
      errors.laboratory = "Please enter your laboratory"

    }
    if (!userPass) {
      errors.pass = "Please enter your password"

    }
    if (userPass.length < 8) {
      errors.pass = "Password must be at least 8 characters"

    }
    if (!conf_password) {
      errors.conf_pass = "Please confirm your password"

    }
    if (userPass !== conf_password) {
      errors.match_pass = "Password and confirm password must be same"
    }

    return errors;

  }

  const changeDesignation = (newDesignation) => {
    setDesignation(newDesignation);
  }

  const changeLaboratory = (newLaboratory) => {
    setLaboratory(newLaboratory);
  }

  const submitData = () => {
    var errors = {}
    errors = validate(ICNumber, userName, phoneNumber,email, userPass, conf_password, currentDesignation, currentLaboratory)
    setFormErrors(validate(ICNumber, userName, phoneNumber,email, userPass, conf_password, currentDesignation, currentLaboratory))
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      Axios.post('http://localhost:3002/register', {
        ICNumber: ICNumber,
        userName: userName,
        phoneNumber: phoneNumber,
        email: email,
        currentDesignation: currentDesignation,
        currentLaboratory: currentLaboratory,
        userPass: userPass,
        conf_password: conf_password

      }).then(() => {
        setICNumber("");
        setName("");
        setPhoneNumber("");
        setDesignation("");
        setLaboratory("");
        setPassword("");
        setConfPassword("");
        setEmail("");
        alert("succesful insert")
      })

    }
  }
  const [passwordInputType, ToggleIcon] = usePasswordToggle();
  return (

    <div className="App mx-5 my-2">

      <div className="container">
        <h2 className="header">DRDO VC Booking</h2>
        <div className="mb-7">
          <label className="form-label">ICard Number</label>
          <input value={ICNumber} className="form-control" type="text" name="ICNumber" required onChange={
            (e) => { setICNumber(e.target.value) }}
            placeholder="Enter your ICard Number" /><p>{formErrors.icnumber}</p>
          <label className="form-label">Full Name</label>
          <input value={userName} className="form-control" type="text" name="userName" onChange={(e) => { setName(e.target.value) }} placeholder="Enter your full name" required />
          <p>{formErrors.name}</p>


          <label className="form-label">Mobile Number</label>
          <input value={phoneNumber} className="form-control" type="tel" name="phoneNumber" required onChange={(e) => { setPhoneNumber(e.target.value) }} placeholder="Enter your mobile number" />
          <p>{formErrors.phone}</p>

          <label className="form-label">Email ID</label>
          <input value={email} className="form-control" type="email" name="email" required onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your Email address" />
          <p>{formErrors.email}</p>

          <label className="form-label">Designation</label>
          <select className="form-select" name="currentDesignation" value={currentDesignation} onChange={(e) => changeDesignation(e.target.value)} required="">
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

          <label className="form-label">Lab/Estt.</label>
          <select className="form-select" name="currentLaboratory" value={currentLaboratory} onChange={(e) => changeLaboratory(e.target.value)}>
            <option value="" data-select2-id="select2-data-4-ep2d">Select Lab</option>
            <option value="ACEM">ACEM</option>
            <option value="ADA">ADA</option>
            <option value="ADE">ADE</option>
            <option value="ADRDE">ADRDE</option>
            <option value="ANURAG">ANURAG</option>
            <option value="ARDE">ARDE</option>
            <option value="ASL">ASL</option>
            <option value="CABS">CABS</option>
            <option value="CAIR">CAIR</option>
            <option value="CAS">CAS</option>
            <option value="CCE (R&amp;D) CENTRAL">CCE (R&amp;D) CENTRAL</option>
            <option value="CCE (R&amp;D) EAST">CCE (R&amp;D) EAST</option>
            <option value="CCE (R&amp;D) East, Kolkata">CCE (R&amp;D) East, Kolkata</option>
            <option value="CCE (R&amp;D) ESTATES">CCE (R&amp;D) ESTATES</option>
            <option value="CCE (R&amp;D) HYDERABAD">CCE (R&amp;D) HYDERABAD</option>
            <option value="CCE (R&amp;D) NORTH">CCE (R&amp;D) NORTH</option>
            <option value="CCE (R&amp;D) WEST">CCE (R&amp;D) WEST</option>
            <option value="CCE(R&amp;D)South">CCE(R&amp;D)South</option>
            <option value="CEMILAC">CEMILAC</option>
            <option value="CEMILAC - RCMA">CEMILAC - RCMA</option>
            <option value="CEPTAM">CEPTAM</option>
            <option value="CFEES">CFEES</option>
            <option value="Chairman DRDO">Chairman DRDO</option>
            <option value="Chairman, CEPTAM">Chairman, CEPTAM</option>
            <option value="Chairman, RAC">Chairman, RAC</option>
            <option value="CHESS">CHESS</option>
            <option value="CVRDE">CVRDE</option>
            <option value="DARE">DARE</option>
            <option value="DCW&amp;E">DCW&amp;E</option>
            <option value="DEAL">DEAL</option>
            <option value="DEBEL">DEBEL</option>
            <option value="DESIDOC">DESIDOC</option>
            <option value="DFRL">DFRL</option>
            <option value="DGRE">DGRE</option>
            <option value="DHRD">DHRD</option>
            <option value="DIAT">DIAT</option>
            <option value="DIBER">DIBER</option>
            <option value="DIC - Panagarh">DIC - Panagarh</option>
            <option value="DIHAR">DIHAR</option>
            <option value="DIPAS">DIPAS</option>
            <option value="DIPR">DIPR</option>
            <option value="DL">DL</option>
            <option value="DLJ">DLJ</option>
            <option value="DLRL">DLRL</option>
            <option value="DMRL">DMRL</option>
            <option value="DMS(R&amp;D) - Kanpur">DMS(R&amp;D) - Kanpur</option>
            <option value="DMSRDE">DMSRDE</option>
            <option value="DOP">DOP</option>
            <option value="DRDE">DRDE</option>
            <option value="DRDL">DRDL</option>
            <option value="DRL">DRL</option>
            <option value="DRL Tezpur">DRL Tezpur</option>
            <option value="Dte. of Naval Design (SDG)">Dte. of Naval Design (SDG)</option>
            <option value="DTRL">DTRL</option>
            <option value="Dy IFA">Dy IFA</option>
            <option value="EMU">EMU</option>
            <option value="Gaetec">Gaetec</option>
            <option value="GTRE">GTRE</option>
            <option value="HEMRL">HEMRL</option>
            <option value="HQ - A R&amp;D B">HQ - A R&amp;D B</option>
            <option value="HQ - Addl FA">HQ - Addl FA</option>
            <option value="HQ - ARMREB">HQ - ARMREB</option>
            <option value="HQ - DCW&amp;E">HQ - DCW&amp;E</option>
            <option value="HQ - DCWE">HQ - DCWE</option>
            <option value="HQ - DFMM">HQ - DFMM</option>
            <option value="HQ - DFTM">HQ - DFTM</option>
            <option value="HQ - DG - ACE">HQ - DG - ACE</option>
            <option value="HQ - DG - AERO">HQ - DG - AERO</option>
            <option value="HQ - DG - BRAHMOS">HQ - DG - BRAHMOS</option>
            <option value="HQ - DG - ECS">HQ - DG - ECS</option>
            <option value="HQ - DG - HR">HQ - DG - HR</option>
            <option value="HQ - DG - LS">HQ - DG - LS</option>
            <option value="HQ - DG - MED &amp; COS">HQ - DG - MED &amp; COS</option>
            <option value="HQ - DG - MSS">HQ - DG - MSS</option>
            <option value="HQ - DG - NS &amp; M">HQ - DG - NS &amp; M</option>
            <option value="HQ - DG - PC&amp;SI">HQ - DG - PC&amp;SI</option>
            <option value="HQ - DG - RM">HQ - DG - RM</option>
            <option value="HQ - DG - RM AND IMP">HQ - DG - RM AND IMP</option>
            <option value="HQ - DG - SAM">HQ - DG - SAM</option>
            <option value="HQ - DG - TM">HQ - DG - TM</option>
            <option value="HQ - DHRD">HQ - DHRD</option>
            <option value="HQ - DIC">HQ - DIC</option>
            <option value="HQ - DIITM">HQ - DIITM</option>
            <option value="HQ - DISB">HQ - DISB</option>
            <option value="HQ - DIT&amp;CS">HQ - DIT&amp;CS</option>
            <option value="HQ - DLIC">HQ - DLIC</option>
            <option value="HQ - DMS">HQ - DMS</option>
            <option value="HQ - DNRD">HQ - DNRD</option>
            <option value="HQ - DOP">HQ - DOP</option>
            <option value="HQ - DP C">HQ - DP C</option>
            <option value="HQ - DP&amp;C">HQ - DP&amp;C</option>
            <option value="HQ - DPA">HQ - DPA</option>
            <option value="HQ - DPI">HQ - DPI</option>
            <option value="HQ - DQR&amp;S">HQ - DQR&amp;S</option>
            <option value="HQ - DR&amp;D">HQ - DR&amp;D</option>
            <option value="HQ - DRDO">HQ - DRDO</option>
            <option value="HQ - DSTA">HQ - DSTA</option>
            <option value="HQ - DTDF">HQ - DTDF</option>
            <option value="HQ - DVS">HQ - DVS</option>
            <option value="HQ - ER &amp; IPR">HQ - ER &amp; IPR</option>
            <option value="HQ - O/o Secy DDR&amp;D">HQ - O/o Secy DDR&amp;D</option>
            <option value="HQ - PARLIAMENTARY AFFAIRS">HQ - PARLIAMENTARY AFFAIRS</option>
            <option value="HQ - RAJBHASHA AND O&amp;M">HQ - RAJBHASHA AND O&amp;M</option>
            <option value="HQ - RTI CELL">HQ - RTI CELL</option>
            <option value="HQ - SAM-C">HQ - SAM-C</option>
            <option value="HQ - TE&amp;DC">HQ - TE&amp;DC</option>
            <option value="HQ- DG - TM">HQ- DG - TM</option>
            <option value="IAF">IAF</option>
            <option value="IFA (R&amp;D)">IFA (R&amp;D)</option>
            <option value="INMAS">INMAS</option>
            <option value="INTEG MUMBAI">INTEG MUMBAI</option>
            <option value="IRDE">IRDE</option>
            <option value="ISSA">ISSA</option>
            <option value="ITM">ITM</option>
            <option value="ITR">ITR</option>
            <option value="JCB">JCB</option>
            <option value="LASTEC">LASTEC</option>
            <option value="LRDE">LRDE</option>
            <option value="MoF">MoF</option>
            <option value="MSC - PUNE">MSC - PUNE</option>
            <option value="MTRDC">MTRDC</option>
            <option value="NAVY">NAVY</option>
            <option value="NMRL">NMRL</option>
            <option value="NPOL">NPOL</option>
            <option value="NSTL">NSTL</option>
            <option value="Other">Other</option>
            <option value="Programme Office - I">Programme Office - I</option>
            <option value="PROGRAMME OFFICE - II">PROGRAMME OFFICE - II</option>
            <option value="PXE">PXE</option>
            <option value="QC - Young Scientists">QC - Young Scientists</option>
            <option value="R&amp;DE(E)">R&amp;DE(E)</option>
            <option value="RAC">RAC</option>
            <option value="RCI">RCI</option>
            <option value="RCMA - CHANDIGARH">RCMA - CHANDIGARH</option>
            <option value="RCMA - KORWA">RCMA - KORWA</option>
            <option value="RCMA - LUCKNOW">RCMA - LUCKNOW</option>
            <option value="RCMA - NASHIK">RCMA - NASHIK</option>
            <option value="RCMA - PUNE">RCMA - PUNE</option>
            <option value="RIC - CHENNAI">RIC - CHENNAI</option>
            <option value="RM Office">RM Office</option>
            <option value="SA to CAS">SA to CAS</option>
            <option value="SA to CNS">SA to CNS</option>
            <option value="SA to COAS">SA to COAS</option>
            <option value="SAG">SAG</option>
            <option value="SASE">SASE</option>
            <option value="SFC - JAGDALPUR">SFC - JAGDALPUR</option>
            <option value="SSPL">SSPL</option>
            <option value="TBRL">TBRL</option>
            <option value="TTC">TTC</option>
            <option value="VRDE">VRDE</option>
            <option value="ZICB">ZICB</option>
            <option value="ZPIQ">ZPIQ</option>
          </select>
          <p>{formErrors.laboratory}</p>
          <label className="form-label">Password</label>
          <div class="input-group mb-3">
            <input value={userPass} className="form-control" placeholder="Create a password" type={passwordInputType} required name="userPass" onChange={(e) => { setPassword(e.target.value) }} />
            <span className="input-group-text">{ToggleIcon}</span>
          </div>
          <p>{formErrors.pass}</p>
          <label className="form-label">Confirm Password</label>
            <input value={conf_password} type={passwordInputType} placeholder="Confirm the password" className="form-control" required name="conf_password" onChange={(e) => { setConfPassword(e.target.value) }} />
          <p>{formErrors.conf_pass}</p>
          <p>{formErrors.match_pass}</p>
          <div>Already have account&nbsp;<Link to="/">Login</Link></div>
          <input type="submit" value="Register" className="btn btn d-grid mx-auto mb-7" style={{ backgroundColor: "#1e317e", color: "whitesmoke" }} onClick={submitData} />
        </div>
      
      </div>
    </div>

  );
}

export default App;

