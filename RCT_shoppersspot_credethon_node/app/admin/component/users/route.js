console.log("333333333333333333333333333","----------router")

/*
 * Routes for post 
 */
var users = require('./users.ctrl')

app.post('/user/register', users.addUsers);
app.post('/user/login', users.login);
app.post('/user/sociallogin', users.Sociallogin);
app.get('/user/:id', users.getUsers);
app.get('/user', users.getAllUsers);
app.put('/user/:id', users.editUsers);
app.delete('/user/:id', users.deleteUsers);

