console.log("products-----------222222222222222222222222222222", "---------ctrl")
var multiparty = require('multiparty');

module.exports = {
    addProduct: function (req, res) {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            req.files = files;
            _.each(fields, function (val, key) {
                req.body[key] = val[0];
            });
            console.log("req.body==",req.body.image,req.body.image)
            var postdata = []
            var postData = req.body
//            var name = postData.name.toLowerCase();
//            postData.name = name.replace(" ", "");
            if (_.size(files) > 0) {
                _.each(files.image, function (profilePic) {
                    var postData = {};
                    var name = req.body.name.toLowerCase();
                    postData.name = name.replace(" ", "");
                    postData.description = req.body.description;
                    console.log("files.image[0]----------", profilePic.originalFilename)
                    var tmpPath = profilePic.path;
                    var targetPath = 'content/profile/' + profilePic.originalFilename;
                    fs.renameSync(tmpPath, targetPath, function (err) {
                        if (err)
                            console.error(err.stack);
                    });
                    imageName = profilePic.originalFilename;
                    postData.image = imageName;
                    // /var/www/html/shoppersspotbackend/app/admin/component/products
//                console.log("__dirname", __dirname)
                    postData.Path = "http://localhost:3001/" + targetPath;
                    postData.Path1 = "http://localhost:3001/" + targetPath;
                    //postData.Path = '/../../../../'+targetPath;
                    postdata.push(postData)
                })

                _.each(postdata, function (obj) {
                    models.products(obj).save();
                })
//                         .save().then(function (result) {
//                    console.log("result--", result)
                res.status(200).json({
                    status: "success",
                    result: postdata
                })
//                }).catch(function (err) {
//                    res.status(200).json({
//                        status: false,
//                        error: err
//                    })
//                })
            }
            console.log("postdatapostdata", postdata)
            //http://credethon.net/RCT_shoppersspot_credethon/
            // postData.createdBy = requestUserId;
            // postData.updatedBy = requestUserId;
//            console.log("postData--", postData)
            //_.each(postdata, function (eachobj) {

            // })


        })

//        var postData = req.body
//        postData.createdBy = requestUserId;
//        postData.updatedBy = requestUserId;
//        models.products(postData).save().then(function (result) {
//            res.status(200).json({
//                status: "success",
//                result: result
//            })
////            sio.sockets.on('connection', function (socket) {
////                console.log("socket", socket)
////                socket.on('add', function (data) {
////                    console.log("data", data)
////                    socket.emit('added', result);
////                    socket.broadcast.emit('added', result);
////                })
////            })
//            ////            var data = result;
////            io.emit('new message', data);
////            io.emit('connection', (socket) => {
////             console.log("rrrrrrrrrrrrrr",socket.on)
////            socket.on('new message', (products) => {
////                io.sockets.in(products).emit('refresh messages', products);
////            });
////        })
//        }).catch(function (err) {
//            res.status(200).json({
//                status: false,
//                error: err
//            })
//        })

    },
    getProduct: function (req, res) {
        var condition = {_id: req.params.id}
        var data = (condition._id).toLowerCase();
        var data1 = data.replace(" ", "");
        console.log("condition-11111--", data1)
        models.products.find({name: data1}).exec(function (err, result) {
            console.log('---b name----',result)
            if (result) {
                res.status(200).json({
                    status: "success",
                    result: result
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    },
    getProductById: function (req, res) {
        var condition = {_id: req.params.Id}
        var urlpath = req.body.urlpath;
        console.log("condition---", condition,urlpath)
        models.products.find(condition).exec(function (err, result) {
          console.log("result---",result,result.push({"urlpath":urlpath}))
            if (result) {
                res.status(200).json({
                    status: "success",
                    result: result
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    },
    getAllProduct: function (req, res) {
        console.log("------------")
        console.log("dirname--", __dirname)
        var condition = {
            isDelete: false
        }
        models.products.find(condition).exec(function (err, result) {
            console.log('--123- result----',result)
            //.populate('createdBy',['email'])
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (result) {
                res.status(200).json({
                    status: "success",
                    result: result
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })









//        models.products.aggregate([
////array of data
//            {
//                $lookup: {
//                    from: "users",
//                    localField: "createdBy",
//                    foreignField: "_id",
//                    as: "users"
//                }
//            },
////array to object
//            {$addFields: {userDetails: {$arrayElemAt: ["$users", 0]}}},
////specific fields          
//            {
//                $project: {
//                    name: {$ifNull: ["$name", ""]},
//                    description: 1,
//                    "users.firstname": 1,
//                    user: {$arrayElemAt: ["$users", 0]},
//                    userName: {$arrayElemAt: ["$users.firstname", 0]},
//                    "userDetails.firstname": 1,
//                    "reviews": 1
//                }
//            },
////array to object depend on objects           
//            {
//                $unwind: {
//                    path: "$reviews",
//                    preserveNullAndEmptyArrays: true
//                }
//            }














//            {
//                $lookup: {
//                    from: "users",
//                    localField: "createdBy",
//                    foreignField: "_id",
//                    as: "users"
//                }
//            },
//            {
//                $unwind: "$reviews"
//            },
//            {
//                $match: {"reviews.description": "priya6"}
//            },
//            {
//                $group: {
//                    "_id": "$_id",
//                    name: {$first: "$name"},
//                    reviews: {$push: "$reviews"}
//                }
//            }


//        ]).exec(function (err, result) {
//            if (err) {
//                res.status(200).json({
//                    status: false,
//                    error: err
//                })
//            } else if (result) {
//                res.status(200).json({
//                    status: "success",
//                    result: result
//                })
//            } else {
//                res.status(200).json({
//                    status: false,
//                    error: "No records !"
//                })
//            }
//        })
    },
    editProduct: function (req, res) {
        var condition = {_id: req.params.id}
        var updateData = req.body
        //updateData.updatedBy = requestUserId;
        models.products.findOneAndUpdate(condition, updateData, {new : true}).exec(function (err, result) {
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (result) {
                res.status(200).json({
                    status: "success",
                    result: result
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    },
    deleteProduct: function (req, res) {
        var condition = {_id: req.params.id}
        models.products.findOne(condition).exec(function (err, result) {
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (result) {
                models.products.remove(condition).then(function () {
                    res.status(200).json({
                        status: "success",
                        message: "product deleted successfully"
                    })
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    },
    masterdata: function (req, res) {
        var result = ["mobiles", "smartphones", "laptops", "desktops", "tvs", "electronics", "shirts", "watchs", "cpus", "tables", "cars"]
        if (result) {
            res.status(200).json({
                status: "success",
                result: result,
                message: "product  successfully"
            })
        }
    }

}