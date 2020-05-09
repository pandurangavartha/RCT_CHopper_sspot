module.exports = {
    addeddocdetails: function (req, res) {
        console.log("result1-if---123----")
        var addcartData = req.body
        addcartData.createdBy = req.body.user_id;
        addcartData.updatedBy = req.body.user_id;
        models.addcart.find({createdBy: req.body.user_id}).exec(function (err, result1) {
            if (_.isEmpty(result1)) {
                console.log("result1-if-------", addcartData)
                models.addcart(addcartData).save().then(function (result) {
                    console.log("---------", result)
                    res.status(200).json({
                        status: "success",
                        result: result
                    })
                }).catch(function (err) {
                    res.status(200).json({
                        status: false,
                        error: err
                    })
                })
            } else {
                if (result1[0].docids.length = 0) {
                    console.log("result1--------", result1, req.body.docids)
                    models.addcart.findOneAndUpdate({_id: result1[0]._id}, {$pushAll: {docids: req.body.docids}}).then(function (result) {
                        console.log("---------", result)
                        res.status(200).json({
                            status: "success",
                            result: result
                        })
                    }).catch(function (err) {
                        res.status(200).json({
                            status: false,
                            error: err
                        })
                    })
                } else {
                    var condition = {
                        _id: result1[0]._id
                    }
                    models.addcart.find(condition).then(function (result) {
                        if (result.length > 0) {
                            var reviewData = {
                                $push : {docids: req.body.docids}
                            }
                            console.log("-------reviewData--", reviewData)
                            models.addcart.findOneAndUpdate(condition, reviewData, {new : true}).exec(function (err, data) {
                                console.log("-------elseifffffffffff--")
                                if (err) {
                                    res.status(200).json({
                                        status: false,
                                        error: err
                                    })
                                } else if (data) {
                                    res.status(200).json({
                                        status: true,
                                        message: "success",
                                        result: data
                                    })
                                } else {
                                    res.status(200).json({
                                        status: false,
                                        message: "No records Avialable"
                                    })
                                }
                            })

                        } else {
                            res.status(200).json({
                                status: false,
                                message: "No records Avialable"
                            })
                        }
                    })
//                    models.addcart.findOneAndUpdate({_id: result1[0]._id}, {$push: {docids: req.body.docids}}, {new : true}).then(function (result) {
//                        console.log("-------elseifffffffffff--", result)
//                        res.status(200).json({
//                            status: "success",
//                            result: result
//                        })
//                    }).catch(function (err) {
//                        res.status(200).json({
//                            status: false,
//                            error: err
//                        })
//                    })
                }

            }

        })

    },
    getAllProductdetaails: function (req, res) {
        console.log("------------")
//        var condition = {
//            createdBy: requestUserId
//        }
        models.addcart.aggregate([
            {
                $match: {createdBy: new mongoose.Types.ObjectId(req.params.user_id)}
            },
            {
                $unwind: {
                    path: "$docids",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "docids",
                    foreignField: "_id",
                    as: "productsInfo"
                }
            },
            
            {$addFields: {"productsInfo.quantity": 1}},
            {
                $group: {
                    _id: "$_id",
//                    quantity:{$first: "$quantity"},
                    products: {$push: {$arrayElemAt: ["$productsInfo", 0]}}
                }
            },
//            {
//                $addFields:{
//                    total :{$sum:"$products.price" }
//                }
//            }
//.allowDiskUse(true)
//.cursor({ batchSize: 2500, async: true })

        ]).
        exec(function (err, result) {
            console.log("------------", result)
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
    },
    addedordersdetails: function (req, res) {
        var addorderData = req.body
        addorderData.createdBy = req.body.user_id;
        addorderData.updatedBy = req.body.user_id;
        console.log("------req, res------", addorderData)
        models.orders(addorderData).save().then(function (result) {
            models.addcart.find({createdBy: req.body.user_id}).exec(function (err, result1) {
                console.log("result1result1result1--", result, result1)
                models.addcart.update(
                        {_id: result1[0]._id},
                        {$pull: {docids: {$in: [result.docid]}}},
                        {multi: true}
                ).exec();
                console.log("-----req, res----", result)
                res.status(200).json({
                    status: "success",
                    result: result
                })
            })
//            models.addcart.remove({result.docid}).exec();

        }).catch(function (err) {
            res.status(200).json({
                status: false,
                error: err
            })
        })
    },
    getordersdetails: function (req, res) {
        console.log("------orderlist------", req.params.user_id)
        models.orders.aggregate([
            {
                $match: {createdBy: new mongoose.Types.ObjectId(req.params.user_id)}
            },
            {
                $lookup: {
                    from: "products",
                    localField: "docid",
                    foreignField: "_id",
                    as: "productsInfo"
                }
            }
        ]).exec(function (err, result) {
            console.log("----orderlist----", result)
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
    paymentfororders: function (req, res) {
        console.log("-------------------------------------------------------------")
        var masterdata = {
            "mobiles": 2000,
            smartphones: 7000,
            "laptops": 50000,
            "desktops": 30000,
            "tvs": 6000,
            "gadgets": 7000,
            "electronics": 6000,
            "fashions": 9000,
            "decoratives": 1000,
            "furniture": 600
        }
//             var masterdata = [
//            {"mobiles": 2000},
//            {"smartphones": 7000},
//            {"laptops": 50000},
//            {"desktops": 30000},
//            {"tvs": 6000},
//            {"gadgets": 7000},
//            {"electronics": 6000},
//            {"fashions": 9000},
//            {"decoratives": 1000},
//            {"furniture": 600}
//            ]
        console.log(masterdata.key);
        var createdBy = req.body.user_id,
                doc_ids = req.body.doc_ids,
                document_ids = [];
        _.each(doc_ids, function (obj) {
            console.log("objobj", obj)
            var id = new mongoose.Types.ObjectId(obj);
            console.log(id)
            document_ids.push(id);
        })
        console.log("-------------", document_ids)
//         models.products.find({_id: {$in: doc_ids}}).exec(function (err, data) {
//             _.each(data,function(obj){
//                var id = new mo
//             })
//        var data = masterdata.
//        var data = masterdata
        models.products.aggregate([
            {
                $match: {
                    _id: {$in: document_ids}
                }
            },
//            {
//                $addFields: {
//                    nani: "$name",
////                    pandu: masterdata.key,
////                    raju: masterdata["name"],
//                    // cost: {$cond: { if: { $eq: [ "$name", masterdata["$name"]] }, then: masterdata.value, else: 20 }},
//                    quantity: 1,
//                    //cost: masterdata["name"]
//                }
//
//            },
//            {$project: {
//                    masterdata: {$filter: {
//                            input: '$masterdata',
//                            as: 'item',
//                            cond: {$eq: ['$$item.a', name]}
//                        }}
//                }}
//            {
//                $project: {
//                    cost: 1,
//                    name: 1,
//                    quantity: 1,
//                    Path:1
//                }
//            }

        ], (function (err, data) {
//            var finaldata = [];
//            _.each(data,function(obj){
//                var avail = _.where(masterdata,{obj.name})
//                obj.name
//            })
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (data) {
                res.status(200).json({
                    status: "success",
                    data: data,
                    message: "data  successfully"
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        }))
    },
    getTrackDetail: function (req, res) {
        console.log("dociddociddociddociddociddociddocid", req.params.docid)

//        var condition = {
//            createdBy: req.params.Id
//        }
        models.orders.aggregate([
            {
                $match: {createdBy: new mongoose.Types.ObjectId(req.params.Id), docid: new mongoose.Types.ObjectId(req.params.docid)}
            },
            {$project: {startdate: "$createdAt", docid: "$docid", orderplaced: "orderplaced", Packaging: "Packaging", shiping: "shiping", deliverd: "deliverd", EnddateAt: {$add: ["$createdAt", 4 * 24 * 60 * 60000]}}}
        ]).exec(function (err, result) {
            //models.orders.find(condition).exec(function (err, result) {
//            _.each(result, function (obj) {
//                if (obj.docids == condition.id) {
//                    console.log("----doc--------", result)
//                }
//            })
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
//                aggregate([
//            {
//                $match: {createdBy: new mongoose.Types.ObjectId(requestUserId)}
//            },
//            {
//                $unwind: {
//                    path: "$docids",
//                    preserveNullAndEmptyArrays: true
//                }
//            },
//            {
//                $lookup: {
//                    from: "products",
//                    localField: "docids",
//                    foreignField: "_id",
//                    as: "productsInfo"
//                }
//            },
//            {
//                $group: {
//                    _id: "$_id",
//                    products: {$push: {$arrayElemAt: ["$productsInfo", 0]}}
//                }
//            }
//
//
//        ])

    },
    deleteordersfromorderhistory: function (req, res) {
        var condition = {'_id': req.params.id}
        var inputData = {
            $pull: {'docids': req.params.docid}
        }
        console.log("inputDatainputData", condition, inputData)
        models.addcart.findOneAndUpdate(condition, inputData, {new : true}).exec(function (err, data) {
            console.log("datadata", data)
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (data) {
                res.status(200).json({
                    status: "success",
                    message: " deleted successfully"
                })
            } else {
                res.status(200).json({
                    status: false,
                    error: "No records !"
                })
            }
        })
    }


}