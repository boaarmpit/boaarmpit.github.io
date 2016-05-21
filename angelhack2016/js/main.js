dictEN_EN=["English","hello","hi","hey"];
dictEN_JP=["ハロウィン","鯖江","やま","やまだ","浜","キャロル","ヘブン","多摩","塩分","援護","engrish","イングリッシュ","ハイ","はい"];
dictEN_CH=["英国","英","英语","英文","big","amber","好","海","黑"];
dictEN_KO=["해봐요","하이","헤이"];
dictEN=dictEN_EN.concat(dictEN_JP).concat(dictEN_CH);

dictJP_JP=["日本語","こんにちは","今日は","おはよう","おはようございます"];
dictJP_EN=["Young","younger","hung","hunger","hungry","jungle","nihongo","furniture","Carnage","konichiwa","Connie","Concho","Ohio","Iowa","ohayo","ohayo gozaimasu"];
dictJP_CH=["不好","不好意"];
dictJP_KO=["이형구","니혼고","곤니찌와","타요","가요","오하요 고자 이마스"];
dictJP=dictJP_JP.concat(dictJP_EN).concat(dictEN_CH);

dictCH_CH=["中文","中国","你好","你"];
dictCH_JP=["ニーハオ","日本","2","ミーハー","チョンウェイ","ジョンウェイン"];
dictCH_EN=["Niihau","me how","show me","John Wayne"];
dictCH_KO=["니하오","정원"];
dictCH=dictCH_CH.concat(dictCH_JP).concat(dictCH_EN);

dictKO_KO=["안녕하세요","한국어","대한민국"];
dictKO_JP=["アニョハセヨ"];
dictKO_EN=["Anya haseo","Tallahassee"];
dictKO_CH=["msu"];
dictKO=dictKO_KO.concat(dictKO_JP).concat(dictKO_EN);

function write(content) {
     document.getElementById('output').innerText = content;
}

function detectGreeting(text){
    if (dictCH.indexOf(text) >= 0){
        state="cmn-Hans-CN";
        write("中文");
        $('.ans').fadeOut(100);
	    $('.ans2').fadeIn(600);
    }
    else if (dictEN.indexOf(text) >= 0){
        state="en-NZ";
        write("English");
        $('.ans').fadeOut(100);
	    $('.ans3').fadeIn(600);
    }
    else if (dictKO.indexOf(text) >= 0){
        state="ko-KR";
        write("한국어");
        $('.ans').fadeOut(100);
	    $('.ans4').fadeIn(600);
    }
//    else if (dictJP.indexOf(text) >= 0){
//        state="ja-JP";
//        write("日本語");
//        $('.ans').fadeOut(100);
//	    $('.ans1').fadeIn(600);
//    }
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
	if(state=="cmn-Hans-CN"){
	    recognitionKO.start();
	}
	else{
	    recognitionCH.start();
	}
};

//var recognitionJP = new webkitSpeechRecognition();
//recognitionJP.lang = "ja-JP";
////recognitionJP.interimResults = true;
//
//recognitionJP.onstart = function() {console.log("start JP")};
//recognitionJP.onresult = function(event) {
//    capturedText = event.results[event.results.length-1][0].transcript;
//    detectGreeting(capturedText);
//	console.log(capturedText);
//	recognitionJP.stop();
//};
//recognitionJP.onerror = function(event) {console.log("error JP")};
//recognitionJP.onend = function() {
//	console.log("end JP");
//	recognitionCH.start();
//};

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
	if(state=="ko-KR"){
	    recognitionEN.start();
	}
	else{
	    recognitionKO.start();
	}
};


var recognitionKO = new webkitSpeechRecognition();
recognitionKO.lang = "ko-KR";
//recognitionKO.interimResults = true;

recognitionKO.onstart = function() {console.log("start KO")};
recognitionKO.onresult = function(event) {
    capturedText = event.results[event.results.length-1][0].transcript;
    detectGreeting(capturedText);
	console.log(capturedText);
	recognitionKO.stop();
};
recognitionKO.onerror = function(event) {console.log("error KO")};
recognitionKO.onend = function() {
	console.log("end KO");
	if(state=="en-NZ"){
	    recognitionCH.start();
	}
	else{
	    recognitionEN.start();
	}
};


var state="";
recognitionEN.start();