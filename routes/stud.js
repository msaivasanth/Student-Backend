const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student')
const router = express.Router()

// Route 1: Adding students into the database with unique roll number
router.post('/addstudent', [
    body('name', 'name should be atleast of length 3').isLength({ min: 3}),
    body('Rollnumber', 'length must be length of 10').isLength(10),
    body('branch', 'length must be 3').isLength(3),
    body('college', 'length must be atleast 4').isLength({min: 4})
], async (req, res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    try {
        let rollno = await Student.findOne({Rollnumber: req.body.Rollnumber})
        let email = await Student.findOne({email: req.body.email})
        let mobile = await Student.findOne({mobile: req.body.mobile})
        if(rollno) {
            return res.status(400).send("This roll number is already there")
        }
        if(email) {
            return res.status(400).send("This email  is already there")
        }
        if(mobile) {
            return res.status(400).send("This mobile number is already there")
        }
        let student = await new Student(req.body)
        let savedStudent = await student.save()
        // console.log(savedStudent)
        res.send(savedStudent)
        
    } catch (error) {
        console.error(error.message)
        return res.status(401).send("Internal Server Error")
    }
})

// Rotue 2: Fetching the information of the student based on given rollnumber
router.post('/getdetails', async (req, res) => {
    try {
        let details = await Student.findOne({Rollnumber: req.body.Rollnumber})
        res.send([details])
        
    } catch (error) {
        console.log(error.message)
        return res.status(401).send("Internal Server Error")
    }
})

// Route 3: Get all the students with college name
router.get('/clgstudents/:id', async (req, res) => {
    try {
        let clg = req.params.id
        let clgstudents = await Student.find({college: clg})
        res.send(clgstudents)
        
    } catch (error) {
        console.log(error.message)
        return res.status(401).send("Internal Server error")
    }
})

// Route 4: Get all the students with college name
router.post('/clgstudents/:id1/:id2', async (req, res) => {
    try {
        let clg = req.params.id1
        let branch = req.params.id2
        let clgstudents = await Student.find({college: clg, branch: branch})
        res.send(clgstudents)
        
    } catch (error) {
        console.log(error.message)
        return res.status(401).send("Internal Server error")
    }
})

// Route 5: Delete an student based on roll number
router.delete('/delete/:id', async (req, res) => {
    try {
        let stu = await Student.findOne({Rollnumber: req.params.id})
        let stuId = stu._id
        let result = await Student.findByIdAndDelete(stuId)
        res.send(result)
        
    } catch (error) {
        console.log(error.message)
        return res.status(401).send("Internal Server error")
    }
})

// Rotue 6: Update a student details
router.put('/update/:id', async (req, res) => {
    const {name, Rollnumber, email, mobile, branch, college} = req.body
    const newData = {}
    if(name) {newData.name = name}
    if(Rollnumber) {newData.Rollnumber = Rollnumber}
    if(email) {newData.email = email}
    if(mobile) {newData.mobile = mobile}
    if(branch) {newData.branch = branch}
    if(college) {newData.college = college}

    let stu = await Student.findOne({Rollnumber: req.params.id})
    let stuId = stu._id
    let result = await Student.findByIdAndUpdate(stuId, {$set: newData}, {new:true})
    res.send(result)
})
module.exports = router