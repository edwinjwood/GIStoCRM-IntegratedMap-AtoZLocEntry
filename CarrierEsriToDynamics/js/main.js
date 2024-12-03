//!!    Shree Ganeshay Namah    !!
$(window).load(function () {
    // Animate loader off screen
    
    //$(".loader").fadeIn("slow").delay(5000).hide(0);
    //$(".loader2").fadeIn("slow").delay(5000).hide(0);
    //$("#viewDiv").prop('disabled', true);
    //document.body.style.background = "url('https://www.segra.com/wp-content/uploads/2019/01/logo.png') no-repeat center"
   // $('#viewDiv').hide()
    $('#initModal').modal('show');

});



//var settings = {
//    "async": true,
//    "crossDomain": true,
//    "url": "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=1500%20Hampton%20Street%2C%20Columbia%2C%20SC%2029201&outFields=Match_addr%2C%20Addr_type",
//    "method": "GET",
//    "headers": {

//    }
//}

//$.ajax(settings).done(function (response) {
//    console.log(response);
//});


var ExistingLocations;


var AllTheLocations = [];
var userName;
var SLAZ;
var location_string = " ";
var loc_string = " ";
var webmap;
var view;
var search;
var lat;
var checkboxList = 0;
var long;
var StringForCard = "";
var LocAZ = 0;
var popupTitle = "A Location";
var popupContent = "<br><button onclick='RedirectToSearch()' type='button' class='btn btn-primary btn-md' id='ALoc' > Add A Location </button>";
var wantToAddLocFlag = 0;
var LocationInfoString = "";
var LocationID = 0;
var RowNotAdded = 0;


var JSONLocArrayCSV = {}, LocCart = [];
function ExistingOppEvent() {
    document.getElementById('NewOppbutton').style.display = 'none';
    document.getElementById('oppIdfornew').style.display = 'block';
}
function searchOpp() {
    var existingoppid = document.getElementById('oppID').value;
    $.ajax({
        type: 'POST',
        url: 'map.aspx/GetOppInfo?existingoppid=' + existingoppid,
        data: JSON.stringify({ existingoppid: existingoppid }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            // Do something interesting here.
            console.log("Test ");
            
            console.log(msg.d);
            
             
            ExistingLocations= jQuery.parseJSON(msg.d);
            console.log("Here inside JSON");
            console.log(ExistingLocations.length);
            if (ExistingLocations.length == 0) {
                $('#initModal').modal('hide');
                document.getElementById('viewDiv').style.opacity = 1;
            }
            else {
                var innerattributes = {}, records1 = [];
                var outAttribute = {};
                for (var i = 0; i < ExistingLocations.length; i++) {
                    console.log("ID " + i + " = " + ExistingLocations[i].id);
                    console.log("locAddress " + i + " = " + ExistingLocations[i].locAddress);
                    console.log("name  " + i + " = " + ExistingLocations[i].name);
                    console.log("locationtype  " + i + " = " + ExistingLocations[i].locationtype);
                    var add = ExistingLocations[i].locAddress;
                    
                    var addressArray = add.split(', ');
                    
                    innerattributes.Address = addressArray[0];
                    innerattributes.City = addressArray[1];
                    innerattributes.Region =addressArray[2];
                    innerattributes.Postal = addressArray[3];
                    outAttribute.attributes = innerattributes;
                    records1.push(outAttribute);
                    outAttribute = {};
                    innerattributes = {};
                }
                var completerecords = {};
                completerecords.records = records1;
                console.log("test here");
                console.log(JSON.stringify(completerecords))
                var stringRecords = JSON.stringify(completerecords);
                var locations = getLatLong(completerecords);
                console.log(locations);
                for (var i = 0; i < ExistingLocations.length; i++) {
                    ExistingLocations[i].Latitude = locations[i].latitude;
                    ExistingLocations[i].Longitude = locations[i].longitude;
                    ExistingLocations[i].LocationsAlreadyThere = "YES";
                }
                //console.log(ExistingLocations);
                addExistingLocationToCart(ExistingLocations);
                $('#initModal').modal('hide');
                document.getElementById('viewDiv').style.opacity = 1;
            }
        }
    });
}


function addExistingLocationToCart(ExistingLocations) {
    console.log("Inside add to location button");
    console.log(ExistingLocations);
    for (var i = 0; i < ExistingLocations.length; i++) {
        var listLength = $('#list div').length;
        var add = ExistingLocations[i].locAddress;
        var split_address =  add.split(', ');
        var listItem = '<div class="cardDiv"><img class="cardButton" name="' + ExistingLocations[i].name + '" onclick="removeLocation(event)" src="img/remove.png" /> ' + ExistingLocations[i].name + '<p style="font-size:11px; padding-left:30px;">' + split_address[0] + ', ' + split_address[1] + ', ' + split_address[2] + ', ' + split_address[3] + '</p>' + ' </div>';
        $('#some_div').append(listItem);
    }
    $('#cardDisplay').show();
}

function getLatLong(completeObj) {
    var token = getTokken();
    var response;
    var newLocationObj = [];
    if (completeObj) {
        $.each(completeObj.records, function (index, value) {
            var stringRecords = JSON.stringify(value);
            var newUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?addresses={records:[" + stringRecords + "]}&sourceCountry=USA&token=" + token + "&f=pjson";
            var newencuri = encodeURI(newUrl)
            console.log(newUrl);
            $.ajax({
                async: false,
                global: false,

                url: newencuri,
                dataType: 'json',
                data: {
                    'request': "", 'target': 'arrange_url', 'method': 'method_target'
                },
                type: 'POST',
                success: function (data) {
                    var arrayData = data.locations;
                    console.log(arrayData);
                    $.each(arrayData, function (index, value) {
                        var indexID = value.attributes.ResultID;
                        var addressArray = value.address.split(', ');
                        var fullObj = {};
                        fullObj['index'] = parseInt(indexID);
                        fullObj['address'] = addressArray[0];
                        fullObj['city'] = addressArray[1];
                        fullObj['region'] = addressArray[2];
                        fullObj['postal'] = addressArray[3];
                        fullObj['longitude'] = value.location['x'];
                        fullObj['latitude'] = value.location['y'];
                       // console.log(fullObj);
                        newLocationObj.push(fullObj);

                    });
                },
                error: function (e) {
                    alert('Error: ' + e.message);
                }
            });
        });
    }
    //console.log(newLocationObj);
    var finalLocation =newLocationObj;
    //console.log(finalLocation);

    return finalLocation;
}

