//!!    Shree Ganeshay Namah    !!
$(window).load(function () {
    // Animate loader off screen
    showLoader();
    $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).siblings('.panel-heading').addClass('active');
    });

    $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).siblings('.panel-heading').removeClass('active');
    });
});

var opportunityTypeCheck = false;
var userName = "";
var userDomainName = "";
var location_string = " ";
var NewOpp = true;
var list_of_all_locations = [];
var list_of_A_locations = [];
var webmap;
var view;
var search;
var AlocCount = 0;
var lat;
var checkboxList = 0;
var long;
var popupTitle = "A Location";
var oppId = "";
var oppName = "";
var headQuartersAddress = "";
var primaryContactAddress = "";
var opportunity;
var popupContent = "<br><button onclick='RedirectToSearch()' type='button' class='btn btn-primary btn-md' id='ALoc' > Add A Location </button>";
var wantToAddLocFlag = 1;
var RowNotAdded = 0;
var sourceLocationCount = 1;
var JSONLocArrayCSV = {}, LocCart = [];
var userNotFoundCounter = 0;
var bandwidth_options_list = [];

function ExistingOppEvent() {
    opportunityTypeCheck = true;
    view.ui.remove(opportunity);
    document.getElementById('NewOppbutton').style.display = 'none';
    document.getElementById('oppIdfornew').style.display = 'block';
    document.getElementById("hqAddressDiv").style.display = 'none';
    document.getElementById("primaryAddressDiv").style.display = 'none';
    primaryContactAddress = "";
    headQuartersAddress = "";
}

function NewOppEvent() {
    NewOpp = true;
    opportunityTypeCheck = true;
    view.ui.remove(opportunity);
    document.getElementById('showNewExistingOppButton').style.display = 'none';
    // document.getElementById('ExistingOppbutton').style.display = 'none';
    $('#selectedAccount').val('');
    document.getElementById("notification").style.display = 'block';
    setTimeout(function () {
        $('#initModal').modal('hide');
        document.getElementById('viewDiv').style.opacity = 1;
    }, 3000);
}

function UserNameDivDisplay() {
    //look up user access role
    //var newUserName = document.getElementById('customUserName').value;
    /* $.ajax({*/
    document.getElementById('userNameForm').style.display = 'block';
    document.getElementById('userNameForNew').style.display = 'none';
    //type: 'POST',
    //url: 'LookUpUser.asmx/checkUserRole?name=' + userDomainName,
    //data: JSON.stringify({ name: userDomainName }),
    //contentType: 'application/json; charset=utf-8',
    //dataType: 'json',
    //success: function (msg) {
    //    console.log(msg.d);

    //    //if (msg.d == false) {
    //    //    alert("User does not have enough permissions to create opportunity for someone else");
    //    //    document.getElementById('userNameForm').style.display = 'none';
    //    //    document.getElementById('userNameForNew').style.display = 'none';
    //    //    document.getElementById('showNewExistingOppButton').style.display = 'block';
    //    //    //document.getElementById('ExistingOppbutton').style.display = 'block';
    //    //}
    //    //else {
    //    //    document.getElementById('userNameForm').style.display = 'block';
    //    //    document.getElementById('userNameForNew').style.display = 'none';
    //    //}

    //},
    //error: function (e) {
    //    alert('Error: ' + e.message);
    //}

    //});



}

function FindUserRoleOnAppStart() {
    //look up user access role
    //var newUserName = document.getElementById('customUserName').value;
    $.ajax({
        type: 'POST',
        url: 'LookUpUser.asmx/checkUserRole?name=' + userDomainName,
        data: JSON.stringify({ name: userDomainName }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            console.log(msg.d);
            if (msg.d == false) {

                // NewOppEvent();
                //alert("User does not have enough permissions to create opportunity for someone else");
                //document.getElementById('userNameForm').style.display = 'none';
                //document.getElementById('userNameForNew').style.display = 'none';
                document.getElementById('showNewExistingOppButton').style.display = 'block';
                //document.getElementById('ExistingOppbutton').style.display = 'block';
            }
            else {
                //document.getElementById('userNameForm').style.display = 'block';
                //document.getElementById('userNameForNew').style.display = 'none';
                document.getElementById('userNameForNew').style.display = 'block';
            }
        },
        error: function (e) {
            alert('Error: ' + e.message);
        }
    });



}

function OpenMap() {
    document.getElementById('showNewExistingOppButton').style.display = 'block';
    //document.getElementById('ExistingOppbutton').style.display = 'block';
    document.getElementById('userNameForNew').style.display = 'none';
}

function lookUpUser() {
    var newUserName = document.getElementById('customUserName').value;
    if (newUserName != '') {
        $.ajax({
            type: 'POST',
            url: 'LookUpUser.asmx/lookUpUserRecord?name=' + newUserName,
            data: JSON.stringify({ name: newUserName }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (msg) {
                if (msg.d == false) {
                    if (userNotFoundCounter > 1) {
                        alert("Attempt 3: User Not found ");
                        document.getElementById('showNewExistingOppButton').style.display = 'block';
                        //document.getElementById('ExistingOppbutton').style.display = 'block';
                        document.getElementById('userNameForNew').style.display = 'none';
                        document.getElementById('userNameForm').style.display = 'none';
                    }
                    else {
                        userNotFoundCounter++;
                        alert("Attempt " + userNotFoundCounter + ": User not found");
                    }
                }
                else {
                    userDomainName = newUserName;                    
                    callBackEnd(userDomainName + "@ad.segra.com");
                    getFullname(userDomainName);
                    document.getElementById('userNameForNew').style.display = 'none';
                    document.getElementById('userNameForm').style.display = 'none';

                    document.getElementById('showNewExistingOppButton').style.display = 'block';
                    //document.getElementById('ExistingOppbutton').style.display = 'block';
                }

            },
            error: function (e) {
                alert('Error: ' + e.message);
            }
        });
    }
    else {
        alert("Please enter user name");
    }
}

function searchOpp() {
    var existingoppid = document.getElementById('oppID').value;
    console.log(existingoppid);
    NewOpp = false;
    $.ajax({
        type: 'POST',
        url: 'map.aspx/GetOppInfo?existingoppid=' + existingoppid,
        data: JSON.stringify({ existingoppid: existingoppid }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            // Do something interesting here.
            console.log(msg.d);

            //console.log(ExistingLocations)
            if (msg.d.length == 0) {
                alert("No Opportunity exist with the provided ID");
                document.getElementById('NewOppbutton').style.display = 'none';
                document.getElementById('ExistingOppbutton').style.display = 'none';
                document.getElementById("notification").style.display = 'block';
                document.getElementById("oppIdfornew").style.display = 'none';
                setTimeout(function () {
                    $('#initModal').modal('hide');
                    document.getElementById('viewDiv').style.opacity = 1;
                }, 3000);
            }
            else {
                $(".custom-combobox-input").prop("readonly", true);
                $(".custom-combobox-button").hide();
                $(".custom-combobox-input").attr("placeholder", "Account Not Required...")
                var ExistingLocations = jQuery.parseJSON(msg.d);
                var innerattributes = {}, records1 = [];
                var outAttribute = {};
                oppId = ExistingLocations[ExistingLocations.length - 1].id;
                oppName = ExistingLocations[ExistingLocations.length - 1].name;
                for (var i = 0; i < ExistingLocations.length - 1; i++) {
                    var add = ExistingLocations[i].locAddress;
                    var addressArray = add.split(', ');
                    //UAT1202 modal error submitting existing op ------ Begin
                    if (addressArray.length < 4) {
                        var splitRegion = addressArray[2].slice(0, 2);
                        var splitPostal = addressArray[2].slice(3, 8);
                        addressArray[2] = splitRegion;
                        addressArray[3] = splitPostal;
                    }//---------------End
                    innerattributes.Address = addressArray[0];
                    innerattributes.City = addressArray[1];
                    innerattributes.Region = addressArray[2];
                    innerattributes.Postal = addressArray[3];
                    outAttribute.attributes = innerattributes;
                    records1.push(outAttribute);
                    outAttribute = {};
                    innerattributes = {};
                }
                var completerecords = {};
                completerecords.records = records1;
                var stringRecords = JSON.stringify(completerecords);
                var locations = getLatLong(completerecords);
                console.log("testing locations");
                console.log(locations);
                for (var i = 0; i < ExistingLocations.length - 1; i++) {
                    var array_existing_loc = [];
                    //UAT1202 modal error submitting existing op ------ Begin
                    var commaCount = ExistingLocations[i].locAddress.split(",").length - 1;
                    if (commaCount < 3) {
                        var address = ExistingLocations[i].locAddress;
                        var addrHalf = address.slice(0, -6);
                        var zipHalf = "," + address.slice(-6);
                        ExistingLocations[i].locAddress = addrHalf + zipHalf;
                    }
                    //-------------------------End
                    ExistingLocations[i].Latitude = locations[i].latitude;
                    ExistingLocations[i].Longitude = locations[i].longitude;
                    ExistingLocations[i].LocationsAlreadyThere = "YES";
                    var locnameobj = parseLocationData('sla', ExistingLocations[i].name);
                    var addressobj = parseLocationData('address', ExistingLocations[i].locAddress);
                    var idobj = parseLocationData('id', ExistingLocations[i].id);
                    var locationtypeobj = parseLocationData('locationtype', ExistingLocations[i].locationtype);
                    var lat_longobj = parseLocationData('lat_long', locations[i].latitude + ', ' + locations[i].longitude);
                    var locationAlreadyExistobj = parseLocationData('locationAlreadyExist', 'YES');
                    var source = ExistingLocations[i].isSourecLoc;
                    if (source == true) {
                        var sourcelocationobj = parseLocationData('IsSourceLocation', 'YES');
                        array_existing_loc.push(sourcelocationobj);
                        // AlocCount = AlocCount
                    }
                    else {
                        var sourcelocationobj = parseLocationData('IsSourceLocation', 'NO');
                        array_existing_loc.push(sourcelocationobj);
                    }
                    array_existing_loc.push(locationAlreadyExistobj, idobj, locnameobj, addressobj, locationtypeobj, lat_longobj);
                    addExistingLocationToCart(array_existing_loc);
                }
                // $('#selectedAccount').val('NoNeed');
                document.getElementById('NewOppbutton').style.display = 'none';
                document.getElementById('ExistingOppbutton').style.display = 'none';
                document.getElementById("notification").style.display = 'block';
                document.getElementById("oppIdfornew").style.display = 'none';
                setTimeout(function () {
                    $('#initModal').modal('hide');
                    document.getElementById('viewDiv').style.opacity = 1;
                }, 3000);
            }
        },
        error: function (e) {
            alert('Error: ' + e.message);
        }
    });
}

function addExistingLocationToCart(Location_To_Add) {
    console.log("Inside add to location button");
    var listData = {};
    //console.log(Location_To_Add);
    var src = "img/imp1.png";
    var classlocbutton = 'ExistingLocButton';
    var flagALOC = false;
    var flagZLOC = false;
    var flagExisitngLOC = false;
    //var classA = 'ALocButton';
    //var classExist = 'ExistingLocButton';
    $.each(Location_To_Add, function (i, field) {
        if (field.name == 'sla') {
            listData[field.name] = field.value;
        }
        if (field.name == 'address') {
            listData[field.name] = field.value;
        }
        if (field.name == 'apartment' && (field.value !== typeof 'undefined' || field.value !== typeof '')) {
            listData[field.name] = field.value;
        }
        if (field.name == 'IsSourceLocation' && field.value == 'YES') {
            flagALOC = true;
            flagZLOC = false;
            src = "img/ALocation.png"
            classlocbutton = 'ALocButton';
        }
        if (field.name == 'IsSourceLocation' && field.value == 'NO') {
            flagALOC = false;
            flagZLOC = true;
        }
        if (field.name == 'locationAlreadyExist' && field.value == 'YES') {
            flagExisitngLOC = true
        }
    });
    if (flagExisitngLOC == true) {
        if (flagALOC == true) {
            src = "img/ALocation.png"
            classlocbutton = 'ALocButton';
        }
        else {
            var src = "img/imp1.png";
            var classlocbutton = 'ExistingLocButton';
        }
    }
    else {
        if (flagALOC == true) {
            src = "img/ALocation.png"
            classlocbutton = 'ALocButton';
        }
        if (flagZLOC == true) {
            src = "img/remove.png"
            classlocbutton = 'removeLocButton';
        }
    }
    var add = listData.address;
    var split_address = add.split(', ');
    let split_street = '';
    let split_city = '';
    let split_state = '';
    let split_zip = '';
    if (split_address.length > 4) {
        split_street = split_address[0];
        split_city = split_address[4];
        split_state = split_address[5];
        // split_zip = split_address[6];
    }
    else {
        split_street = split_address[0];
        split_city = split_address[1];
        split_state = split_address[2] + ", " + split_address[3];
        //split_zip = split_address[3];
    }
    var listItem = '<div class="cardDiv"><img class=' + classlocbutton + ' name="' + listData.sla + '" onclick="removeLocation(event)" src=' + src + ' /> ' + listData.sla + '<p style="font-size:11px; padding-left:30px;">' + split_street + ', ' + split_city + ', ' + split_state + /*', ' + split_zip + */ '</p>' + ' </div>';
    $('#list').append(listItem);
    list_of_all_locations.push(Location_To_Add);
    $('#cardDisplay').show();
}

function removeLocation(event) {
    var errorMessage = "";
    var locationDiv = $(event.target).parent();
    var locationName = $(event.target).attr('name');
    var locationClass = $(event.target).attr('class');
    var locationCount = $('#list').children().length;
    if (locationClass == "ExistingLocButton") {
        errorMessage = "Cannot Delete Exisiting Location";
    }
    if (locationClass == "ALocButton") {
        errorMessage = "Cannot Delete A Location";
    }
    if (errorMessage != "") {
        var elementName = 'locationAlert';
        showError(errorMessage, elementName, '#cardDisplayContainer');
        errorMessage = "";
    }
    else {
        errorMessage = "";
        for (var i = 0; i < list_of_all_locations.length; i++) {
            $.each(list_of_all_locations[i], function (index, field) {
                if (field.name == 'sla' && field.value == locationName) {
                    list_of_all_locations.splice(i, 1);
                    return false;
                }
            });
            locationDiv.remove();
            if (locationCount < 2) {
                $('#cardDisplay').hide();
            }
        }
    }
}

function getLatLong(completeObj) {
    var token = getTokken();
    var response;
    var newLocationObj = [];
    if (completeObj) {
        //UAT1202 modal error submitting existing op ------ Begin
        if (completeObj.records) {
            $.each(completeObj.records, function (index, value) {
                var stringRecords = JSON.stringify(value);
                var newUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?addresses={records:[" + stringRecords + "]}&sourceCountry=USA&token=" + token + "&f=pjson";
                console.log(newUrl);
                var newencuri = encodeURI(newUrl);
                console.log(newencuri);
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
                        $.each(arrayData, function (index, value) {
                            var indexID = value.attributes.ResultID;
                            if (value && value.attributes['DisplayX'] && value.attributes['DisplayX'] != undefined)
                                var displayX = value.attributes['DisplayX'];
                            else
                                var displayX = "";
                            if (value && value.attributes['DisplayY'] && value.attributes['DisplayY'] != undefined)
                                var displayY = value.attributes['DisplayY'];
                            else
                                var displayY = "";

                            var addressArray = value.address.split(', ');
                            var fullObj = {};
                            if (addressArray.length > 0) {
                                fullObj['index'] = parseInt(indexID);
                                fullObj['address'] = addressArray[0];
                                fullObj['city'] = addressArray[1];
                                fullObj['region'] = addressArray[2];
                                fullObj['postal'] = addressArray[3];
                                fullObj['longitude'] = displayX;
                                fullObj['latitude'] = displayY;
                                newLocationObj.push(fullObj);
                            }
                            else {
                                fullObj['index'] = parseInt(indexID);
                                fullObj['address'] = "";
                                fullObj['city'] = "";
                                fullObj['region'] = "";
                                fullObj['postal'] = "";
                                fullObj['longitude'] = "";
                                fullObj['latitude'] = "";
                                newLocationObj.push(fullObj);
                            }
                        });
                    },
                    error: function (e) {
                        alert('Error: ' + e.message);
                    }
                });
            });
        }
        else {
            var inputList = {};
            inputList = completeObj;
            var stringRecords = JSON.stringify(inputList);
            var newUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?addresses={records:[{attributes:" + stringRecords + "}]}&sourceCountry=USA&token=" + token + "&f=pjson";
            console.log(newUrl);
            var newencuri = encodeURI(newUrl);
            console.log(newencuri);
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
                    $.each(arrayData, function (index, value) {
                        var indexID = value.attributes.ResultID;
                        if (value && value.attributes['DisplayX'] && value.attributes['DisplayX'] != undefined)
                            var displayX = value.attributes['DisplayX'];
                        else
                            var displayX = "";
                        if (value && value.attributes['DisplayY'] && value.attributes['DisplayY'] != undefined)
                            var displayY = value.attributes['DisplayY'];
                        else
                            var displayY = "";

                        var addressArray = value.address.split(', ');
                        var fullObj = {};
                        if (addressArray.length > 0) {
                            fullObj['index'] = parseInt(indexID);
                            fullObj['address'] = addressArray[0];
                            fullObj['city'] = addressArray[1];
                            fullObj['region'] = addressArray[2];
                            fullObj['postal'] = addressArray[3];
                            fullObj['longitude'] = displayX;
                            fullObj['latitude'] = displayY;
                            newLocationObj.push(fullObj);
                        }
                        else {
                            fullObj['index'] = parseInt(indexID);
                            fullObj['address'] = "";
                            fullObj['city'] = "";
                            fullObj['region'] = "";
                            fullObj['postal'] = "";
                            fullObj['longitude'] = "";
                            fullObj['latitude'] = "";
                            newLocationObj.push(fullObj);
                        }
                    });
                },
                error: function (e) {
                    alert('Error: ' + e.message);
                }
            });
        }
    }// ------------------------- End
    var finalLocation = newLocationObj;
    return finalLocation;
}

