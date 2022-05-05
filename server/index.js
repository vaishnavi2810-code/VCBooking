const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors');
const url = require('url')
var alert = require('alert')
 
const db = mysql.createPool({
   host:"localhost",
   user:"root",
   password:"",
   database:"vcbooking"
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
app.post('/login', (req, res) => {
   const ICNumber = req.body.ICNumber;
   const password = req.body.password;
   //console.log(ICNumber, password)
   const selectQuery = "SELECT ICNumber, password from signUp "
   db.query(selectQuery, (error, result) => {
      var flag = 0
      for(let i =0; i<result.length;i++){
         //console.log(result[i].ICNumber, result[i].password)
         if(result[i].ICNumber == ICNumber && result[i].password == password){
            flag = 1
            break
         }
      }

      if(flag === 1){
        res.send();
      }
      else{
         alert(
            'Invalid username or password!'
        );
      }
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
    const selectQuery = "select ICNumber from signUp";
    
    db.query(selectQuery, (error, result) =>{
      var flag = 0
       for(let i =0; i<result.length;i++){
         //console.log(result[i].ICNumber, result[i].password)
         if(result[i].ICNumber == ICNumber){
            flag = 1;
            break;
         }
      }
      if(flag == 0){
         const sqlInsert = "INSERT INTO signUp(ICNumber, username, phone,designation, laboratory, password, conf_password) VALUES(?,?,?,?,?,?,?);"
         db.query(sqlInsert, [ICNumber,userName, phoneNumber,currentDesignation,currentLaboratory, userPass, conf_password], (error, result) => {
             console.log("success");
             //document.querySelector("form").reset();
             res.send();
         })

      }
      else{
         alert(
            'This ICard Number already exists!'
        );
      }

    })
    
})
 
app.listen(3003, () => {
   console.log("running on 3003");
})
