/* 
 * products Schema
 */
console.log("addcart-------222222222222222222222222222222", "---------model")
var addcart = new mongoose.Schema({
    docids: [{type: Schema.Types.ObjectId, ref: 'documents'}],
    createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
},
        {
            timestamps: true,
            versionKey: false
        },
        { usePushEach: true })
/*
 * defining modelName for Schema
 */
var collectionName = 'addcart';
var addcart = mongoose.model('addcart', addcart, collectionName);

module.exports = addcart