function getAddress(latlong) {
    var token = getTokken();
    var response;
    var newLocationObj = [];
    var reverseURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=" + latlong;
    var reverseNewURL = encodeURI(reverseURL);
    console.log(reverseURL);
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
            var reverseObjs = {};
            if (data && data.address && data.address['Address'] && data.address['Address'] != undefined)
                reverseObjs['address'] = data.address['Address'];
            else
                reverseObjs['address'] = "";
            if (data && data.address && data.address['City'] && data.address['City'] != undefined)
                reverseObjs['city'] = data.address['City'];
            else
                reverseObjs['city'] = "";
            if (data && data.address && data.address['Region'] && data.address['Region'] != undefined)
                reverseObjs['region'] = data.address['Region'];
            else
                reverseObjs['region'] = "";
            if (data && data.address && data.address['Postal'] && data.address['Postal'] != undefined)
                reverseObjs['postal'] = data.address['Postal'];
            else
                reverseObjs['postal'] = "";
            newLocationObj.push(reverseObjs);
        },
        error: function (e) {
            alert('Error: ' + e);
        }
    });

    var finalLocation = newLocationObj;
    return finalLocation;
}

function getTokken() {
    var token = null;
    $.ajax({
        async: false,
        global: false,
        url: "https://www.arcgis.com/sharing/oauth2/token?client_id=YzVigbD9Tdj0bPfV&grant_type=client_credentials&client_secret=7250ba7746a9417889fd82b7ff271fbf&expiration=2880&f=pjson",
        dataType: 'json',
        data: {
            'request': "", 'target': 'arrange_url', 'method': 'method_target'
        },
        type: 'POST',
        success: function (data) {
            token = data.access_token;
        },
        error: function (e) {
            alert('Error: ' + e);
        }
    });
    return token;
}

function getReverseUrl() {
    $.ajax({
        type: "POST",
        url: 'map.aspx/GetReverseUrl',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            console.log('reverse url is' + data.d);
            reverseURL = data.d + latlong  //reverseURL returned from app settings
        }
    });
    return reverseURL
}


