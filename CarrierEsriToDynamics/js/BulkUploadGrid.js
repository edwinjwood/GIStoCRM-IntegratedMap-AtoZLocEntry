var gridOptions = {
    columnDefs: [
        { field: "Index", minWidth: 110 },
        {
            field: "Select", headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, minWidth: 100,
        },
        {
            headerName: "Location Name",field: "Name", minWidth: 100, editable: true,
        },
        {
            headerName: "Street Address", field: "Street", minWidth: 150, editable: true,
            cellRenderer: function (params) {
                return params.data.Street == "" ? createInputBox(params, "Street", "text", "invalid-cell") : params.data.Street;
            }
            },
        { field: "City", minWidth: 80, editable: true  },
        { field: "State", minWidth: 90, editable: true },
        { field: "Zip", editable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Lat", field: "Latitude", minWidth: 100, },
        { headerName: "Long", field: "Longitude", minWidth: 100, },

        {
            headerName: "Build Type", field: "Location_Type", minWidth: 140, cellRenderer: function (params) {
                return createDropDown(params, "Location_Type", locationtypeArray, "invalid-cell");
            }
        },
        {
            headerName: "Location Type", field: "LocationType1", minWidth: 150, cellRenderer: function (params) {
                return createDropDown(params, "LocationType1", locationType1Array, "invalid-cell", true);
            },
        },
        {
            headerName: "Primary Use Type", field: "LocationSubType", minWidth: 150, cellRenderer: function (params) {
                return createDropDown(params, "LocationSubType", locationSubTypeAray, "invalid-cell");
            },
        },
        {
            headerName: "Multi Tenant", field: "MultiTenant", minWidth: 150, cellRenderer: function (params) {

                return params.data.LocationType1 == "Building" ? createDropDown(params, "MultiTenant", multiTenantArray, "invalid-cell") : createDropDown(params, "MultiTenant", multiTenantArray);
            }
        },

        {
            field: "Floor", minWidth: 90, cellRenderer: function (params) {

                return params.data.LocationType1 == "Building" ? createDropDown(params, "Floor", floorArray, "invalid-cell") : createDropDown(params, "Floor", floorArray);
            }
        },
        {
            headerName: "STE/APT/RM", field: "Ste_Bldg_Flr", minWidth: 140, cellRenderer: function (params) {
                return createDropDown(params, "Ste_Bldg_Flr", ste_aptArray, false, true);
            }
        },
        {
            headerName: "STE/APT/RM#", field: "Ste_Bldg_Flr_num", minWidth: 140, cellRenderer: function (params) {
                return params.data.Ste_Bldg_Flr != "" ? createInputBox2(params, "Ste_Bldg_Flr_num", "invalid-cell") : createInputBox2(params, "Ste_Bldg_Flr_num");
            }
        },
        {
           headerName: "Attach A to Z", minWidth:140, field: "Attach_A_to_Z", editable: true, cellRenderer: function (params) {
                return createDropDownAZ(params, "Attach_A_to_Z", A_Loc_Array_Bulk);
            },
        },
        {
            headerName: "Submit FSR", field: "OnNet", minWidth: 130,
            cellRenderer: function (params) {
                return createCheckBox(params, "OnNet", true);
            }
        },
        {
            headerName: "Submit ONR", field: "OffNet", minWidth: 130, cellRenderer: function (params) {
                return createCheckBox(params, "OffNet", true);
            }
        },
        { 

        field: "Bandwidth", minWidth: 120, editable: true },
               // return createDropDown(params, "Bandwidth", bandwidthArray2, "invalid-cell");
              //  return createDropDown(params, "Bandwidth", bandwidthArray2, "invalid-cell");

               // return params.data.LocationType1 == "Building" ? createDropDown(params, "MultiTenant", multiTenantArray, "invalid-cell") : createDropDown(params, "MultiTenant", multiTenantArray);

            //},
        //},
        {
            headerName: "Class of Service", field: "Class_of_Service", minWidth: 150, cellRenderer: function (params) {
                if (params.data.OnNet == true || params.data.OffNet == true)
                    return createDropDown(params, "Class_of_Service", classofservicetypearray, "invalid-cell");
                else
                    return createDropDown(params, "Class_of_Service", classofservicetypearray);
            }
        },

        {
            headerName: "Interface Speed", field: "Interface_Speed", minWidth: 140, cellRenderer: function (params) {
                if (params.data.OffNet == true)
                    return createDropDown(params, "Interface_Speed", interfacespeedtypearray, "invalid-cell");
                else
                    return createDropDown(params, "Interface_Speed", interfacespeedtypearray);
            }
        },
        {
            headerName: "Proposed Solution", field: "Proposed_Solution", minWidth: 250, cellRenderer: function (params) {
                if (params.data.OnNet == true || params.data.OffNet == true)
                    return createTextArea(params, "Proposed_Solution", "invalid-cell");
                else
                    return createTextArea(params, "Proposed_Solution");
            }
        },


        {
            field: "Diversity", minWidth: 120, cellRenderer: function (params) {
                return createCheckBox(params, "Diversity", true);
            }
        },
        {
           headerName: "Diversity Type", field: "Diversity_Type", minWidth: 200, cellRenderer: function (params) {
                if (params.data.Diversity == true)
                    return createDropDown(params, "Diversity_Type", diversitytypeArray, "invalid-cell");
                else
                    return createDropDown(params, "Diversity_Type", diversitytypeArray);
            }
        },
        {
           headerName: "NearNet Distance", field: "NearNet_Distance", minWidth: 160, cellRenderer: function (params) {
                if (params.data.Location_Type == "NearNet") {
                    return createInputBox(params, "NearNet_Distance", "number", "invalid-cell");
                }
                else {
                    return createInputBox(params, "NearNet_Distance", "number");
                }
            },
        },
        {
            headerName: "NearNet OSP Cost", field: "NearNet_OSP_Cost", minWidth: 160, cellRenderer: function (params) {
                if (params.data.Location_Type == "NearNet") {
                    return createInputBox(params, "NearNet_OSP_Cost", "number", "invalid-cell");
                }
                else {
                    return createInputBox(params, "NearNet_OSP_Cost", "number");
                }
            },
        },
        {
            headerName: "NearNet Equipment Cost", field: "NearNet_Equipment_Cost", minWidth: 160, cellRenderer: function (params) {
                if (params.data.Location_Type == "NearNet") {
                    return createInputBox(params, "NearNet_Equipment_Cost", "number", "invalid-cell");
                }
                else {
                    return createInputBox(params, "NearNet_Equipment_Cost", "number");
                }
            },
        },
        {
            headerName: "Request Completion Date", field: "Request_Completion_Date", minWidth: 160, cellRenderer: function (params) {
                return createInputBox(params, "Request_Completion_Date");
            }

        },

    ],
    defaultColDef: {
        resizable: true,
        minWidth: 80,
        flex: 1,
        filter: true
        //enablePivot: true,
    },
    pagination: true,
    paginationPageSize: 10,
    paginationNumberFormatter: function (params) {
        return '[' + params.value.toLocaleString() + ']';
    },
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    components: {
        customLoadingOverlay: CustomLoadingOverlay,
    },
    loadingOverlayComponent: 'customLoadingOverlay',
    loadingOverlayComponentParams: {
        loadingMessage: 'Loading Rows... Please Wait...',
    },
    //rowHeight: 80,
    rowData: [],

};
function onPageSizeChanged(newPageSize) {
    var value = document.getElementById('page-size').value;
    gridOptions.api.paginationSetPageSize(Number(value));
}

var rowData;
var columns;
function Upload() {
    if (opportunityTypeCheck == true){
        $(".example-header").prependTo(".ag-paging-panel");
        $(".example-header").show();
        var fileUpload = $("#csvfile")[0];
        //var regex = /^([a-zA-Z0-9\(\)\s_\\.\-:])+(.csv|.xls|.xlsx)$/;
        var regex = /^([a-zA-Z0-9\(\)\s_\\.\-:])+(.csv)$/;
        var errorMessage = '';
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    //console.log(e.target.result.split("\n")[0]);
                    var rowHeaders = e.target.result.split("\n")[0].split(',');
                    //console.log(e.target.result);
                    //var rowHeaders = e.target.result;

                    //gridOptions.api.showLoadingOverlay();
                    //setTimeout(function () { buildLocationObj(rows); }, 1000);

                    //if (rowHeaders[1] == "Index" && rowHeaders[2] == "Location Name" && rowHeaders[3] == "Street Address" && rowHeaders[4] == "City" && rowHeaders[5] == "State" && rowHeaders[6] == "Zip" && rowHeaders[7] == "Latitude" && rowHeaders[8]=="Longitude" /*rowHeaders[8].includes("Longitude")*/ && rowHeaders[9] == "Location Type" && rowHeaders[10] == "Primary Use Type" && rowHeaders[11] == "Multi-Tenant" && rowHeaders[12] == "Secondary Address" && rowHeaders[13] == "Secondary Address Value" && rowHeaders[14] == "Submit FSR" && rowHeaders[15] == "Submit ONR" && rowHeaders[16] == "Bandwidth" && rowHeaders[17] == "Interface Speed" && rowHeaders[18] == "Class of Service" && rowHeaders[19] == "Proposed Solution" && rowHeaders[20] == "Build Type" && rowHeaders[21] == "Diversity" && rowHeaders[22] == "Diversity Type" && rowHeaders[23] == "Requested Completion Date"  ) {
                    //    $("#ErrorsDisplay").text("Errors");
                    //    $("#ErrorsDisplay").removeClass('btn-danger');
                    //    $("#ErrorsDisplay").addClass('btn-info');
                        var rows = e.target.result.split("\n").slice(1);
                        if (rows.length > 300)
                            alert("Number of rows in template more than 300, please provide shorter template");
                        else {
                            gridOptions.api.showLoadingOverlay();
                            setTimeout(function () { buildLocationObj(rows); }, 1000);
                        }
                    //}
                    //else {
                    //    //alert("Please upload the correct template");
                    //    $("#ErrorsDisplay").text("1 Error");
                    //    $("#ErrorsDisplay").removeClass('btn-info');
                    //    $("#ErrorsDisplay").addClass('btn-danger');
                    //    document.getElementById("csvfile").value = "";
                    //    showError("Missing column/ incorrect column name in the uploaded CSV. Please refer to the template by downloading it.", 'bulkUploadAlert', '#BulkUploadModel');
                    //}
                                    
                }
                reader.readAsText(fileUpload.files[0]);
            }
        }
    }
    else {
        alert("Please select opportunity type before adding location");
        $('#BulkUploadModel').modal('hide');
    }
}

