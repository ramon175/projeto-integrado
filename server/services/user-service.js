'use strict';

const userDAO = require('../dao/userDAO.js');

class UserService {

    constructor(){
        this.init();
    }

    init(){

    }

    listAll(callback){
        return userDAO.listAll().then((data) =>{
    			callback(data);
        }).catch((err) => { console.log(err)});
    }

    findById(id){
        return userDAO.findById(id).then(data => data).catch((err) => { console.log(err)});
    }

    create(doc){
        return userDAO.create(doc).then(data => data).catch((err) => { console.log(err)});
    }

    update(doc){
        return userDAO.updateDoc(doc).then(data => data).catch((err) => { console.log(err)});
    }

    delete(id){
        return userDAO.deleteById(id).then(data => data).catch((err) => { console.log(err)});
    }
    

}

module.exports = new UserService();