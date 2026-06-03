// console.log("server file is runing");

// function add(a,b){
//     return a+b;
// }


// var add= function(a,b){
//     return a+b;
// }

// var add = (a,b) => { return a+b;}

// var add= (a,b) => a+b;

// var result = add(2,3);
// console.log(result);

// (function(){
//     console.log("Ankit is added");
// })();

// function callback(){
//     console.log("ankit is calling a callback function");
// }

// const add = function(a, b, callback){
//     var result = a+b;
//     console.log("result: "+ result); //main function work complete
//     callback();
// }

// add(3,4,callback)

// add(2,4,function(){
//     console.log('added sucessfully');
// });

// add(2,3, () => console.log('added'))


// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt','Hii'+' '+ user.username +'!\n',()=>{
//     console.log("file is created")
// });

// var notes = require('./notes.js');
// var _ = require('lodash');

// console.log("Server file is running");

// var age = notes.age;
// var result = notes.addNumber(age,18);

// console.log(age);
// console.log('result is now: '+ result)

// var data = ["person",'person',1,2,1,2,'name','age','2'];
// var filter = _.uniq(data);
// console.log(filter);
// console.log(_.isString(35))


// Convertion JSON string to Object 

// const jsonString = '{"name":"Ankit", "age": 26, "city": "India"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);


// Convertion object to JSON string

// const objectToconvert = {
//     name:"ankit",
//     age:25
// };
// const jsonStringified = JSON.stringify(objectToconvert);
// console.log(jsonStringified);
// console.log(typeof jsonStringified);

// import express from 'express';


const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// model Import
app.get('/', (req, res) => {
  res.send('Welcome to our Hotel');
})

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/person', personRoutes);
app.use('/menuItem', menuItemRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})