function Upload() {
   
    var fileUpload = document.getElementById("csvfile");

    var regex = /^([a-zA-Z0-9\(\)\s_\\.\-:])+(.csv|.txt)$/;

    if (regex.test(fileUpload.value.toLowerCase())) {

        if (typeof (FileReader) != "undefined") {

            var reader = new FileReader();

            reader.onload = function (e) {               

                var rows = e.target.result.split("\n");
                console.log("rowssss......lengthhhhhhhh " + rows.length);
                for (var i = 1; i < rows.length-1; i++) {
                    console.log("*************************");
                    var cells = rows[i].split(",");
                    if (cells.length == 0) {

                    }
                    if (cells.length > 8) {
                        RowNotAdded++;
                        console.log("Unable to read this ");
                    }
                    else { 
                        //console.log(row[i]);
                        
                        console.log("length of celllssssssssssssss **** ==== " + cells.length);
                        console.log("*************************");
                        console.log(cells[0]);
                        console.log(cells[1]);
                        console.log(cells[2]);
                        console.log(cells[3]);
                        console.log(cells[4]);
                        JSONLocArrayCSV.Index = cells[0];
                        if (cells[1] == null || cells[1] == "" || cells[1] == undefined || cells[1].length == 0) {
                            JSONLocArrayCSV.Name = "Z" + i;
                        }
                        else if (cells[1].length > 38) {
                            JSONLocArrayCSV.Name = "Z" + i;
                        }
                        else {
                            JSONLocArrayCSV.Name = cells[1];
                        }
                        if (cells[2].length == 0 && cells[3].length == 0 && (cells[6].length !=0 && cells[7].length!=0)) {
                            // Reverse Geocoding the address .. 
                            var lattlloong = cells[7] + "," + cells[6];
                            var r_output = reverseGeocode(lattlloong);
                            var r_add = r_output[0];
                            var r_city = r_output[1];
                            var r_state = r_output[2];
                            var r_zip = r_output[3];
                            JSONLocArrayCSV.StAddress = r_add;
                            JSONLocArrayCSV.City = r_city;
                            JSONLocArrayCSV.State = r_state;
                            JSONLocArrayCSV.Zip = r_zip;
                            JSONLocArrayCSV.Lat = cells[6];
                            JSONLocArrayCSV.Lon = cells[7];
                            //JSONLocArrayCSV.CustomerLat = 
                        }
                        else {
                            JSONLocArrayCSV.StAddress = cells[2];
                            JSONLocArrayCSV.City = cells[3];
                            JSONLocArrayCSV.State = cells[4];
                            JSONLocArrayCSV.Zip = cells[5];
                            JSONLocArrayCSV.Lat = cells[6];
                            JSONLocArrayCSV.Lon = cells[7];
                            JSONLocArrayCSV.CustomerLat = cells[6];
                            JSONLocArrayCSV.CustomerLon = cells[7];
                        }
                        
                        
                        //JSONLocArrayCSV.Fiber = cells[8];
                        //JSONLocArrayCSV.Offnet = cells[9];
                        //JSONLocArrayCSV.Eoc = cells[10];
                        //JSONLocArrayCSV.Product = cells[11];
                        //JSONLocArrayCSV.Bandwidth = cells[12];
                        //console.log(JSONLocArrayCSV)
                        LocCart.push(JSONLocArrayCSV);
                        JSONLocArrayCSV = {};
                    }
                }
                console.log("I am here");
                console.log(LocCart);
                console.log("Done from here");
                console.log(rows.length);
                var innerattributes = {}, records1 = [];
                var outAttribute = {};
                for (var j = 0; j < LocCart.length ; j++) {
                    //if (LocCart[j].Lat.length == 0 || LocCart[j].Lon.length == 0) {
                        innerattributes.OBJECTID = j + 1;
                        innerattributes.Address = LocCart[j].StAddress;
                        innerattributes.City = LocCart[j].City;
                        innerattributes.Region = LocCart[j].State;
                        innerattributes.Postal = LocCart[j].Zip;
                        outAttribute.attributes = innerattributes;
                        records1.push(outAttribute);
                        outAttribute = {};
                        innerattributes = {};
                  //  }
                  //  else {
                        console.log("@$$$#$#$#$($)#$ I am ahere KUJHKJHK");
                   // }
                }
                var completerecords = {};
                completerecords.records = records1;
                console.log(JSON.stringify(completerecords))
                var stringRecords = JSON.stringify(completerecords);
                

                //var dvCSV = document.getElementById("output");

                //dvCSV.innerHTML = "";

                //dvCSV.appendChild(table);
                var token = getTokken();
                console.log("Got the token = " + token);
                var newUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?addresses=" + stringRecords + "&sourceCountry=USA&token=" + token + "&f=pjson";
                console.log(newUrl);

                $.ajax({
                    async: false,
                    global: false,
                    url: newUrl,
                    dataType: 'json',
                    data: {
                        'request': "", 'target': 'arrange_url', 'method': 'method_target'
                    },
                    type: 'POST',
                    success: function (data) {
                        console.log(data);
                        console.log(data.locations.length);
                        var arraylength = data.locations.length;
                        for (var i = 0; i < arraylength; i++){
                            console.log(data.locations[i].location.x);
                            LocCart[i].Lon = data.locations[i].location.x;
                            console.log(data.locations[i].location.y);
                            LocCart[i].Lat = data.locations[i].location.y;
                        }

                    },
                    error: function (e) {
                        alert('Error Unable to geocode: ' + e);
                    }
                });
                console.log("Print hoja bhai");
                console.log(LocCart);
                console.log(LocCart.length);
                var table = document.getElementById("tableAddRow");


                

                for (var j = 0; j < LocCart.length ; j++) {

                    //Create and append select list
                    var selectList = document.createElement("select");
                    selectList.setAttribute("id", "product_select_" + j);
                    selectList.setAttribute("data-row", j);
                    var option = document.createElement("option");
                    option.setAttribute("value", "DIA");
                    option.text = "DIA";
                    selectList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "Dark Fiber");
                    option.text = "Dark Fiber";
                    selectList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "EPL");
                    option.text = "EPL";
                    selectList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "EVPL");
                    option.text = "EVPL";
                    selectList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "Transport");
                    option.text = "Transport/Back Haul";
                    selectList.appendChild(option);

                    console.log("Insert in the table = " + j);

                    //Create and append bandwidth list
                    var bandwidthList = document.createElement("select");
                    bandwidthList.setAttribute("id", "bandwidth_select_" + j);
                    bandwidthList.setAttribute("data-row-num", j);
                    //bandwidthList.style.display = "block";

                    var option = document.createElement("option");
                    option.setAttribute("value", "2");
                    option.text = "2MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "3");
                    option.text = "3MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "5");
                    option.text = "5MB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "6");
                    option.text = "6MB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "10");
                    option.text = "10MB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "20");
                    option.text = "20MB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "30");
                    option.text = "30MB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "40");
                    option.text = "40MB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "50");
                    option.text = "50MB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "60");
                    option.text = "60MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "70");
                    option.text = "70MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "80");
                    option.text = "80MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "90");
                    option.text = "90MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "100");
                    option.text = "100MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "150");
                    option.text = "150MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "200");
                    option.text = "200MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "250");
                    option.text = "250MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "300");
                    option.text = "300MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "350");
                    option.text = "350MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "400");
                    option.text = "400MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "450");
                    option.text = "450MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "500");
                    option.text = "500MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "550");
                    option.text = "550MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "600");
                    option.text = "600MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "650");
                    option.text = "650MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "700");
                    option.text = "700MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "750");
                    option.text = "750MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "800");
                    option.text = "800MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "850");
                    option.text = "850MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "900");
                    option.text = "900MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "950");
                    option.text = "950MB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "1000");
                    option.text = "1GB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "2000");
                    option.text = "2GB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "3000");
                    option.text = "3GB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "4000");
                    option.text = "4GB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "5000");
                    option.text = "5GB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "6000");
                    option.text = "6GB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "7000");
                    option.text = "7GB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "8000");
                    option.text = "8GB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "9000");
                    option.text = "9GB";
                    bandwidthList.appendChild(option);

                    var option = document.createElement("option");
                    option.setAttribute("value", "10000");
                    option.text = "10GB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "100000");
                    option.text = "100GB";
                    bandwidthList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "none");
                    option.text = "";
                    bandwidthList.appendChild(option);


                    var fiberOnChecked = document.createElement("INPUT");
                    fiberOnChecked.setAttribute("type", "checkbox");
                    fiberOnChecked.setAttribute("id", "fiberOnChecked_"+j);
                    //fiberOnChecked.style.textAlign = "center";

                    var fiberOffChecked = document.createElement("INPUT");
                    fiberOffChecked.setAttribute("type", "checkbox");
                    fiberOffChecked.setAttribute("id", "fiberOffChecked_" + j);

                    var eocChecked = document.createElement("INPUT");
                    eocChecked.setAttribute("type", "checkbox");
                    eocChecked.setAttribute("id", "eocChecked_" + j);

                    var IncludeLocChecked = document.createElement("INPUT");
                    IncludeLocChecked.setAttribute("type", "checkbox");
                    IncludeLocChecked.setAttribute("id", "IncludeLocChecked_" + j);

                    var streetAdd = document.createElement("INPUT");
                    streetAdd.setAttribute("type", "text");
                    streetAdd.setAttribute("id", "streetAdd_" + j);
                    streetAdd.setAttribute("value", LocCart[j].StAddress);
                    streetAdd.setAttribute("disabled", "true");
                   
                    var NameAdd = document.createElement("INPUT");
                    NameAdd.setAttribute("type", "text");
                    NameAdd.setAttribute("id", "NameAdd_" + j);
                    NameAdd.setAttribute("value", LocCart[j].Name);
                    NameAdd.setAttribute("maxlength", 39);
                    NameAdd.style.width= "100%";

                    var CityAdd = document.createElement("INPUT");
                    CityAdd.setAttribute("type", "text");
                    CityAdd.setAttribute("id", "CityAdd_" + j);
                    CityAdd.setAttribute("value", LocCart[j].City);
                    CityAdd.setAttribute("disabled", "true");
                    

                    var StateAdd = document.createElement("INPUT");
                    StateAdd.setAttribute("type", "text");
                    StateAdd.setAttribute("id", "StateAdd_" + j);
                    StateAdd.setAttribute("value", LocCart[j].State);
                    StateAdd.setAttribute("disabled", "true");
                    StateAdd.style.width = "100%";

                    var ZipAdd = document.createElement("INPUT");
                    ZipAdd.setAttribute("type", "text");
                    ZipAdd.setAttribute("id", "ZipAdd_" + j);
                    ZipAdd.setAttribute("value", LocCart[j].Zip);
                    ZipAdd.setAttribute("disabled", "true");

                    var LatAdd = document.createElement("INPUT");
                    LatAdd.setAttribute("type", "text");
                    LatAdd.setAttribute("id", "LatAdd_" + j);
                    LatAdd.setAttribute("value", LocCart[j].Lat);
                    
                    var LonAdd = document.createElement("INPUT");
                    LonAdd.setAttribute("type", "text");
                    LonAdd.setAttribute("id", "LonAdd_" + j);
                    LonAdd.setAttribute("value", LocCart[j].Lon);
                    
                    //Create and append locationtype list
                    var locationTypeList = document.createElement("select");
                    locationTypeList.setAttribute("id", "locationtype_select_" + j);
                    locationTypeList.setAttribute("data-row-num", j);
                    //bandwidthList.style.display = "block";

                    var option = document.createElement("option");
                    option.setAttribute("value", " ");
                    option.text = " ";
                    locationTypeList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "New");
                    option.text = "New";
                    locationTypeList.appendChild(option);
                    var option = document.createElement("option");
                    option.setAttribute("value", "Existing");
                    option.text = "Existing";
                    locationTypeList.appendChild(option);

                    var row = table.insertRow(j+1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1)
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);
                    var cell8 = row.insertCell(7);
                    var cell9 = row.insertCell(8);
                    var cell10 = row.insertCell(9);
                    var cell11 = row.insertCell(10);
                    var cell12 = row.insertCell(11);
                    var cell13 = row.insertCell(12);
                    var cell14 = row.insertCell(13);
                    var cell15 = row.insertCell(14);

                    cell1.innerHTML = j;
                    cell2.appendChild(IncludeLocChecked);
                    cell3.appendChild(NameAdd);
                    cell4.appendChild(streetAdd);
                    cell5.appendChild(CityAdd);
                    cell6.appendChild(StateAdd);
                    cell7.appendChild(ZipAdd);
                    cell8.appendChild(fiberOnChecked);
                    cell9.appendChild(fiberOffChecked);
                    cell10.appendChild(eocChecked);
                    cell11.appendChild(selectList);
                    cell12.appendChild(bandwidthList);
                    cell13.appendChild(locationTypeList);
                    
                    //cell13.style.display = "block";
                    cell14.appendChild(LatAdd);
                    
                    cell15.appendChild(LonAdd)
                    //cell14.style.display = "block";
                }

                if (RowNotAdded == 0) {

                }
                else{
                    alert("Unable to add " + RowNotAdded + " row, due to formating issues");
                    //reverseGeocode();
                }
                
                for (var j = 0; j < LocCart.length ; j++) {
                    var table = document.getElementById("tableAddRow");
                    var street_missing = document.getElementById("streetAdd_" + j).value;
                    var city_missing = document.getElementById("CityAdd_" + j).value;
                    var state_missing = document.getElementById("StateAdd_" + j).value;
                    var zip_missing = document.getElementById("ZipAdd_" + j).value;
                    var lat_missing = document.getElementById("LatAdd_" + j).value;
                    var lon_missing = document.getElementById("LonAdd_" + j).value;
                    var location_type_missing = document.getElementById("locationtype_select_" + j).value;
                    if (street_missing.length == 0 || city_missing.length == 0 || state_missing.length == 0 ||
                        zip_missing.length == 0 || lat_missing.length == 0 || lon_missing.length == 0 ) {
                        //$("#IncludeLocChecked_" + j).hide();
                        $("#streetAdd_" + j).attr("disabled", false);
                        $("#CityAdd_" + j).attr("disabled", false);
                        $("#ZipAdd_" + j).attr("disabled", false);
                        $("#StateAdd_" + j).attr("disabled", false);
                        table.rows[j + 1].style.backgroundColor = "red";
                    }
                }


                //Event Listener for all locations select
                var checkbox = document.querySelector("input[id=selectAll]");

                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("IncludeLocChecked_" + j).checked = true;
                        }
                    } else {
                        // Checkbox is not checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("IncludeLocChecked_" + j).checked = false;
                        }
                    }
                });
                //Event Listener for all eoc select
                var checkbox = document.querySelector("input[id=selectAllOnNet]");

                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("fiberOnChecked_" + j).checked = true;
                        }
                    } else {
                        // Checkbox is not checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("fiberOnChecked_" + j).checked = false;
                        }
                    }
                });

                //Event listner for all onnet select
                var checkbox = document.querySelector("input[id=selectAllOffNet]");

                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("fiberOffChecked_" + j).checked = true;
                        }
                    } else {
                        // Checkbox is not checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("fiberOffChecked_" + j).checked = false;
                        }
                    }
                });

                //Event listner for all offnet select
                var checkbox = document.querySelector("input[id=selectAllEoc]");

                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("eocChecked_" + j).checked = true;
                        }
                    } else {
                        // Checkbox is not checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("eocChecked_" + j).checked = false;
                        }
                    }
                });

                //Event listner for all Product select
                var productSelectAll = document.querySelector("select[id=selectAllProduct]");

                productSelectAll.addEventListener('change', function () {
                    if (productSelectAll.value == "Dark Fiber") {
                        // Checkbox is checked..
                        document.getElementById("selectAllBandWidth").value = "none";
                        $("#selectAllBandWidth").hide();
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("product_select_" + j).value = "Dark Fiber";
                            document.getElementById("bandwidth_select_" + j).value = "none";
                            $("#bandwidth_select_" + j).hide();
                            
                        }
                    }
                    if (productSelectAll.value == "DIA") {
                        // Checkbox is checked..
                        document.getElementById("selectAllBandWidth").value = "2";
                        $("#selectAllBandWidth").show();
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("product_select_" + j).value = "DIA";
                            document.getElementById("bandwidth_select_" + j).value = "2";
                            $("#bandwidth_select_" + j).show();
                        }
                    }
                    if (productSelectAll.value == "EPL") {
                        // Checkbox is checked..
                        document.getElementById("selectAllBandWidth").value = "2";
                        $("#selectAllBandWidth").show();
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("product_select_" + j).value = "EPL";
                            document.getElementById("bandwidth_select_" + j).value = "2";
                            $("#bandwidth_select_" + j).show();
                        }
                    }
                    if (productSelectAll.value == "EVPL") {
                        // Checkbox is checked..
                        document.getElementById("selectAllBandWidth").value = "2";
                        $("#selectAllBandWidth").show();
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("product_select_" + j).value = "EVPL";
                            document.getElementById("bandwidth_select_" + j).value = "2";
                            $("#bandwidth_select_" + j).show();
                        }
                    }
                    if (productSelectAll.value == "Transport") {
                        // Checkbox is checked..
                        document.getElementById("selectAllBandWidth").value = "2";
                        $("#selectAllBandWidth").show();
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("product_select_" + j).value = "Transport";
                            document.getElementById("bandwidth_select_" + j).value = "2";
                            $("#bandwidth_select_" + j).show();
                        }
                    }
                });


                //Event listner for all Product select
                var bandwidthSelectAll = document.querySelector("select[id=selectAllBandWidth]");

                bandwidthSelectAll.addEventListener('change', function () {
                    if (bandwidthSelectAll.value == "2") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "2";
                        }
                    }
                    if (bandwidthSelectAll.value == "3") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "3";
                        }
                    }
                    if (bandwidthSelectAll.value == "5") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "5";
                        }
                    }
                    if (bandwidthSelectAll.value == "6") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "6";
                        }
                    }
                    if (bandwidthSelectAll.value == "10") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "10";
                        }
                    }
                    if (bandwidthSelectAll.value == "20") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "20";
                        }
                    }
                    if (bandwidthSelectAll.value == "30") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "30";
                        }
                    }
                    if (bandwidthSelectAll.value == "40") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "40";
                        }
                    }
                    if (bandwidthSelectAll.value == "50") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "50";
                        }
                    }

                    if (bandwidthSelectAll.value == "60") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "60";
                        }
                    }

                    if (bandwidthSelectAll.value == "70") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "70";
                        }
                    }

                    if (bandwidthSelectAll.value == "80") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "80";
                        }
                    }

                    if (bandwidthSelectAll.value == "90") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "90";
                        }
                    }

                    if (bandwidthSelectAll.value == "100") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "100";
                        }
                    }

                    if (bandwidthSelectAll.value == "150") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "150";
                        }
                    }

                    if (bandwidthSelectAll.value == "200") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "200";
                        }
                    }

                    if (bandwidthSelectAll.value == "250") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "250";
                        }
                    }

                    if (bandwidthSelectAll.value == "300") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "300";
                        }
                    }

                    if (bandwidthSelectAll.value == "350") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "350";
                        }
                    }

                    if (bandwidthSelectAll.value == "400") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "400";
                        }
                    }

                    if (bandwidthSelectAll.value == "450") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "450";
                        }
                    }

                    if (bandwidthSelectAll.value == "500") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "500";
                        }
                    }

                    if (bandwidthSelectAll.value == "550") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "550";
                        }
                    }

                    if (bandwidthSelectAll.value == "600") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "600";
                        }
                    }

                    if (bandwidthSelectAll.value == "650") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "650";
                        }
                    }

                    if (bandwidthSelectAll.value == "700") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "700";
                        }
                    }

                    if (bandwidthSelectAll.value == "750") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "750";
                        }
                    }

                    if (bandwidthSelectAll.value == "800") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "800";
                        }
                    }

                    if (bandwidthSelectAll.value == "850") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "850";
                        }
                    }

                    if (bandwidthSelectAll.value == "900") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "900";
                        }
                    }

                    if (bandwidthSelectAll.value == "950") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "950";
                        }
                    }

                    if (bandwidthSelectAll.value == "1000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "1000";
                        }
                    }
                    if (bandwidthSelectAll.value == "2000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "2000";
                        }
                    }

                    if (bandwidthSelectAll.value == "3000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "3000";
                        }
                    }

                    if (bandwidthSelectAll.value == "4000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "4000";
                        }
                    }

                    if (bandwidthSelectAll.value == "5000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "5000";
                        }
                    }

                    if (bandwidthSelectAll.value == "6000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "6000";
                        }
                    }

                    if (bandwidthSelectAll.value == "7000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "7000";
                        }
                    }

                    if (bandwidthSelectAll.value == "8000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "8000";
                        }
                    }

                    if (bandwidthSelectAll.value == "9000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "9000";
                        }
                    }

                    if (bandwidthSelectAll.value == "10000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "10000";
                        }
                    }

                    if (bandwidthSelectAll.value == "100000") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "100000";
                        }
                    }
                    if (bandwidthSelectAll.value == "none") {
                        // Checkbox is checked..
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("bandwidth_select_" + j).value = "none";
                        }
                    }
                });


                //Event listner for all Location Type select
                var locationtypeSelectAll = document.querySelector("select[id=selectLocationType]");

                locationtypeSelectAll.addEventListener('change', function () {
                    if (locationtypeSelectAll.value == " ") {
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("locationtype_select_" + j).value = " ";
                        }
                    }
                    if (locationtypeSelectAll.value == "New") {
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("locationtype_select_" + j).value = "New";
                        }
                    }
                    if (locationtypeSelectAll.value == "Existing") {
                        for (var j = 0; j < LocCart.length ; j++) {
                            document.getElementById("locationtype_select_" + j).value = "Existing";
                        }
                    }
                });


                for (var j = 0; j < LocCart.length ; j++) {

                    $("#product_select_" + j).on('change', function () {
                        console.log($(this).val() + j);
                        var row = $(this).data("row");
                        console.log(row);
                        if ($(this).val() == "Dark Fiber") {
                            document.getElementById("bandwidth_select_" + row).value = "none";
                            $("#bandwidth_select_" + row).hide();
                        }

                        else {
                            document.getElementById("bandwidth_select_" + row).value = "2";
                            $("#bandwidth_select_" + row).show();
                        }
                    });


                }
                console.log("Printed the result");
            }
           
            reader.readAsText(fileUpload.files[0]);
            console.log("Done Uploading");
        } else {

            alert("This browser does not support HTML5.");

        }

    } else {

        alert("Please upload a valid CSV file.");

    }
    RowNotAdded = 0;
}



