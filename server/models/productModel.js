/**
 * Created by dave on 23/04/15.
 */

module.exports = function (mongoose) {

    var productSchema = mongoose.Schema({
       name: String
    });

    productSchema.methods.saveSimple = function (res) {
        this.save(function (err) {
            res.send();
        });
    };

    return mongoose.model('Product', productSchema);

};