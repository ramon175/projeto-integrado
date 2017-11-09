/* eslint no-underscore-dangle: "off" */

'use strict';

const CloudantDB = require('./config/CloudantDB.js');

class User extends CloudantDB {

	constructor() {
	    super('appdb');
	    this.init();
	}

	init() {

	}
	  
	listAll(){
		var selector = {
			"type" : "USER"
		};
		
		return this.find(selector).then((dbDoc) => dbDoc.docs);
	}
	  
	create(doc){
		if(doc.type === "USER"){
			 return this.save(doc).then((dbDoc) => {
				  var item = Object.assign(doc, dbDoc);
				  return item;
			  });
		}else{
			return {'error':'Doc is not an user'};
		}
	}
	  
	updateDoc(doc){
		if (doc.type === "USER") {
			return this.update(doc._id, doc).then((dbDoc) => {
				  var item = Object.assign(doc, dbDoc);
				  return item;
			});
		}else{
			return {'error':'Doc is not an user'};
		}
	}

	login(id,senha) {
		var selector = {
			"_id": id,
			"senha":senha,
			"type": "USER"
		};

		return this.find(selector).then((dbDoc) => dbDoc);
	}

	findById(id) {
		var selector = {
			"_id": id
		};

		return this.find(selector).then((dbDoc) => dbDoc);
	}

	deleteById(id) {
		return this.findById(id).then((dbDoc)=>{
			return this.delete(id).then((dbDoc) => dbDoc);
		});
	}

	viewById(design, view, key) {
		return this.view(design, view, key).then(data => data.rows.map(item => item.doc));
	}

}

module.exports = new User();