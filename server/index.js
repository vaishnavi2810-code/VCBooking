const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors');
const url = require('url')
var alert = require('alert')
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

let transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   auth: {
     //your username and password
   }
})

const db = mysql.createPool({
   host: "localhost",
   user: "root",
   password: "",
   database: "vcbooking"
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/login', (req, res) => {
   const ICNumber = req.body.ICNumber;
   const password = req.body.password;
   const selectQuery = "SELECT ICNumber, password from signUp "
   db.query(selectQuery, (error, result) => {
      var flag = 0
      for (let i = 0; i < result.length; i++) {
         if (result[i].ICNumber == ICNumber) {
            flag = 1;
            bcrypt.compare(password, result[i].password, async function (err, isMatch){
               if(isMatch){
                  const selectQuery2 = "select username,phone,ICNumber from signUp where ICNumber='" + ICNumber + "'"
                  var data = [];
                  db.query(selectQuery2, (error, result) => {
                     //res.send(result);
                     var recieved = JSON.stringify(result)
                     data = JSON.parse(recieved)
                     res.send(data)
         
                  })
               }
               else {
                  res.send("failed")
               }
            })
         }
      }
      if(flag == 0){
         res.send("failed")
      }
   })
})

app.post('/validateICNumber', (req, res) => {
   const ICNumber = req.body.ICNumber;
   const selectQuery = "select ICNumber from signUp";
   db.query(selectQuery, [ICNumber], (err, result) => {
      var flag = 0;
      for (let i = 0; i < result.length; i++) {
         if (result[i].ICNumber == ICNumber) {
            flag = 1
            break
         }
      }
      if (flag == 1)
         res.send("exists")
      else
         res.send("does not exist")
   })
})

app.post('/resetPassword', (req, res) => {
   const ICNumber = req.body.ICNumber;
   var email;
   //const email = req.body.email;
   const findQuery = "select email from signUp where ICNumber=?";
   db.query(findQuery, [ICNumber], (err, result) => {
      email = result[0].email;
      console.log(email);
      crypto.randomBytes(32, (err, buffer) => {
         if (err) throw err;
         const token = buffer.toString("hex")
         var expireToken = Date.now() + 3600000
         expireToken = expireToken.toString();
         const updateQuery = "update signUp set token=?,expireToken=? where ICNumber=?"
         db.query(updateQuery, [token, expireToken, ICNumber], (err, result) => {
            console.log("Inserted")
         })
         message = {
            from: "jariwalavaishnavi52@gmail.com",
            to: email,
            subject: "Reset Password Link",
            html: `
         <p>You requested to reset password</p>
         <h5>Click on this <a href="http://localhost:3000/resetPassword/${token}">link</a> to reset your password</h5>
         `
         }
         transporter.sendMail(message, (err, info) => {
            if (err) throw err;
            else console.log(info)
         })
      })
      console.log("In reset password")

      res.send();

   })

})

app.post('/register', (req, res) => {
   const ICNumber = req.body.ICNumber;
   const userName = req.body.userName;
   const phoneNumber = req.body.phoneNumber;
   const userPass = req.body.userPass;
   const conf_password = req.body.conf_password;
   const currentDesignation = req.body.currentDesignation;
   const currentLaboratory = req.body.currentLaboratory;
   const email = req.body.email;
   const selectQuery = "select ICNumber from signUp";
   console.log(ICNumber, userName, phoneNumber, userPass, conf_password, currentDesignation, currentLaboratory,
      email)
   db.query(selectQuery, (error, result) => {
      var flag = 0
      for (let i = 0; i < result.length; i++) {
         //console.log(result[i].ICNumber, result[i].password)
         if (result[i].ICNumber == ICNumber) {
            flag = 1;
            break;
         }
      }
      if (flag == 0) {
         var hashedPassword;
         bcrypt.genSalt(10, (err, Salt) => {
            bcrypt.hash(userPass, Salt, (err, hash) => {
               if (err) throw err;
               hashedPassword = hash;
               console.log(hashedPassword)
               const sqlInsert = "INSERT INTO signUp(ICNumber, username, phone,email,designation, laboratory, password, conf_password) VALUES(?,?,?,?,?,?,?,?);"
               db.query(sqlInsert, [ICNumber, userName, phoneNumber, email, currentDesignation, currentLaboratory, hashedPassword, hashedPassword], (error, result) => {
                  console.log("success");
                  res.send();
               })
            })
         })



      }
      else {
         alert(
            'This ICard Number already exists!'
         );
      }

   })

})