function addAllLocationFromTableToCart() {
    console.log("Adding location to cart and dismissing the modal");
    $('#BulkUploadModel').modal('hide');
    console.log(LocCart.length);
    var NotAdded = [];
    for (var j = 0; j < LocCart.length ; j++) {
        var LocSelected = document.getElementById("IncludeLocChecked_" + j).checked;
        if (LocSelected == true) {
            var NameSelected = document.getElementById("NameAdd_" + j).value;
            var StreetSelected = document.getElementById("streetAdd_" + j).value;
            var CitySelected = document.getElementById("CityAdd_" + j).value;
            var StateSelected = document.getElementById("StateAdd_" + j).value;
            var ZipSelected = document.getElementById("ZipAdd_" + j).value;
            var ProductSelected = document.getElementById("product_select_" + j).value;
            var BandwidthSelected = document.getElementById("bandwidth_select_" + j).value;
            var LatSelected = document.getElementById("LatAdd_" + j).value;
            var LonSelected = document.getElementById("LonAdd_" + j).value;
            var LocationTypeSelected = document.getElementById("locationtype_select_" + j).value;
            var FibOnSelected = document.getElementById("fiberOnChecked_" + j).checked;
            var FibOffSelected = document.getElementById("fiberOffChecked_" + j).checked;
            var EocSelected = document.getElementById("eocChecked_" + j).checked;
            var LatLongZ = LatSelected + ", " + LonSelected;
            var AddressZ = StreetSelected + ", " + CitySelected + ", " + StateSelected + ", " + ZipSelected;

            if (StreetSelected.length == 0 || CitySelected.length == 0 || StateSelected.length == 0 ||
                ZipSelected.length == 0 || LatSelected.length == 0 || LonSelected.length == 0 || LocationTypeSelected == " ") {
                NotAdded.push(j);
            }
            else{

            console.log(NameSelected);
            console.log(AddressZ);
            console.log(StreetSelected);
            console.log(CitySelected);
            console.log(StateSelected);
            console.log(ZipSelected);
            console.log(ProductSelected);
            console.log(BandwidthSelected);
            console.log(LatSelected);
            console.log(LonSelected);
            console.log(FibOnSelected);
            console.log(FibOffSelected);
            console.log(EocSelected);
            

            // add to card
            var fiber = false;
            var eoc = false;
            var offnet = false;
            var Region = "Carrier";
            var npanxx = "111111";
            console.log(" Service Location Name " + NameSelected);
            if (NameSelected == undefined || NameSelected == null || NameSelected.length == 0) {
                alert("Enter The Location Z Name");
            }
            else if (LocationTypeSelected == " ") {
                alert("Select the Location Type");
            }
            else {
                StringForCard = NameSelected + " - " + LocationTypeSelected + ", "+ ProductSelected + " ";
                LocationInfoString = NameSelected + ", " + LocationTypeSelected + ", " +AddressZ + ", " + LatLongZ + ", " + npanxx + ", " + ProductSelected + ", ";
                LocationInfoString = LocationInfoString + BandwidthSelected + "Mb, " + Region + ", ";
                //StringForCard = StringForCard + band + "Mb ";
                if (FibOnSelected == true) {
                    LocationInfoString = LocationInfoString + "Fiber" + ", ";
                    StringForCard = StringForCard + " Fiber";
                    fiber = true;
                }
                if (EocSelected == true) {
                    LocationInfoString = LocationInfoString + "EOC" + ", ";
                    StringForCard = StringForCard + "  EOC";
                    eoc = true;
                }
                if (FibOffSelected == true) {
                    LocationInfoString = LocationInfoString + "Offnet";
                    StringForCard = StringForCard + "  Offnet";
                    offnet = true;
                }


                var LocationObject = {
                    'ID': LocationID,
                    'LocationName': NameSelected,
                    'LocationType': LocationTypeSelected,
                    'LocationAddress': AddressZ,
                    'LocationLatLong': LatLongZ,
                    'LocationProduct': ProductSelected,
                    'LocationBandwidth': BandwidthSelected + "Mb",
                    'LocationRegion': Region,
                    'LocationFiber': fiber,
                    'LocationEoc': eoc,
                    'LocationOffnet': offnet,
                    'LocationNpanxx': "111111",
                }
                AllTheLocations.push(LocationObject);



                console.log("LocationInfoString =  " + LocationInfoString);
                // create the necessary elements
                var div = document.createElement("div");
                div.className = "cardDiv"
                div.id = "div" + checkboxList;
                var button = document.createElement("img");
                button.type = "button";
                if (LocationID != 0) {
                    button.src = "img/remove.png";
                    button.onclick = removeDiv;
                }
                else {
                    button.src = "img/imp1.png";
                    button.onclick = notremoveDiv;
                }
                button.id = "b" + checkboxList;
                button.className = "cardButton";


                var label = document.createElement("label");
                console.log("StringForCard = " + StringForCard);
                console.log("LocationInfoString  = " + LocationInfoString)
                label.name = LocationInfoString;
                label.id = "lab" + checkboxList;
                label.className = "cardLabel";
                var span = document.createElement("span");
                span.textContent = LocationObject.ID + " - " + StringForCard;
                span.className == "cardSpan";
                checkboxList = checkboxList + 1;
                label.appendChild(span);
                div.appendChild(button);
                div.appendChild(label);   // add the box to the element
                document.getElementById('some_div').appendChild(div);
                $('#LocInfo').modal('hide');
                //document.getElementById('sla').value = "";
                //document.getElementById('bandwidth').value = "3";
                //document.getElementById('bandwidthdisplay').style.display = 'none';
                //document.getElementById("productList").value = "Dark Fiber";
                ////document.getElementById('fiber').disabled = true;
                //document.getElementById("fiber").checked = false;
                //document.getElementById("eoc").checked = false;
                //document.getElementById("eoc").disabled = false;
                //document.getElementById("offnet").checked = false;
                //document.getElementById("address").value = "";
                //document.getElementById("lat_lang").value = "";
                document.getElementById("cardDisplay").style.display = "block";
                LocationID++;
            }
        }
        }
    }

    if (NotAdded.length != 0) {
        var len = NotAdded.length;
        console.log(NotAdded);
        alert("Unable to add row " + NotAdded + " to the card because of missing data " );
    }
    console.log(LocCart.length);
    var rowss = document.getElementById("tableAddRow").rows.length;
    console.log("NUmber of rows = " + rowss);
    $("#tableAddRow").find("tr:gt(0)").remove();
    LocCart.length = 0;
    document.getElementById("selectAllOnNet").checked = false;
    document.getElementById("selectAllOffNet").checked = false;
    document.getElementById("selectAllEoc").checked = false;
    document.getElementById("selectAll").checked = false;
    document.getElementById('selectAllProduct').value = "DIA";
    document.getElementById('selectAllBandWidth').value = "2";
    document.getElementById('selectLocationType').value = " ";

    //for (var x = 1 ; x < rowss; x++) {
    //    console.log("deleting row number = " + x);
    //    document.getElementById("tableAddRow").deleteRow(x);
    //} 
}


