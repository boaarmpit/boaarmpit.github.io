dictEN_EN=["English","hello","hi","hey"];
dictEN_CH=["英国","英","英语","英文","big","amber","好","海","黑"];
dictEN=dictEN_EN.concat(dictEN_CH);

dictCH_CH=["中文","中国","你好","你"];
dictCH_EN=["Niihau","me how","show me","John Wayne"];
dictCH=dictCH_CH.concat(dictCH_EN);

function write(content) {
     document.getElementById('output').innerText = content;
}

function detectGreeting(text){
    if (dictCH.indexOf(text) >= 0){
        state="cmn-Hans-CN";
        write("??");
        $('.ans').fadeOut(100);
	    $('.ans2').fadeIn(600);
    }
    else if (dictEN.indexOf(text) >= 0){
        state="en-NZ";
        write("English");
        $('.ans').fadeOut(100);
	    $('.ans3').fadeIn(600);
    }
}

var recognitionEN = new webkitSpeechRecognition();
recognitionEN.lang = "en-NZ";
//recognitionEN.interimResults = true;

recognitionEN.onstart = function() {console.log("start EN")};
recognitionEN.onresult = function(event) {
    capturedText = event.results[event.results.length-1][0].transcript;
    detectGreeting(capturedText);
	console.log(capturedText);
	recognitionEN.stop();
};
recognitionEN.onerror = function(event) {console.log("error EN")};
recognitionEN.onend = function() {
	console.log("end EN");
	recognitionCH.start();
};


var recognitionCH = new webkitSpeechRecognition();
recognitionCH.lang = "cmn-Hans-CN";
//recognitionCH.interimResults = true;

recognitionCH.onstart = function() {console.log("start CH")};
recognitionCH.onresult = function(event) {
    capturedText = event.results[event.results.length-1][0].transcript;
    detectGreeting(capturedText);
	console.log(capturedText);
	recognitionCH.stop();
};
recognitionCH.onerror = function(event) {console.log("error CH")};
recognitionCH.onend = function() {
	console.log("end CH");
	recognitionEN.start();
};



var state="";
recognitionEN.start();