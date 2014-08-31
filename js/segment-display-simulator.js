SEGMENT_MAPPING = [
    0x7e, 0x30, 0x6d, 0x79,
    0x33, 0x5b, 0x5f, 0x70,
    0x7f, 0x7b, 0x77, 0x1f,
    0x4e, 0x3d, 0x4f, 0x47
];

MAPPING = {
    "uno": {
        "PC0": "A0",  "PC1": "A1",  "PC2": "A2", "PC3": "A3",
        "PC4": "A4",  "PC5": "A5",
        
//        "PD0": "0", "PD1": "1", // RX0/TX0
        "PD2": "2",  "PD3": "3",
        "PD4": "4",  "PD5": "5", "PD6": "6", "PD7": "7",

        "PB0": "8",  "PB1": "9",  "PB2": "10", "PB3": "11",
        "PB4": "12", "PB5": "13",
    },
    "mega": {
        // Analog inputs
        "PF0": "A0",  "PF1": "A1",  "PF2": "A2",  "PF3": "A3",
        "PF4": "A4",  "PF5": "A5",  "PF6": "A6",  "PF7": "A7",
        
        "PK0": "A8",  "PK1": "A9",  "PK2": "A10", "PK3": "A11",
        "PK4": "A12", "PK5": "A13", "PK6": "A14", "PK7": "A15",

//        "PE0": "0", "PE1": "1", // RX0/TX0
        "PE4": "2",  "PE5": "3",
        "PG5": "4",  "PE3": "5",  "PH3": "6",  "PH4": "7",

        "PH5": "8",  "PH6": "9",  "PH4": "10", "PH5": "11",
        "PH6": "12", "PH7": "13",


        "PB0": "8",  "PB1": "9",  "PB2": "10", "PB3": "11",
        "PB4": "12", "PB5": "13", 
        
        "PA0": "22", "PA1": "23", "PA2": "24", "PA3": "25",
        "PA4": "26", "PA5": "27", "PA6": "28", "PA7": "29",
        "PC0": "30", "PC1": "31", "PC2": "32", "PC3": "33",
        "PC4": "34", "PC5": "35", "PC6": "36", "PC7": "37",
        "PD7": "38", "PG0": "39", "PG1": "40", "PG2": "41",
        "PL0": "42", "PL1": "43", "PL2": "44", "PL3": "45",
        "PL4": "46", "PL5": "47", "PL6": "48", "PL7": "49",
        "PB0": "50", "PB1": "51", "PB2": "52", "PB3": "53"
    }
}

function preloadDigit(digit) {
    console.log("Preloading:", digit);
    var segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    segments.reverse();
    for (var j = 0; j < 7; j++) {
        console.log(segments[j], "=>", SEGMENT_MAPPING[digit] >> j & 1);
        console.log("Manipulating:", $$("#segment_" + segments[j] + "_enabled"));
        $$("#segment_" + segments[j] + "_enabled").checked = SEGMENT_MAPPING[digit] >> j & 1;
        $$(".led_segment_display .segment_" + segments[j]).style.display = SEGMENT_MAPPING[digit] >> j & 1 ? "block" : "none";
    }
}

function updateCode() {
    var buf = []
    buf.push("char SEGMENT_MAPPING[16] = [");
    for (var j = 0; j < 16; j+=4) {
        var line = "    "
        for (var i = 0; i < 4; i++) {
            line += "0x" + SEGMENT_MAPPING[j+i].toString(16);
            if (i == 3 && j == 12) {
                line += " "
            } else {
                line += ","
            }
        }
        line += " // ";
        for (var i = 0; i < 4; i++) {
            line += "0x" + (j+i).toString(16);
            if (i < 3) {
                line += ", ";
            }
        }
        buf.push(line);
    }
    buf.push("];");
    buf.push("");
    buf.push("int PIN_ASSIGNMENT[8] = [2, 3, 4, 5, 6, 7, 8, 9]");
    buf.push("");
    buf.push("void segmentDisplayPrint(char assignment[8], char value, dot) {");
    buf.push("    char bits = SEGMENT_MAPPING[value];");
    buf.push("    for (char j = 0; j < 8; j++) {");
    buf.push("        pinMode(assignment[j], OUTPUT)");
    buf.push("    }");
    buf.push("    for (char j = 0; j < 7; j++) {");
    buf.push("        digitalWrite(assignment[j], bits >> j & 1);");
    buf.push("    }");
    buf.push("    digitalWrite(assignment[7], dot);");
    buf.push("}");
    buf.push("");

    buf.push("void setup() {");
    buf.push("    segmentDisplayPrint(PIN_ASSIGNMENT, 8, HIGH)");
    buf.push("}");
    $$("#code").innerHTML = buf.join("\n");
}

function toggleSegment(name) {
    var $segment = $$(".led_segment_display .segment_" + name)
    $segment.style.display = $segment.style.display == "none" ? "block" : "none";
}

function updateBoard() {
    var board = $$("#target_board option:checked").value;
    console.log("Selecting board:", board);

    var $segments = $$$("select.input.segment_connection");

    for (var i = 0; i < $segments.length; i++) {
        var $segment = $segments[i];
        var mapping = MAPPING[board];
        var j = 0;
        for (var atmega_pin in mapping) {
            var arduino_pin = mapping[atmega_pin];

            var option_title = "Arduino pin " + arduino_pin;
            if (!$segment.childNodes[j]) {
                $segment.innerHTML += "<option>" + option_title + "</option>"
            } else {
                $segment.childNodes[j].value = atmega_pin;
                $segment.childNodes[j].innerHTML = option_title; 
            }
            j++;
            
        }
        while ($segment.childNodes[j]) {
            $segment.removeChild($segment.childNodes[j]);
        }
    }
}

function onBodyLoad() {
    return;
    updateCode();
}