function reverseGeocode(latlong) {
   // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$Executing the reverse geocoding *********************************** ");
    
    var reverseURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location="+latlong;
    var r_add = "";
    var r_city = "";
    var r_state = "";
    var r_zip = "";
    $.ajax({
        async: false,
        global: false,
        url: reverseURL,
        dataType: 'json',
        data: {
            'request': "", 'target': 'arrange_url', 'method': 'method_target'
        },
        type: 'GET',
        success: function (data) {
            console.log("Done reverse geocoding execution the output is here");
            console.log(data);
            r_add = data.address.Address;
            r_city = data.address.City;
            r_state = data.address.Region;
            r_zip = data.address.Postal;
            console.log(data.address.Address);
            console.log(data.address.City);
            console.log(data.address.Postal);
            console.log(data.address.Region);
        },
        error: function (e) {
            alert('Error: ' + e);
        }
    });
    return [r_add, r_city, r_state, r_zip];
}


function getTokken() {
    var esriUrl = "https://www.arcgis.com/sharing/oauth2/token?client_id=QIrbTdAo0i8pMvIh&grant_type=client_credentials&client_secret=7064acfecd9e42d182dc06c17736ae0a&expiration=2880&f=pjson";
    var token = null;
    $.ajax({
        async: false,
        global : false,
        url: "https://www.arcgis.com/sharing/oauth2/token?client_id=QIrbTdAo0i8pMvIh&grant_type=client_credentials&client_secret=7064acfecd9e42d182dc06c17736ae0a&expiration=2880&f=pjson",
        dataType: 'json',
        data: {
            'request': "", 'target': 'arrange_url', 'method': 'method_target'
        },
        type: 'POST',
        success: function (data) {
            console.log(data.access_token);
            token = data.access_token;
            console.log("token here = " + token);
        },
        error: function (e) {
            alert('Error: ' + e);
        }
    });
    console.log("token = " + token);
    return token;
}
var name;
function callBackEnd(name) {
    console.log("Username to send in ajax = " + name);
    $.ajax({
        type: 'POST',
        url: 'map.aspx/GetDate?name=' + name,
        data: JSON.stringify({name: name }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            // Do something interesting here.
            console.log("Test ");
            console.log(userName);
            console.log(msg.d);
            var jsonData = jQuery.parseJSON(msg.d);
            console.log("Here inside JSON");
            console.log(jsonData.length);
            for (var i = 0; i < jsonData.length; i++) {
                console.log("Name " + i + " = " + jsonData[i].Name);
                console.log("Number " + i + " = " + jsonData[i].Number);
                console.log("Account ID " + i + " = " + jsonData[i].AID);
                console.log(jsonData[i]);
                var x = document.getElementById("selectedAccount");
                var option = document.createElement("option");
                option.text = jsonData[i].Name + " - "+ jsonData[i].Number;
                option.value = jsonData[i].Name + "&&$$" + jsonData[i].Number + "&&$$" + jsonData[i].AID;
                x.add(option);
            }
        }
    });
}
var name1;
function getFullname(name1) {
    console.log("Inside get Full name");
    var username = "xyz";
    $.ajax({
        type: 'POST',
        url: 'map.aspx/GetFullname?name1=' + name1,
        data: JSON.stringify({ name1: name1 }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            setAutoComplete();
            // Do something interesting here.
            console.log("Output from get full name function")
            console.log(msg.d);
            var jsonData = jQuery.parseJSON(msg.d);
            document.getElementById("LocHeader1").innerText = "Welcome   " + jsonData+ "!";
        }
    });

}

