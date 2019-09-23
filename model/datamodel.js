var mongo = require('mongoose');

var schema = mongo.Schema;

var dataSchema = new schema({
    catagory : String,
    photo : String,
    message : String ,
    username : String/* ,
	 comments : [{'comment':String}]  */
});

var dataModel = mongo.model("data", dataSchema);

module.exports = dataModel;