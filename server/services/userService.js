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
        return userDAO.findById(id).then((data) => data).catch((err) => { console.log(err)});
    }

    login(id,senha){
        return userDAO.login(id,senha).then((data) => {
            if (data.docs.length > 0){

                var username = data.docs[0].nome

                return {status:"OK", mensagem:"Login Efetuado.", nome: username};
            }else{
                console.log("Falha na autenticação");
                return {
                    status:"NOT_OK", mensagem:"Erro"
                };
            }
        }).catch((err) => { console.log(err)});
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