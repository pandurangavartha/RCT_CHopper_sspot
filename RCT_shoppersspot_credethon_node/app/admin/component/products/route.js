console.log("products ----------router")
/*
 * Routes for post 
 */
var products = require('./products.ctrl')
var reviews = require('./reviews.ctrl')

app.post('/products/product', products.addProduct);
app.get('/product/:id', products.getProduct);
app.get('/product', products.getAllProduct);
app.put('/product/:id', products.editProduct);
app.delete('/delete-product/:id', products.deleteProduct);
app.get('/masterdata', products.masterdata);
app.post('/getProductById/:Id', products.getProductById);


/*
 * Routes for Reviews
 */
app.post('/review/:id', reviews.addReview);
app.put('/review/:productId/:id', reviews.updateReview);
app.delete('/review/:productId/:id', reviews.deleteReview);
