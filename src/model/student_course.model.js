const mongoose = require('mongoose');

const studentcourseSchema = new mongoose.Schema({
    student_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person',
        required: true
    },

    course_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    }
});

// Export the model
module.exports = mongoose.model('studentcourse', studentcourseSchema);

