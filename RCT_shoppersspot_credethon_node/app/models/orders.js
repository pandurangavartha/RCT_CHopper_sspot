/* 
 * products Schema
 */
console.log("addcart-------222222222222222222222222222222", "---------model")
var orders = new mongoose.Schema({
    docid: {type: Schema.Types.ObjectId, ref: 'documents'},
    createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
},
        {
            timestamps: true,
            versionKey: false
        })
/*
 * defining modelName for Schema
 */
var collectionName = 'orders';
var orders = mongoose.model('orders', orders, collectionName);

module.exports = orders