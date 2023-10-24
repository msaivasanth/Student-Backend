const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://saivasanth1718:..RN9hJVagCcWj9@inotebook-cloud.1ltb6hk.mongodb.net/my_project_01'
const connect = () => {
    mongoose.connect(mongoURL);
    console.log("Connected to mongoDB successfully")
}

module.exports = connect;