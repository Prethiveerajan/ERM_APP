const studentModel = require('../models/students');

const studentController = {
  getAllStudents: async (request, response) => {
    try {
      const students = await studentModel.find();
      response.status(200).json(students);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: error.message });
    }
  },
  
  createStudent: async (request, response) => {
    const newStudent = new studentModel({
      name: request.body.name,
      enrolledDepartment: request.body.enrolledDepartment,
      enrollmentDate: request.body.enrollmentDate,
    });
    try {
      const student = await newStudent.save();
      response.status(201).json(student);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  
  getStudentById: async (request, response) => {
    try {
      const student = await studentModel.findById(request.params.id);
      if (!student) {
        return response.status(404).json({ message: 'Cannot find student' });
      }
      response.status(200).json(student);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },
  
  updateStudent: async (request, response) => {
    try {
      const student = await studentModel.findById(request.params.id);
      if (!student) {
        return response.status(404).json({ message: 'Cannot find student' });
      }
      if (request.body.name != null) {
        student.name = request.body.name;
      }
      if (request.body.enrolledDepartment != null) {
        student.enrolledDepartment = request.body.enrolledDepartment;
      }
      const updatedStudent = await student.save();
      response.status(200).json(updatedStudent);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },
  
  deleteStudent: async (request, response) => {
    try {
      const student = await studentModel.findById(request.params.id);
      if (!student) {
        return response.status(404).json({ message: 'Cannot find student' });
      }
      await student.deleteOne();
      response.json({ message: `Deleted user ${student.name}` });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
};

module.exports = studentController;