function setAutoComplete() {
    $(function () {
        $.widget("custom.combobox", {
            _create: function () {
                this.wrapper = $("<span>")
                  .addClass("custom-combobox")
                  .insertAfter(this.element);

                this.element.hide();
                this._createAutocomplete();
                this._createShowAllButton();
            },

            _createAutocomplete: function () {
                var selected = this.element.children(":selected"),
                  value = selected.val() ? selected.text() : "";
                //$('.ui-autocomplete-input').attr('placeholder', 'Select a value')
                this.input = $("<input>")
                  .appendTo(this.wrapper)
                  .val(value)
                  .attr("title", "")
                  .attr("placeholder", "type account name...")
                  .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                  .autocomplete({
                      delay: 0,
                      minLength: 0,
                      source: $.proxy(this, "_source")
                  })
                  .tooltip({
                      classes: {
                          "ui-tooltip": "ui-state-highlight"
                      }
                  });

                this._on(this.input, {
                    autocompleteselect: function (event, ui) {
                        ui.item.option.selected = true;
                        // $('.custom-combobox-input').attr('placeholder', 'Select a value')
                        this._trigger("select", event, {
                            item: ui.item.option
                        });
                    },

                    autocompletechange: "_removeIfInvalid"
                });
            },

            _createShowAllButton: function () {
                var input = this.input,
                  wasOpen = false;

                $("<a>")
                  .attr("tabIndex", -1)
                  .attr("title", "Show All Accounts")
                  .tooltip()
                  .appendTo(this.wrapper)
                  .button({
                      icons: {
                          primary: "ui-icon-triangle-1-s"
                      },
                      text: false
                  })
                  .removeClass("ui-corner-all")
                  .addClass("custom-combobox-toggle ui-corner-right")
                  .on("mousedown", function () {
                      wasOpen = input.autocomplete("widget").is(":visible");
                  })
                  .on("click", function () {
                      input.trigger("focus");

                      // Close if already visible
                      if (wasOpen) {
                          return;
                      }

                      // Pass empty string as value to search for, displaying all results
                      input.autocomplete("search", "");
                  });
            },

            _source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response(this.element.children("option").map(function () {
                    var text = $(this).text();
                    if (this.value && (!request.term || matcher.test(text)))
                        return {
                            label: text,
                            value: text,
                            option: this
                        };
                }));
            },

            _removeIfInvalid: function (event, ui) {

                // Selected an item, nothing to do
                if (ui.item) {
                    return;
                }

                // Search for a match (case-insensitive)
                var value = this.input.val(),
                  valueLowerCase = value.toLowerCase(),
                  valid = false;
                this.element.children("option").each(function () {
                    if ($(this).text().toLowerCase() === valueLowerCase) {
                        this.selected = valid = true;
                        return false;
                    }
                });

                // Found a match, nothing to do
                if (valid) {
                    return;
                }

                // Remove invalid value
                this.input
                  .val("")
                  .attr("title", value + " didn't match any item")
                  .tooltip("open");
                this.element.val("");
                this._delay(function () {
                    this.input.tooltip("close").attr("title", "");
                }, 2500);
                this.input.autocomplete("instance").term = "";
            },

            _destroy: function () {
                this.wrapper.remove();
                this.element.show();
            }
        });

        $("#selectedAccount").combobox();

    });
}

