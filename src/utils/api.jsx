var Fetch = require('whatwg-fetch'); 
var ROOT_URL = 'https://api.imgur.com/3/'; 
var API_KEY = "IMGUR_API_CLIENT_ID"; 

module.exports = window.api = { 
	get: function(url) { 
		return fetch(ROOT_URL + url, { 
			headers: { 
				'Authorization': 'Client-ID ' + API_KEY
			}
		})
		.then(function(resp) { 
			return resp.json(); 
		});
	} 
}; 