app.post('/loginActivity', (req, res) => {
   const ICNumber = req.body.ICNumber;
   const country = req.body.country;
   const IPAddress = req.body.IPAddress;
   const device = req.body.device;
   const dateTime = req.body.dateTime;
   const status = req.body.status;
   //console.log(ICNumber, country, IPAddress, device, dateTime, status);
   const insertQuery = "insert into LoginActivity(LoginTime, IPAddress, Device, Response, Country, ICNumber) values(?,?,?,?,?,?);"
   db.query(insertQuery, [dateTime, IPAddress, device, status, country, ICNumber], (error, result) => {
      res.send();
   })
})
app.post('/InsertMeeting', (req, res) => {
   const MeetingName = req.body.MeetingName;
   const MeetingDate = req.body.MeetingDate;
   const MeetingTime = req.body.MeetingTime;
   const MeetingVenue = req.body.MeetingVenue;
   const Description = req.body.Description;
   const ICNumber = req.body.ICNumber;

   const insertQuery = "insert into Meetings(MeetingName, Timings, MeetingDate, Venue,Description, ICNumber) values(?,?,?,?,?,?);"
   db.query(insertQuery, [MeetingName, MeetingTime, MeetingDate, MeetingVenue, Description, ICNumber], (error, result) => {

      console.log("successful insert");
   })
})

app.post('/handleDelete', (req, res) => {
   const MeetingId = req.body.MeetingId;
   const deleteQuery = "delete from Meetings where MeetingId=?";
   db.query(deleteQuery, [MeetingId], (error, result) => {
      console.log("deleted");
      res.send();
   })
})

app.post('/getEvents', (req, res) => {
   const selectQuery = "select MeetingName, Timings, MeetingDate, Venue, Description, ICNumber, MeetingId from Meetings";
   db.query(selectQuery, (error, result) => {
      res.send(result)
   })
})

app.post('/getMeetings', (req, res) => {
   const ICNumber = req.body.ICNumber;
   const selectQuery = "select * from Meetings where ICNumber=?";
   db.query(selectQuery, [ICNumber], (error, result) => {

      res.send(result);
   })
})

app.post('/getTodaysMeetings', (req, res) => {
   const date = req.body.date;
   const selectQuery = "select * from Meetings m, signUp s where m.MeetingDate=? AND m.ICNumber=s.ICNumber";
   db.query(selectQuery, [date], (error, result)=>{
      res.send(result);
   })
})

app.post('/getScheduledMeetings', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const selectQuery = "select * from Meetings m, signUp s where (STR_TO_DATE(MeetingDate, '%b %d %Y') = STR_TO_DATE(?,'%b %d %Y') AND STR_TO_DATE(SUBSTR(Timings,10,8),'%H:%i:%S') > STR_TO_DATE(?, '%H:%i:%S') AND m.ICNumber=s.ICNumber) OR (STR_TO_DATE(MeetingDate, '%b %d %Y') > STR_TO_DATE(?,'%b %d %Y')) AND m.ICNumber=s.ICNumber"
   db.query(selectQuery,[date, time,date], (error, result)=>{
      res.send(result);
   })
})

