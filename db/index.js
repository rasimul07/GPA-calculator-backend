const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: { type: String },
    password: String, //above and this denotion is same
    firstName:String,
    lastName:String,
    contact:String,
    credits: [String]
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model for use in your application
module.exports = User;