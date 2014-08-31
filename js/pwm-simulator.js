
function onBodyLoad() {
    $oscilloscope = $$("#oscilloscope .cycles");
    for (var j = 0; j < 20; j++) {
        $oscilloscope.innerHTML += "<div class=\"cycle\"><div class=\"on\">&nbsp;</div><div class=\"off\">&nbsp;</div></div>";
    }
    updateSoftwarePWM();
    updateHardwarePWM();
}

function updateSoftwarePWM() {
    var period = $$("#software_pwm_period").value;
    var $dutyCycle = $$("#software_pwm_duty_cycle"); 
    var frequency = 1000.0 / period;
    $dutyCycle.max = period;
    var dutyCycle = $dutyCycle.value;
    
    $$("#software_pwm_period_value").innerHTML = period;
    $$("#software_pwm_frequency_value").innerHTML = frequency.toFixed(1);
    $$("#software_pwm_duty_cycle_value").innerHTML = dutyCycle;
    $$("#software_pwm_duty_cycle_percent").innerHTML = (dutyCycle * 100 / period).toFixed(1);
   
    $on = $$$("#oscilloscope .cycle .on");
    for (var j = 0; j < $on.length; j++) {
        $on[j].style.width = dutyCycle + "px";
        $on[j].style.display = (dutyCycle == 0) ? "none" : "inline-block";
    }
    $off = $$$("#oscilloscope .cycle .off");
    for (var j = 0; j < $off.length; j++) {
        $off[j].style.width = (period-dutyCycle) + "px";
        $off[j].style.display = (dutyCycle == period) ? "none" : "inline-block";
    }
    
    $code = $$("#software_pwm_code");
    $code.innerHTML = "int ledPin = 13;";
    $code.innerHTML += "\n";
    $code.innerHTML += "void setup() {\n";
    $code.innerHTML += "    pinMode(ledPin, OUTPUT);\n";
    $code.innerHTML += "};\n";
    $code.innerHTML += "\n";
    $code.innerHTML += "void loop() {\n";
    $code.innerHTML += "    digitalWrite(ledPin, HIGH);\n";
    $code.innerHTML += "    delay(" + dutyCycle + ");\n";
    $code.innerHTML += "    digitalWrite(ledPin, LOW);\n";
    $code.innerHTML += "    delay(" + (period-dutyCycle) + ");\n";
    $code.innerHTML += "};\n";
}

function updateHardwarePWM() {
    var $dutyCycle = $$("#hardware_pwm_duty_cycle");
    var dutyCycle = $dutyCycle.value;
    var frequency = 16000000.0/255/2/64; // Hz
    var period = 1 / frequency;

    $$("#hardware_pwm_duty_cycle_value").innerHTML = (dutyCycle * period * 1000000 / 255).toFixed();
    $$("#hardware_pwm_duty_cycle_percent").innerHTML = (dutyCycle * 100 / 255).toFixed();
    
    $code = $$("#hardware_pwm_code");
    $code.innerHTML = "int ledPin = 13;\n";
    $code.innerHTML += "\n";
    $code.innerHTML += "void setup() {\n";
    $code.innerHTML += "    pinMode(ledPin, OUTPUT);\n";
    $code.innerHTML += "    analogWrite(ledPin, " + dutyCycle + ");\n";
    $code.innerHTML += "};\n";
    $code.innerHTML += "\n";
    $code.innerHTML += "void loop() {\n";
    $code.innerHTML += "}\n";
}
