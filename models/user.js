var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
  
var UserSchema = new Schema({   
    username : {type: String, unique: true, required:true},
    password : {type: String, unique: false, required:false},
    email: {type: String, required:true, unique:true},    
});
  
UserSchema.plugin(passportLocalMongoose);
  
 module.exports = mongoose.model("User", UserSchema);