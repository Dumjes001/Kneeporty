const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

const userSchema = new Schema({
    name: {type: String, required: true},
    dob: {type: Date, required: true},
    email: {type: String, required: true, unique: true},
    hash: String
});

userSchema.methods.createPassword = (password) => {
    this.hash = crypto.pbkdf2Sync(password, new Buffer('sh!', 'utf8'), 1000, 87, 'sha512').toString('hex');
};

userSchema.methods.isValidPassword = (password) => {
    var hash = crypto.pbkdf2Sync(password, new Buffer('sh!', 'utf8'), 1000, 87, 'sha512').toString('hex');

    return hash === this.hash;
};

userSchema.methods.confirmPassword = (password1, password2) => {
    return password1 === password2;
}