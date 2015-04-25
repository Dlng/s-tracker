/**
 * Created by dave on 24/04/15.
 */

module.exports = function (mongoose) {

    var userSchema = mongoose.Schema({
        name : String
    });

    return mongoose.model('User', userSchema);

};