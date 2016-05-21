dictEN=["English","hello","hi","hey","ハロウィン","鯖江","やま","やまだ","浜","キャロル","ヘブン","多摩","塩分","援護","engrish","イングリッシュ","ハイ","はい"]
dictJP=["日本語","こんにちは","今日は","おはよう","おはようございます","Young","younger","hung","hunger","hungry","jungle","nihongo","furniture","Carnage",
"konichiwa","Connie","Concho","Ohio","Iowa","ohayo","ohayo gozaimasu"]


function write(content) {
     document.getElementById('output').innerText = content;
}

function detectGreeting(text){
    if (dictEN.indexOf(text) >= 0){
        write("English");
        $('.ans1').fadeOut(100);
	    $('.ans3').fadeIn(800);
    }
    else if (dictJP.indexOf(text) >= 0){
        write("日本語");
        $('.ans3').fadeOut(100);
	    $('.ans1').fadeIn(800);
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