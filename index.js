const express = require("express")
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
const port = 4000;

//middleware from express js for localhost fetch
app.use(cors())
app.use(bodyParser.json())
   
//create array of object for api create
const users = [
    {id:0,"name":"Shabana","email":"shabana@gmail.com","phone":"013"},
    {id:1,"name":"taniya","email":"taniya@gmail.com","phone":"014"},
    {id:2,"name":"arifa","email":"arifa@gmail.com","phone":"015"},
    {id:3,"name":"sadia","email":"sadia@gmail.com","phone":"018"}
]

app.get('/',(req,res)=>{
    res.send("Hello from node ,yay hu");
})
// dynamic api create
// app.get('/users',(req,res)=>{
//     res.send(users);
// })
//api parameter access with params
app.get("/users/:id",(req,res)=>{
    const id = (req.params.id);
    const user = users[id];
    res.send(user);
})

//use query parameter to search user
app.get("/users",(req,res)=>{
    // console.log(req.query);
    const search = req.query.search;
    if(search){
        const searchResult = users.filter(user=>user.name.toLowerCase().includes(search));
        res.send(searchResult);
    }
    else{

        res.send(users)
    }
})

// post method 
app.post("/users",(req,res)=>{
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    res.send(JSON.stringify(newUser))
})

app.listen(port,()=>{
    console.log("Listening to port",port);
})