// wait for the document to be loaded, otherwise
// ag-Grid will not find the div in the document.
document.addEventListener("DOMContentLoaded", function () {
    // lookup the container we want the Grid to use
    var eGridDiv = document.querySelector('#myGrid');
    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions);
});

function buildTableForGrid(data, name) {
    var num = 1;
    rowData = [];
    columns = {
        'A': 'Index',
        'B': 'Select',
        'C': 'Name',
        'D': 'Street',
        'E': 'City',
        'F': 'State',
        'G': 'Zip',
        'H': 'Latitude',
        'I': 'Longitude',
        //'J': 'buildType',
        'J': 'Location_Type',
        'K': 'LocationType1',
        'L': 'LocationSubType',
        'M': 'MultiTenant',
        'N': 'Floor',
        'O': 'Ste_Bldg_Flr',
        'P': 'Ste_Bldg_Flr_num',
        'Q': 'Attach_A_to_Z',
        'R': 'OnNet',
        'S': 'OffNet',
        'T': 'Bandwidth',
        'U': 'Class_of_Service',
        'V': 'Interface_Speed',
        'X': 'Proposed_Solution',
        'Y': 'Diversity',
        'Z': 'Diversity_Type',
        'AA': 'Request_Completion_Date',
        //' ': 'NearNet_Distance',
        //'V': 'NearNet_OSP_Cost',
        //'W': 'NearNet_Equipment_Cost',
    };
    $.each(data, function (index, value) {
        var row = {};
        row[columns['A']] = index;
        row[columns['B']];
        if (name[index]) {
            console.log(name[index]);
            if (name[index].length > 38) {
                row[columns['C']] = "Z - " + num;
                num++;
            }
            else {
                row[columns['C']] = name[index];
            }
        } else {
            row[columns['C']] = "Z - " + num;
            num++
        }
        row[columns['D']] = value['Address'];
        row[columns['E']] = value['City'];
        row[columns['F']] = value['Region'];
        row[columns['G']] = value['Postal'];
        row[columns['H']] = value['latitude'];
        row[columns['I']] = value['longitude'];
        //row[columns['J']] = value['buildType'];
        row[columns['J']] = value['Location_Type'];
        row[columns['K']] = value['LocationType1'];
        row[columns['L']] = value['LocationSubType'];
        row[columns['M']] = value['MultiTenant'];
        row[columns['N']] = value['Floor'];
        row[columns['O']] = value['Ste_Bldg_Flr'];
        row[columns['P']] = value['Ste_Bldg_Flr_num'];
        //row[columns['Q']] = value['Attach_A_to_Z'];
        //row[columns['P']];
        row[columns['R']] = value['OnNet'];
        row[columns['S']] = value['OffNet'];
        row[columns['T']] = value['Bandwidth'];
        row[columns['U']] = value['Class_of_Service'];
        row[columns['V']] = value['Interface_Speed'];
        row[columns['X']] = value['Proposed_Solution'];
        row[columns['Y']] = value['Diversity'];
        row[columns['Z']] = value['Diversity_Type'];
        row[columns['AA']] = value['Request_Completion_Date'];
       // row[columns['W']];
       // row[columns['R']] = value[''];
        rowData.push(row);
    });
    gridOptions.api.setRowData(rowData);
    gridOptions.rowData = rowData;
    gridOptions.api.hideOverlay();
}
function modelOpen() {
    $('#myModal').modal('show');
}

