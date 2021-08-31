const mongoose = require('mongoose');

const sc = mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
    },
    phone: {
        type: String,
        require: true,
    },
    id: {
        type: String,
        require: true
    },
    section: {
        type: String,
        require: true,
        uppercase: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
});

const Student = mongoose.model("student", sc);
module.exports = Student;