function BringAllAccountInfo() {
    $("#accountInfoModal").modal('show');
    console.log(document.getElementById("selectedAccount").value);
    var account_selected = document.getElementById("selectedAccount").value;
    var account_info = account_selected.split("&&$$");
    var account_number = account_info[1];
    console.log(account_number);
    $.ajax({
        type: 'POST',
        url: 'map.aspx/GetAccountInfo?account_number=' + account_number,
        data: JSON.stringify({ account_number: account_number }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            // Do something interesting here.
            console.log("Output from get account info function")
            console.log(msg.d);
            document.getElementById("justthrowcontent").value = msg.d;
            
        }
    });

}

require([
  "dojo/dom-construct",
  "dojo/dom-attr",
  "esri/config",
  "esri/portal/Portal",
  "esri/portal/PortalItem",
  "esri/portal/PortalUser",
  "esri/views/MapView",
  "esri/WebMap",
  "esri/widgets/BasemapToggle",
  "esri/widgets/Compass",
  "esri/widgets/Home",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Search",
  "esri/widgets/LayerList",
 
  "esri/widgets/Popup",
  "esri/PopupTemplate",
  "esri/geometry/Point",
  "esri/tasks/Locator",
  "dojo/on",
//  "dojo/dom-construct",
 // "dojo/dom-style",
  "dojo/dom",
  "dojo/domReady!"
], function (domConstruct, domAttr, esriConfig, Portal, PortalItem, PortalUser, MapView, WebMap, BasemapToggle, Compass, Home, Expand, BasemapGallery, Search, LayerList,
    Popup, Graphic, PopupTemplate, Point, Locator, on, /*domConstruct, domStyle,*/ dom, domReady) {
    console.log("Startt");

    //esriConfig.config.defaults.io.proxyUrl = "https://spiritmaps.spiritcom.com/portal/";
    //esriConfig.config.defaults.io.alwaysUseProxy = true;

    esriConfig.portalUrl = "https://spiritmaps.spiritcom.com/portal/";
    sc_portal = new Portal('https://spiritmaps.spiritcom.com/portal/');
    console.log("Startsdsst");
    // Setting authMode to immediate signs the user in once loaded
    sc_portal.authMode = "immediate";
    console.log("Startsdsssdsdt");
    // Once portal is loaded, user signed in
    sc_portal.load().then(function () {
        console.log("Portal User: " + sc_portal.credential.userId);
        console.log(1);
        console.log(sc_portal.credential.userId);

        userName = sc_portal.credential.userId;
        callBackEnd(userName);       
        var x = userName.split("@")
        getFullname(x[0]);
        //console.log("**************fullname = " + full_name);
        
        webmap = new WebMap({
          
            portalItem: new PortalItem({ // autocasts as new PortalItem()
                //id: "b3b3cfffd8e04e6eb14e45c12ab05a55",
                id: "2cd4ab06301f4bfda2404075b717d42e"
                           
            })            
        });

       view = new MapView({
            map: webmap,
            // Step 2: Set the view's webmap to that of the specified webmap above
            container: "viewDiv",
           // zoom: 7,
           //center: [-80, 34]
            zoom: 6,
           center: [-77, 37]
        });

       

        var basemapToggle = new BasemapToggle({
            view: view,  // The view that provides access to the map's "streets" basemap
            nextBasemap: "streets"  // Allows for toggling to the "hybrid" basemap
            
        });
        view.ui.add(basemapToggle, "bottom-right");
        basemapToggle.on('toggle', function (event) {
            console.log("current basemap title: ", event.current.title);
            console.log("previous basemap title: ", event.previous.title);            
        });

        var compass = new Compass({
            view: view
        });

        // adds the compass to the top left corner of the MapView
        view.ui.add(compass, "top-left");

        var homeBtn = new Home({
            view: view
        });

        // Add the home button to the top left corner of the view
        view.ui.add(homeBtn, "top-left");
    

        var basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });
        
        // Create an Expand instance and set the content
        // property to the DOM node of the basemap gallery widget
        // Use an Esri icon font to represent the content inside
        // of the Expand widget

        var bgExpand = new Expand({
            view: view,
            content: basemapGallery.container,
            expandIconClass: "esri-icon-basemap"
        });

        // Add the expand instance to the ui

        view.ui.add(bgExpand, "top-left");

        var locationBox = domConstruct.toDom('<div id="cardDisplay1" class="card pull-left" style="width:300px;"> <div id="LocHeader" class="card-header primary-color white-text" ><h6 id="LocHeader1" >Welcome!</h6><select class="form-control " id="selectedAccount"><option value=""> </option><option style="" value="Other">New Logo</option></select></div><div id="cardDisplay" style="display:none;"><div class="card-body" style="min-height:50px; max-height:250px; overflow:auto;" id="addLocationsCard"><div id="some_div" class="someDiv" style="font-size:1.0rem;></div></div><div class="card-footer" style="text-align:center;"><a class="btn btn-primary"  onclick="GoToForm()">Create Opportunity</a></div></div></div>');
       view.ui.add(locationBox, "top-left");
        // Adds the search widget to the top right corner of the view Search widget
        search = new Search({
            view: view,
            allPlaceholder: "blah blah",
            popupOpenOnSelect: false,
            id: "searchLoc",    
            
        });
        search.defaultSource.withinViewEnabled = true; // Limit search to visible map area only

        view.ui.add(search, "top-right"); // Add to the view

        
        //$(document).ready(() => {
        //    $('body').on('focusout', () => { });
        //});
        search.on("select-result", function (searchevent) {

            console.info(searchevent);
            //current_location1 = event.searchTerm;
            lat = searchevent.result.feature.geometry.latitude;
            long = searchevent.result.feature.geometry.longitude;
            location_string = searchevent.result.name;
            console.log("Lat : " + lat + " Long : " + long + " add = " + location_string);

            view.popup.title = popupTitle;
            view.popup.content = "<br><label> Location: </label>" + searchevent.result.name +
                         "<br> <label> X: </label> " + searchevent.result.feature.geometry.latitude + "<label> ,  Y: </label> " + searchevent.result.feature.geometry.longitude +
                          popupContent;
            view.popup.open({
                location: searchevent.result.feature.geometry,  // location of the click on the view
               // title: "{LOC} Location ",  // title displayed in the popup
               // content displayed in the popup
               /* content: "<label> Location: </label>" + searchevent.result.name +
                         "<br><br> <label> X: </label> " + searchevent.result.feature.geometry.latitude + "<label> ,  Y: </label> " + searchevent.result.feature.geometry.longitude +
                         "<br><br><button onclick='RedirectToSearch()' type='button' class='btn btn-primary'  id='ALoc' style='color:blue;'> Add A Location </button>" +
                         " <button type='button' class='btn btn-primary' id='addLoc'> Add Location to Queue</button>",
            */
            });            
        });
        //This line of code is used to solve the eror
        

            const layerList = new LayerList({
                view: view,
                container: document.createElement("div"),
                listItemCreatedFunction: function (event) {
                    const item = event.item;
                    item.panel = {
                        content: "legend",
                        open: false
                    };
                }
            // Add widget to the top right corner of the view
            });


        var bgExpand2 = new Expand({
            view: view,
            content: layerList.container,
            expandIconClass: "esri-icon-layer-list"
        });
        view.ui.add(bgExpand2, "top-right");

        //view.when(function () {
        //    // get the first layer in the collection of operational layers in the WebMap
        //    // when the resources in the MapView have loaded.
        //    var allLaayyers = webmap.allLayers;
        //    var featureLayer = webmap.layers.getItemAt(1);
        //    var featureLayer2 = webmap.layers.getItemAt(2);
        //    var featureLayer3 = webmap.layers.getItemAt(3);
        //    console.log("************** Get all the layers ***** " + allLaayyers.length);
        //    var legend = new Legend({
        //        view: view,
        //        layerInfos: [{
        //            layer: featureLayer,
        //            layer2: featureLayer2,
        //            layer3: featureLayer3,
        //            //title: "Spirit Splice Point"
        //        }]
        //    });

        //    // Add widget to the bottom right corner of the view
        //    view.ui.add(legend, "bottom-right");
        //});


    });
});

