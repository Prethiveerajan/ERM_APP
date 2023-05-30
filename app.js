console.log("this is app.js")
const express = require('express')
// const to_do_list = require('./routes/todo_items')
const app = express();
const PORT = 3500;
app.get('/',(request,response)=>
{
    response.send('working')
})
app.listen(PORT,console.log(`server runs at http://localhost:3500/`))