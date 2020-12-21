selectedText = ''
function showReading(text){
	selectedText = text
	$('message').innerHTML = ''
	playlist = {} // Clean out!
    addAudio("tic", "ogg");
    addAudio("bloop", "ogg");

	$('text').innerHTML = '';
	for (var i = 0; i < text.length; i++) {
		let node = text[i];
		if('title' in node){
			addAudio(node.sound, "mp3");
			$('text').innerHTML += `<div class="title" id="${i}">${makeWord(node['title'])}</div>`
		} else if('par' in node){
			addAudio(node.sound, "mp3");
			$('text').innerHTML += `<div class="par" id="${i}">${makeSentence(node['par'])}</div>`
		} 
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// '။'
function makeSentence(sentences){        var str = ''
	for (var j = 0; j < sentences.length; j++){
		addAudio(sentences.sound, "mp3");
		str += `<span class="line" id="${j}">${makeWord(sentences[j].line)}</span>`;
	}
	return str
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// '။'
function makeWord(words){           var str = ''

	for (var j = 0; j < words.length; j++){		
		addAudio(words[j].sound, "mp3");
		var word = segment(words[j].wd)
		var wd = ''
		for (var i = 0; i < word.length; i++){
			wd += `<span class="lt" id="${i}">${word[i]}</span>`;
		}
		str += `<span class="wd" id="${j}">${wd}</span>`;
	}
	return str
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
var reading = [
	{
	 title:[ 
		{sound:"problems", wd:'ပြဿနာတွေ', group:"", note:"Problems"},
		{sound:"howtodiscuss", wd:'ဆွေးနွေးနိုင်ပုံ', group:"", note:"How to discuss"}
	 ], sound:"", 
	 note:"Problems can be discussed" 
	},

	{
	 par:[
		{
		line:[
			{sound:"WithYou", wd:'သင်နဲ့', group:"", note:"With you (written form)<br> မင်းနဲ့အတူ (Google)" },
			{sound:"Yourspouse", wd:'သင့်အိမ်ထောင်ဖက်ဟာ', group:"", note:"Your spouse<br>သင့်အိ = your<br>မ်ထောင်ဖက်ဟာ = spouse" },
			{sound:"Aproblem", wd:'ပြဿနာတစ်ခုကို', group:"", note:"A problem<br>ပြဿနာ = the problem<br>တစ်ခုကို = one" },
			{sound:"Duringthediscussion", wd:'ဆွေးနွေးတဲ့အခါ', group:"", note:"During the discussion" },
			{sound:"morethanwhenIstartedtalking", wd:'စပြောချိန်မှာထက်', group:"", note:"More than when I started talking" }, 
			{sound:"Whenfinished", wd:'ပြီးသွားချိန်မှာ', group:"", note:"When finished" }, 
			{sound:"Itgotworse", wd:'ပိုဆိုးသွားတယ်လို့', group:"", note:"It got worse" }, 
			{sound:"Doyoufeel", wd:'ခံစားရသလား', group:"", note:"Do you feel?" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }

		], sound:"", note:"Do you and your mate feel that things are getting worse when you start talking about a problem?"}, // , '။' 

		{ 
		line:[
			{sound:"Evenso", wd:'အဲဒီလိုဖြစ်ရင်တောင်', group:"", note:"Even so" }, 
			{sound:"Situation", wd:'အခြေအနေကို', group:"", note:"Situation" }, 
			{sound:"Improve", wd:'တိုးတက်အောင်', group:"", note:"Improve" }, 
			{sound:"Youcandoit", wd:'လုပ်နိုင်ပါတယ်', group:"", note:"You can do it" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Even so, these conditions can improve."}, 

		{
		line:[
			{sound:"Firstofall", wd:'အရင်ဆုံး', group:"", note:"First of all" }, 
			{sound:"Withmen", wd:'အမျိုးသားတွေနဲ့', group:"", note:"With men" }, 
			{sound:"Ofwomen", wd:'အမျိုးသမီးတွေရဲ့', group:"", note:"Of women" }, 
			{sound:"Thedefferences", wd:'မတူညီမှုလေးတွေကို', group:"", note:"The differences" }, 
			{sound:"Youshouldknow", wd:'သိထားသင့်တယ်', group:"", note:"You should know" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"First of all, you should know the differences between men and women."}

	], sound:"", 
	note:"Do you and your mate feel that things are getting worse when you start talking about a problem? Even so, the situation can improve. First of all, you should know the differences between men and women."}
]
//////////////////////////////////////////////////////////////////////////
// https://www.jw.org/en/bible-teachings/teenagers/ask/negative-thinking/
//////////////////////////////////////////////////////////////////////////
var view_yourself_1 = [
	{ title:[ 
		{sound:"", wd:'ကိုယ့်ကိုယ်ကိုယ်', group:"", note:"Myself"},
		{sound:"", wd:'ဘယ်လို', group:"", note:"How____?"},
		{sound:"", wd:'ရှုမြင်​သလဲ', group:"", note:"Do you see?"}
	 ], sound:"", note:"How do you view yourself?" },




	{ title:[ 
		{sound:"", wd:'အကောင်းမြင်​သ​မား', group:"", note:"Optimist"}
	 ], sound:"", note:"Optimist" },	

{ par:[

	{ line:[
			{sound:"", wd:'“', group:"", note:"Punctuation" }, 
			{sound:"", wd:'ခပ်ပျော်ပျော်​ပဲ', group:"", note:"It's fun" }, 
			{sound:"", wd:'နေတယ်', group:"", note:"I live" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"I'm just having fun" }, 

	{ line:[ 
			{sound:"", wd:'အပူအပင်', group:"", note:"Tropical plants <--I suspect this is a translation error!" }, 
			{sound:"", wd:'သိပ်​မထားဘူး', group:"", note:"Not much" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Not too hot --obviously not well translated--" }, 

	{ line:[
			{sound:"", wd:'နေ့တိုင်း', group:"", note:"every day" }, 
			{sound:"", wd:'အပြုံး​မျက်နှာ​နဲ့', group:"", note:"With a smile on his face" }, 
			{sound:"", wd:'နေနိုင်အောင်', group:"", note:"To be able to live" },
			{sound:"", wd:'ကြိုးစားတယ်', group:"", note:"I try" }, 
			{sound:"", wd:'။”—', group:"", note:"Punctuation" }, 
			{sound:"", wd:'ဗယ်​လ​ရီ', group:"", note:"Valerie" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"I try to live with a smile on my face every day —Valerie." } 

	], sound:"", note:"“I try to be as happy and easygoing as possible. Why shouldn’t I live each day with a smile on my face?”—Valerie."
},
 		


	{ title:[ 
		{sound:"", wd:'အဆိုးမြင်​သ​မား', group:"", note:"Pessimist"}
	 ],  sound:"", note:"Pessimist" 
	},

{ par:[	
	{ line:[
			{sound:"", wd:'“', group:"", note:"Punctuation" }, 
			{sound:"", wd:'ကောင်းတာတွေ', group:"", note:"Good things" }, 
			{sound:"", wd:'ဖြစ်လာတဲ့​အခါတိုင်း', group:"", note:"Whenever it happens" }, 
			{sound:"", wd:'မဖြစ်နိုင်ဘူး၊', group:"", note:"It is not possible." }, 
			{sound:"", wd:'လွဲ​နေတာ​များလား​လို့', group:"", note:"Is it often wrong?" }, 
			{sound:"", wd:'ချက်ချင်း', group:"", note:"Immediately" }, 
			{sound:"", wd:'အတွေး​ဝင်တယ်', group:"", note:"I think" }, 
			{sound:"", wd:'။”—', group:"", note:"Punctuation" }, 
			{sound:"", wd:'ရေဗက္ကာ', group:"", note:"Rebecca" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Every time something good happens, I immediately think, 'Is it impossible or is it wrong?' - Rebekah"
	} ], sound:"", note:"“My first reaction to anything positive is to think something is amiss—too good to be true or a mistake.”—Rebecca."
},




	{ title:[ 
		{sound:"", wd:'လက်တွေ့​သ​မား', group:"", note:"Realist"}
	 ], sound:"", note:"Realist" 
	},

{ par:[	

	{ line:[
			{sound:"", wd:'“', group:"", note:"Punctuation" }, 
			{sound:"", wd:'အကောင်းမြင်​သ​မား​က', group:"", note:"The optimist" }, 
			{sound:"", wd:'စိတ်ပျက်​ရ​တတ်တယ်', group:"", note:"I get frustrated" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"An optimist is often disappointed"
	},

	{ line:[
			{sound:"", wd:'အဆိုးမြင်​သ​မား​ရဲ့', group:"", note:"Of the pessimist" }, 
			{sound:"", wd:'ဘဝက​တော့', group:"", note:"Life is" }, 
			{sound:"", wd:'စိတ်​ချမ်းမြေ့​စ​ရာ', group:"", note:"What a joy!" }, 
			{sound:"", wd:'ကောင်းမှာ', group:"", note:"Good" }, 
			{sound:"", wd:'မဟုတ်ဘူး', group:"", note:"No." },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"The life of a pessimist is not a happy one"
	},
	{ line:[
			{sound:"", wd:'လက်တွေ့​သ​မား​ကတော့', group:"", note:"The practitioner is" }, 
			{sound:"", wd:'ကိစ္စရပ်​တွေကို', group:"", note:"Issues" },
			{sound:"", wd:'အရှိအတိုင်း', group:"", note:"As it is" },
			{sound:"", wd:'မြင်​စေတယ်', group:"", note:"Makes it visible" },
			{sound:"", wd:'။”—', group:"", note:"Punctuation" },
			{sound:"", wd:'အန်​နာ', group:"", note:"Anna" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"The pragmatist makes things look real"
	} ], sound:"", note:"“Being optimistic is a setup for disappointment, and being pessimistic is a miserable way to live. Being realistic helps me to see things as they really are.”—Anna."
}

]  //END

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var view_yourself_2 = [
	{sound:"",
	 title:[ 
		{sound:"", wd:'', group:"ဘာကြောင့်", note:""},
		{sound:"", wd:'', group:"အရေးကြီး​သလဲ", note:""}
	 ], sound:"", note:"Why does it matter?" 
	},

{ par:[	
	{ line:[
			{sound:"", wd:'“', group:"", note:"" }, 
			{sound:"", wd:'စိတ်ရွှင်လန်း​သူတွေ​အတွက်တော့', group:"", note:"" }, 
			{sound:"", wd:'အချိန်တိုင်း​ဟာ', group:"", note:"" }, 
			{sound:"", wd:'စားသောက်ပွဲ', group:"", note:"" },
			{sound:"", wd:'ဖြစ်နေတယ်', group:"", note:"" },
			{sound:"", wd:'”', group:"", note:"" },
			{sound:"", wd:'လို့', group:"", note:"" },
			{sound:"", wd:'ကျမ်းစာ', group:"", note:"" },
			{sound:"", wd:'ဆိုတယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" },
			{sound:"", wd:"(ပညာအလိမ္မာ ၁၅:၁၅)", group:"", note:"(Proverbs 15:15)" }
		], sound:"", note:"The Bible says that “the one with a cheerful heart has a continual feast.”"
	}, 
	{ line:[
			{sound:"", wd:'မလိုလား​အပ်​တဲ့', group:"", note:"" }, 
			{sound:"", wd:'အပျက်သဘော', group:"", note:"" }, 
			{sound:"", wd:'အတွေး​တွေကို', group:"", note:"" }, 
			{sound:"", wd:'ဖျောက်​ပြီး', group:"", note:"" }, 
			{sound:"", wd:'အပြုသဘော', group:"", note:"" }, 
			{sound:"", wd:'ရှိအောင်', group:"", note:"" }, 
			{sound:"", wd:'ကြိုးစား​သူတွေဟာ', group:"", note:"" }, 
			{sound:"", wd:'ပို​ပျော်ရွှင်​ကြပါတယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Clearly, people who avoid unnecessary negative thoughts and approach life with a positive outlook tend to be happier."
	},
	{ line:[
			{sound:"", wd:'သူတို့မှာ', group:"", note:"" }, 
			{sound:"", wd:'မိတ်ဆွေ​သူငယ်ချင်း', group:"", note:"" }, 
			{sound:"", wd:'ပို​များ​တတ်တယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"They are also likely to make more friends."
	},
	{ line:[
			{sound:"", wd:'တစ်ချိန်လုံး', group:"", note:"" }, 
			{sound:"", wd:'အပျက်သဘော', group:"", note:"" }, 
			{sound:"", wd:'တင်ပြ​နေတဲ့​သူ', group:"", note:"" }, 
			{sound:"", wd:'အနားမှာ', group:"", note:"" }, 
			{sound:"", wd:'ဘယ်သူ', group:"", note:"" }, 
			{sound:"", wd:'နေချင်​မလဲ', group:"", note:"" }, 
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"After all, who wants to spend time with people who are always gloomy?"
	}], sound:"", note:"The Bible says that “the one with a cheerful heart has a continual feast.” (Proverbs 15:15) Clearly, people who avoid unnecessary negative thoughts and approach life with a positive outlook tend to be happier. They are also likely to make more friends. After all, who wants to spend time with people who are always gloomy?"
},



{ par:[	
	{ line:[
			{sound:"", wd:'အပြုသဘောထား​ရှိ​သူတွေတောင်', group:"", note:"" }, 
			{sound:"", wd:'ဘဝမှာ', group:"", note:"" }, 
			{sound:"", wd:'အခက်အခဲ​တွေ', group:"", note:"" }, 
			{sound:"", wd:'ကြုံရ​တတ်တယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Still, there are realities of life that even the brightest optimist must face."
	}, 
	{ line:[
			{sound:"", wd:'ဥပမာ', group:"", note:"For example" }, 
			{sound:"", wd:'–', group:"", note:"Punctuation" }
		], sound:"", note:""
	}], 
sound:"", note:""
},

{ par:[	
	{ line:[
			{sound:"", wd:'•    ', group:"", note:"Bullet" },
			{sound:"", wd:'စစ်၊', group:"", note:"" }, 
			{sound:"", wd:'အကြမ်းဖက်မှု၊', group:"", note:"" }, 
			{sound:"", wd:'ရာဇဝတ်မှု', group:"", note:"" }, 
			{sound:"", wd:'သတင်းတွေကို', group:"", note:"" }, 
			{sound:"", wd:'အမြဲ', group:"", note:"" }, 
			{sound:"", wd:'ကြားနေ​ရနိုင်တယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"The news may bombard you with reports of war, terrorism, or crime."
	},    
	{ line:[
			{sound:"", wd:'•    ', group:"", note:"Bullet" },
			{sound:"", wd:'မိသားစု​အတွင်းမှာ', group:"", note:"" }, 
			{sound:"", wd:'ပြဿနာ​တွေ', group:"", note:"" }, 
			{sound:"", wd:'ရှိ​နိုင်တယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"You might have to deal with problems in your family."
	}, 

	{ line:[
			{sound:"", wd:'•    ', group:"", note:"Bullet" },
			{sound:"", wd:'ကိုယ်တိုင်ရဲ့', group:"", note:"" }, 
			{sound:"", wd:'ချွတ်ယွင်းချက်၊', group:"", note:"" }, 
			{sound:"", wd:'အားနည်းချက်တွေကို', group:"", note:"" }, 
			{sound:"", wd:'တစ်ချိန်လုံး', group:"", note:"" },
			{sound:"", wd:'တိုက်လှန်​နေရ​နိုင်တယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"You no doubt have your own failings and weaknesses to contend with."
	},    
	{ line:[
			{sound:"", wd:'•    ', group:"", note:"Bullet" }, 
			{sound:"", wd:'သူငယ်ချင်း​ရဲ့', group:"", note:"" }, 
			{sound:"", wd:'အပြောအဆို၊', group:"", note:"" }, 
			{sound:"", wd:'အပြုအမူကြောင့်', group:"", note:"" }, 
			{sound:"", wd:'စိတ်မကောင်း', group:"", note:"" }, 
			{sound:"", wd:'ဖြစ်နိုင်တယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"A friend may have hurt your feelings."
	}], 	
sound:"", note:""
},



{ par:[	
	{ line:[
			{sound:"", wd:'ဒီ​အဖြစ်မှန်​တွေကို', group:"", note:"" }, 
			{sound:"", wd:'မမြင်​အောင်', group:"", note:"" }, 
			{sound:"", wd:'မျက်စိ​စုံ​မှိတ်​ထားလို့', group:"", note:"" }, 
			{sound:"", wd:'မရနိုင်​သလို', group:"", note:"" }, 
			{sound:"", wd:'အဲဒီ​အကြောင်းကိုပဲ', group:"", note:"" }, 
			{sound:"", wd:'တနုံ့နုံ့တွေး​နေလို့လည်း', group:"", note:"" }, 
			{sound:"", wd:'မဖြစ်​ဘူး', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Rather than close your eyes to those realities—or fixate on them so that you feel miserable."
	}, 
	{ line:[
			{sound:"", wd:'မျှမျှတတ', group:"", note:"" }, 
			{sound:"", wd:'ရှုမြင်ဖို့', group:"", note:"" }, 
			{sound:"", wd:'ကြိုးစားပါ', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Try to be ballanced."
	},   
	{ line:[
			{sound:"", wd:'အရှိအတိုင်း', group:"", note:"" }, 
			{sound:"", wd:'ရှုမြင်​တာ​က', group:"", note:"" }, 
			{sound:"", wd:'အလွန်အမင်း', group:"", note:"" }, 
			{sound:"", wd:'အပျက်သဘောထား', group:"", note:"" }, 
			{sound:"", wd:'မဝင်​စေ​သလို', group:"", note:"" }, 
			{sound:"", wd:'အလွန်အမင်း', group:"", note:"" }, 
			{sound:"", wd:'စိတ်ဓာတ်ကျ​ခြင်း', group:"", note:"" }, 
			{sound:"", wd:'မရှိဘဲ', group:"", note:"" }, 
			{sound:"", wd:'ဘဝ​အခြေအနေကို', group:"", note:"" }, 
			{sound:"", wd:'လက်ခံ​နိုင်​ပါလိမ့်မယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"A realistic approach will help you to avoid undue negative thoughts and accept life’s realities without being crushed by them."
	}], 	
sound:"", note:""
},

         
 

]  //END
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
view_yourself_3 = [
	{sound:"",
	 title:[ 
		{sound:"", wd:'ကိုယ့်​အမှားတွေကို', group:"", note:""},
		{sound:"", wd:'အရှိအတိုင်း', group:"", note:""},
		{sound:"", wd:'လက်ခံပါ', group:"", note:""},
		{sound:"", wd:'။', group:"", note:"Period/full stop" }
	 ], sound:"", note:"Keep your faults in perspective." 
	},

            
{ par:[	
	{ line:[
			{sound:"", wd:'ကျမ်းစာက', group:"", note:"" }, 
			{sound:"", wd:'ဒီလို​ဆိုတယ်', group:"", note:"" }, 
			{sound:"", wd:'–', group:"", note:"Punctuation" }, 
			{sound:"", wd:'“', group:"", note:"" },			
			{sound:"", wd:'အခါ​ခပ်သိမ်း', group:"", note:"" }, 
			{sound:"", wd:'ဖြောင့်မှန်ရာကို​သာ', group:"", note:"" }, 
			{sound:"", wd:'ပြုကျင့်​ကာ', group:"", note:"" }, 
			{sound:"", wd:'အမှား​ကို', group:"", note:"" },			
			{sound:"", wd:'လုံးဝ', group:"", note:"" }, 
			{sound:"", wd:'မပြု​တတ်​သူ​ဟူ၍', group:"", note:"" }, 
			{sound:"", wd:'ကမ္ဘာမြေကြီး​ပေါ်တွင်', group:"", note:"" }, 
			{sound:"", wd:'တစ်ဦးတစ်ယောက်မျှ', group:"", note:"" },
			{sound:"", wd:'မရှိ', group:"", note:"" },
			{sound:"", wd:'။” (', group:"", note:"" },
			{sound:"", wd:'ဒေသနာ', group:"", note:"" },
			{sound:"", wd:'၇:၂၀၊', group:"", note:"" },
			{sound:"", wd:'ခေတ်သုံး​မြန်မာ', group:"", note:"" },
			{sound:"", wd:'သမ္မာကျမ်း', group:"", note:"" },
			{sound:"", wd:')', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"The Bible says: “There is no one on earth who does what is right all the time and never makes a mistake.” (Ecclesiastes 7:20, Good News Translation)"
	},
	{ line:[
			{sound:"", wd:'လူသား​တစ်ယောက်', group:"", note:"" }, 
			{sound:"", wd:'ဖြစ်လို့', group:"", note:"" }, 
			{sound:"", wd:'ချွတ်ယွင်းချက်', group:"", note:"" }, 
			{sound:"", wd:'ရှိတာ၊', group:"", note:"" },
			{sound:"", wd:'အမှား​လုပ်မိတာ', group:"", note:"" },
			{sound:"", wd:'ဖြစ်တယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"The fact that you have faults and make mistakes shows that you are human"
	},
		{ line:[
			{sound:"", wd:'သုံး​စား​မရတဲ့​သူ', group:"", note:"" }, 
			{sound:"", wd:'ဖြစ်လို့', group:"", note:"" }, 
			{sound:"", wd:'မဟုတ်ဘူး', group:"", note:"" }, 
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:", not that you are a failure."
	},
	], sound:"", note:""
},

  
 
  
{ par:[	
	{ line:[
			{sound:"", wd:'အရှိအတိုင်း', group:"", note:"" }, 
			{sound:"", wd:'ရှုမြင်​နိုင်ပုံ', group:"", note:"" }, 
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"How to be realistic:"
	},	
	{ line:[
			{sound:"", wd:'အမှားတွေ​ကနေ', group:"", note:"" }, 
			{sound:"", wd:'သင်ယူပါ', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Work on your faults,"
	},	
	{ line:[
			{sound:"", wd:'အမှား​ကင်း​သူ', group:"", note:"" }, 
			{sound:"", wd:'ဖြစ်​ရမယ်လို့', group:"", note:"" }, 
			{sound:"", wd:'မမျှော်လင့်ပါနဲ့', group:"", note:"" }, 
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"but don’t expect perfection from yourself."
	},	
    
          

	{ line:[
			{sound:"", wd:'“', group:"", note:"" },
			{sound:"", wd:'အမှားတွေကို', group:"", note:"" }, 
			{sound:"", wd:'တနုံ့နုံ့တွေး​ပြီး', group:"", note:"" }, 
			{sound:"", wd:'စိတ်ပျက်လက်ပျက်', group:"", note:"" }, 
			{sound:"", wd:'ဖြစ်​မနေချင်​ဘူး', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"“I resist the urge to dwell on my faults,” says a young man named Caleb."
	},	
	{ line:[
			{sound:"", wd:'ဒါမျိုး', group:"", note:"" }, 
			{sound:"", wd:'နောက်ထပ်', group:"", note:"" }, 
			{sound:"", wd:'မဖြစ်အောင်', group:"", note:"" }, 
			{sound:"", wd:'အမှားတွေ​ကနေ', group:"", note:"" },
			{sound:"", wd:'သင်ယူဖို့', group:"", note:"" }, 
			{sound:"", wd:'ကြိုးစားတယ်', group:"", note:"" }, 
			{sound:"", wd:'”', group:"", note:"" }, 
			{sound:"", wd:'လို့', group:"", note:"" },
			{sound:"", wd:'လူငယ်', group:"", note:"" },
			{sound:"", wd:'ကာလက်', group:"", note:"" },
			{sound:"", wd:'ပြောတယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"“Instead, I try to learn from them so that I can see ways to improve.”"
	},
	],sound:"", note:""
},
]  //END
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var view_yourself_4 = [
	{sound:"",
	 title:[ 
		{sound:"", wd:'', group:"မနှိုင်းယှဉ်ပါနဲ့", note:"Avoid comparisons."},
		{sound:"", wd:'။', group:"", note:"Period/full stop" }
	 ], sound:"", note:"Avoid comparisons." 
	},

           
 
 
{ par:[	
	{ line:[
			{sound:"", wd:'ကျမ်းစာက', group:"", note:""},
			{sound:"", wd:'ဒီလို​ဆိုတယ်', group:"", note:""},
			{sound:"", wd:'– “', group:"", note:"" }, 
			{sound:"", wd:'အတ္တဆန်​တာ၊', group:"", note:"" }, 
			{sound:"", wd:'အချင်းချင်း', group:"", note:"" }, 
			{sound:"", wd:'ပြိုင်ဆိုင်​တာ၊', group:"", note:"" },
			{sound:"", wd:'မနာလို​မ​ရှု​ဆိတ်', group:"", note:"" },
			{sound:"", wd:'ဖြစ်တာ​တွေကို', group:"", note:"" },
			{sound:"", wd:'ရှောင်​ကြစို့', group:"", note:"" },
			{sound:"", wd:'။” (', group:"", note:"" },
			{sound:"", wd:'ဂလာတိ', group:"", note:"" },
			{sound:"", wd:'၅:၂၆', group:"", note:"" },
			{sound:"", wd:' ) ', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"The Bible says: “Let us not become egotistical, stirring up competition with one another, envying one another.” (Galatians 5:26)"
	},	
      
	{ line:[
			{sound:"", wd:'လူမှု​မီဒီယာ​မှာ', group:"", note:""},
			{sound:"", wd:'တင်ထားတဲ့', group:"", note:""},
			{sound:"", wd:'ဓာတ်ပုံတွေကို', group:"", note:"" }, 
			{sound:"", wd:'ကြည့်ပြီး', group:"", note:"" }, 
			{sound:"", wd:'ငါ့ကို​တော့', group:"", note:"" }, 
			{sound:"", wd:'မဖိတ်​ဘူးဆိုပြီး', group:"", note:"" },
			{sound:"", wd:'စိတ်​နာကြည်း​ပါသလား', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Looking at social media photos of all those events that you weren’t invited to can make you feel bitter."
	},	
     
	{ line:[
			{sound:"", wd:'ဒါဆိုရင်', group:"", note:""},
			{sound:"", wd:'အချစ်ဆုံး', group:"", note:""},
			{sound:"", wd:'သူငယ်ချင်းတွေ​ကို', group:"", note:"" }, 
			{sound:"", wd:'အမုန်း​ဆုံး', group:"", note:"" }, 
			{sound:"", wd:'ရန်သူတွေ​အဖြစ်', group:"", note:"" }, 
			{sound:"", wd:'မြင်​မိ​သွားနိုင်တယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"It can make your best friends seem like your worst enemies."
	},
	], sound:"", note:""
},
{ par:[	 
	{ line:[
			{sound:"", wd:'အရှိအတိုင်း', group:"", note:"" }, 
			{sound:"", wd:'ရှုမြင်​နိုင်ပုံ', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"How to be realistic:"
	},	
	{ line:[
			{sound:"", wd:'မိတ်ဆုံပွဲ', group:"", note:""},
			{sound:"", wd:'လုပ်တဲ့​အခါ', group:"", note:""},
			{sound:"", wd:'ယောက်​တိုင်း​ကို', group:"", note:"" }, 
			{sound:"", wd:'ဖိတ်နိုင်​မှာ', group:"", note:"" }, 
			{sound:"", wd:'မဟုတ်ဘူးဆိုတာ', group:"", note:""},
			{sound:"", wd:'လက်ခံပါ', group:"", note:""},
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Accept the fact that you won’t be invited to every social event."
	},	
	{ line:[
			{sound:"", wd:'လူမှု​မီဒီယာ​မှာ', group:"", note:"" }, 
			{sound:"", wd:'တင်ထားတဲ့', group:"", note:"" }, 
			{sound:"", wd:'ပုံ​တွေ​ကနေ', group:"", note:"" }, 
			{sound:"", wd:'တစ်ခုလုံးကို', group:"", note:"" },
			{sound:"", wd:'ခြုံငုံ​မသိ​နိုင်ဘူး', group:"", note:""},
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Besides, social media posts don’t tell the whole story."
	},	
     
	{ line:[
			{sound:"", wd:'“', group:"", note:""},
			{sound:"", wd:'ဘဝရဲ့', group:"", note:"" }, 
			{sound:"", wd:'အပျော်ဆုံး​အချိန်', group:"", note:"" }, 
			{sound:"", wd:'ပုံတွေကို​ပဲ', group:"", note:"" }, 
			{sound:"", wd:'လူမှု​မီဒီယာ​မှာ', group:"", note:"" },
			{sound:"", wd:'တင်​တတ်ကြတယ်', group:"", note:""},
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"“Social media is mostly a highlight reel of people’s lives,” says a teenager named Alexis."
	},	
        

	{ line:[
			{sound:"", wd:'နေ့တိုင်း', group:"", note:""},
			{sound:"", wd:'လုပ်နေကျ', group:"", note:"" }, 
			{sound:"", wd:'ပျော်စရာ​မကောင်းတာတွေကို​တော့', group:"", note:"" }, 
			{sound:"", wd:'မတင်​ကြဘူး', group:"", note:"" }, 
			{sound:"", wd:'”', group:"", note:"" },
			{sound:"", wd:'လို့', group:"", note:""},
			{sound:"", wd:'ဆယ်ကျော်သက်', group:"", note:""},
			{sound:"", wd:'အ​လက်​ဆီ', group:"", note:"" }, 
			{sound:"", wd:'ပြောတယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"“People usually leave out the ordinary parts.”"
	},
	], sound:"", note:""
},

]  //END

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var view_yourself_5 = [
	{sound:"",
	 title:[ 
		{sound:"", wd:'အထူးသဖြင့်', group:"", note:""},
		{sound:"", wd:'မိသားစုမှာ', group:"", note:""},
		{sound:"", wd:'သင့်မြတ်​စွာ', group:"", note:""},
		{sound:"", wd:'နေဖို့', group:"", note:""},
		{sound:"", wd:'ကြိုးစားပါ', group:"", note:""},
		{sound:"", wd:'။', group:"", note:"Period/full stop" }
	 ], sound:"", note:"Be a peacemaker—especially in your family." 
	},
    
 
{ par:[	
	{ line:[
			{sound:"", wd:'ကျမ်းစာက', group:"", note:"" }, 
			{sound:"", wd:'ဒီလို​ဆိုတယ်', group:"", note:"" }, 
			{sound:"", wd:' – “', group:"", note:"" }, 
			{sound:"", wd:'ဖြစ်နိုင်မယ်​ဆိုရင်', group:"", note:"" },
			{sound:"", wd:'လူအားလုံးနဲ့', group:"", note:"" },
			{sound:"", wd:'သင့်မြတ်​အောင်', group:"", note:"" },
			{sound:"", wd:'အတတ်နိုင်ဆုံး', group:"", note:"" },
			{sound:"", wd:'ကြိုးစားပါ', group:"", note:"" },
			{sound:"", wd:'။” (', group:"", note:"" },
			{sound:"", wd:'ရောမ', group:"", note:"" },
			{sound:"", wd:'၁၂:၁၈', group:"", note:"" },
			{sound:"", wd:')', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"The Bible says: “If possible, as far as it depends on you, be peaceable.” (Romans 12:18)"
	},
	{ line:[
			{sound:"", wd:'တခြား​သူတွေရဲ့', group:"", note:"" }, 
			{sound:"", wd:'လုပ်ရပ်တွေကို', group:"", note:"" }, 
			{sound:"", wd:'ထိန်းချုပ်​နိုင်မှာ', group:"", note:"" }, 
			{sound:"", wd:'မဟုတ်ပေမဲ့', group:"", note:"" },
			{sound:"", wd:'ကိုယ့်​တုံ့ပြန်ပုံကို​တော့', group:"", note:"" },
			{sound:"", wd:'ထိန်းချုပ်​နိုင်ပါတယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"You can’t fully control the actions of others, but you can control your reaction."
	},
	{ line:[
			{sound:"", wd:'သင့်မြတ်​စွာ', group:"", note:"" }, 
			{sound:"", wd:'နေဖို့', group:"", note:"" }, 
			{sound:"", wd:'ရွေးချယ်​နိုင်တယ်', group:"", note:"" }, 
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"You can choose to be peaceable."
	},
	], sound:"", note:""
},

 

{ par:[	
	{ line:[
			{sound:"", wd:'အရှိအတိုင်း', group:"", note:"" }, 
			{sound:"", wd:'ရှုမြင်​နိုင်ပုံ', group:"", note:"" }, 
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"How to be realistic:"
	},
       
	{ line:[
			{sound:"", wd:'မိသားစု၊', group:"", note:"" }, 
			{sound:"", wd:'မိတ်ဆွေ​တွေ​ကြားမှာ', group:"", note:"" },
			{sound:"", wd:'ပြဿနာ', group:"", note:"" }, 
			{sound:"", wd:'ပို​တင်းမာ​သွား​စေမယ့်​အစား', group:"", note:"" }, 
			{sound:"", wd:'သင့်မြတ်​အောင်', group:"", note:"" }, 
			{sound:"", wd:'လုပ်ဆောင်ဖို့', group:"", note:"" },
			{sound:"", wd:'ကြိုးစားပါ', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"Be resolved not to add to family tension but to be peaceable,"
	},
	{ line:[
			{sound:"", wd:'“', group:"", note:"" }, 
			{sound:"", wd:'အပြစ်ကင်း​တဲ့​သူ​ဆိုလို့', group:"", note:"" }, 
			{sound:"", wd:'ဘယ်သူမှ', group:"", note:"" }, 
			{sound:"", wd:'မရှိဘူး', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"just as you should be in any relationship."
	},
   
 
	{ line:[
			{sound:"", wd:'တစ်ကြိမ်​မဟုတ်', group:"", note:"" }, 
			{sound:"", wd:'တစ်ကြိမ်​တော့', group:"", note:"" }, 
			{sound:"", wd:'သူတစ်ပါး​ခြေထောက်ကို', group:"", note:"" }, 
			{sound:"", wd:'နင်း​မိ​တတ်ကြ​တာ​ပဲ', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:"“No one is perfect, and we are all going to step on each other’s toes now and then,” says a teenager named Melinda."
	},
	{ line:[
			{sound:"", wd:'သင့်တင့်​အောင်', group:"", note:"" }, 
			{sound:"", wd:'နေ​မလား၊', group:"", note:"" }, 
			{sound:"", wd:'မနေဘူးလား​ဆိုတာ', group:"", note:"" }, 
			{sound:"", wd:'ကိုယ်တိုင်', group:"", note:"" },
			{sound:"", wd:'ဆုံးဖြတ်​ရမယ်', group:"", note:"" },
			{sound:"", wd:'”', group:"", note:"" },
			{sound:"", wd:'လို့', group:"", note:"" },
			{sound:"", wd:'ဆယ်ကျော်သက်', group:"", note:"" },
			{sound:"", wd:'မီ​လင်​ဒါ', group:"", note:"" },
			{sound:"", wd:'ပြောတယ်', group:"", note:"" },
			{sound:"", wd:'။', group:"", note:"Period/full stop" }
		], sound:"", note:""
	},
	], sound:"", note:"“We just have to decide how we are going to respond—peaceably or otherwise.”"
},
]  //END
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var view_yourself_6 = [
// 	{sound:"",
// 	 title:[ 
// 		{sound:"", wd:'', group:"", note:""},
// 		{sound:"", wd:'', group:"", note:""},
// 		{sound:"", wd:'', group:"", note:""},
// 		{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 	 ], sound:"", note:"" 
// 	},

// { par:[	
// 	{ line:[
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:""
// 	},
// 	{ line:[
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:""
// 	},
// 	{ line:[
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:""
// 	},
// 	], sound:"", note:""
// },

]  //END
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var view_yourself_7 = [
// 	{sound:"",
// 	 title:[ 
// 		{sound:"", wd:'', group:"", note:""},
// 		{sound:"", wd:'', group:"", note:""},
// 		{sound:"", wd:'', group:"", note:""},
// 		{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 	 ], sound:"", note:"" 
// 	},

// { par:[	
// 	{ line:[
// 	{ line:[
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:""
// 	},
// 	{ line:[
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:""
// 	},
// 	{ line:[
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" }, 
// 			{sound:"", wd:'', group:"", note:"" },
// 			{sound:"", wd:'။', group:"", note:"Period/full stop" }
// 		], sound:"", note:""
// 	},
// 	], sound:"", note:""
// },

]  //END
















////////////////////////////////////////////////////////////////////////////////////////
// prayer = `We will pray  ဆုတောင်းမယ်
// Heavenly father Jehovah God  ကောင်းကင်အဖယေဟောဝါဘုရားသခင်
// Thank you for rice. 
// ဆန်အတွက်ကျေးဇူးတင်ပါတယ်
// ထမင’( အတ7က’ eက8(ဇ:(တင’ပ1တယ’ 
// Through Jesus’ name ယေရှု နာမ မှနစ်ဆင့်
// `
///////////////////////////////////////////////////////////////////////////////////////