function RedirectToSearch(searchevent) {
    if (opportunityTypeCheck == true) {
        var SplitLocationByComma = location_string.split(',');
        console.log(SplitLocationByComma);
        console.log(parseInt(SplitLocationByComma[3]))
        var CheckfourthLocationIsZipCode = parseInt(SplitLocationByComma[3]);
        if (SplitLocationByComma.length != 4) {
            alert("Entered Location is Incorrect please input location in format of Street, City, State, Zipcode");
            search.clear();
            search.focus();
            view.scale = 7109000;
            search.view.popup.close();
        }
        else if (isNaN(CheckfourthLocationIsZipCode) == true) {
            alert("Entered Location is Incorrect please input location in format of Street, City, State, Zipcode");
            search.clear();
            search.focus();
            view.scale = 7109000;
            search.view.popup.close();
        }
        else {
            console.log(SplitLocationByComma);
            console.log("Re direct to search bar and reset search term");
            //console.log(search.state);
            search.clear();
            search.focus();
            //search.view.popup.close();
            view.scale = 7109000;
            document.getElementById("address").value = location_string;
            console.log("latitude here " + lat);
            document.getElementById("lat_lang").value = lat + ", " + long;
            popupTitle = "Z Location";
            popupContent = "<br> <button type='button' onclick = 'locationCheck()' class='btn btn-primary' id='addLoc'> Add Z Location to Queue</button>";
            wantToAddLocFlag = 1;
            OpenTheModel();
        }
    }
    else {
        alert("Please select opportunity type before adding location");
        search.clear();
        search.focus();
        view.scale = 7109000;
        search.view.popup.close();
    }
    //view.ui.remove(search);
}

function locationCheck() {
    if (opportunityTypeCheck == true) {
        var SplitLocationByComma = location_string.split(',');
        console.log(SplitLocationByComma);
        var CheckfourthLocationIsZipCode = parseInt(SplitLocationByComma[3]);
        if (SplitLocationByComma.length != 4) {
            alert("Entered Location is Incorrect please input location in format of Street, City, State, Zipcode");
            search.clear();
            search.focus();
            view.scale = 7109000;
            search.view.popup.close();
        }
        else if (isNaN(CheckfourthLocationIsZipCode) == true) {
            alert("Entered Location is Incorrect please input location in format of Street, City, State, Zipcode");
            search.clear();
            search.focus();
            view.scale = 7109000;
            search.view.popup.close();
        }
        else {
            OpenTheModel();
        }
    }
    else {
        alert("Please select opportunity type before adding location");
        search.clear();
        search.focus();
        view.scale = 7109000;
        search.view.popup.close();
    }
    
}


function OpenTheModel() {

    console.log("Here I am inside the Model");
    search.view.popup.close();
    if (wantToAddLocFlag == 1) {
        console.log("latitude here for flag 1" + lat);
        document.getElementById("sla").value = "Source Location";
        document.getElementById("sla").readOnly = true;
        LocAZ = 1;
    }
    else {
        document.getElementById("sla").value = "";
        document.getElementById("slachange").innerText = "Business Name Z";
        document.getElementById("sla").readOnly = false;
        document.getElementById("address").value = location_string;
        console.log("latitude here " + lat);
        document.getElementById("lat_lang").value = lat + ", " + long;
        LocAZ = 0;
    }
    $('#LocInfo').modal('show');
    wantToAddLocFlag = 0;
}


// function for bandwidth connection to product

function bandwidthHide() {
    console.log("Inside the bandwidth Hide function");
    var product = document.getElementById('productList').value;
    var AL = document.getElementById("sla").value;
    if (AL == "Source Location") {
        document.getElementById("bandwidthdisplay").style.display = 'none';
    }
    else if (product == "Dark Fiber" && wantToAddLocFlag == 0) {
        document.getElementById("bandwidthdisplay").style.display = 'none';
        //band = "0Mb";
    }
    else if (product == "DIA" && wantToAddLocFlag == 0) {
        document.getElementById("bandwidthdisplay").style.display = 'block';
    }
    else if (product == "EPL" && wantToAddLocFlag == 0) {
        document.getElementById("bandwidthdisplay").style.display = 'block';
    }
    else if (product == "EVPL" && wantToAddLocFlag == 0) {
        document.getElementById("bandwidthdisplay").style.display = 'block';
    }
    else if (product == "Transport/Back Haul" && wantToAddLocFlag == 0) {
        document.getElementById("bandwidthdisplay").style.display = 'block';
    }
}

function addTheLocationToCard() {
    popupTitle = "Z Location";
    popupContent = "<br> <button type='button' onclick = 'locationCheck()' class='btn btn-primary' id='addLoc'> Add Z Location to Queue</button>";
    var fiber = false;
    var eoc = false;
    var offnet = false;
    search.clear();
    search.view.popup.close();
    view.scale = 7109000;
    SLAZ = document.getElementById('sla').value;
    var LocationType = document.getElementById('locationtype').value;
    var AddressZ = document.getElementById('address').value;
    var array = AddressZ.split(',');
    console.log(array.length)
    document.getElementById("bulkButton").style.display = 'block';
    var LatLongZ = document.getElementById("lat_lang").value;
    console.log("Location Z Name = " + SLAZ);
    console.log("Location Z Address = " + AddressZ);
    console.log("Location Z LatLong = " + LatLongZ);
    var npanxx = "111111";
    var diversity = document.getElementById('diversity').checked;
    console.log("Dib=versity" + diversity);
    console.log(" Service Location Name " + SLAZ);
    if (SLAZ == undefined || SLAZ == null || SLAZ.length == 0) {
        alert("Enter The Service Location Z Name");
    }
    else if (LocationType == " ") {
        alert("Select the Location Type");
    }
    else {
        var product = document.getElementById('productList').value;
        if (product == "Dark Fiber" && wantToAddLocFlag == 0) {
            document.getElementById("bandwidthdisplay").style.display = 'none';
            band = "0Mb";
        }
        else if (product == "DIA" && wantToAddLocFlag == 0) {
            document.getElementById("bandwidthdisplay").style.display = 'block';
        }
        else if (product == "EPL" && wantToAddLocFlag == 0) {
            document.getElementById("bandwidthdisplay").style.display = 'block';
        }
        else if (product == "EVPL" && wantToAddLocFlag == 0) {
            document.getElementById("bandwidthdisplay").style.display = 'block';
        }
        else if (product == "Transport/Back Haul" && wantToAddLocFlag == 0) {
            document.getElementById("bandwidthdisplay").style.display = 'block';
        }
        var band = document.getElementById('bandwidth').value;
        var fiber_checked = document.getElementById('fiber').checked;
        var eoc_checked = document.getElementById('eoc').checked;
        var off_net_checked = document.getElementById('offnet').checked;
        var Region = document.getElementById('region').value;

        //if (SLAZ == "Source Location") {
        //    band = "0";
        //}
        StringForCard = SLAZ + " - " + LocationType + ", " + product + " ";
        LocationInfoString = SLAZ + ", " + LocationType + ", " + AddressZ + ", " + LatLongZ + ", " + npanxx + ", " + product + ", ";
        LocationInfoString = LocationInfoString + band + "Mb, " + Region + ", ";
        //StringForCard = StringForCard + band + "Mb ";
        if (fiber_checked == true) {
            LocationInfoString = LocationInfoString + "Fiber" + ", ";
            StringForCard = StringForCard + " Fiber";
            fiber = true;
        }
        if (eoc_checked == true) {
            LocationInfoString = LocationInfoString + "EOC" + ", ";
            StringForCard = StringForCard + "  EOC";
            eoc = true;
        }
        if (off_net_checked == true) {
            LocationInfoString = LocationInfoString + "Offnet";
            StringForCard = StringForCard + "  Offnet";
            offnet = true;
        }


        var LocationObject = {
            'ID': LocationID,
            'LocationName': SLAZ,
            'LocationType': LocationType,
            'LocationAddress': AddressZ,
            'LocationLatLong': LatLongZ,
            'LocationProduct': product,
            'LocationBandwidth': band + "Mb",
            'LocationRegion': Region,
            'LocationFiber': fiber,
            'LocationEoc': eoc,
            'LocationOffnet': offnet,
            'LocationNpanxx': "111111",
            'LocationDIversity': diversity,
        }
        AllTheLocations.push(LocationObject);



        console.log("LocationInfoString =  " + LocationInfoString);
        // create the necessary elements
        var div = document.createElement("div");
        div.className = "cardDiv"
        div.id = "div" + checkboxList;
        var button = document.createElement("img");
        button.type = "button";
        if (LocationID != 0) {
            button.src = "img/remove.png";
            button.onclick = removeDiv;
        }
        else {
            button.src = "img/imp1.png";
            button.onclick = notremoveDiv;
        }
        button.id = "b" + checkboxList;
        button.className = "cardButton";


        var label = document.createElement("label");
        console.log("StringForCard = " + StringForCard);
        console.log("LocationInfoString  = " + LocationInfoString)
        label.name = LocationInfoString;
        label.id = "lab" + checkboxList;
        label.className = "cardLabel";
        var span = document.createElement("span");
        span.textContent = LocationObject.ID + " - " + StringForCard;
        span.className == "cardSpan";
        checkboxList = checkboxList + 1;
        label.appendChild(span);
        div.appendChild(button);
        div.appendChild(label);   // add the box to the element
        document.getElementById('some_div').appendChild(div);
        $('#LocInfo').modal('hide');
        document.getElementById('locationtype').value = " ";
        document.getElementById('bandwidth').value = "2";
        document.getElementById('bandwidthdisplay').style.display = 'none';
        document.getElementById("productList").value = "Dark Fiber";
        //document.getElementById('fiber').disabled = true;
        document.getElementById("fiber").checked = false;
        document.getElementById("eoc").checked = false;
        document.getElementById("eoc").disabled = false;
        document.getElementById("offnet").checked = false;
        document.getElementById('diversity').checked = false;
        document.getElementById("address").value = "";
        document.getElementById("lat_lang").value = "";
        document.getElementById("cardDisplay").style.display = "block";
        LocationID++;
    }
    

}