app.post('/getCompletedMeetings', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const selectQuery = "select * from Meetings m, signUp s where (STR_TO_DATE(MeetingDate, '%b %d %Y') = STR_TO_DATE(?,'%b %d %Y') AND STR_TO_DATE(SUBSTR(Timings,10,8),'%H:%i:%S') < STR_TO_DATE(?, '%H:%i:%S') AND m.ICNumber=s.ICNumber) OR (STR_TO_DATE(MeetingDate, '%b %d %Y') < STR_TO_DATE(?,'%b %d %Y')) AND (m.ICNumber=s.ICNumber)"
   db.query(selectQuery, [date, time, date], (error, result)=>{
      res.send(result);
   })
})
app.post('/getCompletedVCPrint', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const selectQuery = "select MeetingDate, Timings, MeetingName, Description, Venue, username from Meetings m, signUp s where (STR_TO_DATE(MeetingDate, '%b %d %Y') = STR_TO_DATE(?,'%b %d %Y') AND STR_TO_DATE(SUBSTR(Timings,10,8),'%H:%i:%S') < STR_TO_DATE(?, '%H:%i:%S') AND m.ICNumber=s.ICNumber) OR (STR_TO_DATE(MeetingDate, '%b %d %Y') < STR_TO_DATE(?,'%b %d %Y')) AND (m.ICNumber=s.ICNumber) ORDER BY Venue,STR_TO_DATE(MeetingDate, '%b %d %Y') ASC"
   db.query(selectQuery, [date, time, date], (error, result)=>{
      res.send(result);
   })
})
app.post('/manthan', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const selectQuery = "select * from Meetings m, signUp s where ((STR_TO_DATE(MeetingDate, '%b %d %Y') = STR_TO_DATE(?,'%b %d %Y') AND STR_TO_DATE(SUBSTR(Timings,10,8),'%H:%i:%S') < STR_TO_DATE(?, '%H:%i:%S') AND m.ICNumber=s.ICNumber) OR (STR_TO_DATE(MeetingDate, '%b %d %Y') < STR_TO_DATE(?,'%b %d %Y'))) AND Venue='MANTHAN' AND m.ICNumber=s.ICNumber"
   db.query(selectQuery, [date, time, date], (error, result)=>{
      res.send(result);
   })
})

app.post('/manthanPrint', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const selectQuery = "select * from Meetings m, signUp s where ((STR_TO_DATE(MeetingDate, '%b %d %Y') = STR_TO_DATE(?,'%b %d %Y') AND STR_TO_DATE(SUBSTR(Timings,10,8),'%H:%i:%S') < STR_TO_DATE(?, '%H:%i:%S') AND m.ICNumber=s.ICNumber) OR (STR_TO_DATE(MeetingDate, '%b %d %Y') < STR_TO_DATE(?,'%b %d %Y'))) AND Venue='MANTHAN' AND m.ICNumber=s.ICNumber ORDER BY STR_TO_DATE(MeetingDate, '%b %d %Y') ASC"
   db.query(selectQuery, [date, time, date], (error, result)=>{
      res.send(result);
   })
})

app.post('/gmb', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const selectQuery = "select * from Meetings m ,signUp s where ((STR_TO_DATE(MeetingDate, '%b %d %Y') = STR_TO_DATE(?,'%b %d %Y') AND STR_TO_DATE(SUBSTR(Timings,10,8),'%H:%i:%S') < STR_TO_DATE(?, '%H:%i:%S') AND m.ICNumber=s.ICNumber) OR (STR_TO_DATE(MeetingDate, '%b %d %Y') < STR_TO_DATE(?,'%b %d %Y'))) AND Venue='GM BUILDING' AND m.ICNumber=s.ICNumber"
   db.query(selectQuery, [date, time, date], (error, result)=>{
      res.send(result);
   })
})

app.post('/gmbPrint', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const selectQuery = "select * from Meetings m ,signUp s where ((STR_TO_DATE(MeetingDate, '%b %d %Y') = STR_TO_DATE(?,'%b %d %Y') AND STR_TO_DATE(SUBSTR(Timings,10,8),'%H:%i:%S') < STR_TO_DATE(?, '%H:%i:%S') AND m.ICNumber=s.ICNumber) OR (STR_TO_DATE(MeetingDate, '%b %d %Y') < STR_TO_DATE(?,'%b %d %Y'))) AND Venue='GM BUILDING' AND m.ICNumber=s.ICNumber ORDER BY STR_TO_DATE(MeetingDate, '%b %d %Y') ASC"
   db.query(selectQuery, [date, time, date], (error, result)=>{
      res.send(result);
   })
})

