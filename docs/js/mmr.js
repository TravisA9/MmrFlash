//////////////////////////////////////////////////////////////////////////////////
// js doesn't not play well with Myanmar text
// This file is to give us mmr superpowers.
//////////////////////////////////////////////////////////////////////////////////
// See: https://github.com/ye-kyaw-thu/sylbreak/blob/master/Javascript/resegment.js
//////////////////////////////////////////////////////////////////////////////////
const myConsonant = "\u1000-\u1021"; // "က-အ"
const enChar = "a-zA-Z0-9";
// "ဣဤဥဦဧဩဪဿ၌၍၏၀-၉၊။!-/:-@[-`{-~\s"
const otherChar = "\u1023\u1024\u1025\u1026\u1027\u1029\u102a\u103f\u104c\u104d\u104f\u1040-\u1049\u104a\u104b!-/:-@\\[-`\\{-~\\s";
const ssSymbol = "\u1039";
const ngaThat = "\u1004\u103a";
const aThat = "\u103a";
// Regular expression pattern for Myanmar syllable breaking
// *** a consonant not after a subscript symbol AND a consonant is not
// followed by a-That character or a subscript symbol
const BREAK_PATTERN = new RegExp("((?<!" + ssSymbol + ")[" + myConsonant + "](?![" + aThat + ssSymbol +
	"])" + "|[" + enChar + otherChar + "])", "mg");
//////////////////////////////////////////////////////////////////////////////////
function segment(text) {
	var outArray = text.replace(BREAK_PATTERN, "𝕊$1").split('𝕊')
	if (outArray.length > 0) { outArray.shift(); }
	return outArray;
}
//////////////////////////////////////////////////////////////////////////////////
segmentWithSeparator = (text, separator = "|") => text.replace(BREAK_PATTERN, separator + "$1");
//////////////////////////////////////////////////////////////////////////////////////////
function print(str, code=false){          var s = ''
	for (var i = 0; i < str.length; i++){ 
		s += `${str[i]} `; 
		if(code) s += ` ${str[i]} &#${str.charCodeAt(i)};`; 
	}
	return s
}
// print("ဆွေး")  // print our code points in HTML campatible format.