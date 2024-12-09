const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
 
    course_name : {
        type: String, 
        required: true
    }

});

// Export the model
module.exports = mongoose.model('course', courseSchema);