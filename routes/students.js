const express =require('express')
const router = express.Router();
const studentModel = require('../models/students');
router.get('/',(request,response)=>{
try{
    const  students = studentModel.find();
    response.status(200).json(students);
    response.send("display student");
}
catch(error){
    console.log(error);
    response.status(500).json({message:error.message})
}
    
})
router.post('/',async(request,response)=>
{
    const newStudent = new studentModel({
        name :request.body.name,
        enrolledDepartment : request.body.enrolledDepartment,
        enrollmentDate:request.body.enrollmentDate
    })
    try{
        const student = await newStudent.save();
        response.status(201).json(student);
    }
    catch(error){
        response.status(500).json({message:error.message});

    }
    // response.send("adding new students");
})
router.get('/',getStudent,(request,response)=>
{
    response.status(200).json(request.student)
})
router.patch('/:id',(request,response)=>
{
    response.send(`update on student id ${request.params.id}`)
})
router.delete('/:id',(request,response)=>
{
    response.send(`delete on student id ${request.params.id}`)
})


async function  getStudent(request,response,next)
{
    let student
    try{
        student = await studentModel.findById(request.params.id)
        if(student!=null)
        {
            response.status(404).json({message:`cannot find user`})

        }
    }
    catch(error){
        return response.status(500).json({message:error.message})

    }
    response.student = student;
    next();
}

module.exports = router;