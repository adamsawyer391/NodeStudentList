import StudentData from "../models/studentModel.js";



export const getStudents = async (req, res) => {
    try{
        const allStudents = await StudentData.find();
        res.status(200).json(allStudents);
    }catch(err){
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}

export const createStudent = async (req, res) => {
    const student = req.body;
    console.log(student);
    
    const newStudent = new StudentData(student);
    try{
        await newStudent.save();
        res.status(201).json(newStudent);
    }catch(error){
        console.log(error);
        res.status(409).json({ message: error.message })
    }
}

export const deleteStudent = async (req, res) => {
    const id = req.params.id;
    try{
        await StudentData.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted');
    }catch(err){
        console.log(err.message);
    }
}
