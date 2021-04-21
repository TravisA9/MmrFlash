//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// '။'
var selectedText = ''
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// '။'
function showReading(text){
	build(['menu','reading'], 'body', function(){ 
		parseOutline(text)

		playlist = {} // Clean out!
	    addAudio("tic", "ogg");
	    addAudio("bloop", "ogg");
		for (var i = 0; i < selectedText.length; i++) {
			let node = selectedText[i];
			if('title' in node){
				addAudio(node.sound, "mp3");
				$('text').innerHTML += `<div class="title" id="${i}">${makeWord(node['title'])}</div>`
			} else if('par' in node){
				addAudio(node.sound, "mp3");
				$('text').innerHTML += `<div class="par" id="${i}">${makeSentence(node['par'])}</div>`
			} 
		}
	});
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// '။'
function makeSentence(sentences){        var str = ''
	for (var j = 0; j < sentences.length; j++){
		addAudio(sentences.sound, "mp3");
		str += `<span class="line" id="${j}">${makeWord(sentences[j].line)}</span>`;	}
	return str
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// '။'
function makeWord(words){           var str = '';
	for (var j = 0; j < words.length; j++){	
		addAudio(words[j].sound, "mp3");
		if(words[j].group === "Num"){
			str += `<span class="Num" id="${j}">${words[j].wd}</span>`;
		} else if(words[j].group === "punct"){
			str += `<span class="punct" id="${j}">${words[j].wd}</span>`;
		} else {
			str += `<span class="wd" id="${j}">${subword(words[j].wd)}</span>`;
		} 
	} 
	return str
}
//////////////////////////////////////////////////////////////////////////////////////////
function subword(word){                 var subs = word.split('​'), str = ''
	for (var i = 0; i < subs.length; i++){
		str += '<span class="sub">' + getLetters(subs[i]) + '</span>';	}
	return str;
}
//////////////////////////////////////////////////////////////////////////////////////////
function getLetters(w){                var subw = segment(w), str = ''
	for (var i = 0; i < subw.length; i++){	//subword(word)		
		str += `<span class="lt" id="${i}">${subw[i]}</span>`;	}
	return str;
}
//////////////////////////////////////////////////////////////////////////////////////////
// Model for reading structure:
// name = [ TITLE, PARAGRAPH... ]
// 
// A TITLE:         {sound:"", title:[ WORD... ]}
// A PARAGRAPH:     {sound:"", par:[ SENTENCE... ]}
// A SENTENCE:      {sound:"", line:[ WORD... ]}
// A WORD:          {sound:"", wd:['ပြ','ဿ','နာ','တွေ']} // Later this may be changed to just references
//////////////////////////////////////////////////////////////////////////////////////////
function parseOutline(outline){
	selectedText = JSON.parse(JSON.stringify(outline)); //	text
	for (var h = 0; h < outline.length; h++){
		var node = selectedText[h]
		if('title' in node){
			node.title = parseSentence(node.title[0]); } 
		else if('par' in node){ var lines = node.par
			for (var j = 0; j < lines.length; j++){	
				lines[j].line  = parseSentence(lines[j].line[0] );	}
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////////
// Compress(view_yourself_3)
//////////////////////////////////////////////////////////////////////////////////////////
function Compress(obj){

	function words(arr){ var first = arr[0]
		for (var i = 1; i < arr.length; i++){
			first.wd += ' ' + arr[i].wd
		}
		return [ first.wd ]
	}

	for (var h = 0; h < obj.length; h++){
		var node = obj[h]

		if('title' in node){
			var array = node.title
			node.title = words(array)
			//console.log(JSON.stringify(node))
		} 

		else if('par' in node){ var lines = node.par
			for (var j = 0; j < lines.length; j++){	
				var line = lines[j].line
				lines[j].line = words(line)
				//console.log(JSON.stringify(node))
			}
		}
	}
			console.log(JSON.stringify(obj))
}
//////////////////////////////////////////////////////////////////////////////////////////
//  sent = 'အဲဒီလိုဖြစ်ရင်တောင် အခြေအနေကို တိုးတက်အောင် လုပ်နိုင်ပါတယ်။'
// 	res = sent.replace(/([():;,\-–—။“”])/g, " $1 "); // Seperate punctuation
// 	res = res.replace(/\s+/g, " "); // collapse whitespace
// 	if(res[res.length-1] === ' '){ res = res.substring(0, res.length-1);}
// 	words = res.split(' ')

// var array = []
// for (var i = 0; i < dict.length; i++){
// 	let s = dict[i].wd.split('​')
// 	array.push( ...s );
// }
// array = [...new Set(array)];
// array = array.sort();
// var subWords = []
// for (var i = 0; i < array.length; i++){
// 	subWords.push({ wd:array[i], note:""})
// }
// 	console.log(JSON.stringify(array))
//////////////////////////////////////////////////////////////////////////////////////////
function parseSentence(sent){
	//  ၀၁၂၃၄၅၆၇၈၉

	var res = sent.replace(/([():;,\-–—။၊“”၀၁၂၃၄၅၆၇၈၉])/g, " $1 "); // Seperate punctuation
	res = res.replace(/[\t\s]+/g, " "); // collapse whitespace
	if(res[res.length-1] === ' '){ res = res.substring(0, res.length-1);}
	if(res[0] === ' '){ res = res.substring(1, res.length);}
	var words = res.split(' ')
	var array = []
	for (var i = 0; i < words.length; i++){
		let word = words[i]
		var def = dict.find(x => x.wd === word)
		// Definition not found in Dictionary
		if(def == undefined){
			var node = {sound:"", wd:word, group:"", note:""}
			dict.push(node)
			def = node
		}
		array.push( def )
	}
	return array;
}
//////////////////////////////////////////////////////////////////////////////////////////
var promises = [{
title:[ 'ကောင်း​မြတ်​တဲ့ ကတိတော်​တွေ​ကို ဘုရားသခင် ဖော်ပြ​ပုံ'
], sound:"", note:"How God Gives Good Promises"},

{par:[
{line:[ 'ဘုရားသခင့် သတင်း​စကား​တွေ​ကို သမ္မာကျမ်းစာ​ထဲမှာ တွေ့နိုင်တယ်။'
], sound:"", note:"God's message can be found in the Bible. "},
{line:[ '(၂ တိမောသေ ၃:၁၆) ဘုရား​ရဲ့​ သတင်း​စကား​တွေ​ကို ပရောဖက်​တွေ ဘယ်လို ရေးသားခဲ့​ကြသလဲ။'
], sound:"", note:"(2 Timothy 3:16) How did the prophets write God's message? "},
{line:[ ' (၂ ပေတရု ၁:၂၁) ဘုရားသခင်​က မိမိရဲ့​ အတွေး​တွေ​ကို ကျမ်း​ရေးသူတွေ​စိတ်ထဲ ထည့်​ပေး​ပြီး ချရေး​စေတယ်။'
], sound:"", note:"(2 Peter 1:21) God put his thoughts in the minds of Bible writers."},
{line:[ 'ဥပမာ​ပြော​ရ​ရင် စီးပွားရေး​လုပ်ငန်းရှင် တစ်ယောက်က သူ့ကိုယ်စား အတွင်းရေးမှူး​ကို စာရေး​ခိုင်းတယ်။'
], sound:"", note:"For example, a businessman asks a secretary to write on his behalf."},
{line:[ 'အဲဒီ​စာ​ကို စီးပွားရေး​လုပ်ငန်းရှင်​ရဲ့​ စာ​လို့​ပဲ ကျွန်တော်​တို့ သတ်မှတ်တယ်။'
], sound:"", note:"We consider it a business letter."},
{line:[ 'အဲဒီလိုပဲ ဘုရားသခင်​က မိမိရဲ့​ သတင်းစကားကို ရေး​ဖို့ လူတွေကို သုံး​ပေမဲ့ ကျမ်းစာ​ရဲ့​ အာဘော်ရှင်​က​တော့ ဘုရားသခင်​ပါ​ပဲ။'
], sound:"", note:"In the same way, God uses people to write His message, but God is the Author of the Bible."}
], sound:"", note:"God's message can be found in the Bible. (2 Timothy 3:16) How did the prophets write God's message? (2 Peter 1:21) God put his thoughts in the minds of Bible writers. For example, a businessman asks a secretary to write on his behalf. We consider it a business letter. In the same way, God uses people to write His message, but God is the Author of the Bible."},

{title:[ 'ကျမ်းစာ​ကို အလွယ်တကူ ရနိုင်'
],sound:"",note:"The Bible is readily available"},

{par:[
{line:[ 'ဘုရားသခင့်​ သတင်း​စကား​က သိပ်​အရေးကြီး​လို့ ဘုရား​က လူတိုင်းကို ဖတ်​စေ​ချင်၊ နားလည်​စေချင်တယ်။'
],sound:"",note:"The message of God is so important that God wants everyone to read it. I want you to understand."},
{line:[ 'အခုချိန်မှာ “ထာဝရ​သတင်းကောင်း” ကို “လူမျိုး၊ လူမျိုးနွယ်၊ ဘာသာ​စကား​အမျိုးမျိုး ပြော​တဲ့​လူတွေ” အလွယ်တကူ ရနိုင်​ပြီ။'
],sound:"",note:"Right now, the “everlasting good news” is being used to describe people, Ethnicity \"People who speak different languages.\""},
{line:[ '(ဗျာဒိတ် ၁၄:၆) သမ္မာကျမ်းစာ​ကို ဘာသာ​စကား ၃,၀၀၀ ကျော်​နဲ့ ဖတ်​နိုင်ပြီ။'
],sound:"",note:"(Revelation 14: 6) The Bible is now available in over 3,000 languages."},
{line:[ 'ကမ္ဘာ​ပေါ်မှာ အဲဒီလောက်​များတဲ့ ဘာသာ​စကား​နဲ့ ဘာသာပြန်​ထား​တဲ့ စာအုပ် မရှိဘူး။'
],sound:"",note:"There is no book in the world that has been translated into so many languages."}
],sound:"",note:"The message of God is so important that God wants everyone to read it. I want you to understand. Right now, the “everlasting good news” is being used to describe people, Ethnicity \"People who speak different languages.\" (Revelation 14: 6) The Bible is now available in over 3,000 languages. There is no book in the world that has been translated into so many languages."},


{par:[
{line:[ 'ဘုရားသခင်​ဟာ လူသားတွေကို ဖန်ဆင်း​ချိန်​ကစပြီး ကောင်းကင်တမန်​တွေ၊ ပရောဖက်​တွေ​က​တစ်ဆင့် လူတွေနဲ့ ဆက်သွယ်​တယ်။'
],sound:"",note:"God created humans, including angels, and humans. He communicated with people through the prophets."},
{line:[ 'အဲဒီအပြင် မိမိရဲ့ သတင်း​စကား​တွေ၊ ကတိတော်​တွေ​ကို ရေးသား​ပြီး မှတ်တမ်းတင်​စေတယ်။'
],sound:"",note:"In addition, to his messages, He makes promises and writes them down."},
{line:[ 'ပျော်ရွှင်ဖွယ် အနာဂတ်​ ရှိတယ်လို့ ဘုရား​ ကတိပေး​ထား​တယ်။'
],sound:"",note:"God promises a happy future."},
{line:[ 'ဒါဆို အခု​ချိန်မှာ ဘုရားသခင့်​ကတိ​တွေ​ကို ဘယ်မှာ တွေ့​နိုင်​သလဲ။'
],sound:"",note:"Where, then, can we find God's promises now?"}
],sound:"",note:"God created humans, including angels, and humans. He communicated with people through the prophets. In addition, your messages, He makes promises and writes them down. God promises a happy future. Where, then, can we find God's promises now?"}



] // END article
//////////////////////////////////////////////////////////////////////////////////////////
var reading = [
	{ title:[ 'ပြဿနာတွေ ဆွေးနွေးနိုင်ပုံ' ], 
	 sound:"", note:"Problems can be discussed" },

	{
	 par:[
		{ line:[ 'သင်နဲ့ သင့်အိမ်ထောင်ဖက်ဟာ ပြဿနာတစ်ခုကို ဆွေးနွေးတဲ့အခါ စပြောချိန်မှာထက် ပြီးသွားချိန်မှာ ပိုဆိုးသွားတယ်လို့ ခံစားရသလား။'], 
		sound:"", note:"Do you and your mate feel that things are getting worse when you start talking about a problem?"}, // , '။' 

		{ line:[ 'အဲဒီလိုဖြစ်ရင်တောင် အခြေအနေကို တိုးတက်အောင် လုပ်နိုင်ပါတယ်။'], 
		sound:"", note:"Even so, these conditions can improve."}, 

		{ line:['အရင်ဆုံး အမျိုးသားတွေနဲ့ အမျိုးသမီးတွေရဲ့ မတူညီမှုလေးတွေကို သိထားသင့်တယ်။' ], 
		sound:"", note:"First of all, you should know the differences between men and women."}
	], 

	sound:"", 
	note:"Do you and your mate feel that things are getting worse when you start talking about a problem? Even so, the situation can improve. First of all, you should know the differences between men and women."
	}
]
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// https://www.jw.org/en/bible-teachings/teenagers/ask/negative-thinking/
//////////////////////////////////////////////////////////////////////////
var view_yourself_1 = [
	{ title:[ 'ကိုယ့်ကိုယ်ကိုယ် ဘယ်လို ရှုမြင်​သလဲ' ], 
	 sound:"", note:"How do you view yourself?" },

	{ title:[ 'အကောင်းမြင်​သ​မား' ], sound:"", note:"Optimist" },	

{ par:[

	{ line:[ '“ခပ်ပျော်ပျော်​ပဲ နေတယ်။' ], 
		sound:"", note:"I'm just having fun" }, 

	{ line:[ 'အပူအပင် သိပ်​မထားဘူး။' ], 
		sound:"", note:"Not too hot --obviously not well translated--" }, 

	{ line:[ 'နေ့တိုင်း အပြုံး​မျက်နှာ​နဲ့ နေနိုင်အောင် ကြိုးစားတယ်။”—ဗယ်​လ​ရီ။' ], 
		sound:"", note:"I try to live with a smile on my face every day —Valerie." } 

	], sound:"", note:"“I try to be as happy and easygoing as possible. Why shouldn’t I live each day with a smile on my face?”—Valerie."
},
 		
	{ title:[ 'အဆိုးမြင်​သ​မား' ],  sound:"", note:"Pessimist" },

{ par:[	
	{ line:[ `“ကောင်းတာတွေ ဖြစ်လာတဲ့​အခါတိုင်း မဖြစ်နိုင်ဘူး၊ လွဲ​နေတာ​များလား​လို့ ချက်ချင်း အတွေး​ဝင်တယ်။”—ရေဗက္ကာ။` ], 
		sound:"", note:"Every time something good happens, I immediately think, 'Is it impossible or is it wrong?' - Rebekah" } 
	], sound:"", note:"“My first reaction to anything positive is to think something is amiss—too good to be true or a mistake.”—Rebecca."
},


	{ title:[ 'လက်တွေ့​သ​မား' ], sound:"", note:"Realist" },

{ par:[	

	{ line:[ '“အကောင်းမြင်​သ​မား​က စိတ်ပျက်​ရ​တတ်တယ်။' ], 
		sound:"", note:"An optimist is often disappointed"
	},

	{ line:[ 'အဆိုးမြင်​သ​မား​ရဲ့ ဘဝက​တော့ စိတ်​ချမ်းမြေ့​စ​ရာ ကောင်းမှာ မဟုတ်ဘူး။' ], 
		sound:"", note:"The life of a pessimist is not a happy one"
	},
	{ line:[ 'လက်တွေ့​သ​မား​ကတော့ ကိစ္စရပ်​တွေကို အရှိအတိုင်း မြင်​စေတယ်။”—အန်​နာ။' ], 
		sound:"", note:"The pragmatist makes things look real"
	} ], sound:"", note:"“Being optimistic is a setup for disappointment, and being pessimistic is a miserable way to live. Being realistic helps me to see things as they really are.”—Anna."
}

]  //END

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// https://www.jw.org/my/%E1%80%85%E1%80%AC%E1%80%80%E1%80%BC%E1%80%8A%E1%80%B7%E1%80%BA%E1%80%90%E1%80%AD%E1%80%AF%E1%80%80%E1%80%BA/%E1%80%99%E1%80%82%E1%80%B9%E1%80%82%E1%80%87%E1%80%84%E1%80%BA%E1%80%B8%E1%80%99%E1%80%BB%E1%80%AC%E1%80%B8/%E1%80%94%E1%80%AD%E1%80%AF%E1%80%B8%E1%80%9C%E1%80%B1%E1%80%AC%E1%80%B7-%E1%80%A1%E1%80%99%E1%80%BE%E1%80%90%E1%80%BA%E1%81%83-%E1%81%82%E1%81%80%E1%81%81%E1%81%86-%E1%80%87%E1%80%BD%E1%80%94%E1%80%BA/%E1%80%A1%E1%80%AD%E1%80%99%E1%80%BA%E1%80%91%E1%80%B1%E1%80%AC%E1%80%84%E1%80%BA-%E1%80%95%E1%80%BC%E1%80%BF%E1%80%94%E1%80%AC%E1%80%90%E1%80%BD%E1%80%B1-%E1%80%86%E1%80%BD%E1%80%B1%E1%80%B8%E1%80%94%E1%80%BD%E1%80%B1%E1%80%B8%E1%80%94%E1%80%AD%E1%80%AF%E1%80%84%E1%80%BA%E1%80%95%E1%80%AF%E1%80%B6/
//////////////////////////////////////////////////////////////////////////
var view_yourself_2 = [
	{ title:[ 'ဘာကြောင့် အရေးကြီး​သလဲ' ], sound:"", note:"Why does it matter?" },

{ par:[	
	{ line:[ '“စိတ်ရွှင်လန်း​သူတွေ​အတွက်တော့ အချိန်တိုင်း​ဟာ စားသောက်ပွဲ ဖြစ်နေတယ်” လို့ ကျမ်းစာ ဆိုတယ်။ (ပညာအလိမ္မာ ၁၅:၁၅)' ], 
		sound:"", note:"The Bible says that “the one with a cheerful heart has a continual feast.”"
	}, 
	{ line:[ 'မလိုလား​အပ်​တဲ့ အပျက်သဘော အတွေး​တွေကို ဖျောက်​ပြီး အပြုသဘော ရှိအောင် ကြိုးစား​သူတွေဟာ ပို​ပျော်ရွှင်​ကြပါတယ်။' ], 
		sound:"", note:"Clearly, people who avoid unnecessary negative thoughts and approach life with a positive outlook tend to be happier."
	},
	{ line:[ 'သူတို့မှာ မိတ်ဆွေ​သူငယ်ချင်း ပို​များ​တတ်တယ်။' ], 
		sound:"", note:"They are also likely to make more friends."
	},
	{ line:[ 'တစ်ချိန်လုံး အပျက်သဘော တင်ပြ​နေတဲ့​သူ အနားမှာ ဘယ်သူ နေချင်​မလဲ။' ], 
		sound:"", note:"After all, who wants to spend time with people who are always gloomy?"
	}], sound:"", note:"The Bible says that “the one with a cheerful heart has a continual feast.” (Proverbs 15:15) Clearly, people who avoid unnecessary negative thoughts and approach life with a positive outlook tend to be happier. They are also likely to make more friends. After all, who wants to spend time with people who are always gloomy?"
},

{ par:[	
	{ line:[ 'အပြုသဘောထား​ရှိ​သူတွေတောင် ဘဝမှာ အခက်အခဲ​တွေ ကြုံရ​တတ်တယ်။' ], 
		sound:"", note:"Still, there are realities of life that even the brightest optimist must face."
	}, 
	{ line:[ 'ဥပမာ–' ], 
		sound:"", note:""
	}], 
sound:"", note:""
},

{ par:[	
	{ line:[ '• စစ်၊ အကြမ်းဖက်မှု၊ ရာဇဝတ်မှု သတင်းတွေကို အမြဲ ကြားနေ​ရနိုင်တယ်။' ], 
		sound:"", note:"The news may bombard you with reports of war, terrorism, or crime."
	},    
	{ line:[ '•   ပြဿနာ​တွေ ရှိ​နိုင်တယ်။' ], 
		sound:"", note:"You might have to deal with problems in your family."
	}, 

	{ line:[ '• ကိုယ်တိုင်ရဲ့ ချွတ်ယွင်းချက်၊ အားနည်းချက်တွေကို တစ်ချိန်လုံး တိုက်လှန်​နေရ​နိုင်တယ်။' ], 
		sound:"", note:"You no doubt have your own failings and weaknesses to contend with."
	},    
	{ line:[ '• သူငယ်ချင်း​ရဲ့ အပြောအဆို၊ အပြုအမူကြောင့် စိတ်မကောင်း ဖြစ်နိုင်တယ်။' ], 
		sound:"", note:"A friend may have hurt your feelings."
	}], 	
sound:"", note:""
},



{ par:[	
	{ line:[ 'ဒီ​အဖြစ်မှန်​တွေကို မမြင်​အောင် မျက်စိ​စုံ​မှိတ်​ထားလို့ မရနိုင်​သလို အဲဒီ​အကြောင်းကိုပဲ တနုံ့နုံ့တွေး​နေလို့လည်း မဖြစ်​ဘူး။' ], 
		sound:"", note:"Rather than close your eyes to those realities—or fixate on them so that you feel miserable."
	}, 
	{ line:[ 'မျှမျှတတ ရှုမြင်ဖို့ ကြိုးစားပါ။' ], 
		sound:"", note:"Try to be ballanced."
	},   
	{ line:[ 'အရှိအတိုင်း ရှုမြင်​တာ​က အလွန်အမင်း အပျက်သဘောထား မဝင်​စေ​သလို အလွန်အမင်း စိတ်ဓာတ်ကျ​ခြင်း မရှိဘဲ ဘဝ​အခြေအနေကို လက်ခံ​နိုင်​ပါလိမ့်မယ်။' ], 
		sound:"", note:"A realistic approach will help you to avoid undue negative thoughts and accept life’s realities without being crushed by them."
	}], 	
sound:"", note:""
},

]  //END
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
view_yourself_3 = [
{"sound":"","title":["ကိုယ့်​အမှားတွေကို အရှိအတိုင်း လက်ခံပါ ။"
],"note":"Keep your faults in perspective."},

{"par":[
	{"line":["ကျမ်းစာက ဒီလို​ဆိုတယ် – “ အခါ​ခပ်သိမ်း ဖြောင့်မှန်ရာကို​သာ ပြုကျင့်​ကာ အမှား​ကို လုံးဝ မပြု​တတ်​သူ​ဟူ၍ ကမ္ဘာမြေကြီး​ပေါ်တွင် တစ်ဦးတစ်ယောက်မျှ မရှိ ။” ( ဒေသနာ ၇:၂၀၊ ခေတ်သုံး​မြန်မာ သမ္မာကျမ်း ) ။"],
	"sound":"","note":"The Bible says: “There is no one on earth who does what is right all the time and never makes a mistake.” (Ecclesiastes 7:20, Good News Translation)"},
	{"line":["လူသား​တစ်ယောက် ဖြစ်လို့ ချွတ်ယွင်းချက် ရှိတာ၊ အမှား​လုပ်မိတာ ဖြစ်တယ် ။"],
	"sound":"","note":"The fact that you have faults and make mistakes shows that you are human"},
	{"line":["သုံး​စား​မရတဲ့​သူ ဖြစ်လို့ မဟုတ်ဘူး ။"],
	"sound":"","note":", not that you are a failure."}
],"sound":"","note":""},

{"par":[
	{"line":["အရှိအတိုင်း ရှုမြင်​နိုင်ပုံ ။"],
	"sound":"","note":"How to be realistic:"},
	{"line":["အမှားတွေ​ကနေ သင်ယူပါ ။"],
	"sound":"","note":"Work on your faults,"},
	{"line":["အမှား​ကင်း​သူ ဖြစ်​ရမယ်လို့ မမျှော်လင့်ပါနဲ့ ။"],
	"sound":"","note":"but don’t expect perfection from yourself."},
	{"line":["“ အမှားတွေကို တနုံ့နုံ့တွေး​ပြီး စိတ်ပျက်လက်ပျက် ဖြစ်​မနေချင်​ဘူး ။"],
	"sound":"","note":"“I resist the urge to dwell on my faults,” says a young man named Caleb."},
	{"line":["ဒါမျိုး နောက်ထပ် မဖြစ်အောင် အမှားတွေ​ကနေ သင်ယူဖို့ ကြိုးစားတယ် ” လို့ လူငယ် ကာလက် ပြောတယ် ။"],
	"sound":"","note":"“Instead, I try to learn from them so that I can see ways to improve.”"}
],"sound":"","note":""}
]
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var view_yourself_4 = [{"sound":"","title":["မနှိုင်းယှဉ်ပါနဲ့ ။"],"note":"Avoid comparisons."},{"par":[{"line":["ကျမ်းစာက ဒီလို​ဆိုတယ် – “ အတ္တဆန်​တာ၊ အချင်းချင်း ပြိုင်ဆိုင်​တာ၊ မနာလို​မ​ရှု​ဆိတ် ဖြစ်တာ​တွေကို ရှောင်​ကြစို့ ။” ( ဂလာတိ ၅:၂၆  )  ။"],"sound":"","note":"The Bible says: “Let us not become egotistical, stirring up competition with one another, envying one another.” (Galatians 5:26)"},{"line":["လူမှု​မီဒီယာ​မှာ တင်ထားတဲ့ ဓာတ်ပုံတွေကို ကြည့်ပြီး ငါ့ကို​တော့ မဖိတ်​ဘူးဆိုပြီး စိတ်​နာကြည်း​ပါသလား ။"],"sound":"","note":"Looking at social media photos of all those events that you weren’t invited to can make you feel bitter."},{"line":["ဒါဆိုရင် အချစ်ဆုံး သူငယ်ချင်းတွေ​ကို အမုန်း​ဆုံး ရန်သူတွေ​အဖြစ် မြင်​မိ​သွားနိုင်တယ် ။"],"sound":"","note":"It can make your best friends seem like your worst enemies."}],"sound":"","note":""},{"par":[{"line":["အရှိအတိုင်း ရှုမြင်​နိုင်ပုံ ။"],"sound":"","note":"How to be realistic:"},{"line":["မိတ်ဆုံပွဲ လုပ်တဲ့​အခါ ယောက်​တိုင်း​ကို ဖိတ်နိုင်​မှာ မဟုတ်ဘူးဆိုတာ လက်ခံပါ ။"],"sound":"","note":"Accept the fact that you won’t be invited to every social event."},{"line":["လူမှု​မီဒီယာ​မှာ တင်ထားတဲ့ ပုံ​တွေ​ကနေ တစ်ခုလုံးကို ခြုံငုံ​မသိ​နိုင်ဘူး ။"],"sound":"","note":"Besides, social media posts don’t tell the whole story."},{"line":["“ ဘဝရဲ့ အပျော်ဆုံး​အချိန် ပုံတွေကို​ပဲ လူမှု​မီဒီယာ​မှာ တင်​တတ်ကြတယ် ။"],"sound":"","note":"“Social media is mostly a highlight reel of people’s lives,” says a teenager named Alexis."},{"line":["နေ့တိုင်း လုပ်နေကျ ပျော်စရာ​မကောင်းတာတွေကို​တော့ မတင်​ကြဘူး ” လို့ ဆယ်ကျော်သက် အ​လက်​ဆီ ပြောတယ် ။"],"sound":"","note":"“People usually leave out the ordinary parts.”"}],"sound":"","note":""}]
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var view_yourself_5 = [{"sound":"","title":["အထူးသဖြင့် မိသားစုမှာ သင့်မြတ်​စွာ နေဖို့ ကြိုးစားပါ ။"],"note":"Be a peacemaker—especially in your family."},{"par":[{"line":["ကျမ်းစာက ဒီလို​ဆိုတယ်  – “ ဖြစ်နိုင်မယ်​ဆိုရင် လူအားလုံးနဲ့ သင့်မြတ်​အောင် အတတ်နိုင်ဆုံး ကြိုးစားပါ ။” ( ရောမ ၁၂:၁၈ ) ။"],"sound":"","note":"The Bible says: “If possible, as far as it depends on you, be peaceable.” (Romans 12:18)"},{"line":["တခြား​သူတွေရဲ့ လုပ်ရပ်တွေကို ထိန်းချုပ်​နိုင်မှာ မဟုတ်ပေမဲ့ ကိုယ့်​တုံ့ပြန်ပုံကို​တော့ ထိန်းချုပ်​နိုင်ပါတယ် ။"],"sound":"","note":"You can’t fully control the actions of others, but you can control your reaction."},{"line":["သင့်မြတ်​စွာ နေဖို့ ရွေးချယ်​နိုင်တယ် ။"],"sound":"","note":"You can choose to be peaceable."}],"sound":"","note":""},{"par":[{"line":["အရှိအတိုင်း ရှုမြင်​နိုင်ပုံ ။"],"sound":"","note":"How to be realistic:"},{"line":["မိသားစု၊ မိတ်ဆွေ​တွေ​ကြားမှာ ပြဿနာ ပို​တင်းမာ​သွား​စေမယ့်​အစား သင့်မြတ်​အောင် လုပ်ဆောင်ဖို့ ကြိုးစားပါ ။"],"sound":"","note":"Be resolved not to add to family tension but to be peaceable,"},{"line":["“ အပြစ်ကင်း​တဲ့​သူ​ဆိုလို့ ဘယ်သူမှ မရှိဘူး ။"],"sound":"","note":"just as you should be in any relationship."},{"line":["တစ်ကြိမ်​မဟုတ် တစ်ကြိမ်​တော့ သူတစ်ပါး​ခြေထောက်ကို နင်း​မိ​တတ်ကြ​တာ​ပဲ ။"],"sound":"","note":"“No one is perfect, and we are all going to step on each other’s toes now and then,” says a teenager named Melinda."},{"line":["သင့်တင့်​အောင် နေ​မလား၊ မနေဘူးလား​ဆိုတာ ကိုယ်တိုင် ဆုံးဖြတ်​ရမယ် ” လို့ ဆယ်ကျော်သက် မီ​လင်​ဒါ ပြောတယ် ။"],"sound":"","note":""}],"sound":"","note":"“We just have to decide how we are going to respond—peaceably or otherwise.”"}]

// [
// 	{sound:"",
// 	 title:[ 
// 		{sound:"", wd:'အထူးသဖြင့်', group:"", note:""},
// 		{sound:"", wd:'မိသားစုမှာ', group:"", note:""},
// 		{sound:"", wd:'သင့်မြတ်​စွာ', group:"", note:""},
// 		{sound:"", wd:'နေဖို့', group:"", note:""},
// 		{sound:"", wd:'ကြိုးစားပါ', group:"", note:""},
// 		{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 	 ], sound:"", note:"Be a peacemaker—especially in your family." 
// 	},
    
 
// { par:[	
// 	{ line:[
// 			{sound:"", wd:'ကျမ်းစာက', group:"", note:"" }, 
// 			{sound:"", wd:'ဒီလို​ဆိုတယ်', group:"", note:"" }, 
// 			{sound:"", wd:' – “', group:"", note:"" }, 
// 			{sound:"", wd:'ဖြစ်နိုင်မယ်​ဆိုရင်', group:"", note:"" },
// 			{sound:"", wd:'လူအားလုံးနဲ့', group:"", note:"" },
// 			{sound:"", wd:'သင့်မြတ်​အောင်', group:"", note:"" },
// 			{sound:"", wd:'အတတ်နိုင်ဆုံး', group:"", note:"" },
// 			{sound:"", wd:'ကြိုးစားပါ', group:"", note:"" },
// 			{sound:"", wd:'။” (', group:"", note:"" },
// 			{sound:"", wd:'ရောမ', group:"", note:"" },
// 			{sound:"", wd:'၁၂:၁၈', group:"", note:"" },
// 			{sound:"", wd:')', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:"The Bible says: “If possible, as far as it depends on you, be peaceable.” (Romans 12:18)"
// 	},
// 	{ line:[
// 			{sound:"", wd:'တခြား​သူတွေရဲ့', group:"", note:"" }, 
// 			{sound:"", wd:'လုပ်ရပ်တွေကို', group:"", note:"" }, 
// 			{sound:"", wd:'ထိန်းချုပ်​နိုင်မှာ', group:"", note:"" }, 
// 			{sound:"", wd:'မဟုတ်ပေမဲ့', group:"", note:"" },
// 			{sound:"", wd:'ကိုယ့်​တုံ့ပြန်ပုံကို​တော့', group:"", note:"" },
// 			{sound:"", wd:'ထိန်းချုပ်​နိုင်ပါတယ်', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:"You can’t fully control the actions of others, but you can control your reaction."
// 	},
// 	{ line:[
// 			{sound:"", wd:'သင့်မြတ်​စွာ', group:"", note:"" }, 
// 			{sound:"", wd:'နေဖို့', group:"", note:"" }, 
// 			{sound:"", wd:'ရွေးချယ်​နိုင်တယ်', group:"", note:"" }, 
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:"You can choose to be peaceable."
// 	},
// 	], sound:"", note:""
// },

 

// { par:[	
// 	{ line:[
// 			{sound:"", wd:'အရှိအတိုင်း', group:"", note:"" }, 
// 			{sound:"", wd:'ရှုမြင်​နိုင်ပုံ', group:"", note:"" }, 
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:"How to be realistic:"
// 	},
       
// 	{ line:[
// 			{sound:"", wd:'မိသားစု၊', group:"", note:"" }, 
// 			{sound:"", wd:'မိတ်ဆွေ​တွေ​ကြားမှာ', group:"", note:"" },
// 			{sound:"", wd:'ပြဿနာ', group:"", note:"" }, 
// 			{sound:"", wd:'ပို​တင်းမာ​သွား​စေမယ့်​အစား', group:"", note:"" }, 
// 			{sound:"", wd:'သင့်မြတ်​အောင်', group:"", note:"" }, 
// 			{sound:"", wd:'လုပ်ဆောင်ဖို့', group:"", note:"" },
// 			{sound:"", wd:'ကြိုးစားပါ', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:"Be resolved not to add to family tension but to be peaceable,"
// 	},
// 	{ line:[
// 			{sound:"", wd:'“', group:"", note:"" }, 
// 			{sound:"", wd:'အပြစ်ကင်း​တဲ့​သူ​ဆိုလို့', group:"", note:"" }, 
// 			{sound:"", wd:'ဘယ်သူမှ', group:"", note:"" }, 
// 			{sound:"", wd:'မရှိဘူး', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:"just as you should be in any relationship."
// 	},
   
 
// 	{ line:[
// 			{sound:"", wd:'တစ်ကြိမ်​မဟုတ်', group:"", note:"" }, 
// 			{sound:"", wd:'တစ်ကြိမ်​တော့', group:"", note:"" }, 
// 			{sound:"", wd:'သူတစ်ပါး​ခြေထောက်ကို', group:"", note:"" }, 
// 			{sound:"", wd:'နင်း​မိ​တတ်ကြ​တာ​ပဲ', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:"“No one is perfect, and we are all going to step on each other’s toes now and then,” says a teenager named Melinda."
// 	},
// 	{ line:[
// 			{sound:"", wd:'သင့်တင့်​အောင်', group:"", note:"" }, 
// 			{sound:"", wd:'နေ​မလား၊', group:"", note:"" }, 
// 			{sound:"", wd:'မနေဘူးလား​ဆိုတာ', group:"", note:"" }, 
// 			{sound:"", wd:'ကိုယ်တိုင်', group:"", note:"" },
// 			{sound:"", wd:'ဆုံးဖြတ်​ရမယ်', group:"", note:"" },
// 			{sound:"", wd:'”', group:"", note:"" },
// 			{sound:"", wd:'လို့', group:"", note:"" },
// 			{sound:"", wd:'ဆယ်ကျော်သက်', group:"", note:"" },
// 			{sound:"", wd:'မီ​လင်​ဒါ', group:"", note:"" },
// 			{sound:"", wd:'ပြောတယ်', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:""
// 	},
// 	], sound:"", note:"“We just have to decide how we are going to respond—peaceably or otherwise.”"
// },
// ]  //END
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var view_yourself_6 = []  //END
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var view_yourself_7 = []  //END
















////////////////////////////////////////////////////////////////////////////////////////
// prayer = `We will pray  ဆုတောင်းမယ်
// Heavenly father Jehovah God  ကောင်းကင်အဖယေဟောဝါဘုရားသခင်
// Thank you for rice. 
// ဆန်အတွက်ကျေးဇူးတင်ပါတယ်
// ထမင’( အတ7က’ eက8(ဇ:(တင’ပ1တယ’ 
// Through Jesus’ name ယေရှု နာမ မှနစ်ဆင့်
// `
///////////////////////////////////////////////////////////////////////////////////////
