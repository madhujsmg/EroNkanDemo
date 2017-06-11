var http = require('http');

// var obj are input given in problem statement .
var obj = {
    STATISTICAL_WEIGHER_A_PRESET_1_KG_PER_HOUR: 23,
    STATISTICAL_WEIGHER_A_PRESET_3_KG_PER_HOUR: 4.23,
    STATISTICAL_WEIGHER_A_PRESET_4_KG_PER_HOUR: 26.3,
    STATISTICAL_WEIGHER_B_PRESET_3_KG_PER_HOUR: 98.3,
    STATISTICAL_WEIGHER_B_PRESET_8_KG_PER_HOUR: 0.75,
    STATISTICAL_WEIGHER_B_PRESET_9_KG_PER_HOUR: 57.23,
    STATISTICAL_WEIGHER_C_PRESET_5_KG_PER_HOUR: 27.3,
    STATISTICAL_WEIGHER_C_PRESET_7_KG_PER_HOUR: 83.2,
    STATISTICAL_WEIGHER_C_PRESET_11_KG_PER_HOUR: 72.3,
    STATISTICAL_WEIGHER_C_PRESET_14_KG_PER_HOUR: 17.2,
    STATISTICAL_WEIGHER_C_PRESET_17_KG_PER_HOUR: 74.3,
    STATISTICAL_WEIGHER_F_PRESET_4_KG_PER_HOUR: 29.15,
    STATISTICAL_WEIGHER_F_PRESET_11_KG_PER_HOUR: 83.21,
    STATISTICAL_WEIGHER_G_PRESET_1_KG_PER_HOUR: 97.31,
    STATISTICAL_WEIGHER_G_PRESET_17_KG_PER_HOUR: 57.21,
    STATISTICAL_WEIGHER_P_PRESET_1_KG_PER_HOUR: 29.15,
    STATISTICAL_WEIGHER_P_PRESET_2_KG_PER_HOUR: 83.21,
    STATISTICAL_WEIGHER_P_PRESET_3_KG_PER_HOUR: 97.31,
    STATISTICAL_WEIGHER_S_PRESET_11_KG_PER_HOUR: 57.21
};

// assignValues values are constructed using expected result.
var assignValues = {
    PRESET_1_: 'Gold',
    PRESET_2_: 'Silver',
    PRESET_3_: 'Diamond',
    PRESET_4_: 'Platinum',
    PRESET_7_: 'Titanium',
    PRESET_8_: 'Steel',
    PRESET_9_: 'Platinum',
    PRESET_10_: 'Uranium',
    PRESET_11_: 'Mercury',
    PRESET_14_: 'Phosphorus',
    PRESET_17_: 'Sodium'
};

// Actual logic of problem is in this function .
function dataProcess(object) {
    var finalProcessedData = [];
    for (var value in assignValues) {

        var Weighers = [];
        var finalObj = {};
        var count = 0;
        var element;
        for (var obj in object) {
            //console.log(o);
            if (obj.indexOf(value) > -1) {
                count = count + object[obj];
                Weighers.push(obj);
                element = assignValues[value];
                finalObj.Preset = element;
                finalObj.Total_KG_Per_Hour = count;
                finalObj.Weighers = Weighers;
            }
        }
        if (Object.keys(finalObj).length > 0 && finalObj.constructor === Object)
            finalProcessedData.push(finalObj);
    }
    console.log(finalProcessedData);
    return finalProcessedData;
};

//preparing html view
var prepareWebPage = function (finalProcessedData) {
    var finalData = '';
    var space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    finalProcessedData.forEach(function (data, index) {
        finalData = finalData + '<br/>' + '<b>' + 'Preset' + space + space + space +'</b>' + data.Preset + '<br/>' +
            '<b>' + 'Total KG Per Hour     ' + space +'</b>' + data.Total_KG_Per_Hour

        if (data && data.Weighers) {
            finalData = finalData + '<br/>' + '<b>' + 'Weighers     ' + space + space + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '</b>'
            data.Weighers.forEach(function (weig) {
                var dynamicIndex = '_PRESET_';
                weig = weig.substring(0, weig.indexOf(dynamicIndex));
                weig = weig.replace('STATISTICAL_', '');
                weig = weig.replace('_', ' ');
                finalData = finalData + weig + ',';
            });
            finalData = finalData + '<br/>'+'<br/>'
        }
    })

    return finalData;
}


// creating an a server .
http.createServer(function (req, res) {
    res.writeHead(200);
    if (res) {
        var processedData = dataProcess(obj);
    }
    processedData = prepareWebPage(processedData);
    //processedData = JSON.stringify(processedData)
    res.write(processedData);
    res.end();
}).listen(3000);


