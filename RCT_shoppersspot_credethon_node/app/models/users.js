/* 
 * Users Schema
 */
console.log("222222222222222222222222222222","---------model")
var users = new mongoose.Schema({
    name: {type: String},
    firstname:{type: String},
    lastname:{type: String},
    password:{type: String},
    mobile:{type: String},
    ip: {type: String},
    email :{type :String,required: true, unique: true,lowercase: true},
    company:{type: String},
    job:{type: String},
    profilepic : {
        fileName: String,
        fileSize: String,
        folderName: String
    },
    gender  :{type : String , length : 1 },
    age :{type : Number  , min : 18 },
    country:{type :String},
    isActive: {type: Boolean, default: true},
    isDelete: {type: Boolean, default: false},
    
},
{
    timestamps: true,
    versionKey : false
})
///* getting related schema*/
//users.statics.getRelatedSchema = function (cb) {
//    cb([
//        {modelName: models.products , fieldName: "reviews._id"},
//    ]);
//};
/*
 * defining modelName for Schema
 */
var collectionName = 'users';
var users = mongoose.model('users', users, collectionName);

module.exports = users