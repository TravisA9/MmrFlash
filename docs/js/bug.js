/////////////////////////////////////////UTILITY//////////////////////////////////////////
$ = (sel) => document.getElementById(sel);
$$ = (sel) => document.getElementsByClassName(sel);
chooseOne = (a) => a[ Math.floor(Math.random()*a.length) ]
//////////////////////////////////////////////////////////////////////////////
// Do some action with thing or array of thing, depending on what it is
function oneRmany(thing, func){
	if(typeof(thing) == "string"){ func(thing); }
	else for(var i = 0; i < thing.length; i++) func(thing[i]);
}
//////////////////////////////////////////////////////////////////////////////////////////
// https://www.npmjs.com/package/serve
// C:\Users\ASUS\AppData\Roaming\npm-cache\_npx\4348
//////////////////////////////////////////////////////////////////////////////////////////
var comp = {}
//////////////////////////////////////////////////////////////////////////////////////////
// Load one bugs from file.
//////////////////////////////////////////////////////////////////////////////////////////
function loadBugs(names, callback){
	if(typeof(names) == "string") names = [names];

	Promise.all(names.map(name => 
		fetch(name).then((response) => { return response.text(); })  )) //.then((html) => {console.log(html)});
		.then((html) => {  
		    var parser = new DOMParser(); // Convert HTML string to document object
		    var doc = parser.parseFromString(html, 'text/html');
			var components = doc.querySelectorAll('[data-bug]');

		    for(var i = components.length - 1; i >= 0; i--){
		    	var name = components[i].getAttribute("data-bug");
		    	comp[name] = components[i].outerHTML;		    		
		    }
		callback()
	});
}
//////////////////////////////////////////////////////////////////////////////
function build(what, where, callback){
	$(where).innerHTML = '' // clean out.
	oneRmany(what, function (x) { 
		$(where).innerHTML += comp[x];
	});
	callback()
	console.log("built")
}		
//////////////////////////////////////////////////////////////////////////////
function add(what, where){
	oneRmany(what, function (x) { 
		$(where).innerHTML += comp[x];
	});
}

