const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
 
    name : {
        type: String, 
        required: true
        //default:"" 
    },

    age : {
        type: Number, 
        required: true
    },

    salary : {
        type: Number, 
        required: true 
    }

});

// Export the model
module.exports = mongoose.model('person', personSchema);