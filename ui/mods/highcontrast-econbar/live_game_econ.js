// Metal Economy Bar panels
const $divmetal = $('div[class*="div-metal"]'),
    $divmetal_ctrcont = $divmetal.find($('div[class*="div_rate_ctr_cont"]')),
    $divplusminus_metal = $divmetal.find($('div[class*="div_plusminus_rate_cont"]')),
    $divplusminus_metal_produced = $divplusminus_metal.children().eq(0),
    $divplusminus_metal_consumed = $divplusminus_metal.children().eq(1);

// Energy Economy Bar panels
const $divenergy = $('div[class*="div-energy"]'),
    $divenergy_ctrcont = $divenergy.find($('div[class*="div_rate_ctr_cont"]')),
    $divplusminus_energy = $divenergy.find($('div[class*="div_plusminus_rate_cont"]')),
    $divplusminus_energy_produced = $divplusminus_energy.children().eq(0),
    $divplusminus_energy_consumed = $divplusminus_energy.children().eq(1);

// Construction Percentage
const $divecon = $('div[class*="div-econ"]'),
    $divefficiency = $divecon.children().find($('div[class*="div_efficiency"]')),
    $divefficiency_ctrperc = $divefficiency.find($('div[class*="div_rate_ctr_perc_center"]'))


// Generic Variables
const colorProduced = "gold",
    colorConsumed = "lightseagreen",
    shadowBox = "0 0 3px 1px cornflowerblue",
    productionFontSize = "13.5px",
    netGainFontSize = "22.5px",
    negativeEfficiency = [
        // "box-shadow: 0 0 3px 1px cornflowerblue",
        "text-shadow: 0 0 5px cornflowerblue, 0 0 20px cornflowerblue, 0 0 45px cornflowerblue"
    ],
    negativeMetalEnergy = [
        "box-shadow: 0 0 3px 1px cornflowerblue"
    ]
    efficiencyLimit = 80

// ##Economy positive/negative Effects
// Economy Efficiency
$("<style type='text/css'> .negative_efficiency{ " + negativeEfficiency.join(";") + " } </style>").appendTo("head");
$("<style type='text/css'> .positive_efficiency{ box-shadow: none; text-shadow: none; } </style>").appendTo("head");

// Metal/Energy Efficiency
$("<style type='text/css'> .negative_metalenergy{ " + negativeMetalEnergy.join(";") + " } </style>").appendTo("head");


model.econTextColorCSS = ko.computed(function () {
    if (model.economyEfficiencyPerc() >= efficiencyLimit) {
        return 'positive_efficiency';
    } else {
        return 'negative_efficiency';
    }
});
// model.energyTextColorCSS = ko.computed(function () {
//     if (model.energyNet() >= 0) {
//         return 'positive_efficiency';
//     } else {
//         return 'negative_metalenergy';
//     }
// });
// model.metalTextColorCSS = ko.computed(function () {
//     if (model.metalNet() >= 0) {
//         return 'positive_efficiency';
//     } else {
//         return 'negative_metalenergy';
//     }
// });


// Metal CSS Managing
$divplusminus_metal.children().each(function () {
    $(this).removeClass("color_negative color_positive text_rate");
    $(this).css({
        "-webkit-background-clip": "text",
        "background-clip": "text",
        "box-shadow": "",
        "font-size": productionFontSize
    })
});
$divplusminus_metal_produced.css({ "color": colorProduced })
$divplusminus_metal_consumed.css({ "color": colorConsumed })
$divplusminus_metal_consumed.attr(
    'data-bind',
    "text: metalLossString, tooltip: tooltipMetalExpended, css: { negative_metalenergy: metalNet() < 0, positive_efficiency: metalNet() >= 0}"
);


// Metal Net Gain
$divmetal_ctrcont.children().each(function () {
    $(this).removeClass("color_negative color_positive text_rate");
    $(this).css({
        "-webkit-background-clip": "text",
        "background-clip": "text",
        "color": colorProduced,
        "font-size": netGainFontSize
    })
});
// $divmetal_ctrcont.attr(
//     'data-bind',
//     "visible: !displayMetalAsPercent(), text: metalNetString, tooltip: tooltipNetMetalProduced, css: metalTextColorCSS, { ositive_efficiency: metalNet() < 0}"
// );

// Energy CSS Managing
$divplusminus_energy.children().each(function () {
    $(this).removeClass("color_negative color_positive text_rate");
    $(this).css({
        "-webkit-background-clip": "text",
        "background-clip": "text",
        "box-shadow": "",
        "font-size": productionFontSize
    })
});
$divplusminus_energy_produced.css({ "color": colorProduced })
$divplusminus_energy_consumed.css({ "color": colorConsumed })
$divplusminus_energy_consumed.attr(
    'data-bind',
    "text: energyLossString, tooltip: tooltipEnergyExpended, css: { negative_metalenergy: energyNet() < 0, positive_efficiency: energyNet() >= 0}"
);

// Energy Net Gain
$divenergy_ctrcont.children().each(function () {
    $(this).removeClass("color_negative color_positive text_rate");
    $(this).css({
        "-webkit-background-clip": "text",
        "background-clip": "text",
        "color": colorProduced,
        "font-size": netGainFontSize
    })
});

// Contruction Efficiency Percentage CSS Managing
$divefficiency_ctrperc.removeClass("color_positive color_negative text_rate")
$divefficiency_ctrperc.css({
    "-webkit-background-clip": "text",
    "background-clip": "text",
    "color": colorProduced,
    "font-size": netGainFontSize
})

$divefficiency_ctrperc.attr(
    'data-bind',
    "text: economyEfficiencyPercString, css: { negative_efficiency: economyEfficiencyPerc() <= "+efficiencyLimit+", positive_efficiency: economyEfficiencyPerc() > "+efficiencyLimit+"}"
);


console.log("edit", $divecon, $divefficiency, $divefficiency_ctrperc)
