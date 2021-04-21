//////////////////////////////////////////////////////////////////////////////////////////
window.select = function(event) { var str = ''
	var button = event.target.getAttribute("class")
	var text = getLineage(event.target)

	switch(button) {
	  case 'wd': play(text.sound); break;
	  default: play("tic")
	}
	$("info").innerHTML = ''
  	if(text.txt !== undefined){ var s = ''; str = text.txt;
	  	s = `${str} - ${text.note}`;
	  
		if(str.length==1){
			if(str== 'အ') s += `<br>`; 
			else s += `a (the 'a' sound is implicit)<br>`; 
		} else{
			s += `<br>`;
			for (var i = 0; i < str.length; i++){ 
				var item = vowels.find(x => x.txt === str[i]);
				if(item) s += `<br>${str[i]} ${item.note} ( ${str.charCodeAt(i)} )`; 
				else
				s += `<br>${str[i]} ( ${str.charCodeAt(i)} )`; 
			}
		}

		$("info").innerHTML = s;
	}
	else $("info").innerHTML += `<br>${text.note}<br><br> <small style="color:grey;"></small>`;
	
	event.stopPropagation();
}
//////////////////////////////////////////////////////////////////////////////////////////
function getLineage(el){ var str = ''

	var el = event.target
	while(el.id != 'text') {
		str += el.getAttribute("class") + '-' + el.id + ' '
		el = el.parentNode
	}

	var res = str.split(" ");
	str = '', type = ''
	var obj = selectedText;
	for(var i = res.length - 1; i >= 0; i--){
		var p = res[i].split("-");
		if(res[i] != ''){ // par1/  line0/  wd1/  lt5/
			if(p[0] == "par"){ type = p[0];  obj = selectedText[parseInt(p[1])];  }
			else if(p[0] == "title"){ type = p[0];  obj = selectedText[parseInt(p[1])];  }
			else if(p[0] == "line"){  obj = obj.par[parseInt(p[1])]; }	
			else if(p[0] == "wd"){    
				if(type=='title'){ obj = obj.title[parseInt(p[1])];   } 
				else { obj = obj.line[parseInt(p[1])]; }	}
			else if(p[0] == "lt"){
				let word = segment(obj.wd)
				let l = word[p[1]]  
				var letr = letters.find(x => x.txt === l);
				if(letr==undefined){
					return `Symbol not found, sorry!`;
				}
				return letr; 
			}

		}
	}
	return obj
}
//////////////////////////////////////////////////////////////////////////////////////////
sound = function (src) {
} 
//////////////////////////////////////////////////////////////////////////////////////////
playlist = {}
addAudio = function (name, ext){
	if(name==='') return;
	var sound = document.createElement("audio");
	sound.src = 'audio/' + encodeURIComponent(name) + "." + ext;
	sound.id = name;
	sound.setAttribute("preload", "true");
	sound.setAttribute("controls", "none");
	sound.style.display = "none";
	document.body.appendChild(sound);
	playlist[name] = sound
}
//////////////////////////////////////////////////////////////////////////////////////////
function play(name){ 
	if(name === ''){ name = "bloop"; }
	playlist[name].play(); 
}
//////////////////////////////////////////////////////////////////////////////////////////
