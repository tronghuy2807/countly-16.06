var plugin = {},
	common = require('../../../api/utils/common.js'),
	plugins = require('../../pluginManager.js');


(function (plugin) {
	//write api call
	plugins.register("/i", function(ob){
		var params = ob.params;
		// console.log(params.req.headers['user-agent']);
		// console.log(params.ip_address);
		var now = Math.round(new Date().getTime()/1000);
		var ts = (params.qstring.time_stamp) ? parseInt(params.qstring.time_stamp) : now;
		var device = {};
		device.id = params.qstring.device_id || "";
		var location = {};
		location.ip = params.ip_address;
		var sdk = {};
		sdk.version = params.qstring.sdk_version;
		sdk.name = params.qstring.sdk_name;
		var version = (params.qstring.metrics) ? (params.qstring.metrics._app_version || "") : "";
		common.db.collection('app_users' + params.app_id).findOne({'_id':params.app_user_id}, function (err, result) {
			if(err)
				console.log(err);
			else if(result){
				if(result.d)
					device.d = result.d;
				if(result.p)
					device.p = result.p;
				if(result.pv)
					device.pv = result.pv;

				if(result.cc)
					location.cc = result.cc;
				if(result.cty)
					location.cty = result.cty;
				version = result.av || version;
			}

		// 	}
		var known = false;

			if (params.qstring.events) {
				known = true;
				var events = params.qstring.events;
				// common.log.(version);
				// if(events.constructor === Array)
				// 	for (var i=0; i < events.length; i++) {
				// 		var type = "event";
				// 		var info = events[i];
				// 		common.db.collection('glamira').insert({i:info}, function () {});
				// 	}
				// else{
					var info = events;
					var keyEvents = info[0].key;

				//common parameters:
				var ip = params.ip_address;
				// var os = info[0].segmentation.os;
				var user_agent = params.req.headers['user-agent'];
				var resolution = info[0].segmentation.resolution;
				// var deviceType = info[0].segmentation.device_type;
				var user_id_db = info[0].segmentation.user_id_db;
				var device_id = params.qstring.device_id;
				var api_version = "1.0";
				var current_url = info[0].segmentation.current_url;
				var referrer_url = info[0].segmentation.referrer_url;
				var store_id = info[0].segmentation.store_id;
				var local_time = info[0].segmentation.local_time;

				//specific parameters
				var product_id = info[0].segmentation.product_id;
				var cart_products = info[0].segmentation.cart_products;
				var key_search = info[0].segmentation.key_search;
				var option = info[0].segmentation.option;
				var cat_id = info[0].segmentation.cat_id;
				var collect_id = info[0].segmentation.collect_id;
				var viewing_product_id = info[0].segmentation.viewing_product_id;
				var recommendation_product_id = info[0].segmentation.recommendation_product_id;



				switch (keyEvents) {
					case "view_product_detail":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('view_product_detail').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url,product_id:product_id, option:option}, function () {});
						break;
					case "view_shopping_cart":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('view_shopping_cart').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url, cart_products: cart_products }, function () {});
						break;
					case "view_my_account":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('view_my_account').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url}, function () {});
						break;
					case "add_to_cart_action":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('add_to_cart_action').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url,product_id:product_id,option:option}, function () {});
						break;
					case "checkout_success":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('checkout_success').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url,cart_products: cart_products}, function () {});
						break;
					case "search_box_action":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('search_box_action').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url, key_search:key_search}, function () {});
						break;
					case "view_listing_page":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('view_listing_page').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url,option: option,cat_id: cat_id, collect_id:collect_id}, function () {});
						break;
					case "select_product_option":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('select_product_option').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url,option: option,product_id:product_id,option:option}, function () {});

					case "view_static_page":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('view_static_page').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url}, function () {});
						break;
					case "checkout":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('checkout').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url,cart_products: cart_products}, function () {});
						break;
					case "view_home_page":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('view_home_page').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url}, function () {});
						break;
					case "product_detail_recommendation_visible":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('product_detail_recommendation_visible').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url,viewing_product_id:viewing_product_id}, function () {});
						break;
					case "product_detail_recommendation_noticed":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('product_detail_recommendation_noticed').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url,viewing_product_id:viewing_product_id}, function () {});
						break;
					case "product_detail_recommendation_clicked":
						var objectID = require('mongodb').ObjectID;
						var obId = new objectID;
						var time = ts;
						var uuid = device_id;
						common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
						common.db.collection('product_detail_recommendation_clicked').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url,viewing_product_id:viewing_product_id,recommendation_product_id:recommendation_product_id}, function () {});
						break;

					// case "other":
					// 	var objectID = require('mongodb').ObjectID;
					// 	var obId = new objectID;
					// 	var time = ts;
					// 	var uuid = device_id;
					// 	common.db.collection('summary').insert({device_id:uuid,time_stamp:time,_id:obId}, function () {});
					// 	common.db.collection('other').insert({_id:obId,time_stamp:time,ip:ip,user_agent:user_agent,resolution:resolution, user_id_db: user_id_db, device_id: uuid, api_version: api_version, timeFormat: timeFormat,store_id: store_id,local_time:local_time,current_url: current_url,referrer_url:referrer_url}, function () {});
					// 	break;
				}
			}
			if(!known){
				var type = "unknown";
				var info = {};
				for(var i in params.qstring){
					if(i != "app_key" && i != "device_id" && i != "ip_address" && i != "time_stamp")
						info[i] = params.qstring[i];
				}
				common.db.collection('glamira').insert({ts:ts, reqts:now, d:device, l:location, v:version, t:type, i:info, s:sdk}, function () {});
			}
		});
	});
}(plugin));

module.exports = plugin;