var name;
function callBackEnd(name) {
    console.log("Username to send in ajax = " + name);
    $.ajax({
        type: 'POST',
        url: 'map.aspx/GetDate?name=' + name,
        data: JSON.stringify({ name: name }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            // Do something interesting here.
            var jsonData = jQuery.parseJSON(msg.d);
            for (var i = 0; i < jsonData.length; i++) {
                var x = document.getElementById("selectedAccount");
                var option = document.createElement("option");
                option.text = jsonData[i].Name + " - " + jsonData[i].Number;
                option.value = jsonData[i].Name + "&&$$" + jsonData[i].Number + "&&$$" + jsonData[i].AID;
                x.add(option);
            }
            FindUserRoleOnAppStart();
            hideLoader();
        }
    });
}
function callEnvVariables(domConstruct, domAttr, esriConfig, Portal, PortalItem, PortalUser, MapView, WebMap, BasemapToggle, Compass, Home, Expand, BasemapGallery, Search, LayerList,
    Popup, Graphic, PopupTemplate, Point, Locator, on, dom, domReady) {
    $.ajax({
        type: 'POST',
        url: 'map.aspx/GetEnvUrl',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            console.log("Portal URL From App.Config = " + response.d);
            esriConfig.portalUrl = response.d;
            sc_portal = new Portal(response.d);
            //Setting authMode to immediate signs the user in once loaded
            sc_portal.authMode = "immediate";
            // Once portal is loaded, user signed in
            sc_portal.load().then(function () {
                userName = sc_portal.credential.userId;
                //userName = "JordanM@LumosNet.com";
                callBackEnd(userName);
                callAssignSE();
                let DomainName = userName.split("@")
                userDomainName = DomainName[0];
                getFullname(userDomainName);

                $.ajax({
                    type: "POST",
                    url: 'map.aspx/GetEnvMapId',
                    data: '',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function (data) {
                        console.log('Map id is' + data.d);
                        webmap = new WebMap({
                            portalItem: new PortalItem({ // autocasts as new PortalItem()
                                id: data.d  //map id returned from app settings
                            })
                        });


                        view = new MapView({
                            map: webmap,
                            container: "viewDiv",
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

                        var locationBox = domConstruct.toDom('<div id="cardDisplayContainer" class="card pull-left" style="width:300px;"><div id="LocHeader" class="card-header primary-color white-text"><h6 id="fullNameHeader">Welcome!</h6><select class="form-control " id="selectedAccount"><option value=""><option style="" value="Other">New Logo</option></select></div><div id="cardDisplay" style="display:none;"><div class="card-body" style="min-height:50px; max-height:200px; overflow:auto;" id="addLocationsCard"><div id="locationAlert"></div><div id="list" style="font-size:1.0rem;"></div></div><div class="card-footer" style="text-align:center;"><a class="btn btn-primary" id="doneA" onclick="doneAddingALocations()">Done Adding A</a><a class="btn btn-primary" id="createopp" style="display:none;" onclick="createOpportunity()">Confirm Locations</a></div></div></div>');
                        view.ui.add(locationBox, "top-left");

                        // Creates Bulk Upload Button
                        var bulkUpload = domConstruct.create("button", {
                            id: "bulkButton",
                            class: "btn btn-sm btn-primary",
                            innerHTML: "Bulk Upload",
                            style: "display: none"
                        });

                        // Adds the search widget to the top right corner of the view Search widget
                        search = new Search({
                            view: view,
                            allPlaceholder: "blah blah",
                            popupOpenOnSelect: false,
                            id: "searchLoc",

                        });
                        search.defaultSources.withinViewEnabled = true; // Limit search to visible map area only

                        view.ui.add(search, "top-right"); // Add to the view
                        domAttr.set(bulkUpload, 'data-toggle', 'modal');
                        domAttr.set(bulkUpload, 'data-target', '.bd-example');
                        view.ui.add(bulkUpload, "top-right");
                        search.on("select-result", function (searchevent) {

                            //console.info(searchevent);
                            //current_location1 = event.searchTerm;
                            lat = searchevent.result.feature.geometry.latitude;
                            long = searchevent.result.feature.geometry.longitude;
                            location_string = searchevent.result.name;

                            view.popup.title = popupTitle;
                            view.popup.content = "<br><label> Location: </label>" + searchevent.result.name +
                                "<br> <label> X: </label> " + searchevent.result.feature.geometry.latitude + "<label> ,  Y: </label> " + searchevent.result.feature.geometry.longitude +
                                popupContent;
                            view.popup.open({
                                location: searchevent.result.feature.geometry,
                            });
                        });
                        //This line of code is used to solve the erorr
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


                        opportunity = domConstruct.create("button", {
                            id: "opportunityType",
                            class: "btn btn-sm btn-primary",
                            /*onclick: "FindUserRoleOnAppStart()",*/
                            innerHTML: "Opportunity"
                        });

                        domAttr.set(opportunity, 'data-toggle', 'modal');
                        domAttr.set(opportunity, 'data-target', '.opportunity-type');
                        view.ui.add(opportunity, "top-right");
                        view.ui.add(bgExpand2, "top-right");

                        // all done
                        hideLoader();
                        console.log('map loaded succesfully');
                    },
                    error: function () {
                        alert('Error occured');
                    }
                });


            });
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function callAssignSE() {
    $.ajax({
        type: 'POST',
        url: 'map.aspx/GetAssignSE',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            // Do something interesting here.
            console.log(msg.d);
            var mixArray = msg.d;

            for (var i = 0; i < mixArray.length; i++) {
                var arraySE = mixArray[i].split('&&&&');
                $("#opportunity_SE").append(new Option(arraySE[1], arraySE[0]));
            }
        }
    });
}
var name1;
function getFullname(name1) {
    //console.log("Inside get Full name");
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
            var jsonData = jQuery.parseJSON(msg.d);
            document.getElementById("fullNameHeader").innerText = "Welcome   " + jsonData + "!";
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
                    .addClass("custom-combobox-button ui-button ui-widget ui-state-default ui-button-icon-only ")
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
                            value: text, option: this
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

    "dojo/dom",
    "dojo/domReady!"
], function (domConstruct, domAttr, esriConfig, Portal, PortalItem, PortalUser, MapView, WebMap, BasemapToggle, Compass, Home, Expand, BasemapGallery, Search, LayerList,
    Popup, Graphic, PopupTemplate, Point, Locator, on, /*domConstruct, domStyle,*/ dom, domReady) {

    callEnvVariables(domConstruct, domAttr, esriConfig, Portal, PortalItem, PortalUser, MapView, WebMap, BasemapToggle, Compass, Home, Expand, BasemapGallery, Search, LayerList,
        Popup, Graphic, PopupTemplate, Point, Locator, on, dom, domReady)

});

function RedirectToSearch() {
    if (opportunityTypeCheck == true) {
        var SplitLocationByComma = location_string.split(',');
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
            search.clear();
            search.focus();
            //search.view.popup.close();
            view.scale = 7109000;
            document.getElementById("address").value = location_string;
            console.log("latitude here " + lat);
            document.getElementById("lat_lang").value = lat + ", " + long;
            //popupTitle = "Z Location";
            //popupContent = "<br> <button type='button' onclick = 'locationCheck()' class='btn btn-primary' id='addLoc'> Add Z Location to Queue</button>";
            if (popupTitle != "A Location") {
                checkIfLocationNearNet(lat, long, location_string);
                $('#slachange').before("<span class='smaller' style='color: red'>*</span>");
                $('#lblPrimaryUseType').before("<span class='smaller' style='color: red'>*</span>");
                $('#lblLocationType').before("<span class='smaller' style='color: red'>*</span>");

            }
            else {
                document.getElementById("locationtype").value = "OnNet";
                $('#locationtype').prop('disabled', true);
                $("#displayDate").hide();
                document.getElementById("locationtype1").value = "Carrier Building/Data Center";
                document.getElementById("locationSubType").value = "Other";
            }

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

function checkIfLocationNearNet(lat, long, location_string) {
    var ObjLatLong = {
        'Lat': lat,
        'Long': long,
        'Address': location_string,
    };
    //console.log(ObjLoc);
    var jSon = JSON.stringify({ latlongObj: ObjLatLong });
    $.ajax({
        type: 'POST',
        url: 'map.aspx/checkIfLocationNearNet',
        data: jSon,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            // Do something interesting here.
            console.log(msg.d);
            var obj = JSON.parse(msg.d);

            var fiber_checked = $('#fiber').is(':checked');

            if (fiber_checked === false) {
                $("#diversitycheckbox").hide();
                $("#displayDate").hide();

            }
            else {
                $("#diversitycheckbox").show();
                $("#displayDate").show();

            }
            FSR();
            unselectopttions();
            if (obj.LocationType == 241870003) {
                console.log("NearNet Location");
                document.getElementById("locationtype").value = "NearNet";
                $('#locationtype').prop('disabled', true);
                    //$("#fiber").prop("checked", false);
                $("#fiber").prop("disabled", false);
                $("#offnet").prop("disabled", false);
                    //$("#offnet").prop("checked", false);
                    //$("#showclassofserviceandsolution").show();
                    //$("#FSRRequest").show();
                    //$("#showclassofserviceandsolution2").show();
                    //$("#showclassofserviceandsolutionFSR").show();
                $("#displayOnNetRules").hide();
                $("#displayNearNetStuff").show();
                $("#nearnetdistance").val(obj.spirit_builddistance);
                $("#nearnetospcost").val(obj.ospCost);
                $("#nearnetequipmentcost").val(obj.equipmentCost);
               
                $("#cos").val("");
                $("#showinterfacespeed").hide();
                $("#interfacespeed").val("");
                //$("#proposedsolution").val("");
                //$("#bandwidthdisplay").show();
                $("#bandwidth").val("");
                //$('#bandwidth').attr("disabled", false);
                $("#displayDate").show();
                $("#EstimatedCloseDate").val("");
                $("#NearNetOnNetLocationID").val(obj.LocationID);
                $("#nearnetdistance").prop("disabled", true);
                $("#nearnetospcost").prop("disabled", true);
                $("#nearnetequipmentcost").prop("disabled", true);

            }
            else if (obj.LocationType == 241870002) {
                document.getElementById("locationtype").value = "OnNet";
                $('#locationtype').prop('disabled', true);

                $("#fiber").prop("checked", false);
                $("#fiber").prop("disabled", false);
                $("#offnet").prop("disabled", false);
                $("#offnet").prop("checked", false);
                $("#proposedSolution").hide();
                $("#cos").hide();
                $("#cosFSR").hide();
                $("#showclassofserviceandsolution").hide();
                $("#FSRRequest").hide();
                $("#showclassofserviceandsolution2").hide();
                $("#displayOnNetRules").show();
                $("#displayNearNetStuff").hide(); 
                $("#nearnetdistance").val("");
                $("#nearnetospcost").val("");
                $("#nearnetequipmentcost").val("");
                
                $("#cos").val("");
                $("#showinterfacespeed").hide();
                $("#interfacespeed").val("");
                $("#displayDate").show();
                $("#EstimatedCloseDate").val("");
                $("#NearNetOnNetLocationID").val(obj.LocationID);

            }
            else {
                document.getElementById("locationtype").value = "New";
               

                var diversitytype = $('#diversity').is(':checked');
                if (diversitytype == true) {
                    $("#divdiversityType").css("display", "block");

                }
                else {
                    $("#divdiversityType").css("display", "none");

                }
                $("#displayDate").show();
                $("#displayOnNetRules").show();
                $('#locationtype').prop('disabled', true);

                FSR();
                var proposedsolval = $("#FSRproposedsolution").val();
                proposedsolval = $("#FSRproposedsolution").val("");
                unselectopttions();
                document.getElementById("selectedOptionsFSR").innerHTML = "";
                document.getElementById("selectedOptions").innerHTML = "";
            }
        }
    });
} function unselectopttions() {
    var selectedval = '';
    var selectedGroup = [];
    var container = $('.multiselect-container').eq(1);
    container.find("li.active").each(function (index, item) {
        $(this).find("input[type=checkbox]").prop("checked", false);
        $(item).removeClass("active");
        $(item).find("option").hide();
        document.querySelector('#selectedOptions').innerText="";

    });
    $('#cos').multiselect('rebuild');
    $('#cosFSR').multiselect('rebuild');
    var containerFSR =$('.multiselect-container').first();

    containerFSR.find("li.active").each(function (index, item) {
        
        $(this).find("input[type=checkbox]").prop("checked", false);
        $(item).removeClass("active");
        $(item).find("option").hide();
        document.querySelector('#selectedOptionsFSR').innerText = "";

    });


};

function OpenTheModel() {
    console.log("Here I am inside the Model");
    search.view.popup.close();
    errorMessage = "";
    if (wantToAddLocFlag == 1) {
        //console.log("latitude here for flag 1" + lat);
        document.getElementById("sla").value = "A Location " + sourceLocationCount;
        document.getElementById("sla").readOnly = true;
        sourceLocationCount++;
        //document.getElementById("slachange_aterisk").style.display = "none";
        document.getElementById("sla").placeholder = "";
    }
    else {
        document.getElementById("sla").value = "";
        document.getElementById("slachange").innerText = "Location Name Z";
        //document.getElementById("slachange_aterisk").style.display = "block";
        document.getElementById("sla").placeholder = "Please enter a Location Name";
        document.getElementById("sla").readOnly = false;
        document.getElementById("address").value = location_string;
        //console.log("latitude here " + lat);
        document.getElementById("lat_lang").value = lat + ", " + long;
        document.querySelector('#selectedOptionsFSR').innerText = " ";
        document.querySelector('#selectedOptions').innerText = " ";
        $('#selectedOptionsFSR').val("");
        $('#selectedOptions').val("");
        $('#cos').prop("selected", false);
        $('#cosFSR').prop("selected", false);
        $('.multiselect-selected-text').val("");
        //$('#cosFSR').multiselect.val("");
        //$('#cos').val("");
        $('#proposedSolution').val("");
        $('#FSRproposedSolution').val("");
        unselectopttions();
    //    document.getElementById("selectedOptionsFSR").value = "";
    //    document.getElementById("cosFSR").value = "";
    //    document.getElementById("selectedOptions").value = "";
    //    document.getElementById("cos").value = "";
    //    document.getElementById("FSRproposedSolution").value = "";
    //    document.getElementById("proposedSolution").value = "";
    }
    $('#LocInfo').modal('show');
}
var A_Loc_Array_Bulk = {};

function doneAddingALocations() {
    console.log("here");
    document.getElementById("bulkButton").style.display = 'block';
    $("#notification").hide();
    $("#initModal").modal('show');
    $("#notification2").show();
    wantToAddLocFlag = 0;
    sourceLocationCount =
        0;
    document.getElementById('viewDiv').style.opacity = 0.5;
    setTimeout(function () {
        $('#initModal').modal('hide');
        document.getElementById('viewDiv').style.opacity = 1;
    }, 3000);
    popupTitle = "Z Location";
    document.getElementById("doneA").style.display = 'none';
    document.getElementById("createopp").style.display = 'block';
    popupContent = "<br> <button type='button' onclick = 'RedirectToSearch()' class='btn btn-primary' id='addLoc'> Add Z Location to Queue</button>";
    document.getElementById("displayAZ").style.display = 'block';
    console.log(list_of_all_locations);
    A_Loc_Array_Bulk[''] = '';
    for (var i = 0; i < list_of_all_locations.length; i++) {
        console.log(list_of_all_locations[i][0].value);
        if (list_of_all_locations[i][0].value == "YES") {
            $('#AllAZ').append($('<option>', {
                value: list_of_all_locations[i][2].value,
                text: list_of_all_locations[i][3].value + " - " + list_of_all_locations[i][4].value
            }));
            $('#AllAZAgGrid').append($('<option>', {
                value: list_of_all_locations[i][2].value,
                text: list_of_all_locations[i][3].value + " - " + list_of_all_locations[i][4].value
            }));
            $('#AllAZ2').append($('<option>', {
                value: list_of_all_locations[i][2].value,
                text: list_of_all_locations[i][3].value + " - " + list_of_all_locations[i][4].value
            }));
            var id = list_of_all_locations[i][2].value;
            var val = list_of_all_locations[i][3].value + " - " + list_of_all_locations[i][4].value;
            A_Loc_Array_Bulk[id] = val;
            console.log("A_Loc Array For Bulk = " + A_Loc_Array_Bulk);
        }
    }
}

function showDiversityType() {
    if ($('#diversity').prop('checked') == true) {
        //Display Diversity checkbox
        $("#divdiversityType").css("display", "block");
    }
    else {
        //don't display diversity
        $("#divdiversityType").css("display", "none");
        $("#diversitytype").val(" ");
    }
}

$("#locationtype").change(function () {
    var ltype = $("#locationtype").val();
    $("#displayDate").hide();
    $("#EstimatedCloseDate").val("");
    if (ltype == "NearNet") {
        $("#fiber").prop("checked", true);
        $("#fiber").prop("disabled", true);
        $("#offnet").prop("disabled", true);
        $("#offnet").prop("checked", false);
        $("#showclassofserviceandsolution").hide();
        $("#FSRRequest").show();
        $("#showclassofserviceandsolution2").hide();
        $("#displayNearNetStuff").show();
        $("#nearnetdistance").val("");
        $("#nearnetospcost").val("");
        $("#nearnetequipmentcost").val("");
        $("#displayDate").show();
        $("#cos").val("");
        $("#showinterfacespeed").hide();
            //$("#interfacespeed").val("");
            //$("#proposedsolution").val("");
    }
    else {
        $("#fiber").prop("checked", false);
        $("#fiber").prop("disabled", false);
        $("#offnet").prop("disabled", false);
        $("#showclassofserviceandsolution").hide();
        $("#FSRRequest").hide();
        //$("#showclassofserviceandsolution2").hide();
        $("#cos").val("");
        $("#showinterfacespeed").hide();
        //$("#interfacespeed").val("");
        /*$("#proposedsolution").val("");*/
        $("#displayNearNetStuff").hide();
        $("#nearnetdistance").val("");
        $("#nearnetospcost").val("");
        $("#nearnetequipmentcost").val("");
    }
});

$("#locationtype1").change(function () {
    console.log("I am here");
    $("#locationSubType").val("");
    var Value = $('#locationtype1').val();
    if (Value == "Building") {
        $("#displayFloor").show();
        $("#floor").val("1");
        $("#displayMultiTenant").show();
    }
    else {
        $("#displayFloor").hide();
        $("#displayMultiTenant").hide();
    }
    if (Value == "Building" || Value == "Campus Building") {
        $(".displayForBuilding").show();
        $(".displayForTower").hide();
        $(".displayForSplicePoint").hide();
        $(".displayForCarrierBuilding").hide();
    }
    else if (Value == "Tower") {
        $(".displayForBuilding").hide();
        $(".displayForTower").show();
        $(".displayForSplicePoint").hide();
        $(".displayForCarrierBuilding").hide();
    }
    else if (Value == "Small Cell" || Value == "Splice Point") {
        $(".displayForBuilding").hide();
        $(".displayForTower").hide();
        $(".displayForCarrierBuilding").hide();
        $(".displayForSplicePoint").show();
    }
    else {
        $(".displayForBuilding").hide();
        $(".displayForTower").hide();
        $(".displayForSplicePoint").hide();
        $(".displayForCarrierBuilding").show();
    }

});

$('#apartment_type').change(function () {
    var ApartmentTypeValue = $('#apartment_type').val();
    var labelText = "";
    var label = "";

    $('#apartmentValueLabel').remove();

    switch (ApartmentTypeValue) {
        case "APT":
            labelText = "Enter Apartment Number:";
            label = "<Label id='apartmentValueLabel'><span class='smaller' style='color: red'>* </span>" + labelText + "</Label>";
            $('#apartmentVal').before(label);
            break;
        case "STE":
            labelText = "Enter Suite Number:";
            label = "<Label id='apartmentValueLabel'><span class='smaller' style='color: red'>* </span>" + labelText + "</Label>";
            $('#apartmentVal').before(label);
            break;
        case "RM": 
            labelText = "Enter Room Number:";
            label = "<Label id='apartmentValueLabel'><span class='smaller' style='color: red'>* </span>" + labelText + "</Label>";
            $('#apartmentVal').before(label);
            break; 
        case "DEPT":
            labelText = "Enter Department Number:";
            label = "<Label id='apartmentValueLabel'><span class='smaller' style='color: red'>* </span>" + labelText + "</Label>";
            $('#apartmentVal').before(label);
            break;
        case "BLDG":
            labelText = "Enter Building Number:";
            label = "<Label id='apartmentValueLabel'><span class='smaller' style='color: red'>* </span>" + labelText + "</Label>";
            $('#apartmentVal').before(label);
            break;
        case "UNIT":
            labelText = "Enter Unit Number:";
            label = "<Label id='apartmentValueLabel'><span class='smaller' style='color: red'>* </span>" + labelText + "</Label>";
            $('#apartmentVal').before(label);
            break;
    }
    $('#apartmentVal').show();

        if (ApartmentTypeValue.length < 1)
        {
            $('#apartmentVal').hide();
        }

});

$('#fiber').change(function () {
    var fiber_checked = $('#fiber').is(':checked');
    var offnet_checked = $('#offnet').is(':checked');
        //var cosvalue = document.getElementById("cos").val;
    var loctyp = $("#locationtype").val();

    if (loctyp !== "NearNet" && fiber_checked == true) {
            // $("#displayDate").show();
            //$("#EstimatedCloseDate").val("");
        $("#diversity").show();
        $("#diversitycheckbox").show();
    }
    else {
        //$("#displayDate").hide();
        //$("#EstimatedCloseDate").val("");
        $("#diversity").attr("disabled", false);
        $("#diversitycheckbox").hide();

    }
    if (fiber_checked == true && offnet_checked == false) {
        $("#diversitycheckbox").css("display", "block");
        $("#diversity").css("display", "block");
        var diversitytype = $('#diversity').is(':checked');
        if (diversitytype == true) {
            $("#divdiversityType").css("display", "block");

        }
        else {
            $("#divdiversityType").css("display", "none");

        }
        $("#showclassofserviceandsolution").hide();
        $("#FSRRequest").show();
        $("#showclassofserviceandsolution2").hide();
        $("#showclassofserviceandsolutionFSR").show();
       $("#displayDate").show();

        document.getElementById("selectedOptions").style.display = 'none';
        document.getElementById("selectedOptionsFSR").style.display = 'block';

        $("#cos").val("");
            //if (cosvalue == "Ethernet") {
            //    $("#showinterfacespeed").show();
            //}
            //else {
            //    $("#showinterfacespeed").hide();
            //}
    }
    if (fiber_checked == false && offnet_checked == true) {
        $("#showclassofserviceandsolution").show();
        $("#FSRRequest").hide();
        $("#displayDate").show();
        $("#cos").val("");
        document.getElementById("selectedOptionsFSR").style.display = 'none';
        document.getElementById("selectedOptions").style.display = 'block';
        $("#showclassofserviceandsolution2").show();
        $("#showclassofserviceandsolutionFSR").hide();
        $("#showinterfacespeed").show();
        //$("#interfacespeed").val("");
        $("#diversity").hide();
        $("#diversitycheckbox").hide();
        
        //$("#proposedsolution").val("");
    }
    if (offnet_checked == true && fiber_checked == true) {
        var diversitytype = $('#diversity').is(':checked');
        if (diversitytype == true) {
            $("#divdiversityType").css("display", "block");

        }
        else {
            $("#divdiversityType").css("display", "none");

        }
        $("#showclassofserviceandsolution").show();
        $("#FSRRequest").show();
        $("#showclassofserviceandsolution2").show();
        $("#showclassofserviceandsolutionFSR").show();
        document.getElementById("selectedOptionsFSR").style.display = 'block';
        document.getElementById("selectedOptions").style.display = 'block';

     

        $("#displayDate").show();

        $("#cos").val("");
        //if (cosvalue == "Ethernet") {
            $("#showinterfacespeed").show();
        //}
        //else {
        //    $("#showinterfacespeed").hide();
        //}
    }
    if (fiber_checked == false && offnet_checked == false) {
        $("#showclassofserviceandsolution").hide();
        document.getElementById("selectedOptionsFSR").style.display = 'none';
        document.getElementById("selectedOptions").style.display = 'none';
        $("#divdiversityType").css("display", "none");

        $("#FSRRequest").hide();
        $("#showclassofserviceandsolution2").hide();
        $("#showclassofserviceandsolutionFSR").hide();
        $("#displayDate").hide();

        $("#diversity").hide();
        $("#diversitycheckbox").hide();

        $("#cos").val("");
        $("#showinterfacespeed").hide();
        $("#interfacespeed").val("");
        //$("#proposedsolution").val("");
    }
});
function FSR() {
    var fiber_checked = $('#fiber').is(':checked');
    var offnet_checked = $('#offnet').is(':checked');
    //var cosvalue = document.getElementById("cos").val;
    var loctyp = $("#locationtype").val();
    $("#FSRproposedSolution").val("");
    if ($('#apartment_type').val().length < 1) {
        $('#apartmentValueLabel').remove();
        $('#apartmentVal').hide();
    }

    if (loctyp !== "NearNet" && fiber_checked == true) {
         $("#displayDate").show();
        $("#EstimatedCloseDate").val("");
        $("#diversity").show();
        $("#diversitycheckbox").show();

    }
    else {
        //$("#displayDate").hide();
        $("#EstimatedCloseDate").val("");
        $("#diversity").attr("disabled", false);
        $("#diversitycheckbox").hide();

    }
    if (fiber_checked == true && offnet_checked == false) {
        var diversitytype = $('#diversity').is(':checked');
        if (diversitytype == true) {
            $("#divdiversityType").css("display", "block");

        }
        else {
            $("#divdiversityType").css("display", "none");

        }
        $("#showclassofserviceandsolution").hide();
        $("#FSRRequest").show();
        $("#showclassofserviceandsolution2").hide();
        $("#showclassofserviceandsolutionFSR").show();
         $("#displayDate").show();

        document.getElementById("selectedOptions").style.display = 'none';
        document.getElementById("selectedOptionsFSR").style.display = 'block';

        $("#cos").val("");

        //if (cosvalue == "Ethernet") {
        //    $("#showinterfacespeed").show();
        //}
        //else {
        //    $("#showinterfacespeed").hide();
        //}
    }
    if (fiber_checked == false && offnet_checked == true) {
        $("#showclassofserviceandsolution").show();
        $("#FSRRequest").hide();
         $("#displayDate").show();
        $("#cos").val("");
        document.getElementById("selectedOptionsFSR").style.display = 'none';
        document.getElementById("selectedOptions").style.display = 'block';
        $("#showclassofserviceandsolution2").show();
        $("#showclassofserviceandsolutionFSR").hide();
        $("#showinterfacespeed").show();
        //$("#interfacespeed").val("");
        $("#diversity").hide();
        $("#diversitycheckbox").hide();

        //$("#proposedsolution").val("");
    }
    if (offnet_checked == true && fiber_checked == true) {
        var diversitytype = $('#diversity').is(':checked');
        if (diversitytype == true) {
            $("#divdiversityType").css("display", "block");

        }
        else {
            $("#divdiversityType").css("display", "none");

        }
        $("#showclassofserviceandsolution").show();
        $("#FSRRequest").show();
        $("#showclassofserviceandsolution2").show();
        $("#showclassofserviceandsolutionFSR").show();
        document.getElementById("selectedOptionsFSR").style.display = 'block';
        document.getElementById("selectedOptions").style.display = 'block';



        //$("#displayDate").show();

        //$("#cos").val("");
        //if (cosvalue == "Ethernet") {
        //    $("#showinterfacespeed").show();
        //}
        //else {
        //    $("#showinterfacespeed").hide();
        //}
    }
    if (fiber_checked == false && offnet_checked == false) {
        $("#showclassofserviceandsolution").hide();
        document.getElementById("selectedOptionsFSR").style.display = 'none';
        document.getElementById("selectedOptions").style.display = 'none';
        $("#divdiversityType").css("display", "none");

        $("#FSRRequest").hide();
        $("#showclassofserviceandsolution2").hide();
        $("#showclassofserviceandsolutionFSR").hide();
           //$("#displayDate").hide();

        $("#diversity").hide();
        $("#diversitycheckbox").hide();

        $("#cos").val("");
        $("#showinterfacespeed").hide();
        $("#interfacespeed").val("");
        //$("#proposedsolution").val("");
    }
}
$('#offnet').change(function () {
    var fiber_checked = $('#fiber').is(':checked');
    var offnet_checked = $('#offnet').is(':checked');
    var cosvalue = document.getElementById("cos").value;
    if (offnet_checked == true && fiber_checked==false) {
        $("#showclassofserviceandsolutionFSR").hide();
        document.getElementById("selectedOptionsFSR").style.display = 'none';

        document.getElementById("selectedOptions").style.display = 'block';
        document.getElementById("showclassofserviceandsolution2").style.display = 'block';

        $("#showclassofserviceandsolution").show();//displays ONR drop down box
        $("#showclassofserviceandsolution2").show();//displays ONR proposed solution
        $("#proposedSolution").show();
        $("#proposedsolution").show();

        $("#displayDate").show();
        $("#cos").val("");
        if (cosvalue == "Ethernet") {
            $("#showinterfacespeed").show();
        }
        else {
            $("#showinterfacespeed").show();
        }
    }
    if (offnet_checked == true && fiber_checked == true) {
        var diversitytype = $('#diversity').is(':checked');
        if (diversitytype == true) {
            $("#divdiversityType").css("display", "block");

        }
        else {
            $("#divdiversityType").css("display", "none");

        }
        //$("#showclassofserviceandsolution").show();
        //$("#showclassofserviceandsolution2").show();

        $("#FSRRequest").show();
        $("#showclassofserviceandsolutionFSR").show();
        document.getElementById("selectedOptionsFSR").style.display = 'block';
        document.getElementById("selectedOptions").style.display = 'block';

        //$("#cos").val("");
        //if (cosvalue == "Ethernet") {
        //    $("#showinterfacespeed").show();
        //}
        //else {
        $("#showinterfacespeed").show();
        //}

        //document.getElementById("selectedOptions").style.display = 'block';
        $("#showclassofserviceandsolution").show();//displays ONR drop down box
        $("#showclassofserviceandsolution2").show();//displays ONR proposed solution
        $("#proposedSolution").show();

        $("#displayDate").show();
    }
    if (fiber_checked == true && offnet_checked == false) {
        var diversitytype = $('#diversity').is(':checked');
        if (diversitytype == true) {
            $("#divdiversityType").css("display", "block");

        }
        else {
            $("#divdiversityType").css("display", "none");

        }
        $("#showclassofserviceandsolution").hide();
        $("#FSRRequest").show();
        document.getElementById("selectedOptionsFSR").style.display = 'block';
        document.getElementById("selectedOptions").style.display = 'none';
        $("#showclassofserviceandsolution2").hide();
        $("#showclassofserviceandsolutionFSR").show();
        $("#displayDate").show();
        $("#cos").val("");
        $("#showinterfacespeed").hide();
        $("#interfacespeed").val("");
        //$("#proposedsolution").val("");

    }
    if (fiber_checked == false && offnet_checked == false) {
        $("#showclassofserviceandsolution").hide();
        $("#FSRRequest").hide();
        document.getElementById("selectedOptionsFSR").style.display = 'none';
        document.getElementById("selectedOptions").style.display = 'none';
        $("#divdiversityType").css("display", "none");
        $("#showclassofserviceandsolution2").hide();
        $("#showclassofserviceandsolutionFSR").hide();
        $("#displayDate").hide();
        $("#cos").val("");
        $("#showinterfacespeed").hide();
        $("#interfacespeed").val("");
        //$("#proposedsolution").val("");
    }
});

$('#cos').change(function () {
    //var cosvalue = document.getElementById("cos").value;
    ////var bandwidth = document.getElementById("bandwidth").value;
    //var offnet_checked = $('#offnet').is(':checked');
    //if (cosvalue == "Dark Fiber") {
    //    document.getElementById("bandwidth").value = "N/A";
    //    $('#bandwidth').attr("disabled", true);
    //}
    //else {
    //    document.getElementById("bandwidth").value = "";
    //    $('#bandwidth').attr("disabled", false);
    //}
    //if (offnet_checked == true) {
    //    $("#showclassofserviceandsolution").show();
    //    $("#FSRRequest").show();

    //    $("#showclassofserviceandsolution2").show();
    //    if (cosvalue == "Ethernet") {
    //        $("#showinterfacespeed").show();
    //    }
    //    else {
    //        $("#showinterfacespeed").hide();
    //    }
    //}
    //else {
    //    $("#showinterfacespeed").hide();
    //}
});

// Function that displays an error alert message for the UI
function showError(errorMessage, elementName, location) {
    $('#' + elementName).empty();
    $('#' + elementName).append('<div id="app-error-alert" class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + errorMessage);
    $(location).animate({ scrollTop: 0 }, 'slow');
}


function addTheLocationToCard() {
    var errorMessage = "";
    var fiber = false;
    var eoc = false;
    var offnet = false;
    search.clear();
    search.view.popup.close();
    view.scale = 7109000;
    var array_locInfo = [];
    var SLAZ = $('#sla').val();
    var LocationType = $('#locationtype').val();
    var Address = $('#address').val();
    var array = Address.split(',');
    var NearNetDistance = $("#nearnetdistance").val();
    var NearNetOspCost = $("#nearnetospcost").val();
    var NearNetEquipmentCost = $("#nearnetequipmentcost").val();
    var LatLongZ = document.getElementById("lat_lang").value;
    var npanxx = "111111";
    let locationtype1 = $('#locationtype1').val();
    let locationSubtype = $('#locationSubType').val();
    let apartmentType = $('#apartment_type').val();
    let multiTenant = $("input[name='muliTenant']:checked").val();
    let floor = $('#floor').val();
    var AllAZ = $('#AllAZ').val();
    var closingdate = $("#EstimatedCloseDate").val();
    var diversity = document.getElementById('diversity').checked;
    if (SLAZ == typeof 'undefined' || SLAZ == null || SLAZ.length == 0 || SLAZ == "") {
        errorMessage = "Enter The Service Location Z Name. <br>";
    }
    if (LocationType == " ") {
        errorMessage = "Select the Location Type. <br>";
    }
    if (LocationType == "NearNet") {
        if (NearNetDistance == "") {
            errorMessage = "Near Net Distance is empty. <br>";
        }
        if (NearNetOspCost == "") {
            errorMessage = "Near Net Osp Cost is empty. <br>";
        }
        if (NearNetEquipmentCost == "") {
            errorMessage = "Near Net Equipment Cost is empty. <br>";
        }
    }
    if (!locationtype1 || locationtype1 == "") {
        errorMessage += "Select Location Type 1. <br>";
    }
    if (!locationSubtype || locationSubtype == "") {
        errorMessage += "Select Location Sub Type. <br>";
    }
    if (locationtype1 == "Building" && (!floor || floor == "")) {
        errorMessage += "Select Floor. <br>";
    }

    if (multiTenant == "Yes" && apartmentType == "") {
        errorMessage += "Select STE/APT/RM. <br>";
    }

    if (apartmentType != "" && $('#apartment').val() == "") {
        errorMessage += "Please provide " + apartmentType + " #" + ". <br>";
    }
    if (SLAZ.indexOf("A Location")==-1 && AllAZ === null || AllAZ == "") {
        errorMessage += "Please provide A to Z location" + ". <br>";
    }

    var fiber_checked = document.getElementById('fiber').checked;
    var cosFSR = document.querySelector('#selectedOptionsFSR').innerText;
    var cosONR = document.querySelector('#selectedOptions').innerText;
    //var cos = $('#cos').val();
    var interfacespeed = $('#interfacespeed').val();
    var proposedsol = $('#proposedsolution').val();
    var fsrproposedsolution = $('#FSRproposedsolution').val();

    if (fiber_checked == true) {
        if (cosFSR == "") {
            errorMessage = errorMessage + "Select Class of Service. <br>";
        }
        //if (cos == "") {
        //    errorMessage = errorMessage + "Select Class of Service. <br>";
        //}
        //if (proposedsol == "") {
        //    errorMessage = errorMessage + "Please fill out proposed solution field. <br>";
        //}
        if (fsrproposedsolution == "") {
            errorMessage = errorMessage + "Please fill out proposed solution field. <br>";
        }
        
        if (LocationType !== "NearNet") {
            if (closingdate == "") {
                errorMessage = errorMessage + "Please Enter the Completed Date. <br>";
            }
        }
    }

    var off_net_checked = document.getElementById('offnet').checked;

    if (off_net_checked == true) {
        if (cosONR == "") {
            errorMessage = errorMessage + "Select Class of Service. <br>";
        }
        //if (cos == "") {
        //    errorMessage = errorMessage + "Select Class of Service. <br>";
        //}
        if (proposedsol == "") {
            errorMessage = errorMessage + "Please fill out proposed solution field. <br>";
        }
       
        if (cos == "Ethernet") {
            if (interfacespeed == "") {
                errorMessage = errorMessage + "Please fill out interface speed. <br>";
            }
        }
    //    if (cosONR == "Ethernet") {   ********************************** ADD error check
    //        if (interfacespeed == "") {
    //            errorMessage = errorMessage + "Please fill out interface speed. <br>";
    //        }
    //    }
    }
    var Region = document.getElementById('region').value;
    var diversity = document.getElementById("diversity").checked;
    var diversitytype = $('#diversitytype').val();

    
    if (diversity == true) {
        if (diversitytype == "" || diversitytype == typeof 'undefined') {
            errorMessage = errorMessage + "Select Diversity type. <br>";
        }
    }

    if (errorMessage == "") {
        if ($('#hqAddress').prop('checked') == true) {
            document.getElementById("hqAddressDiv").style.display = 'none';
            headQuartersAddress = $('#address').val();
            console.log("headQuartersAddress == " + headQuartersAddress);
            $("#hqAddress").prop("checked", false);
        }
        if ($('#primaryAddress').prop('checked') == true) {
            document.getElementById("primaryAddressDiv").style.display = 'none';
            primaryContactAddress = $('#address').val();
            console.log("primaryContactAddress == " + primaryContactAddress);
            $("#primaryAddress").prop("checked", false);
        }
        if (popupTitle == "A Location") {
            var sourcelocationobj = parseLocationData('IsSourceLocation', 'YES');
            array_locInfo.push(sourcelocationobj);
            var locationAlreadyExistobj = parseLocationData('locationAlreadyExist', 'NO');
            array_locInfo.push(locationAlreadyExistobj);
            var locid = parseLocationData("tempid", "ALOC-" + AlocCount);
            array_locInfo.push(locid);
            AlocCount++;
        }
        else {
            var sourcelocationobj = parseLocationData('IsSourceLocation', 'NO');
            array_locInfo.push(sourcelocationobj);
            var locationAlreadyExistobj = parseLocationData('locationAlreadyExist', 'NO');
            array_locInfo.push(locationAlreadyExistobj);
            var locid = parseLocationData("tempid", "NoNeed");
            array_locInfo.push(locid);
        }
        var locnameobj = parseLocationData('sla', SLAZ);
        var addressobj = parseLocationData('address', Address);
        var locationtypeobj = parseLocationData('locationtype', LocationType);
        array_locInfo.push(locnameobj, addressobj, locationtypeobj);
        
        

        var npanxobj = parseLocationData('npanxx', npanxx);
        var regionobj = parseLocationData('region', Region);
        var coordinatesobj = parseLocationData('lat_long', LatLongZ);

        array_locInfo.push(npanxobj, regionobj, coordinatesobj);
        var apartment = $('#apartment').val();
        console.log("apartment = " + apartment);
        if (apartment !== '') {
            var aptobj = parseLocationData('apartment', apartment);
            array_locInfo.push(aptobj);
        }
        if (fiber_checked == true) {
            var fiber_checkedobj = parseLocationData('fiber', 'true');
            array_locInfo.push(fiber_checkedobj);
        }
        if (off_net_checked == true) {
            var offnet_checkedobj = parseLocationData('offnet', 'true');
            array_locInfo.push(offnet_checkedobj);
        }
        if (diversity == true) {
            var diversityobj = parseLocationData('diversity', 'true');
            array_locInfo.push(diversityobj);
            var diversitytype = $('#diversitytype').val();
            if (diversitytype !== "" || diversitytype !== typeof 'undefined') {
                var diversitytypeobj = parseLocationData('diversitytype', diversitytype);
                array_locInfo.push(diversitytypeobj);
            }
        }

        //if (cos !== "") {
        //    var cosobj = parseLocationData('cos', cos);
        //    array_locInfo.push(cosobj)
        //}
        if (cosFSR !== "") {
            var cosFsrObj = parseLocationData('selectedOptionsFSR', cosFSR);
            array_locInfo.push(cosFsrObj)
        }
        if (cosONR !== "") {
            var cosOnrObj = parseLocationData('selectedOptions', cosONR);
            array_locInfo.push(cosOnrObj)
        }

        if (fsrproposedsolution != "") {
            var fsrproposedsolobj = parseLocationData('FSRproposedsolution', fsrproposedsolution);
            array_locInfo.push(fsrproposedsolobj);
        }
        if (proposedsol != "") {
            var proposedsolobj = parseLocationData('proposedsolution', proposedsol);
            array_locInfo.push(proposedsolobj);
        }
        if (interfacespeed != "") {
            var interfacespeedobj = parseLocationData('interfacespeed', interfacespeed);
            array_locInfo.push(interfacespeedobj);
        }
        if (closingdate !== "") {
            var closingdateobj = parseLocationData('closingdate', closingdate);
            array_locInfo.push(closingdateobj);
        }
        if (LocationType == "NearNet") {
            if (NearNetDistance !== "") {
                var nearnetdistanceobj = parseLocationData('nearnetdistance', NearNetDistance);
                array_locInfo.push(nearnetdistanceobj);
            }
            if (NearNetOspCost !== "") {
                var nearnetospcostobj = parseLocationData('nearnetospcost', NearNetOspCost);
                array_locInfo.push(nearnetospcostobj);
            }
            if (NearNetEquipmentCost !== "") {
                var nearnetequipmentcostobj = parseLocationData('nearnetequipmentcost', NearNetEquipmentCost);
                array_locInfo.push(nearnetequipmentcostobj);
            }

        }
        var NearNetOnNetLocationID = $("#NearNetOnNetLocationID").val();
        console.log("#NearNetOnNetLocationID = " + NearNetOnNetLocationID);
        //if (NearNetOnNetLocationID != "") {
        var NearNetOnNetLocationIDobj = parseLocationData('NearNetOnNetLocationID', NearNetOnNetLocationID);
        array_locInfo.push(NearNetOnNetLocationIDobj);
        //}
        var ALOC = $('#AllAZ').val();
        if (ALOC !== '') {
            var valALOC = $('#AllAZ').val();
            var ALOCobj = parseLocationData('AttachedAloc', valALOC);
            array_locInfo.push(ALOCobj);
        }
        if ($('#locationtype1').val() != "") {
            array_locInfo.push(parseLocationData('LocationType1', $('#locationtype1').val()));
        }
        if ($('#locationSubType').val() != "") {
            array_locInfo.push(parseLocationData('LocationSubType', $('#locationSubType').val()));
        }
        if ($('#locationtype1').val() == "Building" && $('#floor').val() != "") {
            array_locInfo.push(parseLocationData('Floor', $('#floor').val()));
            array_locInfo.push(parseLocationData('MultiTenant', $("input[name='muliTenant']:checked").val()));
        }
        if ($('#apartment_type').val() != "") {
            array_locInfo.push(parseLocationData('ApartmentType', $('#apartment_type').val()));
        }
        console.log(array_locInfo);
        console.log("Clear out form values");
        $('#LocInfo').modal('hide');
        $('#AllAZ').val("");
        $('#locationtype').val(" ");
        document.getElementById("fiber").checked = false;
        document.getElementById("offnet").checked = false;
        document.getElementById('diversity').checked = false;
        $("#address").val("");
        $("#lat_lang").val("");
        //$('#cos').val("");
        $('#selectedOptionsFSR').val("");
        $('#selectedOptions').val("");
        $('#diversitytype').val("");
        $('#diversity').hide();
        $('#buisnessAcountAlert').empty();
        document.getElementById("divdiversityType").style.display = "none";
        document.getElementById("showclassofserviceandsolution").style.display = "none";
        document.getElementById("showclassofserviceandsolutionFSR").style.display = "none";
        document.getElementById("FSRRequest").style.display = "none";

        document.getElementById("showclassofserviceandsolution2").style.display = "none";
        //$('#interfacespeed').val("");
        $('#FSRproposedsolution').val("");
        $('#proposedsolution').val("");
        $('#apartment').val("");
        $("#nearnetdistance").val("");
        $("#nearnetospcost").val("");
        $("#nearnetequipmentcost").val("");
        $("#displayNearNetStuff").hide();
        $("#displayDate").hide();
        $("#EstimatedCloseDate").val("");
        errorMessage = "";
        addExistingLocationToCart(array_locInfo);
        $("#NearNetOnNetLocationID").val("");
        $('#locationSubType').val('');
        $('#locationtype1').val('');
        $('#apartment_type').val('');
        $('#floor').val('');
    }
    else {
        console.log(errorMessage);
        var elementName = 'buisnessAcountAlert';
        showError(errorMessage, elementName, '#LocInfo');
        errorMessage = "";
    }
}

// Function that parses bulk upload into a parsable object for the buidList fucntion
function parseLocationData(name, value) {
    var rowObj = {};
    rowObj['name'] = name;
    rowObj['value'] = value;
    return rowObj;
}
$('#opportunity_carriertype').change(function () {
    var carriertype = $("#opportunity_carriertype").val();
    if (carriertype == "FTTC") {
        document.getElementById("display_FTTCtype").style.display = "block";
    }
    else {
        document.getElementById("display_FTTCtype").style.display = "none";
    }
});
function createOpportunity() {
    var acc = $('#selectedAccount').val();
    if (acc == "" && NewOpp == true) {
        alert("Please Select the account");
    }
    else {
        //var name = userName.split('@');
        $('#employee_username').val(userDomainName);
        var ul = document.getElementById("service_locations");
        var lis;
        while ((lis = ul.getElementsByTagName("li")).length > 0) {
            ul.removeChild(lis[0]);
        }
        if (acc == "Other") {
            $("#o_account_name").val("");
            $("#o_account_number").val("None");
            $("#o_account_id").val("None");
            $(".ifNewLogo").show();
            document.getElementById("acc_name_view").style.display = "block";
            document.getElementById("acc_num_view").style.display = "none";
            $("#o_account_name").attr("readonly", false);
            $(".contactInfo").show();
            $("#con_name").val("");
            $("#c_num").val("");
            $("#email").val("");
            if (primaryContactAddress !== "") {
                var primaryContactAddressSplit = primaryContactAddress.split(",");
                $("#c_street").val(primaryContactAddressSplit[0]);
                $("#c_city").val(primaryContactAddressSplit[1]);
                $("#c_state").val(primaryContactAddressSplit[2]);
                $("#c_stateInput").val(primaryContactAddressSplit[2]);
                $("#c_zip").val(primaryContactAddressSplit[3]);
                $("#c_street").attr("readonly", true);
                $("#c_city").attr("readonly", true);
                $("#c_state").attr("readonly", true);
                $("#c_zip").attr("readonly", true);
                $("#c_stateInput").attr("readonly", true);
                $("#c_stateInput").show();
                $("#c_state").hide();

            }
            else {
                $("#c_street").attr("readonly", false);
                $("#c_city").attr("readonly", false);
                $("#c_state").attr("readonly", false);
                $("#c_zip").attr("readonly", false);
                $("#c_stateInput").hide();

            }
            if (headQuartersAddress !== "") {
                var headQuartersAddressSplit = headQuartersAddress.split(",");
                $("#o_account_hq_street").val(headQuartersAddressSplit[0]);
                $("#o_account_hq_city").val(headQuartersAddressSplit[1]);
                $("#o_account_hq_stateInput").val(headQuartersAddressSplit[2]);
                $("#o_account_hq_state").val(headQuartersAddressSplit[2]);
                $("#o_account_hq_zip").val(headQuartersAddressSplit[3]);
                $("#o_account_hq_street").attr("readonly", true);
                $("#o_account_hq_city").attr("readonly", true);
                $("#o_account_hq_state").attr("readonly", true);
                $("#o_account_hq_zip").attr("readonly", true);
                $("#o_account_hq_stateInput").attr("readonly", true);
                $("#o_account_hq_stateInput").show()
                $("#o_account_hq_state").hide()
            }
            else {
                $("#o_account_hq_street").attr("readonly", false);
                $("#o_account_hq_city").attr("readonly", false);
                $("#o_account_hq_state").attr("readonly", false);
                $("#o_account_hq_zip").attr("readonly", false);
                $("#o_account_hq_stateInput").hide();
            }
        }
        else {
            document.getElementById("acc_name_view").style.display = "block";
            document.getElementById("acc_num_view").style.display = "block";
            var jsonData = document.getElementById("selectedAccount").value;
            var account_detail = jsonData.split("&&$$");
            $("#o_account_name").val(account_detail[0]);
            $("#o_account_number").val(account_detail[1]);
            $("#o_account_id").val(account_detail[2]);
            $(".contactInfo").hide();
            $(".ifNewLogo").hide();
            $("#o_account_name").attr("readonly", true);
            $("#o_account_number").attr("readonly", true);
        }

        $('#ConnectToDynamcis').modal('show');
        document.getElementById('o_account_hq__num').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });

        document.getElementById('c_num').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });

        if (NewOpp == false) {
            $(".accountHide").hide();
            $("#opportunity_name").val(oppName);
            $("#opportunity_name").prop("readonly", true);
            document.getElementById("display_newOppInfo").style.display = "none";
            $("#opportunity_contract").val("New");
            $("#opportunity_carriertype").val("End User");
            $("#opportunity_FTTCtype").val("Macro Lit");
            $("#opportunity_SE").val("");
            document.getElementById("acc_name_view").style.display = "none";
            document.getElementById("acc_num_view").style.display = "none";
            $(".contactInfo").hide();
        }
        else {
            $("#opportunity_name").val("");
            document.getElementById("display_newOppInfo").style.display = "block";
            $("#opportunity_contract").val("New");
            $("#opportunity_SE").val("");
            $("#opportunity_carriertype").val("End User");
            $("#opportunity_FTTCtype").val("Macro Lit");
        }
        for (var i = 0; i < list_of_all_locations.length; i++) {
            var location_display = "";
            var location_num = i;
            location_display = location_display + i.toString() + " - ";
            $.each(list_of_all_locations[i], function (i, field) {
                if (field.name == 'sla') {
                    location_display = location_display + field.value;
                }
                if (field.name == 'address') {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'apartment' && (field.value !== '')) {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'locationtype') {
                    location_display = location_display + ", " + field.value;
                }
             
                if (field.name == 'lat_long') {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'fiber' && field.value == 'true') {
                    location_display = location_display + ", fiber - " + field.value;
                }
                if (field.name == 'offnet' && field.value == 'true') {
                    location_display = location_display + ", offnet - " + field.value;
                }
                if (field.name == 'diversity' && field.value == 'true') {
                    location_display = location_display + ", diversity - " + field.value;
                }
                if (field.name == 'diversitytype' && field.value !== "") {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'cos' && field.value !== "") {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'selectedOptionsFSR' && field.value !== "") {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'selectedOptions' && field.value !== "") {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'interfacespeed' && field.value !== "") {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'FSRproposedsolution ' && field.value !== "") {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'proposedsol' && field.value !== "") {
                    location_display = location_display + ", " + field.value;
                }
                if (field.name == 'proposedsolution' && field.value !== "") {
                    location_display = location_display + ", " + field.value;
                }
            });
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(location_display));
            ul.appendChild(li);
        }
    }
}

