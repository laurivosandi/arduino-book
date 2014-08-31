
function onBodyLoad() {
    var $transistor = $$("#input_transistor option:checked");
    var collectorEmitterVoltageMax = $transistor.getAttribute("data-collector-emitter-voltage-max");
    var collectorCurrentMax = $transistor.getAttribute("data-collector-current-max");
    $$("#output_collector_emitter_voltage_max").innerHTML = 
        "\\begin{equation*}" +
        "U_{CE(max)} = " + humanize(collectorEmitterVoltageMax, "V") +
        "\\end{equation*}";
    $$("#output_collector_current_max").innerHTML = 
        "\\begin{equation*}" +
        "I_{C(max)} = " + humanize(collectorCurrentMax, "A") +
        "\\end{equation*}";

    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
