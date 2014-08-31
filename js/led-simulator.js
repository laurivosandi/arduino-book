
function onBodyLoad() {
    console.log("Updating circuit...");
    var $resistorVoltageDropMin = $$("#output_resistor_voltage_drop_min");
    var $resistorVoltageDropMax = $$("#output_resistor_voltage_drop_max");
    var $resistorVoltageDrop = $$("#output_resistor_voltage_drop");
    var $resistanceMin = $$("#output_resistance_min");
    var $resistanceMax = $$("#output_resistance_max");
    var $resistance = $$("#output_resistance");
    var $ledTypeSelect = $$("#led_type");
    var $ledType = null;
    for(var j = 0; j < $ledTypeSelect.childNodes.length; j++) {
        $ledType = $ledTypeSelect.childNodes[j];
        if($ledType.value == $ledTypeSelect.value) { break; }
    }
    var $currentMax = $$("#current_max");
    
    var powerSupplyVoltage = parseFloat($$("#power_supply_voltage").value);
    var currentMax = parseFloat($currentMax.value);
    var voltageDropMin = parseFloat($ledType.getAttribute("data-voltage-drop-min"));
    var voltageDropMax = parseFloat($ledType.getAttribute("data-voltage-drop-max"));
    var wavelengthMax = parseInt($ledType.getAttribute("data-output_array_powerwavelength-max"));
    var wavelengthMin = parseInt($ledType.getAttribute("data-wavelength-min"));
    var ledEfficiency = parseFloat($ledType.getAttribute("data-typical-efficiency"));

    $$("#output_led_efficiency").innerHTML = 
        "\\begin{equation*}" +
        "\\eta_{LED} = " + percent(ledEfficiency) +
        "\\end{equation*}";

    console.log(
        "LED",
        "wavelength:", wavelengthMin, "-", wavelengthMax,
        "voltage drop:", voltageDropMin,"-", voltageDropMax,
        "color:", $ledType.innerHTML.toLowerCase());
        
    var powerSupplyVoltage = $$("#power_supply_voltage").value;
    var ledCount = $$("#led_count").value;
    
    console.log("Power supply voltage:", powerSupplyVoltage);
    console.log("LED count:", ledCount);
    
    $$("#output_low_power_supply_voltage").style.display = voltageDropMin * ledCount >= powerSupplyVoltage ? "block":"none";
    
    // Calcuate voltage drop on the resistor
    var arrayVoltageDropMin = voltageDropMin * ledCount;
    var arrayVoltageDropMax = voltageDropMax * ledCount;
    
    var resistorVoltageDropMin = powerSupplyVoltage - arrayVoltageDropMin;
    var resistorVoltageDropMax = powerSupplyVoltage - arrayVoltageDropMax;
    
    console.log("Resistor voltage drop:", resistorVoltageDropMin, "-", resistorVoltageDropMax);
    
    var resistanceMin = resistorVoltageDropMin / currentMax;
    var resistanceMax = resistorVoltageDropMax / currentMax;


    $$("#output_led_count").innerHTML = "\\begin{equation*}K = " + ledCount + "\\end{equation*}";

    
    $resistorVoltageDropMin.innerHTML =
        "\\begin{equation*}\\Delta U_{resistor(min)} = " + resistorVoltageDropMin.toFixed(2) + " V\\end{equation*}";
    $resistorVoltageDropMax.innerHTML =
        "\\begin{equation*}\\Delta U_{resistor(max)} = " + resistorVoltageDropMax.toFixed(2) + " V\\end{equation*}";
    $resistorVoltageDrop.innerHTML =
        "\\begin{equation*}\\Delta U_{resistor} = " + resistorVoltageDropMin.toFixed(2) + "V ... " + resistorVoltageDropMax.toFixed(2) + " V\\end{equation*}";
    $resistanceMin.innerHTML =
        "\\begin{equation*}R_{resistor(min)} = " + resistanceMin.toFixed(2) + " \\Omega\\end{equation*}";
    $resistanceMax.innerHTML =
        "\\begin{equation*}R_{resistor(max)} = " + resistanceMax.toFixed(2) + " \\Omega\\end{equation*}";
    $resistance.innerHTML =
        "\\begin{equation*}R_{resistor} = " + resistanceMin.toFixed(2) + "\\Omega\\ ...\\ " + resistanceMax.toFixed(2) + "\\Omega\\end{equation*}";
    
    $$("#output_current_max").innerHTML =
        "\\begin{equation*}I = " + 
        humanize(currentMax) + " A" + 
        "\\end{equation*}";
    $$("#output_power_supply_voltage").innerHTML =
        "\\begin{equation*}" + 
        "U_{supply} = " + 
        humanize(powerSupplyVoltage) + " V" +
        "\\end{equation*}";
    $$("#output_led_voltage_drop_min").innerHTML =
        "\\begin{equation*}" + 
        "\\Delta U_{LED(min)} = " + humanize(voltageDropMin, "V") +
        "\\end{equation*}";
    $$("#output_led_voltage_drop_max").innerHTML =
        "\\begin{equation*}"
        "\\Delta U_{LED(max)} = " + humanize(voltageDropMax, "V") +
        "\\end{equation*}";
    $$("#output_led_voltage_drop").innerHTML =
        "\\begin{equation*}" +
        "\\Delta U_{LED} = " +
        range(voltageDropMin, voltageDropMax, "V") +
        "\\end{equation*}";

    $$("#output_array_voltage_drop_min").innerHTML =
        "\\begin{equation*}" +
        "\\Delta U_{array(min)} = \\Delta U_{led(min)} \\times K = " +
        humanize(voltageDropMin, "V") + " \\times " + ledCount  + " = " +
        humanize(arrayVoltageDropMin, "V") + 
        "\\end{equation*}";
    $$("#output_array_voltage_drop_max").innerHTML =
        "\\begin{equation*}" +
        "\\Delta U_{array(max)} = \\Delta U_{led(max)} \\times K = " +
        humanize(voltageDropMax, "V") + " \\times " + ledCount + " = " +
        humanize(arrayVoltageDropMax, "V") + 
        "\\end{equation*}";        
    $$("#output_array_voltage_drop").innerHTML =
        "\\begin{equation*}" +
        "\\Delta U_{array} = " +
        range(arrayVoltageDropMin, arrayVoltageDropMax, "V") + 
        "\\end{equation*}";

    $$("#output_resistor_voltage_drop_formula").innerHTML =
        "\\begin{equation*}\\Delta U_{resistor} = U_{supply} - \\Delta U_{array}" + 
        (ledCount > 1 ? " \\times K":"") +
        "\\end{equation*}"
    

    console.log("Resistor power consumption:", resistorVoltageDropMin * currentMax, "...", resistorVoltageDropMax * currentMax);
    $$("#output_resistor_power_min").innerHTML =
        "\\begin{equation*}" +
        "P_{resistor(min)} = U_{resistor(min)} \\times I = " +
        humanize(resistorVoltageDropMin * currentMax, "W") +
        "\\end{equation*}";
    $$("#output_resistor_power_max").innerHTML =
        "\\begin{equation*}" +
        "P_{resistor(max)} = U_{resistor(min)} \\times I = " +
        humanize(resistorVoltageDropMax * currentMax, "W") +
        "\\end{equation*}";
    $$("#output_resistor_power").innerHTML =
        "\\begin{equation*}" + 
        "P_{resistor} = U_{resistor(min)} \\times I = " +
        range(resistorVoltageDropMin * currentMax, resistorVoltageDropMax * currentMax, "W") +
        "\\end{equation*}";


    // Array power consumption
    var arrayPowerMin = arrayVoltageDropMin * currentMax;
    var arrayPowerMax = arrayVoltageDropMax * currentMax;
    $$("#output_array_power_min").innerHTML =
        "\\begin{equation*}" + 
        "P_{array(min)} = \\Delta U_{array(min)} \\times I = " + 
        humanize(arrayVoltageDropMin, "V") + " \\times " +
        humanize(currentMax, "A") + " = " +
        humanize(arrayPowerMin, "W") +
        "\\end{equation*}";
    $$("#output_array_power_max").innerHTML =
        "\\begin{equation*}" + 
        "P_{array(max)} = \\Delta U_{array(max)} \\times I = " + 
        humanize(arrayVoltageDropMax, "V") + " \\times " +
        humanize(currentMax, "A") + " = " +
        humanize(arrayPowerMax, "W") +
        "\\end{equation*}";
        
    $$("#output_array_power").innerHTML = 
        "\\begin{equation*}" + 
        "P_{array} = " + 
        range(arrayPowerMin, arrayPowerMax, "W") +
        "\\end{equation*}";

    // Total power consumption
    var totalPower = powerSupplyVoltage * currentMax;
    $$("#output_total_power").innerHTML =
        "\\begin{equation*}" +
        "P = U \\times I = " +
        humanize(powerSupplyVoltage, "V") + " \\times " +
        humanize(currentMax, "A") + " = " +
        humanize(totalPower, "W") +
        "\\end{equation*}";

    // Efficiency
    var arrayPowerMin = arrayVoltageDropMin * currentMax;
    var arrayPowerMin = arrayVoltageDropMin * currentMax;

    var efficiencyMin = arrayPowerMin / totalPower;
    var efficiencyMax = arrayPowerMax / totalPower;

    $$("#output_efficiency_min").innerHTML = 
        "\\begin{equation*}" +
        "\\eta_{circuit(min)} = \\frac{" + humanize(arrayPowerMin, "W") + "}{" + humanize(totalPower, "W") + "} = " + percent(efficiencyMin) +
        "\\end{equation*}";
    $$("#output_efficiency_max").innerHTML = 
        "\\begin{equation*}" + 
        "\\eta_{circuit(max)} = \\frac{" + humanize(arrayPowerMax, "W") + "}{" + humanize(totalPower, "W") + "} = " + percent(efficiencyMax) +
        "\\end{equation*}";
    $$("#output_efficiency").innerHTML = 
        "\\begin{equation*}" +
        "\\eta_{circuit} = " +
        percent(efficiencyMin) + "\\ ...\\ " + percent(efficiencyMax) +
        "\\end{equation*}";

    var luminousEfficiencyMin = ledEfficiency * efficiencyMin;
    var luminousEfficiencyMax = ledEfficiency * efficiencyMax;

    $$("#output_luminous_efficiency_min").innerHTML = 
        "\\begin{equation*}" +
        "\\eta_{luminous(min)} = " + 
        percent(ledEfficiency) + " \\times " + 
        percent(efficiencyMin) + " = " +
        percent(luminousEfficiencyMin) +
        "\\end{equation*}";
        
    $$("#output_luminous_efficiency_max").innerHTML = 
        "\\begin{equation*}" + 
        "\\eta_{luminous(max)} = " + 
        percent(ledEfficiency) + " \\times " +
        percent(efficiencyMax) + " = " +
        percent(luminousEfficiencyMax) +
        "\\end{equation*}";
        
    $$("#output_luminous_efficiency").innerHTML = 
        "\\begin{equation*}" +
        "\\eta_{luminous} = " +
        percent(luminousEfficiencyMin) + "\\ ...\\ " +
        percent(luminousEfficiencyMax) +
        "\\end{equation*}";

    // Equivalent incandescent lightbulb
        
    var incandescentLightBulbEfficiency = 0.022;
    $$("#output_equiv_incand_light_bulb").innerHTML =
        "\\begin{equation*}" +
        "P_{equiv} =" +
        "\\frac{\\eta_{luminous}}{2.2\\%} \\times P = " +
        range(
            luminousEfficiencyMin / 0.022 * totalPower,
            luminousEfficiencyMax / 0.022 * totalPower,
            "W") +
        "\\end{equation*}";



    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