function removeDiv() {
    console.log("hello")
    console.log($(this).parent().attr('id'));
    var x = $(this).parent().attr('id');
    console.log(x);
    var res = x.split("div");
    console.log("Res = " + res[1]);
    var id = parseInt(res[1]);
    console.log(id);
    $(this).parent('div').remove();
    for (var i = AllTheLocations.length - 1; i >= 0; --i) {
        if (AllTheLocations[i].ID == id) {
            AllTheLocations.splice(i, 1);
        }
    }
    if ($('#some_div').children().length == 0) {
        document.getElementById("cardDisplay").style.display = "none";
    }
}
function notremoveDiv() {
    console.log("hello")
    alert("Source Account A location cannot be removed");
}

function GoToForm() {


    //Printing all the location data from json array
    console.log("*********************Json Loc Data **************");
    //console.log(JSON.stringify(AllTheLocations));

    

    var acc = document.getElementById("selectedAccount").value;
    console.log("Account Value = " + acc);
    if (acc == "") {
        alert("Please Select the account, if account not present please talk to your manager");
    }     
    else {
    location_string = "";
    var User_Name = userName.split('@');
    //document.getElementById("Spirit_User_Name").value = User_Name[0];
    document.getElementById("employee_username").value = User_Name[0];
    //var ul = document.getElementById("serviceLocations");
    var ul = document.getElementById("service_locations");
    var lis;
    while((lis = ul.getElementsByTagName("li")).length > 0) {
        ul.removeChild(lis[0]);
    }
    if (acc == "Other") {
        document.getElementById("o_account_name").value = "Other";
        document.getElementById("o_account_number").value = "None";
        document.getElementById("o_account_id").value = "None";
        document.getElementById("acc_name_view").style.display = "none";
        document.getElementById("acc_num_view").style.display = "none";
    }
    else {
        document.getElementById("acc_name_view").style.display = "block";
        document.getElementById("acc_num_view").style.display = "block";
        var jsonData = document.getElementById("selectedAccount").value;
        var xyz = jsonData.split("&&$$");

        console.log("Selected Account Value name = " + xyz[0] + " number = " + xyz[1] + " Id = " + xyz[2]);
        //document.getElementById("accountName").value = xyz[0];
        //document.getElementById("account_number").value = xyz[1];
            //document.getElementById("accountID").value = xyz[2];
        document.getElementById("o_account_name").value = xyz[0];
        document.getElementById("o_account_number").value = xyz[1];
        document.getElementById("o_account_id").value = xyz[2];
    }
    if ($('#some_div').children().length == 0) {
        alert("Please Test");
    }
    else {
        //$('#formOpp').modal('show');
        $('#ConnectToDynamcis').modal('show');
//        var x = document.getElementById("some_div").querySelectorAll("label");
        
        for (var i = 0 ; i < AllTheLocations.length; i++) {
            var lc = AllTheLocations[i].ID + " - " + AllTheLocations[i].LocationName + ", " + AllTheLocations[i].LocationAddress + ", " + AllTheLocations[i].LocationProduct
            + ", fiber - " + AllTheLocations[i].LocationFiber + ", eoc - " + AllTheLocations[i].LocationEoc + ", offnet - " + AllTheLocations[i].LocationOffnet;
            console.log(lc);
            //console.log("Label name " + i + "= " + x[i].name);
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(lc));
            ul.appendChild(li);
            ////console.log("items[i].innerHTML " + items[i].innerHTML);
            //loc_string = loc_string + " @#$% " + x[i].name;
            //console.log("loc_string + " + loc_string);  
        }
        //console.log(" location_stringf " + loc_string);
        //document.getElementById("cheat_locations").value = loc_string;
    }
    }
    //document.getElementById("acc_name_view").style.display = "block";
    //document.getElementById("acc_num_view").style.display = "block";
}


var EmployeeName;
function ConnectToDynamics() {
    $('#ConnectToDynamcis').modal('hide');
    console.log("********** Hello ****************");
    EmployeeName = document.getElementById("employee_username").value;
    var EAccountName = document.getElementById("o_account_name").value;
    var EAccountNumber = document.getElementById("o_account_number").value;
    var EAccountID = document.getElementById("o_account_id").value;
    var EOpportunityName = document.getElementById("opportunity_name").value;
    //var EEstimaedCloseDate = document.getElementById("EstimatedCloseDateOpp").value;
    //var EEstimaedRevenue = document.getElementById("EstimatedRevenue").value;

    //var EOpportunityTerm = document.getElementById("opportunity_term").value;
    var EOpportunityContract = document.getElementById("opportunity_contract").value;
    var EOpportunityselectedTermArray = [];
    $('#checkboxes input:checked').each(function () {
        EOpportunityselectedTermArray.push($(this).attr('id'));
    });
    if (EOpportunityName.length == 0 || EOpportunityselectedTermArray.length == 0 /*|| EEstimaedCloseDate.length == 0 || EEstimaedRevenue.length == 0*/) {
        alert("Opportunity Name missing or you have not selected the term or you have not selected Date or Revenue");
    }
    else{
    var JsonLocValue = JSON.stringify(AllTheLocations);
    console.log("**********************************************");
    console.log(EmployeeName);
    console.log(EAccountNumber);
    console.log(EAccountID);
    console.log(EAccountName);
    console.log(EOpportunityName);
    console.log(EOpportunityselectedTermArray);
    console.log(EOpportunityContract)
    console.log(JsonLocValue);
    
    var ObjLoc = {
        'EmployeeName': EmployeeName,
        'EAccountName': EAccountName,
        'EAccountNumber': EAccountNumber,
        'EAccountID': EAccountID,
        'EOpportunityName': EOpportunityName,
        'EOpportunityTerm': EOpportunityselectedTermArray,
        'EOpportunityContract': EOpportunityContract,
        //'EEstimaedCloseDate': EEstimaedCloseDate,
        //'EEstimaedRevenue' : EEstimaedRevenue,
        'JsonLocValue': JsonLocValue,
    }
    console.log(ObjLoc);
    console.log(JSON.stringify(ObjLoc));
    var jSon = JSON.stringify({ obj: ObjLoc });
  /*  var paramArray = {
        EmployeeName: EmployeeName, EAccountName: EAccountName, EAccountNumber: EAccountNumber, EAccountID: EAccountID, EOpportunityName: EOpportunityName,
        EOpportunityTerm: EOpportunityTerm, JsonLocValue: JsonLocValue
    };
    */
    $.ajax({
        type: 'POST',
        beforeSend: function () { showLoader(); },
        url: 'map.aspx/createTheOpportunity',
        contentType: 'application/json; charset=utf-8',
        data: jSon,
        dataType: 'json',
        success: function (msg) {
            hideLoader();
            console.log("**************Creating Opportunity *************** ********")
            console.log(msg.d);
            if (msg.d == "acb")
                //alert("Opp created");
            {
                $('#SuccessModal').modal('show');
            }
            else {
                alert("Opportunity was not created some of the input values were wrong please try again");
            }
        }
    });
}
}

function redirectDynamcics() {
    //for dev
   //var src = 'http://crmdev.lumosnet.com/DEVMAIN/main.aspx';

    //for UAT 
   //var src = 'https://dynamicsuat.spiritcom.com/main.aspx';

    //For Prod
   // var src = 'https://spiritcrm.spiritcom.com/main.aspx';

    window.location.replace(src);
    
    console.log("I am here");
    $('#SuccessModal').modal('hide');
}


function reloadPage() {
    $('#SuccessModal').modal('hide');
    location.reload();
}
function showLoader() {
    console.log("Here");
    $(".loader4").css("display", "");
    $(".loader3").css("display", "");
}

function hideLoader() {
    $(".loader4").css("display", "none");
    $(".loader3").css("display", "none");
}



var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
        var selected = [];
        $('#checkboxes input:checked').each(function () {
            selected.push($(this).attr('id'));
        });
        console.log(selected);
        if (selected.length != 0) {
            document.getElementById("selectMoreTerm").text = selected;
        }
        else {
            document.getElementById("selectMoreTerm").text = "Select one or more term";
        }
    }
}