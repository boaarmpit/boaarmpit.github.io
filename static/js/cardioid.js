// Globals
var is_running = 0;
var t0 = 0;
var t1 = 0;

function getQueryVariable(variable)
// from https://css-tricks.com/snippets/javascript/get-url-variables/
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable && float(pair[1]) != NaN){
            return float(pair[1]);
        }
    }
    return(false);
}

function reset(){
    stop();

    var initialValue = 2;
    if (typeof getQueryVariable("value") == "number"){
        initialValue = getQueryVariable("value");
    }
    var initialSpeed = 3;
    if (typeof getQueryVariable("speed") == "number"){
        initialSpeed = getQueryVariable("speed");
    }

    valueSlider.value(initialValue);
    speedSlider.value(sqrt(abs(initialSpeed))*Math.sign(initialSpeed));
}

function stop(){
    is_running = 0;
}

function start(){
    is_running = 1;
}

function setup() {
    // Add UI elements and initialize window.
    createCanvas(windowWidth, windowHeight);
    startButton = createButton("Start");
    startButton.mousePressed(start);
    stopButton = createButton("Stop");
    stopButton.mousePressed(stop);
    resetButton = createButton("Reset");
    resetButton.mousePressed(reset);
    valueSlider = createSlider(1, 501, 2, 0.00001);
    speedSlider = createSlider(-30, 30, 3, 0.00001);

    reset()
    windowResized();
}

// Automatically looped main drawing function.
function draw() {
    var numPts = 500;
    var pi = 3.1415926535;
    var multiplier;
    var multiplierDelta;
    var speedScaled;
    var x0, y0, x1, y1;
    var diameter = min(windowWidth, windowHeight) * 0.9;

    // Calculate multiplication factor from UI sliders and time elapsed.
    t0 = t1;
    t1 = millis();
    speedScaled = speedSlider.value()*abs(speedSlider.value());
    multiplierDelta = (t1 - t0) / 10**5 * speedScaled * is_running;
    valueSlider.value(valueSlider.value() + multiplierDelta);
    multiplier = valueSlider.value();

    // Draw.
    background(0, 100, 200);

    push();
        translate(windowWidth/2, windowHeight/2);
        
        noFill();
        ellipse(0, 0, diameter, diameter);

        stroke(255, 50);
        for (var i = 0; i < numPts; i++){
            x0 = -cos(i/numPts * 2*pi) * diameter/2;
            y0 = sin(i/numPts * 2*pi) * diameter/2;
            x1 = -cos(i*multiplier/numPts * 2*pi) * diameter/2;
            y1 = sin(i*multiplier/numPts * 2*pi) * diameter/2;
            ellipse(x0, y0, 3, 3);
            line(x0, y0, x1, y1);
        }
    pop();

    // Draw/show UI if not in full screen mode.
    if( window.innerHeight != screen.height) {
        startButton.show();
        stopButton.show();
        resetButton.show();
        speedSlider.show();
        valueSlider.show();
        stroke(255);
        fill(255);
        text("value: " + multiplier.toFixed(3), 15, windowHeight - 15);
        text("speed: " + speedScaled.toFixed(2), 15, windowHeight - 40);
    }
    else{
        startButton.hide();
        stopButton.hide();
        resetButton.hide();
        speedSlider.hide();
        valueSlider.hide();
    }
}

function windowResized() {
    // Resize canvas and position UI elements.
    var speedSliderWidth = (windowWidth > windowHeight*0.9) ? (windowWidth/3 - 30-85) : (windowWidth - 30-85);
    resizeCanvas(windowWidth, windowHeight);
    startButton.position(20, windowHeight - 145);
    stopButton.position(20, windowHeight - 120);
    resetButton.position(20, windowHeight - 95);
    speedSlider.position(85+15, windowHeight - 55);
    speedSlider.style("width", speedSliderWidth + "px");
    valueSlider.position(85+15, windowHeight - 30);
    valueSlider.style("width", (windowWidth - 30-85) + "px");
}