module.exports = function(app){
    
    //user route
    var user = require('./routes/user');

    //user methods
    app.get('/users/listAll', user.listAll);
}