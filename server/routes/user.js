'use strict';

const userDAO = require('../dao/userDAO');

const userService = require('../services/userService');

var exports =  {
		listAll:function(req, res){
			userService.listAll((resp) => {
				res.json(resp);
			}).catch(function(err){ console.log(err)});
		},
		
		findById:function(req, res){
			var id = req.body.id || "";

			userService.findById(id).then(data => res.send(data)).catch(function(err){ console.log(err)});
		},

		login:function(req, res){
			var id = req.body.id || "";
			var senha = req.body.senha || "";

			userService.login(id,senha).then(data => res.send(data)).catch(function(err){ console.log(err)});
		},
		
		create:function(req, res){
			var id = req.query._id || req.query.id || req.body._id || req.body.id || "";
			var doc = prepareItem (req)
			
			if (id) doc._id = id;
			for (var key in req.body) {
				if (key === "_id" || key === "id") continue;
				doc[key] = req.body[key]
			}
			for (var key in req.query) {
				if (key === "_id" || key === "id") continue;
				doc[key] = req.query[key]
			}
		
			userService.create(doc).then(data => {
				res.send(data)}).catch((err) => { console.log(err)});
		},
		
		update:function(req, res){
			var id = req.query._id || req.query.id || req.body._id || req.body.id || "";
			var doc = prepareItem (req);
			userService.update(doc).then(data => res.send(data)).catch((err) => { console.log(err)});
		},
		
		deleteById: function(req, res){
			if (req.params && req.params.id) {
				var id = req.params.id;
				userService.delete(id).then(data => res.send(data)).catch((err) => { console.log(err)});
			}
		}
	};

module.exports = exports;

function prepareItem(req){
	var item;
	var id = req.query._id || req.query.id || req.body._id || req.body.id || "";
	var rev = req.query._rev || req.query.rev || req.body._rev || req.body.rev || "";
	var senha = req.body.senha || "";
	var local = req.body.local || "";
	var perfil = req.body.perfil || "";
	var nome = req.body.nome || "";
	var razaoSocial = req.body.razaoSocial || "";
	
	item = {
		"_id": id,
		"type": "USER",
		"senha": senha,
		"local": local,
		"perfil": perfil,
		"nome": nome,
		"razaoSocial": razaoSocial
	};

	if (rev !== null && rev !== "") {
		item._rev = rev;
	}
	
	return item;	
}
