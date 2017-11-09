module.exports = function(app){
    
    //user route
    var user = require('./routes/user');

    //user methods
    app.get('/users/listAll', user.listAll);
    app.post('/users/create', user.create);
    app.post('/users/login', user.login);
    app.post('/produtos',user.findById);
}