function createCheckBox(params, fieldname, isRedraw) {
    var input = document.createElement('input');
    input.type = "checkbox";
    input.checked = params.value;
    input.addEventListener('click', function (event) {
        params.value = !params.value;
        params.node.data[fieldname] = params.value;
        if (isRedraw) {
            callRedraw(params.rowIndex);
        }
    });
    return input;
}

function createDropDown(params, fieldname, array, onInitClass, isRedraw) {
    var select = document.createElement("select");
    select.setAttribute("class", "form-control");
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.text = array[i];
        option.value = array[i];
        select.appendChild(option);
    }
    //array.map(item => {
    //    var option = document.createElement("option");
    //    option.text = item;
    //    option.value = item;
    //    select.appendChild(option);
    //});

    select.addEventListener("change", function (event) {
        if (event) {
            //console.log(event.target.value);
            params.node.data[fieldname] = event.target.value;
            params.value = event.target.value;
            if (onInitClass && onInitClass != null) {
                if (params.value == "")
                    select.classList.add('invalid-cell');
                else
                    select.classList.remove('invalid-cell');
            }
            if (isRedraw) {
                callRedraw(params.rowIndex);
            }
        }
    });
    select.value = params.value ? params.value : '';
    if (onInitClass && onInitClass != null) {
        if (select.value == "")
            select.classList.add('invalid-cell');
        else
            select.classList.remove('invalid-cell');
    }
    return select;
}

