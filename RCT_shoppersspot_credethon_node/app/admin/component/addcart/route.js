var addcarts = require('./addcart.ctrl')

/*
 * routes for Master Data Crud API
 */
app.post('/add-doc-details', addcarts.addeddocdetails);
app.get('/addcarts/doc-details/:user_id', addcarts.getAllProductdetaails);
app.get('/addcarts/get-track-Details/:Id/:docid', addcarts.getTrackDetail);
app.post('/add-orders', addcarts.addedordersdetails);
app.get('/orders-details/:user_id', addcarts.getordersdetails);
app.post('/paymentfororders-pricelist', addcarts.paymentfororders);
app.delete('/deleteo-rders-from-orderhistory/:id/:docid', addcarts.deleteordersfromorderhistory);


