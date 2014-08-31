
function $$(selector) {
    var $element = document.querySelector(selector);
    if (!$element) {
        throw new Error("Element " + selector + " not found!");
    }
    return $element;
}

function $$$(selector) {
    var $elements = document.querySelectorAll(selector);
    if ($elements.length == 0) {
        throw new Error("Element " + selector + " not found!");
    }
    return $elements;
}

function percent(value) {
    return (value * 100.0).toFixed(1) + "\\%";
}

function humanize(value, unit) {
    var numerator = 1;
    var denominator = 1;
    var prefix = "";
    unit = unit || "";
    if (value > 1000000) {
        denominator = 1000000;
        prefix = "M";
    }
    if (value > 1000) {
        denominator = 1000;
        prefix = "k";
    }
    if (value < 1) {
        numerator = 1000;
        prefix = "m";
    }
    if (value < 0.001) {
        numerator = 1000000;
        prefix = "µ";
    }
    if (value < 0.000001) {
        numerator = 0;
        prefix = "";
    }
    return Math.floor(100.0 * numerator * value / denominator)
        / 100.0 + prefix + unit;
}

function range(a,b,unit) {
    return humanize(a, unit) + "\\ ...\\ " + humanize(b, unit);
}

RESISTOR_VALUES = [
    1.0, 1.2, 1.5, 2.0, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2 // From 1 to 15 ohm
]

if(typeof console === "undefined") {
    console = { log: function() { } };
}

if(window.attachEvent){
    window.attachEvent('onload', onBodyLoad)
} else {
    window.addEventListener('load', onBodyLoad)
}

