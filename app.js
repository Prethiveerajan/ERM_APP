require('dotenv').config()
const express = require('express')
const app = express();
const PORT = 3500;
const student_router = require('./routes/students')
const mongoose = require('mongoose');
app.use(express.json())

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',(errorMessage) =>console.log(errorMessage))
db.once('open',()=>console.log('connection established'))
app.get('/',(request,response)=>
{
    response.send('working')
})
app.use('/api/v1/students',student_router)


app.listen(PORT,console.log(`server runs at http://localhost:3500/`))