import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {
  Fragment, useState, useCallback,
  //useMemo, 
  useEffect
} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";

// let selectTimeout;
const DragAndDropCalendar = withDragAndDrop(Calendar)
const locales = {
  "en-IN": require("date-fns/locale/en-IN")
}

// require module


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const resourceMap = [
  { resourceId: 1, resourceTitle: 'MANTHAN' },
  { resourceId: 2, resourceTitle: 'MASKFAB' },
  { resourceId: 3, resourceTitle: 'GM BUILDING' },
  //{resourceId:4, resourceTitle:'Venue4'},
]
const events = [
  // {
  //   title: 'Board meeting',
  //   end: new Date('May 11, 2022 13:00:00'),
  //   start: new Date('May 11, 2022 14:00:00'),
  //   resourceId: 2,
  // },
]

const NewBooking = () => {
  const [myEvents, setEvents] = useState(events);
  const [myMobile, setMobile] = useState("");
  const [userICNumber, setUserICNumber] = useState(0);
  const [isDisabled, setDisabled] = useState(false);


  useEffect(() => {
    localStorage.removeItem("loginStatus");
    const userMobile = localStorage.getItem("mobile");
    const userICNumber = localStorage.getItem("ICNumber");
    if (userMobile !== "") {
      setMobile(userMobile);
    }
    if (userICNumber !== 0) {
      setUserICNumber(userICNumber);

    }
    getEvents();
  }, [])


  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if(!handleRepeats(start,end, resourceId)){
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.start === event.start) ?? {}
        const filtered = prev.filter((ev) => ev.start !== event.start)
        return [...filtered, { ...existing, start, end, resourceId, allDay }]
      })
    }
    },
    [setEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end, resourceId }) => {
      if(!handleRepeats(start,end, resourceId)){
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.start === event.start) ?? {}
        const filtered = prev.filter((ev) => ev.start !== event.start)
        return [...filtered, { ...existing, start, end }]
      })
    }
    },
    [setEvents]
  )

  const handleRepeats = (start,end, resourceId) =>{
    var new_start = start.getTime();
    var new_end = end.getTime();
    for(let i=0; i<events.length; i++){
      var event_start = events[i].start.getTime();
      var event_end = events[i].end.getTime();
      if(new_start>=event_start && new_start<event_end && events[i].resourceId===resourceId){
        alert("You can't create an event in this slot")
        return true
      }
      if(new_start<=event_start && new_end>event_start && events[i].resourceId===resourceId){
        alert("You can't create event in this slot")
        return true
      }
    }
  }

  const handleSelectSlot = useCallback(
    ({start, end, resourceId, id }) => {
     if(!handleRepeats(start,end, resourceId)){
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => {
          return [...prev, { id, start, end, title, resourceId }]
      })
    }

      }
    },
    [setEvents]

  )
  // const { scrollToTime } = useMemo(
  //   () => ({
  //     scrollToTime: new Date(1970, 1, 1, 6),
  //   }),
  //   []
  // )

  const roomValue = () => {

    const n = myEvents.length;
    if (n === 0) {
      return 0;
    }
    else {
      var roomNumber = myEvents[n - 1].resourceId;
      if (roomNumber === 1)
        return "MANTHAN"
      else if (roomNumber === 2)
        return "MASKFAB"
      else if (roomNumber === 3)
        return "GM BUILDING"
    }
  }

  const startTime = () => {

    const n = myEvents.length;
    if (n === 0) {
      return 0;
    }
    else
      return myEvents[n - 1].start;
  }

  const endTime = () => {

    const n = myEvents.length;
    if (n === 0) {
      return 0;
    }
    else
      return myEvents[n - 1].end;
  }

  const nameValue = () => {

    const n = myEvents.length;
    if (n === 0) {
      return 0;
    }
    else
      return myEvents[n - 1].title;
  }


  const submitData = (e) => {
    e.preventDefault();

    var name = document.getElementById("meetName").value
    var start = document.getElementById("startTime").value
    var end = document.getElementById("endTime").value
    var venue = document.getElementById("roomNo").value
    var Description = document.getElementById("description").value
    //console.log(Description)

    var MeetDate = start.slice(4, 15);
    var MeetTime = start.slice(16, 24) + "-" + end.slice(16, 24)

    Axios.post('http://localhost:3002/InsertMeeting', {
      MeetingName: name,
      MeetingDate: MeetDate,
      MeetingTime: MeetTime,
      MeetingVenue: venue,
      Description: Description,
      ICNumber: userICNumber
    }).then(() => {
      console.log("ok");
    })

    getEvents();
    window.location.reload();
  }

  const getResourceTitle = (id) => {
    if (id === 1)
      return "MANTHAN"
    else if (id === 2)
      return "MASKFAB"
    else if (id === 3)
      return "GM BUILDING"
  }

  const getEvents = () => {
    Axios.post('http://localhost:3002/getEvents', {

    }).then((response) => {
      var result = JSON.parse(JSON.stringify(response)).data;
      var len = result.length;
      events.splice(0, events.length);
      for (let i = 0; i < len; i++) {
        var meetDate = result[i].MeetingDate;
        var meetTime = result[i].Timings;
        var start = meetDate.substring(0, 6) + "," + meetDate.substring(6, meetDate.length) + " " + meetTime.slice(0, 8)
        var end = meetDate.substring(0, 6) + "," + meetDate.substring(6, meetDate.length) + " " + meetTime.slice(9, 17)
        var temp_events = {}
        temp_events.title = result[i].MeetingName;
        temp_events.desc = result[i].Description;
        var resourceTitle = result[i].Venue
        if (resourceTitle === "MANTHAN")
          temp_events.resourceId = 1;
        else if (resourceTitle === "MASKFAB")
          temp_events.resourceId = 2;
        else
          temp_events.resourceId = 3;
        temp_events.start = new Date(start);
        temp_events.end = new Date(end);
        temp_events.drag = false;
        temp_events.resize = false;
        temp_events.ICNumber = result[i].ICNumber;
        temp_events.MeetingId = result[i].MeetingId;
        temp_events.select = false;
        events.push(temp_events)

      }
      console.log(events);
    })
  }

  setInterval(function () {
    window.location.reload();
  }, 300000);



  const EventComponent = (e) => {

    const handleDelete = () => {
      var uICNumber = parseInt(localStorage.getItem("ICNumber"));
      const today = new Date();
      const meet_end = e.event.end;
      var Difference_In_Time = today.getTime() - meet_end.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if (e.event.ICNumber === uICNumber) {
        if (Difference_In_Days >= 0)
          alert("Event can't be deleted after it's completed")
        else {
          var Venue = getResourceTitle(e.event.resourceId)
          const ans = window.confirm("Would you like to delete the event of " + e.event.title + " on " + e.event.start + " to " + e.event.end + " at Venue " + Venue + " ?");
          if (ans) {
            Axios.post('http://localhost:3002/handleDelete', {
              MeetingId: e.event.MeetingId,
            }).then(() => {
              getEvents();
              window.location.reload();
            })
          }
        }
      }
      else if (!e.event.ICNumber)
        alert("You can't delete the event before booking");
      else
        alert("You can't delete this event because you are not the owner")

    }
    var title_value = e.event.title;
    var desc_value = e.event.desc;
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("")
    Axios.post('http://localhost:3002/getDetails',{
      ICNumber: e.event.ICNumber
    }).then((response)=>{
      var result = JSON.parse(JSON.stringify(response)).data;
      setUsername(result[0].username);
      setPhone(result[0].phone);
      
    })
    return (
      <>
        <span style={{ color: "red", fontWeight: "bold", float: "right", fontSize: "25px" }} onClick={handleDelete}>&times;</span>
        <span style={{color: "#1e317e", fontWeight:"bold" }}>{username}, </span>
        <span style={{color: "#1e317e", fontWeight:"bold" }}>{phone}</span>
        <div style={{ width: "75%", fontWeight: "bold" }}>{title_value}</div>
        <div >{desc_value}</div>

      </>
    )
  }



  // const handleSelectEvent = useCallback(
  //   (event) => {
  //     const ans = window.confirm("Would you like to delete the event of " +event.title+ " on " +event.start+ " to "+ event.end+" at Venue" +event.resourceId+ " ?");
  //     if(ans){
  //     setEvents(myEvents.filter(item => item.start !== event.start 
  //       ))
  //     }
  //   },
  //   [myEvents]
  // )   

  const handleDisable = () => {
    Axios.post('http://localhost:3002/handleDisabled', {

    }).then((response) => {
      var result = JSON.parse(JSON.stringify(response)).data;
      for(let i=0; i<result.length; i++){
        result[i].status="Completed";
      }
      if (result.length === myEvents.length)
        setDisabled(true);
      else
        setDisabled(false);
    })
  }
  handleDisable();
  const today = new Date();
  return (
    <>
      <Fragment>
        <DragAndDropCalendar
          resources={resourceMap} resourceIdAccessor='resourceId'
          resourceTitleAccessor='resourceTitle'
          defaultView='day' views={['day', 'work_week']} localizer={localizer}
          startAccessor="start" endAccessor="end" tooltipAccessor="desc" events={myEvents}
          //ignoreEvents
          //scrollToTime={scrollToTime}
          selectable={ (e)=> {
            if(e.select === false)
              return false
          }}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          components={{ event: EventComponent }}
          onSelectSlot={
           handleSelectSlot
          }
          timeslots={1}
          step={30}
          min={
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              8
            )
          }
          max={
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              21
            )
          }
          eventPropGetter={(event) => {
            if (event.resourceId === 1) {
              return {
                style: {
                  backgroundColor: "palegreen	",
                  color: "black"
                }
              }
            }
            else if (event.resourceId === 2) {
              return {
                style: {
                  backgroundColor: "cyan",
                  color: "black"
                }
              }
            }
            else if (event.resourceId === 3) {
              return {
                style: {
                  backgroundColor: "lightpink",
                  color: "black"
                }
              }
            }
          }}
          resizableAccessor={
            (e) => {
              for (let i = 0; i < events.length; i++) {
                return e.resize !== false
              }
            }
          }
          draggableAccessor={
            (e) => {
              for (let i = 0; i < events.length; i++) {
                return e.drag !== false
              }
            }
          }
          style={{ height: 700, margin: "50px" }} />
      </Fragment>

      <div className="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">VC Booking</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Meeting Name</label>
                  <input value={nameValue()} id="meetName" type="text" className="form-control" readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Venue</label>
                  <input value={roomValue()} id="roomNo" type="text" className="form-control" readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Time</label>
                  <input value={startTime()} id="startTime" type="text" className="form-control" readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">End Time</label>
                  <input value={endTime()} id="endTime" type="text" className="form-control" readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Meeting Description</label>
                  <textarea className="form-control" type="text" id="description"></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile</label>
                  <input value={myMobile} id="mobileNumber" type="text" className="form-control" readOnly />
                </div>
                <button
                  type="submit" onClick={submitData} data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 my-2">
        <button disabled={isDisabled} className="btn form-control" style={{ backgroundColor: "green", color: "whitesmoke" }} data-bs-toggle="modal" data-bs-target="#loginModal">Proceed for Booking&nbsp;<b>&gt;</b></button>&nbsp;
      </div>
    </>
  )
}

export default NewBooking;