function createInputBox2(params, fieldName, onInitClass) {
    var input = document.createElement('input');
    input.type = "text";
    input.setAttribute("class", "form-control");
    input.value = params.value;
    input.addEventListener("change", function (event) {
        if (event) {
            params.node.data[fieldName] = event.target.value;
            params.value = event.target.value;
            if (onInitClass && onInitClass != null) {
                if (params.value == "")
                    input.classList.add('invalid-cell');
                else
                    input.classList.remove('invalid-cell');
            }
            if (isRedraw) {
                callRedraw(params.rowIndex);
            }
        }
    });
    if (onInitClass && onInitClass != null) {
        if (input.value == "")
            input.classList.add('invalid-cell');
        else
            input.classList.remove('invalid-cell');
    }
    return input;
}

function createTextArea(params, fieldName, onInitClass) {
    var textArea = document.createElement("TEXTAREA");
    textArea.rows = 1;
    textArea.cols = 30;
    textArea.maxLength = 100;
    textArea.setAttribute("class", "form-control");
    textArea.addEventListener("change", function (event) {
        if (event) {
            params.node.data[fieldName] = event.target.value;
            params.value = event.target.value;
            if (onInitClass && onInitClass != null) {
                if (params.value == "")
                    textArea.classList.add('invalid-cell');
                else
                    textArea.classList.remove('invalid-cell');
            }

        }
    });
    textArea.textContent = params.value ? params.value : '';
    if (onInitClass && onInitClass != null) {
        if (textArea.textContent == "")
            textArea.classList.add('invalid-cell');
        else
            textArea.classList.remove('invalid-cell');
    }
    return textArea;
}

function createInputBox(params, fieldName, parameterType, onInitClass) {
    var input = document.createElement('input');
    input.type = parameterType;
    input.setAttribute("class", "form-control");
    input.addEventListener('change', function (event) {
        if (event) {
            params.node.data[fieldName] = event.target.value;
            params.value = event.target.value;
            if (onInitClass && onInitClass != null) {
                if (params.value == "")
                    input.classList.add('invalid-cell');
                else
                    input.classList.remove('invalid-cell');
            }
        }
    });
    input.value = params.value ? params.value : '';
    if (onInitClass && onInitClass != null) {
        if(input.value == '')
            input.classList.add('invalid-cell');
        else
            input.classList.remove('invalid-cell');
    }
    return input;
}

function createDropDownAZ(params, fieldName, A_Loc_Array_Bulk){
    var select = document.createElement("select");
    select.setAttribute("class", "form-control");
    for (var key in A_Loc_Array_Bulk) {
        if (key != "") {
            var option = document.createElement("option");
            option.text = A_Loc_Array_Bulk[key];
            option.value = key;
            select.appendChild(option);
        }
    }
    select.addEventListener("change", function (event) {
        if (event) {
            //console.log(event.target.value);
            params.node.data[fieldName] = event.target.value;
            params.value = event.target.value;
        }
    });
    select.value = params.value ? params.value : '';
    return select;
}

function callRedraw(index) {
    var row = gridOptions.api.getDisplayedRowAtIndex(index);
    gridOptions.api.redrawRows({ rowNodes: [row] });
}