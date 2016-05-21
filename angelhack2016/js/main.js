function write(content) {
     document.getElementById('output').innerText = content;
}

function detectGreeting(text){
    if (text=="hello"){
        write("English")
    }
    else if (text=="こんにちは"){
        write("日本語")
    }
}

var recognitionEN = new webkitSpeechRecognition();
recognitionEN.lang = "en-NZ";
recognitionEN.interimResults = true;

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
	recognitionJP.start();
};

var recognitionJP = new webkitSpeechRecognition();
recognitionJP.lang = "ja-JP";
recognitionJP.interimResults = true;

recognitionJP.onstart = function() {console.log("start JP")};
recognitionJP.onresult = function(event) {
    capturedText = event.results[event.results.length-1][0].transcript;
    detectGreeting(capturedText);
	console.log(capturedText);
	recognitionJP.stop();
};
recognitionJP.onerror = function(event) {console.log("error JP")};
recognitionJP.onend = function() {
	console.log("end JP");
	recognitionEN.start();
};

recognitionEN.start();