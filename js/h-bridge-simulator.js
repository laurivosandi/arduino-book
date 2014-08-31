
function reset(id) {
    var dutyCycle = $$("#" + id + "_en").value;
    var fwd = $$("#" + id + "_fwd").value == "1" ? true : false;
    var rev = $$("#" + id + "_rev").value == "1" ? true : false;

    console.log("Resetting duty cycle:", dutyCycle, "First logic:", fwd, "Second logic:", rev);
    
    var animationSpeed = (dutyCycle == 0) ? 0 : (300.0 / dutyCycle).toFixed(2);
    
    console.log("Old style is:",  $$("#" + id).style.animationDuration);
    $$("#" + id).style['animation-duration'] = animationSpeed + "s";
    $$("#" + id).style['-webkit-animation-duration'] = animationSpeed + "s";
    $$("#" + id).style['-moz-animation-duration'] = animationSpeed + "s";
    $$("#" + id).style['-o-animation-duration'] = animationSpeed + "s";
    
    $$("#" + id).className = "wheel " + ((dutyCycle > 0 && fwd != rev) ? ((fwd>rev) ? "forward" : "reverse") : "");

    $$("#" + id + "_expl .free").style.display =
        (dutyCycle == 0) ? 'inline':'none';
    $$("#" + id + "_expl .break").style.display =
        (dutyCycle > 0 && fwd == rev) ? 'inline':'none';
    $$("#" + id + "_expl .forward").style.display = 
        (dutyCycle > 0 && fwd > rev) ? 'inline':'none';
    $$("#" + id + "_expl .reverse").style.display =
        (dutyCycle > 0 && fwd < rev) ? 'inline':'none';
        
    $$("#" + id + "_expl .duty_cycle").style.display = (dutyCycle > 0) ? 'inline':'none';
    $$("#" + id + "_expl .duty_cycle_percent").style.display = (dutyCycle > 0) ? 'inline':'none';
    $$("#" + id + "_expl .duty_cycle_percent").innerHTML = (dutyCycle * 100 / 255.0).toFixed(1) + "%";
}

function onBodyLoad() {
}
