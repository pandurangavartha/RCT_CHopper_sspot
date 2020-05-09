/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//mongohooks(db.members).save(function (document, next) {
//    
//});



//module.exports = function(io) {  
//  // Set socket.io listeners.
//  //console.log("io",io)
//  io.on('connection', (socket) => {
//    console.log('a user connected',socket);
//models.products.findOne().exec(function(err, cursor){
//            console.log("cursor",cursor)
//        })
//    socket.on('new message', (products) => {
//        
////      io.sockets.in(products).emit('refresh messages', products);
//              console.log("products",products)
//
//      });
//
//    
//  });
//}


//io.on('connection', function (socket) {
//    models.products.exec(function(err, cursor){
//    console.log("cursor", cursor);
//      socket.broadcast.emit('user connected');
//
//})
//});
////models.products.changes().exec(function(err, cursor){
//    db.collection('products', function(err, collection) {
//            console.log("cursor", collection);
//        io.on('connection', function (socket) {
//                console.log("socket", socket);
//
//        })
//})
//
////models.products.find().exec(function(err, cursor){
////    console.log("cursor", cursor);
////
////})
////
//
//io.on('connection', function (socket) {
//    console.log("cursor---", socket);
//  socket.on('message', function (socket1) { 
//      console.log("cursor---", socket1);
//      
//  });
////  socket.on('disconnect', function () { });
//});


//        console.log("-----------------------------------")
//    if (err)
//        throw err;
//
//    var data = {
//        login_data: null,
//        type: ''
//    };
//    
//    cursor.each(function (err, new_val) {
//         if (err)
//            throw err;
//                var old_val = new_val.getOldValue();
//                console.log(old_val,'old_val')
//                if(old_val == null && typeof old_val !== 'undefined'){
//                data.login_data = new_val,
//                console.log(data.login_data,'data.login_data')
//                data.type = 'creted'
//                }else if(typeof old_val == 'undefined'){
//                 data.login_data = new_val,
//                data.type = 'deleted'    
//                }
//                io.emit('useradded',data)
//                
//        
//    })
//    addProduct:function (req, res) {
//    models.products().changes().exec(function(err, cursor){
//        console.log("-----------------------------------")
//    if (err)
//        throw err;
//
//    var data = {
//        login_data: null,
//        type: ''
//    };
//    
//    cursor.each(function (err, new_val) {
//         if (err)
//            throw err;
//                var old_val = new_val.getOldValue();
//                console.log(old_val,'old_val')
//                if(old_val == null && typeof old_val !== 'undefined'){
//                data.login_data = new_val,
//                console.log(data.login_data,'data.login_data')
//                data.type = 'creted'
//                }else if(typeof old_val == 'undefined'){
//                 data.login_data = new_val,
//                data.type = 'deleted'    
//                }
//                io.emit('useradded',data)
//                
//        
//    })
//})
//    }
//   



//DB.Company.changes().run(function(err, cursor){
//    if (err)
//        throw err;
//
//    var data = {
//        company_data: null,
//        type: ''
//    };
//    
//     cursor.each(function (err, new_val) {
//        var old_val = new_val.getOldValue();
//        if (err)
//            throw err;
//        DB.Company.get(new_val.id).run().then(function (companyData) {
//
//            data.company_data = companyData;
//            if (new_val != null && old_val != null) {
//                if(companyData.is_deleted == true || companyData.is_deleted == "true"){
//                                data.type = 'comapny_deleted';
//
//                }else{
//                    data.type = 'comapny_updated';
//                    data.UserStory_olddata = new_val;
//                }
//                    
//             } else {
//                if (old_val == null || typeof old_val == 'undefined') {
//                    data.type = 'comapny_created';
//                }
//            }
//            io.emit('companyModified', data);
//        }).catch(Errors.DocumentNotFound, function () {
//            data.type = 'comapny_deleted';
//            data.company_data = {};
//            data.company_data['id'] = new_val.id;
//        io.emit('companyModified', data);
//        })
//    });
//    
//    
//})


/**
 * To manage logout
 * @param {type} param1
 * @param {type} param2
 */
//io.on('connection', function(socket) {
//    socket.on('logout', function(data){
//        io.emit('serverLogout', data);
//    });
//});
