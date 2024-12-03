// Function that checks all checkboxes under on-net section 
$('#onnetSelectAllAgGrid').on('click', function () {
    rowData = getRowData();
    if ($('#onnetSelectAllAgGrid').prop('checked') == true) {
        $.each(rowData, function (index, value) {
            value[columns['P']] = true;
        });
        gridOptions.api.setRowData(rowData);
    }
    else {
        $.each(rowData, function (index, value) {
            value[columns['P']] = false;
        });
        gridOptions.api.setRowData(rowData);
    }
    console.log(rowData);
});
// Function that checks all checkboxes under off-net section 
$('#offnetSelectAllAgGrid').on('click', function () {
    rowData = getRowData();
    if ($('#offnetSelectAllAgGrid').prop('checked') == true) {
        $.each(rowData, function (index, value) {
            value[columns['Q']] = true;
        });
        gridOptions.api.setRowData(rowData);
    }
    else {
        $.each(rowData, function (index, value) {
            value[columns['Q']] = false;
        });
        gridOptions.api.setRowData(rowData);
    }
});

// Function that checks all checkboxes under EOC section 
$('#diversitySelectAllAgGrid').on('click', function () {
    rowData = getRowData();
    if ($('#diversitySelectAllAgGrid').prop('checked') == true) {
        $.each(rowData, function (index, value) {
            value[columns['S']] = true;
        });
        gridOptions.api.setRowData(rowData);
    }
    else {
        $.each(rowData, function (index, value) {
            value[columns['S']] = false;
        });
        gridOptions.api.setRowData(rowData);
    }
});

$('#selectAllLocationTypeAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#selectAllLocationTypeAgGrid').val();
    //console.log("Here == " + setValue);
    $.each(rowData, function (index, value) {
        value[columns['D']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#AllALocationType1').on('change', function () {
    rowData = getRowData();
    var setValue = $('#AllALocationType1').val();
    //console.log("Here == " + setValue);
    $.each(rowData, function (index, value) {
        value[columns['E']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#AllLocationSubType').on('change', function () {
    rowData = getRowData();
    var setValue = $('#AllLocationSubType').val();
    //console.log("Here == " + setValue);
    $.each(rowData, function (index, value) {
        value[columns['F']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#AllMultiTenant').on('change', function () {
    rowData = getRowData();
    var setValue = $('#AllMultiTenant').val();
    //console.log("Here == " + setValue);
    $.each(rowData, function (index, value) {
        value[columns['G']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#AllFloor').on('change', function () {
    rowData = getRowData();
    var setValue = $('#AllFloor').val();
    //console.log("Here == " + setValue);
    $.each(rowData, function (index, value) {
        value[columns['I']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#AllSTEAPTRM').on('change', function () {
    rowData = getRowData();
    var setValue = $('#AllSTEAPTRM').val();
    //console.log("Here == " + setValue);
    $.each(rowData, function (index, value) {
        value[columns['J']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#AllSTEAPTRM_Num').on('change', function () {
    rowData = getRowData();
    var setValue = $('#AllSTEAPTRM_Num').val();
    //console.log("Here == " + setValue);
    $.each(rowData, function (index, value) {
        value[columns['K']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#AllDiversityTypeAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#AllDiversityTypeAgGrid').val();
    $.each(rowData, function (index, value) {
        value[columns['T']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#AllClassOfServiceAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#AllClassOfServiceAgGrid').val();
    $.each(rowData, function (index, value) {
        value[columns['Y']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#selectAllBandWidthAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#selectAllBandWidthAgGrid').val();
    $.each(rowData, function (index, value) {
        value[columns['R']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#selectAllinterfacespeedAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#selectAllinterfacespeedAgGrid').val();
    $.each(rowData, function (index, value) {
        value[columns['Z']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#AllAZAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#AllAZAgGrid').val();
    $.each(rowData, function (index, value) {
        value[columns['Q']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#proposedsolutionbulkAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#proposedsolutionbulkAgGrid').val();
    //var settext = $('#proposedsolutionbulk').text();
    $.each(rowData, function (index, value) {
        value[columns['AA']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#nearNetDistanceAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#nearNetDistanceAgGrid').val();
    //var settext = $('#proposedsolutionbulk').text();
    $.each(rowData, function (index, value) {
        value[columns['U']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#nearNetOspCostAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#nearNetOspCostAgGrid').val();
    //var settext = $('#proposedsolutionbulk').text();
    $.each(rowData, function (index, value) {
        value[columns['V']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#nearNetEquipmentCostAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#nearNetEquipmentCostAgGrid').val();
    //var settext = $('#proposedsolutionbulk').text();
    $.each(rowData, function (index, value) {
        value[columns['W']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

$('#completionDateAgGrid').on('change', function () {
    rowData = getRowData();
    var setValue = $('#completionDateAgGrid').val();
    //var settext = $('#proposedsolutionbulk').text();
    $.each(rowData, function (index, value) {
        value[columns['X']] = setValue;
    });
    gridOptions.api.setRowData(rowData);
});

function getRowData() {
    var rowArray = [];
    gridOptions.api.forEachNode(function (node) {
        rowArray.push(node.data);
    });
    return rowArray;
}