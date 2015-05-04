/**
 * Created by dave on 24/04/15.
 */

module.exports = function (mongoose) {

    var userSchema = mongoose.Schema({
        email : String,
        password : String
    });

    userSchema.methods.validPassword = function(password) {
        return this.password === password;
    };

    return mongoose.model('User', userSchema);

};