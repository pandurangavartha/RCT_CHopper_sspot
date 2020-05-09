console.log("55555555555555555555555555", "-----------ctrl")

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
module.exports = {
    addUsers: function (req, res) {
        var postData = req.body
        postData.ip = req.ip;
        postData.password = bcrypt.hashSync(postData.password);
        models.users(postData).save().then(function (result) {
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
    },
    getUsers: function (req, res) {
        var condition = {_id: req.params.id}
        models.users.findOne(condition).exec(function (err, result) {
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
    getAllUsers: function (req, res) {
        models.users.find().exec(function (err, result) {
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
    editUsers: function (req, res) {
        var condition = {_id: req.params.id}
        var updateData = req.body
        models.users.findOneAndUpdate(condition, updateData, {new : true}).exec(function (err, result) {
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
    deleteUsers: function (req, res) {
        var condition = {_id: req.params.id}
        models.users.findOne(condition).exec(function (err, result) {
            if (err) {
                res.status(200).json({
                    status: false,
                    error: err
                })
            } else if (result) {
                models.users.remove(condition).then(function () {
                    res.status(200).json({
                        status: "success",
                        message: "User deleted successfully"
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
//    signup: function(req, res) {
//	console.log("---------------")
//        var email= validator.isEmail(req.body.email)
//        var valid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
//		// var password = validator.matches(req.body.password, valid);
//        // if(email === true && password === true){
//        		console.log("------123---------")
//	req.getConnection(function(err, connection) {	
//		var data = {
//			Name 	: req.body.name,
//			Email   : req.body.email,
//		     password : md5(req.body.password)
//		}
//		console.log(data);
//		var query = connection.query('insert into user set ?',data, function(err, rows) {
//			console.log(rows);
//			if(err) {
//				res.json(err)
//			} else {
//				res.format({
//					json : function(){
//						 res.json({"message":"added successfully"});
//					},
//					html : function(){
//						res.redirect('/users');
//					}
//				})
//	
//			}
//		});
//	});
//// }else{
//// 	res.json({"message" : "invalid"});
//// }
//},
    /*
     * 
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     * @desc : Login Using Google or social Login
     */
    login: function (req, res) {
//        var type = req.body.type;
        var requiredParams = ['email', 'password'];
        helper.validateRequiredParams(req, res, requiredParams).then(function (response) {
            var modelName = models.users;
            var condition = {
                email: req.body.email
            }
            var fields = [""];
            console.log(req.body, 'req.body');
            modelName.findOne(condition).select(fields).exec(function (err, data) {
                console.log("data--", data)
                if (typeof data != 'undefined' && data != '' && data != null) {
                    if (typeof data.password != 'undefined' && (data.password != '' || data.password != null)) {
                        var result = bcrypt.compareSync(req.body.password, data.password);
                        if (result) {
                            /*
                             * JWT token generation
                             */
                            var token = jwt.sign(data, process.env.JWT_SECRET_KEY);
                            console.log("-----", token)
                            res.setHeader('x-access-token', token);
                            var response = [];
                            data.token = token;
                            response.data = data;
                            helper.formatResponse(response, res, '');
                        } else {
                            return res.json({
                                success: false,
                                message: 'Invalid password.'
                            });
                        }
                    }
                } else {
                    var error = {
                        msg: "user not found."
                    }
                    helper.formatResponse('', res, error);
                }

            }).catch(function (error) {
                helper.formatResponse('', res, error);
            });
        });
    },
    Sociallogin: function (req, res) {
        var input = req.body;
        console.log("-------", input)
        if (typeof input.email != 'undefined' && typeof input.media_type != 'undefined') {
            var modelName = models.users;
            var condition = {
                email: req.body.email
            }
            var fields = [""];
            console.log(req.body, 'req.body');
            modelName.findOne(condition).select(fields).exec(function (err, loginCheck) {
                console.log("loginCheck", loginCheck)
                if (loginCheck != null) {
                    //already exist

                    var user = loginCheck;
                    if (typeof user.social == "undefined")
                        user.social = {};
                    if (input.media_type == "google") {
                        if (typeof user.social.google != "undefined" && user.social.google != input.media_unique_id) {
                            return res.json({
                                success: false,
                                message: 'Invalid media id.'
                            });
                        } else {
                            user.social.google = input.media_unique_id;
                        }

                    } else if (input.media_type.toString().toLowerCase() == "linkedin") {
                        if (typeof user.social.linkedin != "undefined" && user.social.linkedin != input.media_unique_id) {
                            return res.json({
                                success: false,
                                message: 'Invalid media id.'
                            });
                        } else {
                            user.social.linkedin = input.media_unique_id;
                        }

                    } else {
                        return res.json({
                            success: false,
                            message: 'Invalid media type.'
                        });
                    }
                    user.isActive = true;
                    var condition = {_id: loginCheck._id}
                    models.users.findOneAndUpdate(condition, user, {new : true}).exec(function (err, userDetail) {
//                    modelName.findOne({_id : loginCheck._id}).then(function(obj){
//                            obj.update(user).run().then(function (userDetail) {
                        var token = jwt.sign(userDetail, process.env.JWT_SECRET_KEY);
                        res.setHeader('x-access-token', token);
                        return res.json({
                            success: true,
                            message: 'Login successful.',
                            user: userDetail
                        });
                    //});
                    }).catch(function (err) {
                        res.status(200).json({
                            status: false,
                            error: err
                        })
                    })

                } else {
                    console.log("[[[[[[[[[[[[[[[[[")
                    var newUser = {};
                    //userSignup-social
                    newUser.name = input.name;
                    newUser.email = input.email;
                    newUser.firstname = input.firstname;
                    newUser.lastname = input.lastname;
                    newUser.isActive = true;
                    newUser.social = {};
                    if (input.media_type == "google") {
                        newUser.social.google = input.media_unique_id;
                    } else if (input.media_type.toString().toLowerCase() == "linkedin") {
                        newUser.social.linkedin = input.media_unique_id;
                    } else {
                        return res.json({
                            success: false,
                            message: 'Invalid media type.'
                        });
                    }
                    console.log("======123", newUser)
                    var user = models.users(newUser);
                    console.log("======", user)
                    user.save().then(function (userDetail) {
                        var token = jwt.sign(userDetail, process.env.JWT_SECRET_KEY);
                        res.setHeader('x-access-token', token);
                        return res.json({
                            success: true,
                            user: userDetail,
                            message: 'Login successful.'
                        });
                    }).catch(function (err) {
                        res.status(200).json({
                            status: false,
                            error: err
                        })
                    })
                }
            }).catch(function (error) {
                helper.formatResponse('', res, error);
            });
        } else {
            return res.json({
                success: false,
                message: 'Payload error.'
            });
        }
    }


}