function ConnectToDynamics() {
    var errorMessage = "";
    //if the new opportunity to create
    if (NewOpp == true) {
        var opportunity_name = $("#opportunity_name").val();
        var EOpportunityselectedTermArray = [];
        var EOpportunityContract = $("#opportunity_contract").val();
        var contact_name = $("#con_name").val();
        var contact_phone = $("#c_num").val();
        var contact_email = $("#email").val();
        var ContactStreet = $('#c_street').val();
        var ContactCity = $('#c_city').val();
        var ContactState = $('#c_state').val() != "" && $('#c_state').val() != null ? GetStateByAbbreviation($('#c_state').val()) : $("#c_stateInput").val(); //comes in as null if user selects checkbox for primary state contact
        var ContactZip = $('#c_zip').val();
        var EmployeeName = $("#employee_username").val();
        var EAccountName = $("#o_account_name").val();
        var EAccountNumber = $("#o_account_number").val();
        var EAccountID = $("#o_account_id").val();
        let EAccountPhone = $("#o_account_hq__num").val();
        let EAccountStreet = $("#o_account_hq_street").val();
        let EAccountCity = $("#o_account_hq_city").val();
        let EAccountState = $("#o_account_hq_state").val() != "" && $("#o_account_hq_state").val() != null ? GetStateByAbbreviation($("#o_account_hq_state").val()) : $("#o_account_hq_stateInput").val(); //comes in as null if user selects checkbox for HQ state contact
        let EAccountZip = $("#o_account_hq_zip").val();
        let EAccountUrl = $("#o_account_url").val() != "" || $("#o_account_url").val() != undefined ? $("#o_account_url").val() : "";
        var ECarrierType = $("#opportunity_carriertype").val();
        var EAssignSE = $("#opportunity_SE").val();
        var EEstimaedCloseDate = document.getElementById("EstimatedCloseDateOpp").value;
        var EEstimaedRevenue = document.getElementById("EstimatedRevenue").value;
        var EFTTCType = "";
        if (ECarrierType == "FTTC") {
            EFTTCType = $("#opportunity_FTTCtype").val();
        }
        $('#checkboxes input:checked').each(function () {
            EOpportunityselectedTermArray.push($(this).attr('id'));
        });
        if (opportunity_name.length == 0) {
            errorMessage += "Opportunity Name missing. <br>"
        }
        if (EAssignSE == "") {
            errorMessage += "Assign SE missing. <br>"
        }
        if (EEstimaedCloseDate.length == 0) {
            errorMessage += "Estimated Close Date missing. <br>"
        }
        if (EEstimaedRevenue.length == 0) {
            errorMessage += "Estimated Revenue missing. <br>"
        }
        if (EAccountNumber == "None") {
            if (EAccountName.length == 0) {
                errorMessage += "Account Name missing. <br>"
            }
            if (EAccountPhone.length == 0) {
                errorMessage += "Account Phone Number missing. <br>"
            }
            if (EAccountStreet.length == 0) {
                errorMessage += "HQ Street missing. <br>"
            }
            if (EAccountCity.length == 0) {
                errorMessage += "HQ City missing. <br>"
            }
            if (EAccountState.length == 0) {
                errorMessage += "HQ State missing. <br>"
            }
            if (EAccountZip.length == 0) {
                errorMessage += "HQ Zip missing. <br>"
            }
            if (contact_name.length == 0) {
                errorMessage += "Contact Name missing. <br>"
            }
            if (contact_phone.length == 0) {
                errorMessage += "Phone number missing. <br>"
            }
            if (contact_email.length == 0) {
                errorMessage += "Email missing. <br>"
            }
            if (ContactStreet.length == 0)
                errorMessage += "Primary Contact Street Ad missing. <br>"
            if (ContactCity.length == 0)
                errorMessage += "Primary Contact City missing. <br>"
            if (ContactState.length == 0)
                errorMessage += "Primary Contact State missing. <br>"
            if (ContactZip.length == 0)
                errorMessage += "Primary Contact Zip missing. <br>"
        }
        if (errorMessage == "") {
            $('#ConnectToDynamcis').modal('hide');
            var ObjLoc = {
                'EmployeeName': EmployeeName,
                'EAccountName': EAccountName,
                'EAccountNumber': EAccountNumber,
                'EAccountID': EAccountID,
                'EAccountPhone': EAccountPhone,
                'EAccountStreet': EAccountStreet,
                'EAccountCity': EAccountCity,
                'EAccountState': EAccountState,
                'EAccountZip': EAccountZip,
                'EAccountUrl': EAccountUrl,
                'EOpportunityName': opportunity_name,
                'EOpportunityTerm': EOpportunityselectedTermArray,
                'EOpportunityContract': EOpportunityContract,
                'EContactName': contact_name,
                'EContactNumber': contact_phone,
                'EContactEmail': contact_email,
                'ContactStreet': ContactStreet,
                'ContactCity': ContactCity,
                'ContactState': ContactState,
                'ContactZip': ContactZip,
                'ECarrierType': ECarrierType,
                'EFTTCType': EFTTCType,
                'EAssignSE': EAssignSE,
                'EEstimaedCloseDate': EEstimaedCloseDate,
                'EEstimaedRevenue': EEstimaedRevenue,
            };
            console.log(ObjLoc);
            var jSon = JSON.stringify({ oppObj: ObjLoc });
            $.ajax({
                type: 'POST',
                beforeSend: function () { showLoader(); },
                url: 'map.aspx/createOpportunity',
                contentType: 'application/json; charset=utf-8',
                data: jSon,
                dataType: 'json',
                success: function (msg) {
                    if (msg.d !== "Exception") {
                        //hideLoader();
                        console.log(msg.d);
                        var oppInfo = msg.d;
                        var array = oppInfo.split("&&&&");
                        oppId = array[0];
                        createALocations(oppId, EOpportunityselectedTermArray);
                        $('#SuccessModal').modal('show');
                        var txt = "Opportunity " + array[1] + " is created";
                        console.log(txt);
                        $("#oppcreatedid").text(txt);
                        $("#oppCreatedNotification").show();
                        //showLoader();
                        hideLoader();
                        //$("#oppCreatedNotification").hide();

                    }
                    else {
                        hideLoader();
                        var errorMessage = "Opportunity was not created some of the input values were wrong please try again ";
                        alert(errorMessage);
                        showError(errorMessage, 'mainAlert', 'html,body');
                    }
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        }
        else {
            showError(errorMessage, 'dynamicsFormAlert', '#ConnectToDynamcis');
        }
    }
    else {

        var EOpportunityselectedTermArray = [];
        $('#checkboxes input:checked').each(function () {
            EOpportunityselectedTermArray.push($(this).attr('id'));
        });
        if (errorMessage == "") {
            $('#ConnectToDynamcis').modal('hide');
            $('#SuccessModal').modal('show');
            $("#oppExistingNotification").show();
            createALocations(oppId, EOpportunityselectedTermArray);
        }
        else {
            showError(errorMessage, 'dynamicsFormAlert', '#ConnectToDynamcis');
        }
    }
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

function createALocations(oppId, term) {
    //also add code for existing locations here itself
    for (var i = 0; i < list_of_all_locations.length; i++) {
        if (list_of_all_locations[i][0].name == "IsSourceLocation" && list_of_all_locations[i][0].value == "YES" && list_of_all_locations[i][1].name == "locationAlreadyExist" && list_of_all_locations[i][1].value == "NO") {
            var sla = "";
            var address = "";
            var apartment = "";
            var locationtype = "";
            var bandwidth = "";
            var lat_long = "";
            var fiber = "false";
            var offnet = "false";
            var diversity = "false";
            var diversitytype = "";
            var cos = "";
            var cosFSR = "";
            var cosONR = "";
            var interfacespeed = "";
            var FSRproposedsol = "";
            var proposedsol = "";
            var tempid = "";
            var nearnetdistance = "";
            var nearnetospcost = "";
            var nearnetequipmentcost = "";
            var closingdate = "";
            let LocationType1 = "";
            let LocationSubType = "";
            let LocationMultiTenant = "";
            let LocationFloor = "";
            let LocationApartmentType = "";
            $.each(list_of_all_locations[i], function (i, field) {
                if (field.name == 'sla') {
                    sla = field.value;
                }
                if (field.name == 'address') {
                    address = field.value;
                }
                if (field.name == 'tempid') {
                    tempid = field.value;
                }
                if (field.name == 'apartment' && (field.value !== '')) {
                    apartment = field.value;
                }
                if (field.name == 'locationtype') {
                    locationtype = field.value;
                }
                
                if (field.name == 'lat_long') {
                    lat_long = field.value;
                }
                if (field.name == 'fiber' && field.value == 'true') {
                    fiber = "true";
                }
                if (field.name == 'offnet' && field.value == 'true') {
                    offnet = "true";
                }
                if (field.name == 'diversity' && field.value == 'true') {
                    diversity = "true";
                }
                if (field.name == 'diversitytype' && field.value !== "") {
                    diversitytype = field.value;
                }
                if (field.name == 'cos' && field.value !== "") {
                    cos = field.value;
                }
                if (field.name == 'selectedOptionsFSR' && field.value !== "") {
                    cosFSR = field.value;
                }
                if (field.name == 'selectedOptions' && field.value !== "") {
                    cosONR = field.value;
                }
                if (field.name == 'interfacespeed' && field.value !== "") {
                    interfacespeed = field.value;
                }
                if (field.name == 'bandwidth' && field.value !== "") {
                    bandwidth = field.value;
                }
                if (field.name == 'FSRproposedsolution' && field.value !== "") {
                    FSRproposedsol = field.value;
                }
                if (field.name == 'proposedsolution' && field.value !== "") {
                    proposedsol = field.value;
                }
                if (field.name == 'nearnetdistance' && field.value !== "") {
                    nearnetdistance = field.value;
                }
                if (field.name == 'nearnetospcost' && field.value !== "") {
                    nearnetospcost = field.value;
                }
                if (field.name == 'nearnetequipmentcost' && field.value !== "") {
                    nearnetequipmentcost = field.value;
                }
                if (field.name == 'closingdate' && field.value !== "") {
                    closingdate = field.value;
                }
                if (field.name == "LocationType1")
                    LocationType1 = field.value;
                if (field.name == "LocationSubType")
                    LocationSubType = field.value;
                if (field.name == "Floor")
                    LocationFloor = field.value;
                if (field.name == "MultiTenant")
                    LocationMultiTenant = field.value;
                if (field.name == "ApartmentType")
                    LocationApartmentType = field.value;
            });
            var A_locObj = {
                'LocationName': sla,
                'LocationType': locationtype,
                'tempid': tempid,
                'LocationAddress': address,
                'LocationApartment': apartment,
                'LocationLatLong': lat_long,
                'LocationRegion': "Carrier",
                'LocationFiber': fiber,
                'LocationOffnet': offnet,
                'LocationNpanxx': '111111',
                'LocationDiversity': diversity,
                'LocationDiversitytype': diversitytype,
                'LocationCos': cos,
                'LocationCosFsr': cosFSR,
                'LocationCosOnr': cosONR,
                'LocationInterfaceSpeed': interfacespeed,
                'LocationBandwidth': bandwidth,
                'LocationFSRProposedSol': FSRproposedsol,
                'LocationProposedSol': proposedsol,
                'LocationNearNetDistance': nearnetdistance,
                'LocationNearNetOspCost': nearnetospcost,
                'LocationNearNetEqipmentCost': nearnetequipmentcost,
                'LocationClosingDate': closingdate,
                'id': "",
                'LocationType1': LocationType1,
                'LocationSubType': LocationSubType,
                'LocationMultiTenant': LocationMultiTenant,
                'LocationFloor': LocationFloor,
                'LocationApartmentType': LocationApartmentType
            };
            console.log(A_locObj);
            list_of_A_locations.push(A_locObj);
        }
    }
    console.log(list_of_A_locations);
    createLocations(list_of_A_locations, oppId, term);
}
//function create the locations now
function createLocations(list_of_A_locations, oppId, term) {
    var list_ZLoc = [];
    if (list_of_A_locations.length !== 0) {
        var JsonLocValue = JSON.stringify(list_of_A_locations);
        //console.log("here");
        var name = userName.split('@');
        var LocationObject = {
            'username': name[0],
            'term': term,
            'OppID': oppId,
            'LocationData': JsonLocValue,
        };
        console.log(LocationObject);
        //create location
        var jSon = JSON.stringify({ ALocObj: LocationObject });
        $.ajax({

            type: 'POST',
            beforeSend: function () { showLoader(); },
            url: 'map.aspx/create_ALocations',
            contentType: 'application/json; charset=utf-8',
            data: jSon,
            dataType: 'json',
            success: function (msg) {

                if (msg.d !== "Exception") {
                    console.log("location created");
                    console.log(msg.d);
                    //alert("A Locations Created");
                    $("#ALocCreatedNotification").show();
                    attachIDAtoZ(msg.d, oppId, term);
                }
                else {
                    var errorMessage = "Opportunity was not created some of the input values were wrong please try again";
                    alert(errorMessage);
                    showError(errorMessage, 'mainAlert', 'html,body');
                }
            },
            error: function (request, status, error) {

                alert(request.responseText);
            }
        });
    }
    //if no A location to attach
    else {

        for (var i = 0; i < list_of_all_locations.length; i++) {
            if (list_of_all_locations[i][0].name == "IsSourceLocation" && list_of_all_locations[i][0].value == "NO" && list_of_all_locations[i][1].name == "locationAlreadyExist" && list_of_all_locations[i][1].value == "NO") {
                var sla = "";
                var address = "";
                var apartment = "";
                var locationtype = "";
                var bandwidth = "";
                var lat_long = "";
                var fiber = "false";
                var offnet = "false";
                var diversity = "false";
                var diversitytype = "";
                var cos = "";
                var cosFsr = "";
                var cosOnr = "";
                var interfacespeed = "";
                var FSRproposedsolution = "";
                var proposedsolution = "";
                var proposedsol = "";
                var tempid = "";
                var attachAZ = "";
                var nearnetdistance = "";
                var nearnetospcost = "";
                var nearnetequipmentcost = "";
                var closingdate = "";
                let LocationType1 = "";
                let LocationSubType = "";
                let LocationMultiTenant = "";
                let LocationFloor = "";
                let LocationApartmentType = "";
                var NearNetOnNetLocationIDval = "";
                $.each(list_of_all_locations[i], function (i, field) {
                    if (field.name == 'sla') {
                        sla = field.value;
                    }
                    if (field.name == 'address') {
                        address = field.value;
                    }
                    if (field.name == 'tempid') {
                        tempid = field.value;
                    }
                    if (field.name == 'apartment' && (field.value !== '')) {
                        apartment = field.value;
                    }
                    if (field.name == 'locationtype') {
                        locationtype = field.value;
                    }
                   
                    if (field.name == 'lat_long') {
                        lat_long = field.value;
                    }
                    if (field.name == 'fiber' && field.value == 'true') {
                        fiber = "true";
                    }
                    if (field.name == 'offnet' && field.value == 'true') {
                        offnet = "true";
                    }
                    if (field.name == 'diversity' && field.value == 'true') {
                        diversity = "true";
                    }
                    if (field.name == 'diversitytype' && field.value !== "") {
                        diversitytype = field.value;
                    }
                    if (field.name == 'cos' && field.value !== "") {
                        cos = field.value;
                    }
                    if (field.name == 'selectedOptionsFSR' && field.value !== "") {
                        cosFsr = field.value;
                    }
                    if (field.name == 'selectedOptions' && field.value !== "") {
                        coseOnr = field.value;
                    }
                    if (field.name == 'interfacespeed' && field.value !== "") {
                        interfacespeed = field.value;
                    }
                    if (field.name == 'bandwidth' && field.value !== "") {
                        bandwidth = field.value;
                    }
                    if (field.name == 'proposedsol' && field.value !== "") {
                        proposedsol = field.value;
                    }
                    //if (field.name == 'FSRproposedsolution' && field.value !== "") {
                    //    fsrProposedsol = field.value;
                    //}
                    if (field.name == 'nearnetdistance' && field.value !== "") {
                        nearnetdistance = field.value;
                    }
                    if (field.name == 'nearnetospcost' && field.value !== "") {
                        nearnetospcost = field.value;
                    }
                    if (field.name == 'nearnetequipmentcost' && field.value !== "") {
                        nearnetequipmentcost = field.value;
                    }
                    if (field.name == 'closingdate' && field.value !== "") {
                        closingdate = field.value;
                    }
                    if (field.name == "AttachedAloc") {
                        attachAZ = field.value;
                    }
                    if (field.name == "NearNetOnNetLocationID") {
                        NearNetOnNetLocationIDval = field.value;
                        console.log("NearNetOnNetLocationIDval = " + NearNetOnNetLocationIDval);
                    }
                    if (field.name == "LocationType1")
                        LocationType1 = field.value;
                    if (field.name == "LocationSubType")
                        LocationSubType = field.value;
                    if (field.name == "Floor")
                        LocationFloor = field.value;
                    if (field.name == "MultiTenant")
                        LocationMultiTenant = field.value;
                    if (field.name == "ApartmentType")
                        LocationApartmentType = field.value;
                });
                var Z_locObj = {
                    'LocationName': sla,
                    'LocationType': locationtype,
                    'tempid': tempid,
                    'LocationAddress': address,
                    'LocationApartment': apartment,
                    'LocationLatLong': lat_long,
                    'LocationRegion': "Carrier",
                    'LocationFiber': fiber,
                    'LocationOffnet': offnet,
                    'LocationNpanxx': '111111',
                    'LocationDiversity': diversity,
                    'LocationDiversitytype': diversitytype,
                    'LocationCos': cos,
                    'LocationCosFsr': cosFsr,
                    'LocationCosOnr': cosOnr,
                    'Locationbandwidth': bandwidth,
                    'LocationInterfaceSpeed': interfacespeed,
                    //'LocationFSRproposedsolution': fsrProposedsol,
                    'Locationproposedsolution': proposedsolution,
                    'LocationProposedSol': proposedsol,
                    'LocationNearNetDistance': nearnetdistance,
                    'LocationNearNetOspCost': nearnetospcost,
                    'LocationNearNetEqipmentCost': nearnetequipmentcost,
                    'LocationAttachAZ': attachAZ,
                    'LocationClosingDate': closingdate,
                    'LocationNearNetOnNetLocationID': NearNetOnNetLocationIDval,
                    'LocationType1': LocationType1,
                    'LocationSubType': LocationSubType,
                    'LocationMultiTenant': LocationMultiTenant,
                    'LocationFloor': LocationFloor,
                    'LocationApartmentType': LocationApartmentType
                };
                console.log(Z_locObj);
                list_ZLoc.push(Z_locObj);
            }
        }
        if (list_ZLoc.length !== 0) {
            $('#ConnectToDynamcis').modal('hide');
            createZLocations(list_ZLoc, oppId, term);
        }
        else {
            $('#ConnectToDynamcis').modal('hide');

            $("#NoNewLocreatedNotification").show();
            setTimeout(function () {
                $('#SuccessModal').modal('hide');
                $("#NoNewLocreatedNotification").hide();
            }, 3000);
            //alert("No New Location to create, Please enter a location to create");
        }
    }
}

function attachIDAtoZ(list_of_A_locations, oppId, term) {
    console.log("Insode A to Z function");
    var list_ZLoc = [];
    var listALOC = jQuery.parseJSON(list_of_A_locations);
    console.log(listALOC);
    for (var i = 0; i < list_of_all_locations.length; i++) {
        if (list_of_all_locations[i][0].name == "IsSourceLocation" && list_of_all_locations[i][0].value == "NO" && list_of_all_locations[i][1].name == "locationAlreadyExist" && list_of_all_locations[i][1].value == "NO") {

            var valAttachezA = "";
            $.each(list_of_all_locations[i], function (i, field) {
                if (field.name == "AttachedAloc") {
                    valAttachezA = field.value;
                }
            });
            var id = "";
            console.log(valAttachezA);
            if (valAttachezA !== "") {
                var index = -1;
                for (var j = 0; j < listALOC.length; ++j) {
                    if (listALOC[j].tempid == valAttachezA) {
                        index = j;
                        break;
                    }
                }
                //var index = listALOC.findIndex(obj => obj.tempid == valAttachezA);
                console.log(listALOC[index].id);
                id = listALOC[index].id;
            }
            $.each(list_of_all_locations[i], function (i, field) {
                if (field.name == "AttachedAloc") {
                    field.value = id;
                }
            });
            var sla = "";
            var address = "";
            var apartment = "";
            var locationtype = "";
            var bandwidth = "";
            var lat_long = "";
            var fiber = "false";
            var offnet = "false";
            var diversity = "false";
            var diversitytype = "";
            var cos = "";
            var cosFsr = "";
            var cosOnr = "";
            var interfacespeed = "";
            var FSRproposedsolution = "";
            var proposedsolution = "";
            var proposedsol = "";
            var tempid = "";
            var nearnetdistance = "";
            var nearnetospcost = "";
            var nearnetequipmentcost = "";
            var attachAZ = "";
            var closingdate = "";
            var NearNetOnNetLocationIDval = "";
            let LocationType1 = "";
            let LocationSubType = "";
            let LocationMultiTenant = "";
            let LocationFloor = "";
            let LocationApartmentType = "";
            $.each(list_of_all_locations[i], function (i, field) {
                if (field.name == 'sla') {
                    sla = field.value;
                }
                if (field.name == 'address') {
                    address = field.value;
                }
                if (field.name == 'tempid') {
                    tempid = field.value;
                }
                if (field.name == 'apartment' && (field.value !== '')) {
                    apartment = field.value;
                }
                if (field.name == 'locationtype') {
                    locationtype = field.value;
                }
               
                if (field.name == 'lat_long') {
                    lat_long = field.value;
                }
                if (field.name == 'fiber' && field.value == 'true') {
                    fiber = "true";
                }
                if (field.name == 'offnet' && field.value == 'true') {
                    offnet = "true";
                }
                if (field.name == 'diversity' && field.value == 'true') {
                    diversity = "true";
                }
                if (field.name == 'diversitytype' && field.value !== "") {
                    diversitytype = field.value;
                }
                if (field.name == 'cos' && field.value !== "") {
                    cos = field.value;
                }
                if (field.name == 'selectedOptionsFSR' && field.value !== "") {
                    cosFsr = field.value;
                }
                if (field.name == 'selectedOptions' && field.value !== "") {
                    cosOnr = field.value;
                }
                if (field.name == 'interfacespeed' && field.value !== "") {
                    interfacespeed = field.value;
                }
                if (field.name == 'bandwidth' && field.value !== "") {
                    bandwidth = field.value;
                }
                if (field.name == 'proposedsolution' && field.value !== "") {
                    proposedsolution = field.value;
                }
                if (field.name == 'FSRproposedsolution' && field.value !== "") {
                    FSRproposedsolution = field.value;
                }
                if (field.name == 'proposedsol' && field.value !== "") {
                    proposedsol = field.value;
                }
                if (field.name == 'nearnetdistance' && field.value !== "") {
                    nearnetdistance = field.value;
                }
                if (field.name == 'nearnetospcost' && field.value !== "") {
                    nearnetospcost = field.value;
                }
                if (field.name == 'nearnetequipmentcost' && field.value !== "") {
                    nearnetequipmentcost = field.value;
                }
                if (field.name == "AttachedAloc") {
                    attachAZ = field.value;
                }
                if (field.name == 'closingdate' && field.value !== "") {
                    closingdate = field.value;
                }
                if (field.name == "NearNetOnNetLocationID") {
                    NearNetOnNetLocationIDval = field.value;
                    console.log("NearNetOnNetLocationIDval = " + NearNetOnNetLocationIDval);
                }
                if (field.name == "LocationType1")
                    LocationType1 = field.value;
                if (field.name == "LocationSubType")
                    LocationSubType = field.value;
                if (field.name == "Floor")
                    LocationFloor = field.value;
                if (field.name == "MultiTenant")
                    LocationMultiTenant = field.value;
                if (field.name == "ApartmentType")
                    LocationApartmentType = field.value;

            });
            var Z_locObj = {
                'LocationName': sla,
                'LocationType': locationtype,
                'tempid': tempid,
                'LocationAddress': address,
                'LocationApartment': apartment,
                'LocationLatLong': lat_long,
                'LocationRegion': "Carrier",
                'LocationFiber': fiber,
                'LocationOffnet': offnet,
                'LocationNpanxx': '111111',
                'LocationDiversity': diversity,
                'LocationDiversitytype': diversitytype,
                'LocationCos': cos,
                'LocationCosFsr': cosFsr,
                'LocationCosOnr': cosOnr,
                'LocationBandwidth': bandwidth,
                'LocationInterfaceSpeed': interfacespeed,
                'LocationFSRproposedsolution': FSRproposedsolution,
                'Locationproposedsolution': proposedsolution,
                'LocationProposedSol': proposedsol,
                'LocationNearNetDistance': nearnetdistance,
                'LocationNearNetOspCost': nearnetospcost,
                'LocationNearNetEqipmentCost': nearnetequipmentcost,
                'LocationAttachAZ': attachAZ,
                'LocationClosingDate': closingdate,
                'LocationNearNetOnNetLocationID': NearNetOnNetLocationIDval,
                'LocationType1': LocationType1,
                'LocationSubType': LocationSubType,
                'LocationMultiTenant': LocationMultiTenant,
                'LocationFloor': LocationFloor,
                'LocationApartmentType': LocationApartmentType
            };
            console.log(Z_locObj);
            list_ZLoc.push(Z_locObj);
        }
    }
    if (list_ZLoc.length !== 0) {
        createZLocations(list_ZLoc, oppId, term);
    }
    else {
        //No Z locations to create 
        document.getElementById("showButtons").style.display = "block";
        //alert("created A Locations, No Z Location to create");
        $("#NoZLocCreatedNotification").show();
    }

    //console.log(list_ZLoc);
}

function createZLocations(list_ZLoc, oppId, term) {
    console.log(list_ZLoc);
    var Location_global_counter = 0;
    if (list_ZLoc.length == 0) {
        //alert()
    }
    else {
        console.log("Total Number of Z locations to create = " + list_ZLoc.length);
        var lengthoflist = list_ZLoc.length;
        if (lengthoflist > 100) {
            //alert("please enter less than 50 locations right now");
            var counter = 0;
            var ajaxCalls = [];
            while (counter < list_ZLoc.length) {
                var inner_list = [];
                for (var inner_counter = counter; inner_counter < counter + 100; inner_counter++) {
                    if (inner_counter == list_ZLoc.length) {
                        break;
                    }
                    else {
                        inner_list.push(list_ZLoc[inner_counter]);
                    }
                }
                counter = inner_counter;
                //create set of 100 locations
                var JsonLocValue = JSON.stringify(inner_list);

                var name = userName.split('@');
                var LocationObject = {
                    'username': name[0],
                    'term': term,
                    'OppID': oppId,
                    'LocationData': JsonLocValue,
                };
                var jSon = JSON.stringify({ ZLocObj: LocationObject });
                console.log(jSon);
                ajaxCalls.push(
                    $.ajax({
                        type: 'POST',
                        beforeSend: function () { showLoader(); },
                        url: 'map.aspx/create_ZLocations',
                        ajaxI: counter,
                        contentType: 'application/json; charset=utf-8',
                        data: jSon,
                        dataType: 'json',
                        success: function (msg) {
                            if (msg.d == "Success") {
                                counter = this.ajaxI;
                                console.log(counter);
                                console.log("location created");
                                $("#ZLocCreatedNotification").show();
                                Location_global_counter = Location_global_counter + 1;
                                var counter_display = Location_global_counter * 100;
                                document.getElementById('changethelabel').innerHTML = "created " + counter_display + " Z locations";
                            }
                            else {
                                var errorMessage = "Opportunity was not created some of the input values were wrong please try again";
                                alert(msg.d);
                                showError(errorMessage, 'mainAlert', 'html,body');
                            }
                        },
                        error: function (request, status, error) {

                            alert(request.responseText);
                        }
                    }));
                console.log("created " + inner_counter + " locations");
            }
            $.when.apply(null, ajaxCalls).done(function () {
                // all done
                hideLoader();
                console.log('all request completed');
                document.getElementById('changethelabel').innerHTML = "Z Locations created ";
                document.getElementById("showButtons").style.display = "block";
            });
        }
        else {
            var JsonLocValue = JSON.stringify(list_ZLoc);

            var name = userName.split('@');
            var LocationObject = {
                'username': name[0],
                'term': term,
                'OppID': oppId,
                'LocationData': JsonLocValue,
            };
            var jSon = JSON.stringify({ ZLocObj: LocationObject });
            console.log(jSon);
            try {
                $.ajax({
                    type: 'POST',
                    beforeSend: function () { showLoader(); },
                    url: 'map.aspx/create_ZLocations',
                    contentType: 'application/json; charset=utf-8',
                    data: jSon,
                    dataType: 'json',
                    success: function (msg) {
                        if (msg.d == "Success") {
                            hideLoader();
                            console.log("location created");
                            console.log(msg.d);
                            console.log(lengthoflist);
                            $("#ZLocCreatedNotification").show();
                            document.getElementById("showButtons").style.display = "block";
                        }
                        else {
                            var errorMessage = "Opportunity was not created some of the input values were wrong please try again";
                            alert(msg.d);
                            showError(errorMessage, 'mainAlert', 'html,body');
                        }
                    },
                    error: function (request, status, error) {

                        alert(request.responseText);
                    }
                });

            }
            catch (err) {
            }
        }
    }
}

//Bulk Uplaod code goes here.

// Funciton that takes the data from the CSV file and build objects to grab missing information 
function buildLocationObj(rows) {
    var completeObj = [];
    var addressDetailObj = [];
    var records = [];
    //var addressDetail = [];
    //var latlong = {};
    var locationName = [];
    //var aptarray = [];
    //var fullLocationData0 = [];
    //var attributeDetail = [];
    //var completeLocationDetail = [];
    //console.log(rows);

    //remove blank rows from template data
    const filtered = rows.filter(function (e) { return e != ',,,,,,,,,,,,,,,,,,,,,,,\r'; });
    const removeEmpty = filtered.filter(function (e) { return e != ""; });
    console.log(removeEmpty);
    //loop through each row from excel list uploaded by user
    $.each(removeEmpty, function (index, row) {
        var cellData = rows[index].split(",");

        //var attributesObj = { 'attributes': {} };
        if (cellData.length > 1) {


            var uploadedRecord = {};
            locationName.push(cellData[1]);
            uploadedRecord['Address'] = cellData[2];
            uploadedRecord['City'] = cellData[3];
            uploadedRecord['Region'] = cellData[4];
            uploadedRecord['Postal'] = cellData[5];
            uploadedRecord['latitude'] = cellData[6];
            uploadedRecord['longitude'] = cellData[7];
            uploadedRecord['Location_Type'] = cellData[8];
            uploadedRecord['LocationType1'] = cellData[9];
            uploadedRecord['LocationSubType'] = cellData[10];
            uploadedRecord['MultiTenant'] = cellData[11];
            uploadedRecord['Floor'] = cellData[12];
            uploadedRecord['Ste_Bldg_Flr'] = cellData[13];
            uploadedRecord['Ste_Bldg_Flr_num'] = cellData[14];
            if (cellData[15] == "Yes") { cellData[15] = true } else { cellData[15] = false };
            uploadedRecord['OnNet'] = cellData[15];
            if (cellData[16] == "Yes") { cellData[16] = true } else { cellData[16] = false };
            uploadedRecord['OffNet'] = cellData[16];
            uploadedRecord['Bandwidth'] = cellData[17];
            uploadedRecord['Interface_Speed'] = cellData[18];
            uploadedRecord['Class_of_Service'] = cellData[19];
            uploadedRecord['Proposed_Solution'] = cellData[20];
            if (cellData[21] == "Yes") { cellData[21] = true } else { cellData[21] = false };
            uploadedRecord['Diversity'] = cellData[21];
            uploadedRecord['Diversity_Type'] = cellData[22];
            uploadedRecord['Request_Completion_Date'] = cellData[23];
            uploadedRecord['OBJECTID'] = index;

            //if (uploadedRecord.Address && uploadedRecord.City && uploadedRecord.Region && uploadedRecord.Postal && uploadedRecord.longitude && uploadedRecord.latitude) {
            //}

            if (uploadedRecord.latitude && uploadedRecord.longitude) {
                //if (uploadedRecord.Address.length >= 0) //if address null make esri call to get address
                //{
                var esriAdrress = {};
                esriAdrress = getAddress(uploadedRecord.longitude + ',' + uploadedRecord.latitude + [0]);
                if (esriAdrress)//data returned from esri
                {
                    if (cellData[2].length == 0) {
                        // update ONLY if the lat/long supplied with no address.
                        if (esriAdrress[0].address) { uploadedRecord.Address = esriAdrress[0].address; }
                        if (esriAdrress[0].city) { uploadedRecord.City = esriAdrress[0].city; }
                        if (esriAdrress[0].region) { uploadedRecord.Region = esriAdrress[0].region; }
                        if (esriAdrress[0].postal) { uploadedRecord.Postal = esriAdrress[0].postal; }
                    }
                }
                //    }
            }
            else {
                if (cellData[2].length > 0) {
                    var esriLatLong = {};
                    var currentAddress = {};
                    currentAddress['Address'] = cellData[2];
                    currentAddress['City'] = cellData[3];
                    currentAddress['Region'] = cellData[4];
                    currentAddress['Postal'] = cellData[5];
                    currentAddress['OBJECTID'] = index;
                    var test = currentAddress.records;

                    addressDetailObj.push(uploadedRecord);


                    var esriLatLong = {};
                    esriLatLong = getLatLong(currentAddress);
                    if (esriLatLong)//data returned from esri
                    {
                        if (esriLatLong[0].longitude) { uploadedRecord.longitude = esriLatLong[0].longitude; }
                        if (esriLatLong[0].latitude) { uploadedRecord.latitude = esriLatLong[0].latitude; }
                        //if (esriLatLong[0].address) { uploadedRecord.Address = esriLatLong[0].address; }
                        //    if (esriLatLong[0].city.length > 0) { uploadedRecord.City = esriLatLong[0].city; }
                        //    if (esriLatLong[0].region.length > 0) { uploadedRecord.Region = esriLatLong[0].region; }
                        //    if (esriLatLong[0].postal.length > 0) { uploadedRecord.Postal = esriLatLong[0].postal; }
                    }
                }

            }


            completeObj.push(uploadedRecord);



        }
    });


    buildTableForGrid(completeObj, locationName /*, aptarray*/)
}

function addAllLocationFromTableToCart() {
    var rowData = getRowData();
    if (rowData.length > 0) {
        var selectedRows = gridOptions.api.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
            var errorMessage = checkTableData(selectedRows);

            if (jQuery.isEmptyObject(errorMessage)) {
                $(selectedRows).each(function (index, row) {
                    var locationArray = [];
                    $('#bulkUploadAlert').empty();
                    var sourcelocationobj = parseLocationData('IsSourceLocation', 'NO');
                    locationArray.push(sourcelocationobj);
                    var locationAlreadyExistobj = parseLocationData('locationAlreadyExist', 'NO');
                    locationArray.push(locationAlreadyExistobj);
                    var locid = parseLocationData("tempid", "NoNeed");
                    locationArray.push(locid);
                    var nameObj = parseLocationData('sla', row.Name);
                    var locationtypeObj = parseLocationData('locationtype', row.Location_Type);
                    var addressString = row.Street + ', ' + row.City + ', ' + row.State + ', ' + row.Zip;
                    var addressObj = parseLocationData('address', addressString);
                    var lat_longString = row.Latitude + ', ' + row.Longitude;
                    //var npanxxObj = parseLocationData('npanxx', '111111');
                    var Region = "Carrier";
                    var lat_longObj = parseLocationData('lat_long', lat_longString);
                    var regionobj = parseLocationData('region', Region);
                    locationArray.push(nameObj, addressObj, locationtypeObj, lat_longObj, regionobj);

                    if (row.Ste_Bldg_Flr == typeof 'undefined' || row.Ste_Bldg_Flr == '') {
                        var apt = parseLocationData('apartment', "");
                        locationArray.push(apt);
                    }
                    else {
                        var apt = parseLocationData('apartment', row.Ste_Bldg_Flr);
                        locationArray.push(apt);
                    }
                    if (row.OffNet == true) {
                        var offnetObj = parseLocationData('offnet', 'true');
                        locationArray.push(offnetObj);
                    }
                    if (row.OnNet == true) {
                        var fiberObj = parseLocationData('fiber', 'true');
                        locationArray.push(fiberObj);
                    }

                    if (row.Diversity == true) {
                        var diverseObj = parseLocationData('diversity', 'true');
                        locationArray.push(diverseObj);
                        var diversitytypeObj = parseLocationData('diversitytype', row.Diversity_Type);
                        locationArray.push(diversitytypeObj);
                    }

                   

                    if (row.Location_Type == "NearNet") {
                        if (row.NearNet_Distance !== "") {
                            var nearnetdistanceobj = parseLocationData('nearnetdistance', row.NearNet_Distance);
                            locationArray.push(nearnetdistanceobj);
                        }
                        if (row.NearNet_OSP_Cost !== "") {
                            var nearnetospcostobj = parseLocationData('nearnetospcost', row.NearNet_OSP_Cost);
                            locationArray.push(nearnetospcostobj);
                        }
                        if (row.NearNet_Equipment_Cost !== "") {
                            var nearnetequipmentcostobj = parseLocationData('nearnetequipmentcost', row.NearNet_Equipment_Cost);
                            locationArray.push(nearnetequipmentcostobj);
                        }
                    }
                    if (row.Class_of_Service != "") {
                        var cos = parseLocationData('cos', row.Class_of_Service);
                        locationArray.push(cos);
                    }
                    if (row.Interface_Speed != "") {
                        var interfacespeed = parseLocationData('interfacespeed', row.Interface_Speed);
                        locationArray.push(interfacespeed);
                    }
                    if (row.Bandwidth != "") {
                        var bandwidth = parseLocationData('bandwidth', row.Bandwidth);
                        locationArray.push(bandwidth);
                    }
                    var proposedsolution1;
                    if (row.Proposed_Solution != '' || row.Proposed_Solution != typeof 'undefined') {
                        proposedsolution1 = parseLocationData('proposedsol', row.Proposed_Solution);
                        locationArray.push(proposedsolution1);
                    }
                    console.log(proposedsolution1);
                    var closingdateobj = parseLocationData('closingdate', row.Request_Completion_Date);
                    locationArray.push(closingdateobj);
                    if (row.Attach_A_to_Z !== '') {
                        var ALOCobj = parseLocationData('AttachedAloc', row.Attach_A_to_Z);
                        locationArray.push(ALOCobj);
                    }
                    if (row.LocationType1 != "") {
                        locationArray.push(parseLocationData('LocationType1', row.LocationType1));
                    }
                    if (row.LocationSubType != "") {
                        locationArray.push(parseLocationData('LocationSubType', row.LocationSubType));
                    }
                    if (row.LocationType1 == "Building" && row.Floor != "") {
                        locationArray.push(parseLocationData('Floor', row.Floor));
                        locationArray.push(parseLocationData('MultiTenant', row.MultiTenant == "Yes" ? "on" : "off"));
                    }
                    if (row.Ste_Bldg_Flr != "") {
                        locationArray.push(parseLocationData('ApartmentType', row.Ste_Bldg_Flr));
                        if (row.Ste_Bldg_Flr_num == typeof 'undefined' || row.Ste_Bldg_Flr_num == '') {
                            var apt = parseLocationData('apartment', "");
                            locationArray.push(apt);
                        }
                        else {
                            var apt = parseLocationData('apartment', row.Ste_Bldg_Flr_num);
                            locationArray.push(apt);
                        }
                    }
                    console.log(locationArray);
                    addExistingLocationToCart(locationArray);
                });
                $('#BulkUploadModel').modal('hide');
                gridOptions.api.setRowData([]);
                errorMessage = {};
                $("#bulkUploadAlert").empty();
                document.getElementById("csvfile").value = "";
                $('#AllAZAgGrid').val("");
                $('#selectAllLocationTypeAgGrid').val("");
                $('#selectAllBandWidthAgGrid').val("");
                //document.getElementById("onnetSelectAllAgGrid").checked = false;  cleanupBulk
                //document.getElementById("offnetSelectAllAgGrid").checked = false;
                //document.getElementById('diversitySelectAllAgGrid').checked = false;
                $('#AllClassOfServiceAgGrid').val("");
                $('#AllDiversityTypeAgGrid').val("");
                $('#selectAllinterfacespeedAgGrid').val("");
                $('#proposedsolutionbulkAgGrid').val("");
                $('#proposedsolutionbulkAgGrid').text("");
                $("#nearNetDistanceAgGrid").val("");
                $("#nearNetOspCostAgGrid").val("");
                $("#nearNetEquipmentCostAgGrid").val("");
                $("#completionDateAgGrid").val("");
                $("#ErrorsDisplay").text("Errors");
                $("#ErrorsDisplay").removeClass('btn-danger');
                $("#ErrorsDisplay").addClass('btn-info');
                $("example-header").hide();
            }
            else {
                var msg = "";
                console.log(Object.keys(errorMessage).length);
                $("#ErrorsDisplay").text(Object.keys(errorMessage).length + " Errors");
                $("#ErrorsDisplay").removeClass('btn-info');
                $("#ErrorsDisplay").addClass('btn-danger');

                for (var err in errorMessage) {
                    msg = msg + errorMessage[err] + " </br>";
                    console.log(errorMessage[err]);
                }
                showError(msg, 'bulkUploadAlert', '#BulkUploadModel');
            }
        }
        else {
            $("#ErrorsDisplay").text("1 Error");
            $("#ErrorsDisplay").removeClass('btn-info');
            $("#ErrorsDisplay").addClass('btn-danger');
            showError("No Rows Selected", "bulkUploadAlert", "#BulkUploadModel");
        }
    }
    else {
        $("#ErrorsDisplay").text("1 Error");
        $("#ErrorsDisplay").removeClass('btn-info');
        $("#ErrorsDisplay").addClass('btn-danger');
        showError("No Rows Added", "bulkUploadAlert", "#BulkUploadModel");
    }
}

function checkTableData(rows) {
    let errorMap = {};
    $(rows).each(function (index, row) {
        console.log(row);
        if (row.Latitude == "" || row.Latitude == undefined || checkLatLongSpecialCharacters(row.Latitude)) {
            errorMap = updateErrorMap(errorMap, row, "Latitude");
        }
        if (row.Longitude == "" || row.Longitude == undefined || checkLatLongSpecialCharacters(row.Longitude)) {
            errorMap = updateErrorMap(errorMap, row, "Longitude");
        }
        if (row.Location_Type == "") {
            errorMap = updateErrorMap(errorMap, row, "Location Type");
        }
        if (row.LocationType1 == "") {
            errorMap = updateErrorMap(errorMap, row, "Location Type 1");
        }
        if (row.LocationSubType == "") {
            errorMap = updateErrorMap(errorMap, row, "Location Sub Type");
        }
        if (row.LocationType1 == "Building") {
            if (row.MultiTenant == "") {
                errorMap = updateErrorMap(errorMap, row, "Multi Tenant");
            }
            if (row.Floor == "") {
                errorMap = updateErrorMap(errorMap, row, "Floor");
            }
        }
        if (row.Location_Type == "NearNet") {
            if (row.NearNet_Distance == "" || row.NearNet_Distance == undefined) {
                errorMap = updateErrorMap(errorMap, row, "NearNet Distance");
            }
            if (row.NearNet_OSP_Cost == "" || row.NearNet_OSP_Cost == undefined) {
                errorMap = updateErrorMap(errorMap, row, "NearNet OSP Cost");
            }
            if (row.NearNet_Equipment_Cost == "" || row.NearNet_Equipment_Cost == undefined) {
                errorMap = updateErrorMap(errorMap, row, "NearNet Equipment Cost");
            }
        }
      
        if (row.OnNet == true || row.OffNet == true) {
            if (row.Class_of_Service == '') {
                errorMap = updateErrorMap(errorMap, row, "Class of Service");
            }
            if (row.Proposed_Solution == '') {
                errorMap = updateErrorMap(errorMap, row, "Proposed Solution");
            }
        }
        if (row.OffNet == true) {
            if (row.Interface_Speed == '') {
                errorMap = updateErrorMap(errorMap, row, "Interface Speed");
            }
        }
        if (row.Diversity == true) {
            if (row.Diversity_Type == "") {
                errorMap = updateErrorMap(errorMap, row, "Diversity Type");
            }
        }
        if (row.Name == "" || row.Name == undefined || checkSpecialCharacter(row.Name)) {
            errorMap = updateErrorMap(errorMap, row, "Name");
        }
        if (row.Street == "" || row.Street == undefined || checkSpecialCharacter(row.Street)) {
            errorMap = updateErrorMap(errorMap, row, "Street");
        }
        if (row.Ste_Bldg_Flr != "" && (row.Ste_Bldg_Flr_num == "" || row.Ste_Bldg_Flr_num == undefined || checkSpecialCharacter(row.Ste_Bldg_Flr))) {
            errorMap = updateErrorMap(errorMap, row, "STE/APT/RM#");
        }
        if (row.City == "" || row.City == undefined || checkSpecialCharacter(row.City)) {
            errorMap = updateErrorMap(errorMap, row, "City");
        }
        if (row.State == "" || row.State == undefined || checkSpecialCharacter(row.State)) {
            errorMap = updateErrorMap(errorMap, row, "State");
        }
        if (row.Zip == "" || row.Zip == undefined || row.Zip == " " || checkSpecialCharacter(row.Zip)) {
            errorMap = updateErrorMap(errorMap, row, "Zip");
        }

    });
    return errorMap;
}

function checkSpecialCharacter(value) {
    if (String(value).match("^[a-zA-Z0-9 -]*$")) {
        return false
    }
    return true;
}

function checkLatLongSpecialCharacters(value) {
    console.log(value);
    if ((String(value)).trim().match("^[a-zA-Z0-9 -\.]*$")) {
        return false;
    }
    return true;
}


function updateErrorMap(errorMap, row, message) {
    if (message in errorMap) {
        errorMap[message] += ", " + row.Index;
    }
    else {
        errorMap[message] = "<b> Missing / Wrong " + message + " - Row </b>" + row.Index;
    }
    return errorMap;
}

// Bulk Upload code ends here.
function GetStateByAbbreviation(name) {
    switch (name) {
        case "AL":
            return "ALABAMA";

        case "AK":
            return "ALASKA";

        case "AS":
            return "AMERICAN SAMOA";

        case "AZ":
            return "ARIZONA";

        case "AR":
            return "ARKANSAS";

        case "CA":
            return "CALIFORNIA";

        case "CO":
            return "COLORADO";

        case "CT":
            return "CONNECTICUT";

        case "DE":
            return "DELAWARE";

        case "DC":
            return "DISTRICT OF COLUMBIA";

        case "FM":
            return "FEDERATED STATES OF MICRONESIA";

        case "FL":
            return "FLORIDA";

        case "GA":
            return "GEORGIA";

        case "GU":
            return "GUAM";

        case "HI":
            return "HAWAII";

        case "ID":
            return "IDAHO";

        case "IL":
            return "ILLINOIS";

        case "IN":
            return "INDIANA";

        case "IA":
            return "IOWA";

        case "KS":
            return "KANSAS";

        case "KY":
            return "KENTUCKY";

        case "LA":
            return "LOUISIANA";

        case "ME":
            return "MAINE";

        case "MH":
            return "MARSHALL ISLANDS";

        case "MD":
            return "MARYLAND";

        case "MA":
            return "MASSACHUSETTS";

        case "MI":
            return "MICHIGAN";

        case "MN":
            return "MINNESOTA";

        case "MS":
            return "MISSISSIPPI";

        case "MO":
            return "MISSOURI";

        case "MT":
            return "MONTANA";

        case "NE":
            return "NEBRASKA";

        case "NV":
            return "NEVADA";

        case "NH":
            return "NEW HAMPSHIRE";

        case "NJ":
            return "NEW JERSEY";

        case "NM":
            return "NEW MEXICO";

        case "NY":
            return "NEW YORK";

        case "NC":
            return "NORTH CAROLINA";

        case "ND":
            return "NORTH DAKOTA";

        case "MP":
            return "NORTHERN MARIANA ISLANDS";

        case "OH":
            return "OHIO";

        case "OK":
            return "OKLAHOMA";

        case "OR":
            return "OREGON";

        case "PW":
            return "PALAU";

        case "PA":
            return "PENNSYLVANIA";

        case "PR":
            return "PUERTO RICO";

        case "RI":
            return "RHODE ISLAND";

        case "SC":
            return "SOUTH CAROLINA";

        case "SD":
            return "SOUTH DAKOTA";

        case "TN":
            return "TENNESSEE";

        case "TX":
            return "TEXAS";

        case "UT":
            return "UTAH";

        case "VT":
            return "VERMONT";

        case "VI":
            return "VIRGIN ISLANDS";

        case "VA":
            return "VIRGINIA";

        case "WA":
            return "WASHINGTON";

        case "WV":
            return "WEST VIRGINIA";

        case "WI":
            return "WISCONSIN";

        case "WY":
            return "WYOMING";
    }
}
// Function that shows loaders  
function showLoader() {
    $(".loader4").css("display", "");
    $(".loader3").css("display", "");

}

// Function that hides loaders 
function hideLoader() {
    $(".loader4").css("display", "none");
    $(".loader3").css("display", "none");
}

function redirectDynamcics() {
    $.ajax({
        type: 'POST',
        url: 'map.aspx/GetEnvRedirect',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            // Do something interesting here.
            console.log(msg.d);
            var src = msg.d + oppId;

            window.open(src, '_blank');
            $('#SuccessModal').modal('hide');
        }
    });
}

function reloadPage() {
    $('#SuccessModal').modal('hide');
    location.reload();
}

$('.LocationInfoDiv').click(function () {
    $(this).find('.LocInfoCollapse').toggle();
});

$(document).ready(function () {
    $(document).on("click", ".MultiCheckBox", function () {
        var detail = $(this).next();
        detail.show();
    });
    var selectedoptgroupsFSR = [];
    var selectedoptgroupsONR = [];
    var bandwidth_options_list2 = [
        //{ value:"2Mb",text: "2Mb" },
        //{ value: "3Mb", text: "3Mb" },
        //{ value: "6Mb", text: "6Mb" },
        { value: "5Mb", text: "5Mb" },
        { value: "10Mb", text: "10Mb" },
        { value: "20Mb", text: "20Mb" },
        { value: "30Mb", text: "30Mb" },
        { value: "40Mb", text: "40Mb" },
        { value: "50Mb", text: "50Mb" },
        { value: "60Mb", text: "60Mb" },
        { value: "70Mb", text: "70Mb" },
        { value: "80Mb", text: "80Mb" },
        { value: "90Mb", text: "90Mb" },
        { value: "100Mb", text: "100Mb" },
        { value: "150Mb", text: "150Mb" },
        { value: "200Mb", text: "200Mb" },
        { value: "250Mb", text: "250Mb" },
        { value: "300Mb", text: "300Mb" },
        { value: "400Mb", text: "400Mb" },
        { value: "500Mb", text: "500Mb" },
        { value: "600Mb", text: "600Mb" },
        { value: "650Mb", text: "650Mb" },
        { value: "700Mb", text: "700Mb" },
        { value: "750Mb", text: "750Mb" },
        { value: "800Mb", text: "800Mb" },
        { value: "850Mb", text: "850Mb" },
        { value: "900Mb", text: "900Mb" },
        { value: "950Mb", text: "950Mb" },
        { value: "1Gb", text: "1Gb" },
        { value: "2Gb", text: "2Gb" },
        { value: "3Gb", text: "3Gb" },
        { value: "4Gb", text: "4Gb" },
        { value: "5Gb", text: "5Gb" },
        { value: "10Gb", text: "10Gb" }
    ];
   
    $('#cos').multiselect({
        buttonWidth: '565px',
        enableCollapsibleOptGroups: true,
        collapseOptGroupsByDefault: true,
        onChange: function () {
            var selectedval = '';
            var selectedGroup = [];
            var container = $('.multiselect-container').eq(1);
            container.find("li.active").each(function (index, item) {

                selectedval = document.querySelector('#selectedOptions').innerText;
                var selectedopt = ($(this).prevAll(".multiselect-group:first").text() + "-" + $(this).find("input[type=checkbox]").val()).trim();
                if (selectedopt && !selectedGroup.includes(selectedopt)) {
                    selectedGroup.push($(this).prevAll(".multiselect-group:first").text() + "-" + $(this).find("input[type=checkbox]").val());

                }
                selectedval = "";
                for (var i = 0; i < selectedGroup.length; i++) {

                    selectedval += selectedGroup[i] + ",";
                }
            });
            document.querySelector('#selectedOptions').innerText = selectedval;
            console.log(selectedval);
            console.log(selectedGroup);


        }
    });
    $('#cosFSR').multiselect({
        buttonWidth: '565px',
        enableCollapsibleOptGroups: true,
        collapseOptGroupsByDefault: true,
        onChange: function () {
            var selectedGroup = [];
            var selectedval = '';
            var container = $('.multiselect-container').first();
            
            container.find("li.active").each(function (index, item) {
                 selectedval = document.querySelector('#selectedOptionsFSR').innerText;
                var selectedopt = ($(this).prevAll(".multiselect-group:first").text() + "-" + $(this).find("input[type=checkbox]").val()).trim();
                if (selectedopt && !selectedGroup.includes(selectedopt)) {
                   
                    selectedGroup.push($(this).prevAll(".multiselect-group:first").text() + "-" + $(this).find("input[type=checkbox]").val());
                    
                }
                selectedval = "";
                for (var i = 0; i < selectedGroup.length; i++) {

                    selectedval += selectedGroup[i] + ",";
                }
            });
            document.querySelector('#selectedOptionsFSR').innerText = selectedval;
           
            console.log(selectedoptgroupsFSR);
            console.log(selectedval);
            console.log(selectedGroup);
        }
    });
    var optgroup5 = $('#cos optgroup[label="Ethernet"]');
        for (var i = 0; i < bandwidth_options_list2.length; i++) {
            var op5 = "<option value='" + bandwidth_options_list2[i].value + "'>" + bandwidth_options_list2[i].text + "</option>";
            optgroup5.append(op5);
            $('#cos').multiselect('rebuild');
            $('#cosFSR').multiselect('rebuild');

    }
    
   
  


});



// ********** DENISE'S CODE

$('#offnet').change(function () {
    let isOffnetChecked = $('#offnet').is(':checked');

    if (isOffnetChecked) {
        $("#sectionHolder_ONR").show();
    } else {
        $("#sectionHolder_ONR").hide();
    }
});
$('#fiber').change(function () {
    let isFiberChecked = $('#fiber').is(':checked');

    if (isFiberChecked){
        $("#sectionHolder_FSR").show();
    } else {
        $("#sectionHolder_FSR").hide();
    }
});