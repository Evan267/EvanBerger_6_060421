const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type:  String, required: true, unique: true, validate: {validator: /[\w.-]+@[\w-]+\.\w{3,6}/i, message: "Utiliser le format d'un email. Ex: exemple@gmail.com"}},
    password: {type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);