app.post('/maskfab', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const selectQuery = "select * from Meetings m, signUp s where ((STR_TO_DATE(MeetingDate, '%b %d %Y') = STR_TO_DATE(?,'%b %d %Y') AND STR_TO_DATE(SUBSTR(Timings,10,8),'%H:%i:%S') < STR_TO_DATE(?, '%H:%i:%S') AND m.ICNumber=s.ICNumber) OR (STR_TO_DATE(MeetingDate, '%b %d %Y') < STR_TO_DATE(?,'%b %d %Y'))) AND Venue='MASKFAB' AND m.ICNumber=s.ICNumber"
   db.query(selectQuery, [date, time, date], (error, result)=>{
      res.send(result);
   })
})

app.post('/maskfabPrint', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const selectQuery = "select * from Meetings m, signUp s where ((STR_TO_DATE(MeetingDate, '%b %d %Y') = STR_TO_DATE(?,'%b %d %Y') AND STR_TO_DATE(SUBSTR(Timings,10,8),'%H:%i:%S') < STR_TO_DATE(?, '%H:%i:%S') AND m.ICNumber=s.ICNumber) OR (STR_TO_DATE(MeetingDate, '%b %d %Y') < STR_TO_DATE(?,'%b %d %Y'))) AND Venue='MASKFAB' AND m.ICNumber=s.ICNumber ORDER BY STR_TO_DATE(MeetingDate, '%b %d %Y') ASC"
   db.query(selectQuery, [date, time, date], (error, result)=>{
      res.send(result);
   })
})


app.post('/getLoginActivity', (req, res) => {
   const ICNumber = req.body.ICNumber;
   const selectQuery = "select * from LoginActivity where ICNumber=?";
   db.query(selectQuery, [ICNumber], (error, result) => {

      res.send(result);
   })
})

app.post('/getDetails', (req, res)=>{
   const ICNumber = req.body.ICNumber;
   const selectQuery = "select username, phone from signUp where ICNumber=?"
   db.query(selectQuery, [ICNumber], (error, result) =>{
      res.send(result);
   })
})

app.post('/profile', (req, res) => {
   const ICNumber = req.body.ICNumber;
   const selectQuery = "select username,phone,email,designation,laboratory from signUp where ICNumber=?";
   db.query(selectQuery, [ICNumber], (error, result) => {
      res.send(result)
   })
})

app.post('/updateProfile', (req, res) => {
   const ICNumber = req.body.ICNumber;
   const designation = req.body.designation;
   const phone = req.body.phone;
   const username = req.body.username;
   const email = req.body.email;
   const updateQuery = "update signUp set username=?,phone=?,designation=?,email=? where ICNumber=?";
   db.query(updateQuery, [username, phone, designation, email, ICNumber], (error, result) => {
      res.send();
   })
})

app.post('/handleDisabled', (req, res) => {
   const selectQuery = "select MeetingId from Meetings";
   db.query(selectQuery, (error, result) => {
      res.send(result);
   })
})

app.post('/newPassword', (req, res) => {
   const newPassword = req.body.password;
   const token = req.body.token;
   const currentToken = Date.now();
   var hashedPassword;
   bcrypt.genSalt(10, (err, Salt) => {
      bcrypt.hash(newPassword, Salt, (err, hash)=>{
         if(err) throw err;
         hashedPassword = hash;
         const updateQuery = "update signUp set password=?, conf_password=? where token=? AND expireToken>?";
         db.query(updateQuery, [hashedPassword, hashedPassword, token, currentToken], (error, result) => {
            if (result.affectedRows == 0) {
               res.send("Link has expired")
            }
            else {
               res.send("Password updated successfully");
            }
         })
      })
   })
  
})

app.listen(3002, () => {
   console.log("running on 3002");
})
