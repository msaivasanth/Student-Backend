const mongoose = require('mongoose')
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Rollnumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
});

const Student = mongoose.model('student', studentSchema)
module.exports = Student