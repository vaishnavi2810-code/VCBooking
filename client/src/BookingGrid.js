import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link } from "react-router-dom"
import { useEffect, useState
    } from "react"
import Axios from "axios"
const BookingGrid = () => {
   
      const today = new Date();
      var time = String(today).substring(16, 24)
    const [todayNumber, setTodayNumber] = useState("")
    const [scheduledNumber, setScheduledNumber] = useState("")
    const [completedNumber, setCompletedNumber] = useState("")
    const [manthanNumber, setManthanNumber] = useState("")
    const [gmbNumber, setGMBNumber] = useState("")
    const [maskfabNumber, setMaskfabNumber] = useState("")

    const getTodayNumber = () =>{
        Axios.post('http://localhost:3002/getTodaysMeetings', {
            date: String(today).substring(4, 15)
        }).then((response) => {
            var result = JSON.parse(JSON.stringify(response)).data;
            setTodayNumber(result.length);
        })
    }
    const getCompletedNumber = () =>{
        Axios.post('http://localhost:3002/getCompletedMeetings', {
            date: String(today).substring(4, 15),
            time: time
        }).then((response) => {
            var result = JSON.parse(JSON.stringify(response)).data;
            console.log(result)
            setCompletedNumber(result.length);
        })
    }
    const getScheduledNumber = ()=>{
        Axios.post('http://localhost:3002/getScheduledMeetings', {
            date: String(today).substring(4, 15),
            time: time
        }).then((response) => {
            var result = JSON.parse(JSON.stringify(response)).data;
           setScheduledNumber(result.length);
        })
    }

    const getManthanNumber = () =>{
        Axios.post('http://localhost:3002/manthan', {
            date: String(today).substring(4, 15),
            time: time
        }).then((response) => {
            var result = JSON.parse(JSON.stringify(response)).data;
            console.log(result)
            setManthanNumber(result.length);
        })
    }
    const getMaskfabNumber = () =>{
        Axios.post('http://localhost:3002/maskfab', {
            date: String(today).substring(4, 15),
            time: time
        }).then((response) => {
            var result = JSON.parse(JSON.stringify(response)).data;
            console.log(result)
            setMaskfabNumber( result.length);
        })
    }
    const getGMBNumber = () =>{
        Axios.post('http://localhost:3002/gmb', {
            date: String(today).substring(4, 15),
            time: time
        }).then((response) => {
            var result = JSON.parse(JSON.stringify(response)).data;
            console.log(result)
            setGMBNumber( result.length);
        })
    }
    useEffect(() => {
        getCompletedNumber();
        getScheduledNumber();
        getTodayNumber();
        getMaskfabNumber();
        getManthanNumber();
        getGMBNumber();
    })
   
    
    return (
        <>
            <div className="mx-3 my-3" >
                <div className="row mb-2">

                    <div className="card mb-3 mx-2" style={{ maxWidth: "400px", height: "200px", backgroundColor: "#FA5F55" }}>
                        {todayNumber}<br />
                        Today VCs
                        <hr />
                        <Link to="todayVCs" className="link"><div className="info" >More info &#8594;</div></Link>
                    </div>

                    <div className="card mb-3 mx-2" style={{ maxWidth: "400px", height: "200px", backgroundColor: "#008000" }}>
                        {scheduledNumber}<br />
                        Scheduled VCs
                        <hr />
                        <Link to="scheduledVCs" className="link"><div className="info">More info &#8594;</div></Link>
                    </div>

                    <div className="card mb-3 mx-2" style={{ maxWidth: "400px", height: "200px", backgroundColor: "#C4B454" }}>
                        {completedNumber}<br />
                        Completed VCs
                        <hr />
                        <Link to="completedVCs" className="link"><div className="info">More info &#8594;</div></Link>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="card mb-3 mx-2" style={{ maxWidth: "400px", height: "200px", backgroundColor: "#5D3FD3" }}>
                        {manthanNumber}<br />
                        Completed Manthan VCs
                        <hr />
                        <Link to="manthan" className="link"><div className="info">More info &#8594;</div></Link>
                    </div>

                    <div className="card mb-3 mx-2" style={{ maxWidth: "400px", height: "200px", backgroundColor: "#088F8F" }}>
                        {gmbNumber}<br />
                        Completed GMB VCs
                        <hr />
                        <Link to="gmb" className="link"><div className="info">More info &#8594;</div></Link>
                    </div>

                    <div className="card mb-3 mx-2" style={{ maxWidth: "400px", height: "200px", backgroundColor: "#023020" }}>
                        {maskfabNumber}<br />
                        Completed Maskfab VCs
                        <hr />
                        <Link to="maskfab" className="link"><div className="info">More info &#8594;</div></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingGrid