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
			var id = req.params.id || "";
			userService.findById(id).then(data => res.send(data)).catch(function(err){ console.log(err)});
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
		
			userService.create(doc).then(data => res.send(data)).catch((err) => { console.log(err)});
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
	var name = req.body.name || "";
	var profile = req.body.profile || "";
	var businessPartner = req.body.businessPartner || "";
	var active = req.body.active || false;
	
	item = {
		"_id": id,
		"type": "USER",
		"name": name,
		"profile": profile,
		"active": active
	};

	if (rev !== null && rev !== "") {
		item._rev = rev;
	}
	if (businessPartner !== null && businessPartner !== "") {
		item.businessPartner = businessPartner;
	}
	
	return item;	
}
