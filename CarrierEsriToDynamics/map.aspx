<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="map.aspx.cs" Inherits="CarrierEsriToDynamics.map" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Carrier Maps</title>


    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous" />
    <%--    <link rel="stylesheet" href="https://js.arcgis.com/4.11/esri/css/main.css" />--%>
    <link rel="stylesheet" href="https://js.arcgis.com/4.11/esri/themes/light/main.css" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-alpine.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <%--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/1.1.2/css/bootstrap-multiselect.min.css" integrity="sha512-fZNmykQ6RlCyzGl9he+ScLrlU0LWeaR6MO/Kq9lelfXOw54O63gizFMSD5fVgZvU1YfDIc6mxom5n60qJ1nCrQ==" crossorigin="anonymous"/>--%>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/0.9.13/css/bootstrap-multiselect.css" type="text/css" />
    <%--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/1.1.2/css/bootstrap-multiselect.css" integrity="sha512-tlP4yGOtHdxdeW9/VptIsVMLtgnObNNr07KlHzK4B5zVUuzJ+9KrF86B/a7PJnzxEggPAMzoV/eOipZd8wWpag==" crossorigin="anonymous" />--%>
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.noStyle.js"></script>
    <script src="https://js.arcgis.com/4.11/"></script>

    <!-- Latest compiled and minified JavaScript -->
    <%--<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">--%>
    <%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>--%>
    <%--<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>--%>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/1.1.2/js/bootstrap-multiselect.min.js" integrity="sha512-lxQ4VnKKW7foGFV6L9zlSe+6QppP9B2t+tMMaV4s4iqAv4iHIyXED7O+fke1VeLNaRdoVkVt8Hw/jmZ+XocsXQ==" crossorigin="anonymous" ></script>--%>
    <script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/1.1.2/js/bootstrap-multiselect.js" integrity="sha512-YwbKCcfMdqB6NYfdzp1NtNcopsG84SxP8Wxk0FgUyTvgtQe0tQRRnnFOwK3xfnZ2XYls+rCfBrD0L2EqmSD2sA==" crossorigin="anonymous"></script>--%>
   
</head>
<body>
    <div class="loader2" style="display: none;"></div>
    <div class="loader" style="display: none;"></div>

    <!-- Initial Modal -->
    <%-- <div class="modal fade centered-modal opportunity-type" id="initModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-success" style="text-align: center;">
                    <h3 class="text-white" style="text-align: center;">!!!Opportunity Type!!!</h3>                       
                        <button  id="NewOppbutton" type="button" onclick="NewOppEvent()" class="btn btn-primary" >New Opportunity</button>
                        <button id="ExistingOppbutton" type="button" onclick="ExistingOppEvent()" class="btn btn-primary" >Existing Opportunity</button>
                    </div>
                </div>
                <div class="modal-footer" style="text-align: center;">
                    <div class="row" id="showNewExistingOppButton1" style="padding-top: 10px; display:none;">
                        <button  id="NewOppbutton1" type="button" onclick="NewOppEvent()" class="btn btn-primary" >New Opportunity</button>
                        <button id="ExistingOppbutton1" type="button" onclick="ExistingOppEvent()" class="btn btn-primary" >Existing Opportunity</button>
                    </div>
                    <div class="row" id="oppIdfornew" style="padding-top: 10px; display: none;">
                        <label>Enter Your Opportunity ID :</label>
                        <input type="text" id="oppID" />
                        <button type="button" onclick="searchOpp()" class="btn btn-primary">Submit </button>
                    </div>
                    <div class="row" id="userNameForNew" style="padding-top: 10px;">
                        <label>Create Opportunity for other user </label>
                        <button id="displayNewUserName" type="button" onclick="UserNameDivDisplay()" class="btn btn-primary"> Yes </button>
                        <button type="button" onclick="OpenMap()" class="btn btn-primary"> No </button>
                    </div>
                    <div class="row" id="userNameForm" style="padding-top: 10px; display:none;">
                        <label>Please Provide User Name  <input id="customUserName" placeholder="User Name"/> </label> 
                        <button type="button" onclick="lookUpUser()" class="btn btn-primary"> Submit </button>
                    </div>
                    <div class="row" id="notification" style="padding-top: 10px; display: none;">
                        <label>Enter all your A locations first in top right corner search bar</label>
                    </div>
                    <div class="row" id="notification2" style="padding-top: 10px; display: none;">
                        <label>Enter all your Z locations first in top right corner search bar, or use the bulk upload functionality by clicking Bulk Upload Button.</label>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>
    <!-- Initial Modal -->
    <div class="modal fade centered-modal opportunity-type" id="initModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="col-xs-1" style="float: right">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="font-size: 2.5rem;">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                 </div>
                <div class="modal-header bg-success" style="text-align: center;">
                    <h3 class="text-white" style="text-align: center;">Choose Opportunity Type</h3>
                </div>
                <div class="modal-footer" style="text-align: center;">
                    <div class="row" id="showNewExistingOppButton" style="padding-top: 10px; display: none;">
                        <button id="NewOppbutton" type="button" onclick="NewOppEvent()" class="btn btn-primary">New Opportunity</button>
                        <button id="ExistingOppbutton" type="button" onclick="ExistingOppEvent()" class="btn btn-primary">Existing Opportunity</button>
                    </div>
                    <div class="row" id="oppIdfornew" style="padding-top: 10px; display: none;">
                        <label>Enter Your Opportunity ID :</label>
                        <input type="text" id="oppID" />
                        <button type="button" onclick="searchOpp()" class="btn btn-primary">Submit </button>
                    </div>
                    <div class="row" id="userNameForNew" style="padding-top: 10px; display: none;">
                        <label>Create Opportunity for other user </label>
                        <button id="displayNewUserName" type="button" onclick="UserNameDivDisplay()" class="btn btn-primary">Yes </button>
                        <button type="button" onclick="OpenMap()" class="btn btn-primary">No </button>
                    </div>
                    <div class="row" id="userNameForm" style="padding-top: 10px; display: none;">
                        <label>Please Provide User Name 
                            <input id="customUserName" placeholder="User Name" />
                        </label>
                        <button type="button" onclick="lookUpUser()" class="btn btn-primary">Submit </button>
                    </div>
                    <div class="row" id="notification" style="padding-top: 10px; display: none;">
                        <label>Enter all your A locations first in top right corner search bar</label>
                    </div>
                    <div class="row" id="notification2" style="padding-top: 10px; display: none;">
                        <label>Enter all your Z locations first in top right corner search bar, or use the bulk upload functionality by clicking Bulk Upload Button.</label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="viewDiv">
        <div id="locationView">
            <div class="loader3" style="display: none"></div>
            <div class="loader4" style="display: none"></div>

            <!-- Modal to bulk Upload -->

            <div class="modal fade bd-example" id="BulkUploadModel" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xlg modal-lg" role="dialog">
                    <div class="modal-content">
                        <div class="modal-header row">
                            <div class="col-xs-10" style="">
                                <h5 class="modal-title">Bulk Upload
                                </h5>
                            </div>
                            <div class="col-xs-1" style="float: right">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="col-xs-1" style="float: right">
                                <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#instructions"><span class="glyphicon glyphicon-info-sign"></span>View Instruction</button>
                            </div>
                        </div>
                        <div class="modal-body" style="height: 600px;">
                            <div class="form-group">
                                <div class="col-xs-3">
                                    <!--<label style="padding-bottom:8px;">Download Template</label><br />-->
                                    <%-------------------------------------------------------new template includes validation feature and additional fiels - 50 entries--%>
                                    <a href="location_sheet/Carrier_locations_Template.xlsm" class="btn btn-info btn-sm">
                                        <span class="glyphicon glyphicon-save"></span>Download Template
                                    </a>
                                </div>

                                <div class="col-xs-5">
                                    <div class="input-group">
                                        <input type="file" id="csvfile" style="" />
                                        <span class="input-group-btn ">
                                            <button id="UploadButton" class="btn btn-info btn-sm" type="button" onclick="Upload()"><span class="glyphicon glyphicon-open"></span>Upload template</button></span>
                                    </div>
                                </div>

                                <div class="col-xs-3" style="text-align: center">
                                    <button class="btn btn-info btn-sm " data-toggle="modal" data-target="#bulkSelect">Attach A to Z All</button>
                                </div>

                                <div class="col-xs-1" style="float: right;">
                                    <button id="ErrorsDisplay" data-toggle="modal" data-target="#errors" class="btn btn-info btn-sm" type="button">Errors</button>
                                </div>
                            </div>

                            <div class="form-group col-xs-12" style="padding-top: 1px;">
                            </div>
                            <div class="form-group col-xs-12" style="">
                                <div id="myGrid" style="height: 535px; width: 100%; padding-top: 1px;" class="ag-theme-alpine"></div>
                                <div class="example-header" style="display: none;">
                                    Page Size:
                    <select onchange="onPageSizeChanged()" id="page-size">
                        <option value="10" selected>10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onclick="addAllLocationFromTableToCart()">Add to Location Cart</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- End of Bulk Upload-->

            <!--Modal for View Instructions-->
            <div class="modal" id="instructions" data-backdrop="static" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Instructions </h4>
                        </div>
                        <div class="modal-body">
                            <form>
                                <label class="" style="color: red">300 Locations Max.</label>
                                <ol style="">
                                    <li class="small"><b>Download the template and save as csv file.</b></li>
                                    <li class="small"><b>Upload the csv file.</b></li>
                                    <li class="small"><b>Complete the fields in the table</b> <i>(to attach A to Z <b>all locations</b> in bulk with the same information, click the blue<b> Attach A to Z</b> all button)</i></li>
                                    <li class="small"><b>Choose locations</b> for the cart by clicking the<b> select boxes</b> <i>(or select all locations by checking the column heading select box)</i> </li>
                                    <li class="small"><b>Add to Location Cart, fix any errors, add to cart again.</b></li>
                                </ol>
                                <label>Tips</label>
                                <ul style="padding-left: 40px;">
                                    <li class="small"><b>Make sure there arent any special characters in file name.</b></li>
                                    <li class="small">If there are errors, locations will not load to cart and the <b>Error button</b> will turn red.  Click on that button to view the errors so you know what to fix.</li>
                                    <li class="small"><b>Pin a column</b> (like the street) so that as you scroll to the right, you can still see it. Drag the column you want to pin over to the beginning and hold for 1 second.</li>
                                    <li class="small"><b>Expand a column</b> to see more data by moving the separator line between the columns.</li>
                                    <li class="small"><b>Do not use punctuation</b> in the data, if you do, it will show as an error.</li>
                                    <li class="small"><b>Street field </b>should be 38 characters or less.</li>
                                    <li class="small">It is not necessary to use the <b>Select All/Deselect All</b>.  Individual choices can be made on each location row if preferred.</li>
                                    <li class="small"><b>Number of rows per page can be changed</b> from 10-300 in intervals of 50.  Default is 10.</li>
                                    <li class="small"><b>Columns can be filtered </b>(indicated by three horizontal lines, i.e. you could filter by state or city).</li>
                                    <li class="small"><b>Single row’s cells can be edited </b>by double clicking on a cell.</li>
                                    <li class="small"><b>Required fields</b> will display in <b>red</b>.</li>
                                    <li class="small">Please input Apt, Floor, Suite, Building into a given apt/st/bldg/fl column instead of street_address column.</li>
                                    <li class="small">Go to the <b>Segra Playbook</b> for more detailed instructions.</li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!--Errors Modal-->

            <div class="modal" id="errors" data-backdrop="static" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Please fix these errors </h4>
                        </div>
                        <div class="modal-body">
                            <div id="bulkUploadAlert"></div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Bulk Select Popup Modal -->
            <!--            Dropdown values must be exact match in import file    -->
            <div class="modal fade" id="bulkSelect" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>

                            <h4 class="modal-title">Attach A to Z </h4>
                        </div>
                        <div class="modal-body">
                            <div class="LocInfoCollapse">
                                <div class="form-group row">
                                    <div class="col-sm-12">
                                        <div style="display: inline-block">
                                            <select id="AllAZAgGrid" class="form-control" placeholder="Select A to Z">
                                                <option value=""></option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="overlay">
                <%--<div class="col-xs-2">
                <div class="modal-arrow" id="left">

                </div>
              </div>--%>

                <div class="modal-dialog">
                    <div class="modal-content" style="animation-name: example2; animation-duration: 4s;">
                        <h6 style="text-align: center; padding-top: 2px; font-size: larger; font-weight: bold; animation-name: example; animation-duration: 4s; color: red;">Enter Address for A Location in Search . . . &#x21E8; &#x21E8; &#x21E8; &#x21E8; &#x21E8; &#x21E8; </h6>
                    </div>
                </div>

            </div>

            <%--<div id="locationView" style="height:200px;width:220px;">--%>
            <!-- Modal for Business Account -->

            <div class="modal fade" id="LocInfo">
                <div class="modal-dialog" role="dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Current Location</h5>
<%--                            ADD the close or back buton below in .js--%>
<%--                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="showOpportunityTpeModal()">
                                <span aria-hidden="true">&times;</span>
                            </button>--%>
                        </div>
                        <div class="modal-body">
                            <div id="buisnessAcountAlert"></div>
                            <div class="form-group" id="hqAddressDiv">
                                <label class="checkbox" style="padding-left: 25px;">
                                    <input type="checkbox" id="hqAddress" value="" class="request-requesteoc" />
                                    Is HQ Address?
                                </label>
                            </div>
                            <div class="form-group" id="primaryAddressDiv">
                                <label class="checkbox" style="padding-left: 25px;">
                                    <input type="checkbox" id="primaryAddress" value="" class="request-requesteoc" />
                                    Is Primary Contact Address?
                                </label>
                            </div>
                            <div class="form-group">
                                <label id="slachange"> Location Name A</label>
                                <input type="text" class="form-control request-sitecontact" id="sla" maxlength="39" placeholder="Location Name" />
                            </div>
                            <div class="form-group" style="">
                                <label>Build Type</label>
                                <select class="form-control" id="locationtype">
                                    <option value=" "></option>
                                    <option value="New">New</option>
                                    <option value="OnNet">OnNet</option>
                                    <option value="NearNet">NearNet</option>
                                </select>
                            </div>
                            <div class="form-group">
<%--                                <span class="smaller" style="color: red">*</span>--%>
                                 <label class="" id="lblLocationType">Location Type</label>
                                <select class="form-control" id="locationtype1">
                                    <option value=""></option>
                                    <option value="Building">Building </option>
                                    <option value="Campus Building">Campus Building </option>
                                    <option value="Tower">Tower </option>
                                    <option value="Small Cell">Small Cell </option>
                                    <option value="Splice Point">Splice Point </option>
                                    <option value="Carrier Building/Data Center">Carrier Building/Data Center </option>
                                </select>
                            </div>
                            <div class="form-group">
<%--                                <span class="smaller" style="color: red">*</span>--%>
                                <label id="lblPrimaryUseType">Primary Use Type</label>
                                <select class="form-control" id="locationSubType">
                                    <option value=""></option>
                                    <%--<option class="displayForSplicePoint" value="Null" style="display:none"> Null </option>--%>
                                    <option class="displayForBuilding" value="Hospitality" style="display: none">Hospitality </option>
                                    <option class="displayForBuilding" value="Hospital" style="display: none">Hospital </option>
                                    <option class="displayForBuilding" value="Education" style="display: none">Education </option>
                                    <option class="displayForBuilding" value="Commercial Office" style="display: none">Commercial Office </option>
                                    <option class="displayForBuilding" value="Industrial" style="display: none">Industrial </option>
                                    <option class="displayForBuilding" value="Warehouse" style="display: none">Warehouse </option>
                                    <option class="displayForBuilding" value="Retail - Single Tenant Building" style="display: none">Retail - Single Tenant Building </option>
                                    <option class="displayForBuilding" value="Retail - Multitenant Facility" style="display: none">Retail - Multitenant Facility </option>
                                    <option class="displayForBuilding" value="Military Facility" style="display: none">Military Facility </option>
                                    <option class="displayForBuilding" value="Mixed Use" style="display: none">Mixed Use </option>
                                    <option value="Other">Other </option>
                                    <option class="displayForTower" value="Carrier Hut" style="display: none">Carrier Hut </option>
                                    <option class="displayForTower" value="H-Frame" style="display: none">H-Frame </option>
                                    <option class="displayForCarrierBuilding" style="display: none" value="Commercial Computing Data Center">Commercial Computing Data Center </option>
                                    <option class="displayForCarrierBuilding" value="Carrier Hotel - Multitenant" style="display: none">Carrier Hotel - Multitenant </option>
                                    <option class="displayForCarrierBuilding" value="Wireless Carrier MSC" style="display: none">Wireless Carrier MSC </option>
                                    <option class="displayForCarrierBuilding" value="Single Carrier CO/POP" style="display: none">Single Carrier CO/POP </option>
                                </select>
                            </div>

                            <div class="form-group" id="displayMultiTenant" style="display: none">
                                <label>Multi Tenant  </label>
                                <label class="radio-inline">
                                    <input type="radio" name="muliTenant" value="Yes">
                                    Yes
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="muliTenant" value="No" checked>
                                    No
                                </label>
                            </div>

                            <div class="form-group">
                                <label>Site Address</label>
                                <input type="text" class="form-control request-siteaddress" value="" id="address" readonly="readonly" />
                            </div>
                            <div class="form-group" id="displayFloor" style="display: none">
                                <label>Floor </label>
                                <select class="form-control" id="floor">
                                    <option value=""></option>
                                    <option value="LL3">LL3 </option>
                                    <option value="LL2">LL2 </option>
                                    <option value="LL1">LL1 </option>
                                    <option value="1" selected="selected">1 </option>
                                    <option value="2">2 </option>
                                    <option value="3">3 </option>
                                    <option value="4">4 </option>
                                    <option value="5">5 </option>
                                    <option value="6">6 </option>
                                    <option value="7">7 </option>
                                    <option value="8">8 </option>
                                    <option value="9">9 </option>
                                    <option value="10">10 </option>
                                    <option value="11">11 </option>
                                    <option value="12">12 </option>
                                    <option value="13">13 </option>
                                    <option value="14">14 </option>
                                    <option value="15">15 </option>
                                    <option value="16">16 </option>
                                    <option value="17">17 </option>
                                    <option value="18">18 </option>
                                    <option value="19">19 </option>
                                    <option value="20">20 </option>
                                    <option value="21">21 </option>
                                    <option value="22">22 </option>
                                    <option value="23">23 </option>
                                    <option value="24">24 </option>
                                    <option value="25">25 </option>
                                    <option value="26">26 </option>
                                    <option value="27">27 </option>
                                    <option value="28">28 </option>
                                    <option value="29">29 </option>
                                    <option value="30">30 </option>
                                    <option value="31">31 </option>
                                    <option value="32">32 </option>
                                    <option value="33">33 </option>
                                    <option value="34">34 </option>
                                    <option value="35">35 </option>
                                    <option value="36">36 </option>
                                    <option value="37">37 </option>
                                    <option value="38">38 </option>
                                    <option value="39">39 </option>
                                    <option value="40">40 </option>
                                    <option value="41">41 </option>
                                    <option value="42">42 </option>
                                    <option value="43">43 </option>
                                    <option value="44">44 </option>
                                    <option value="45">45 </option>
                                    <option value="46">46 </option>
                                    <option value="47">47 </option>
                                    <option value="48">48 </option>
                                    <option value="49">49 </option>
                                    <option value="50">50 </option>
                                    <option value="51">51 </option>
                                    <option value="52">52 </option>
                                    <option value="53">53 </option>
                                    <option value="54">54 </option>
                                    <option value="55">55 </option>
                                    <option value="56">56 </option>
                                    <option value="57">57 </option>
                                    <option value="58">58 </option>
                                    <option value="59">59 </option>
                                    <option value="60">60 </option>
                                    <option value="61">61 </option>
                                    <option value="62">62 </option>
                                    <option value="63">63 </option>
                                    <option value="64">64 </option>
                                    <option value="65">65 </option>
                                    <option value="66">66 </option>
                                    <option value="67">67 </option>
                                    <option value="68">68 </option>
                                    <option value="69">69 </option>
                                    <option value="70">70 </option>
                                    <option value="71">71 </option>
                                    <option value="72">72 </option>
                                    <option value="73">73 </option>
                                    <option value="74">74 </option>
                                    <option value="75">75 </option>
                                    <option value="76">76 </option>
                                    <option value="77">77 </option>
                                    <option value="78">78 </option>
                                    <option value="79">79 </option>
                                    <option value="80">80 </option>
                                    <option value="81">81 </option>
                                    <option value="82">82 </option>
                                    <option value="83">83 </option>
                                    <option value="84">84 </option>
                                    <option value="85">85 </option>
                                    <option value="86">86 </option>
                                    <option value="87">87 </option>
                                    <option value="88">88 </option>
                                    <option value="89">89 </option>
                                    <option value="90">90 </option>
                                    <option value="91">91 </option>
                                    <option value="92">92 </option>
                                    <option value="93">93 </option>
                                    <option value="94">94 </option>
                                    <option value="95">95 </option>
                                    <option value="96">96 </option>
                                    <option value="97">97 </option>
                                    <option value="98">98 </option>
                                    <option value="90">99 </option>
                                    <option value="100">100 </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>STE / APT / RM </label>
                                <select class="form-control request-apt" value="" id="apartment_type" name="apartment_type">
                                    <option value=""></option>
                                    <option value="APT">APT</option>
                                    <option value="STE">STE</option>
                                    <option value="RM">RM</option>
                                    <option value="DEPT">DEPT</option>
                                    <option value="BLDG">BLDG</option>
                                    <option value="UNIT">UNIT</option>
                                </select>
                            </div>
                            <div class="form-group" style="display:none" id="apartmentVal">
                                <label id="apartmentValueLabel"></label>
                                <input class="form-control request-apt" type="text" id="apartment" name="apartment"/>
                            </div>
                            <div class="form-group" id="displayAZ" style="display: none">
                                <label>Attach A to Z</label>
                                <select class="form-control request-AZ" id="AllAZ">
                                    <%--<option value=""></option>--%>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Coordinates</label>
                                <input type="text" id="lat_lang" class="form-control request-coordinates" value="" readonly="readonly" />
                            </div>
                            <div class="form-group">
                                <label class="checkbox" style="padding-left: 25px;">
                                    <input type="checkbox" id="fiber" class="request-requestfiber" />Request FSR (On-Net)
                                </label>



                                <!-- HOLDER START -->
                                <div class="segraMap_section-container" id="sectionHolder_FSR">

                                    <div class="form-group" id="FSRRequest" style="display: none">
                                    <div class="section-content first-section">
                                        <div class="form-group">
                                            <label>FSR Class of Service: </label><span id="selectedOptionsFSR"></span>
                                            <select class="form-control request-region" id="cosFSR" name="cos" multiple="multiple" placeholder="Select class of service">
                                                 <optgroup label="Ethernet">
                                                    <%--<option value="N/A">N/A</option>--%>
                                                    <option value="20Mb">20Mb</option>
                                                     <option value="50Mb">50Mb</option>
                                                     <option value="100Mb">100Mb</option>
                                                     <option value="500Mb">500Mb</option>
                                                     <option value="1Gb">1Gb</option>
                                                     <option value="2Gb">2Gb</option>
                                                     <option value="3Gb">3Gb</option>
                                                     <option value="5Gb">5Gb</option>
                                                     <option value="10Gb">10Gb</option>
                                                     <%--<option value="2Mb-1Gb">2Mb-1Gb</option>--%>
                                                     <%--<option value="2Gb-10Gb">2Gb-10Gb</option>--%>
                                                </optgroup>
                                                <optgroup label="Wavelength Service">
                                                    <option value="1Gb">1Gb</option>
                                                    <option value="10Gb">10Gb</option>
                                                    <option value="100Gb">100Gb</option>
                                                    <option value="200Gb">200Gb</option>
                                                    <option value="400Gb">400Gb</option>
                                                </optgroup>
                                                <optgroup label="DarkFiber">
                                                    <option value="N/A">N/A</option>
                                                </optgroup>
                                                <optgroup label="TDM">
                                                    <option value="DS0">DS0</option>
                                                    <option value="DS1">DS1</option>
                                                    <option value="DS2">DS3</option>
                                                    <option value="OC3">OC3</option>
                                                    <option value="OC12">OC12</option>
                                                    <option value="OC48">OC48</option>
                                                    <option value="OC192">OC192</option>
                                                </optgroup>
                                                <optgroup label="Other">
                                                    <option value="CrossConnect">Cross Connect</option>
                                                    <option value="Other">Other</option>

                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="form-group" id="diversitycheckbox" onclick="showDiversityType()" style="display:none;">
                                    <div class="section-content">
                                        <label class="checkbox" style="padding-left: 25px;">
                                            <input type="checkbox" runat="server" id="diversity" value="diversity_false" class="request-requesteoc" onclick="showDiversityType()" style="display:none;" />
                                            Diversity?
                                        </label>
                                    </div>
                                    </div>

                                    <div id="divdiversityType" style="display: none;">
                                    <div class="section-content">
                                        <label>Diversity Type:</label>
                                        <select class="form-control" id="diversitytype" name="diversitytype" placeholder="Select Diversity Type">
                                            <option value=""></option>
                                            <option value="Dedicated Physical Ring">Dedicated Physical Ring </option>
                                            <option value="Dedicated Virtual Ring">Dedicated Virtual Ring </option>
                                            <option value="Dual Entrance Facility">Dual Entrance Facility </option>
                                            <option value="Non Collapsed Last Mile Lateral">Non Collapsed Last Mile Lateral </option>
                                            <option value="Non Collapsed Lateral & Dual Entrance">Non Collapsed Lateral & Dual Entrance </option>
                                            <option value="POP Diversity with Router Diversity">POP Diversity with Router Diversity </option>
                                            <option value="Redundant CPE Router/Switch 10G Port">Redundant CPE Router/Switch 10G Port </option>
                                            <option value="Redundant CPE Router/Switch 1G Port">Redundant CPE Router/Switch 1G Port </option>
                                            <option value="Single Pop with Router Diversity">Single Pop with Router Diversity </option>
                                        </select>
                                    </div>
                                    </div>

                                    <div class="form-group" id="showclassofserviceandsolutionFSR" style="display: none;" >
                                    <div class="section-content">
                                        <div class="form-group" id="showinterfacespeedFSR" style="display: none;">
                                            <label>Interface Speed: </label>
                                        </div>
                                        <div class="form-group" id="FSRproposedSolution">
                                            <label>FSR Proposed Solution: </label>
                                            <textarea id="FSRproposedsolution" rows="4" cols="70" maxlength="200" style="max-width: 100%; overflow: hidden;" placeholder="type propose solution here..."></textarea>
                                        </div>
                                    </div>
                                    </div>

                                    <div class="form-group" id="displayOnNetRules" style="display: none">
                                    <div class="section-content">
                                        <div class="form-group">
                                            <label>Additional Costs</label>
                                            <div>
                                                <span style="position: absolute; margin-left: 5px; margin-top: 5px;">$</span>
                                                <input type="number" class="form-control request-sitecontact" id="additionalcost" style="padding-left: 20px;" value="1855" disabled />
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label>Additional Equipment Costs</label>
                                            <div>
                                                <span style="position: absolute; margin-left: 5px; margin-top: 5px;">$</span>
                                                <input type="number" class="form-control request-sitecontact" id="additionalequipmentcost" style="padding-left: 20px;" value="1317" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div class="form-group" id="displayNearNetStuff" style="display: none;">
                                    <div class="section-content">
                                        <div class="form-group">
                                            <label>Near Net Distance (ft.)</label>
                                            <input type="number" class="form-control request-sitecontact" id="nearnetdistance" placeholder="Near Net Distance (ft.)" />
                                        </div>
                                        <div class="form-group">
                                            <label>Near Net OSP Costs </label>
                                            <div>
                                                <span style="position: absolute; margin-left: 5px; margin-top: 5px;">$</span>
                                                <input type="number" style="padding-left: 20px;" class="form-control request-sitecontact" id="nearnetospcost" placeholder="Near Net OSP Costs" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Near Net Equipment Costs</label>
                                            <div>
                                                <span style="position: absolute; margin-left: 5px; margin-top: 5px;">$</span>
                                                <input type="number" class="form-control request-sitecontact" id="nearnetequipmentcost" style="padding-left: 20px;" placeholder="Near Net Equipment Costs" />
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                                <!-- HOLDER END -->














                                <label class="checkbox" style="padding-left: 25px; padding-top:16px; display:block">
                                    <input type="checkbox" id="offnet" class="request-requestoffnet" />Request ONR (Off-Net)
                                </label>




                                <!-- HOLDER START -->
                                <div class="segraMap_section-container" id="sectionHolder_ONR">

                                    <div class="form-group" id="showclassofserviceandsolution" style="display: none">
                                    <div class="section-content first-section">
                                        <div class="form-group">
                                            <label>ONR Class of Service: </label><span id="selectedOptions"></span>
                                            <select class="form-control request-region" id="cos" name="cos" multiple="multiple" placeholder="Select class of service">
                                               <optgroup label="Ethernet"></optgroup>
                                                <optgroup label="Wavelength Service">
                                                    <option value="1Gb">1Gb</option>
                                                    <option value="10Gb">10Gb</option>
                                                    <option value="100Gb">100Gb</option>
                                                    <option value="200Gb">200Gb</option>
                                                    <option value="400Gb">400Gb</option>
                                                </optgroup>
                                                <optgroup label="DarkFiber">
                                                    <option value="N/A">N/A</option>
                                                </optgroup>
                                                <optgroup label="Other">
                                                    <option value="CrossConnect">Cross Connect</option>
                                                    <option value="Other">Other</option>

                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                    </div>

                                    <div class="form-group" id="showregion" style="display: none;">
                                    <div class="section-content">
                                        <label>Region:</label>
                                        <select class="form-control request-region" runat="server" id="region" placeholder="Select Region">
                                            <option>Carrier</option>
                                        </select>
                                    </div>
                                    </div>

                                    <div class="form-group" id="showclassofserviceandsolution2" style="display: none" >
                                    <div class="section-content">
                                        <div class="form-group" id="showinterfacespeed" style="display: none;">
                                            <label>Interface Speed: </label>
                                            <select class="form-control request-region" id="interfacespeed" name="interfacespeed" placeholder="Interface Speed">
                                                <option value=""></option>
                                                <option id="is100" value="100Mb" style="display: block">100Mb</option>
                                                <option id="is1" value="1Gb" style="display: block">1Gb</option>
                                                <option id="is10" value="10Gb" style="display: block">10Gb</option>
                                            </select>
                                        </div>
                                   </div>
                                    <div class="section-content">
                                        <div class="form-group" id="proposedSolution">
                                            <label>ONR Proposed Solution: </label>
                                            <textarea id="proposedsolution" rows="4" cols="70" maxlength="200" style="max-width: 100%; overflow: hidden;" placeholder="type propose solution here..."></textarea>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                                <!-- HOLDER END -->
                            </div>
                    

<%--                            <div class="form-group" id="displayOnNetRules" style="display: none">

                                <div class="form-group">
                                    <label>Additional Costs</label>
                                    <div>
                                        <span style="position: absolute; margin-left: 5px; margin-top: 5px;">$</span>
                                        <input type="number" class="form-control request-sitecontact" id="additionalcost" style="padding-left: 20px;" value="1855" disabled />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Additional Equipment Costs</label>
                                    <div>
                                        <span style="position: absolute; margin-left: 5px; margin-top: 5px;">$</span>
                                        <input type="number" class="form-control request-sitecontact" id="additionalequipmentcost" style="padding-left: 20px;" value="1317" disabled />
                                    </div>
                                </div>
                            </div>--%>
                                   
                           
                             <div class="form-group" id="displayDate"  >
                                <label for="date">Requested Completion</label>
                                <input type="date" class="form-control" id="EstimatedCloseDate" required="required" />
                            </div>
                            
                            <div class="form-group" style="display: none">
                                <label>NearNet OnNet Location ID: </label>
                                <input type="text" class="form-control" id="NearNetOnNetLocationID" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onclick="addTheLocationToCard()">Add Location</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal for Replacing form of runnat server -->
            <div class="modal fade" id="ConnectToDynamcis">
                <div class="modal-dialog" role="dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Submit to Dynamics</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div id="dynamicsFormAlert" style="padding: 5px;"></div>
                        <div class="modal-body">
                            <div class="form-group" style="display: none;">
                                <label>Spirit Employee User Name</label>
                                <input type="text" id="employee_username" class="form-control request-coordinates" readonly="readonly" />
                            </div>

                            <div class="wrapper center-block">
                                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div class="panel panel-default accountHide">
                                        <div class="panel-heading" role="tab" id="headingOne">
                                            <div class="row">
                                                <label class="panel-title-heading col-xs-9">Account Details </label>
                                                <a class="col-xs-3" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"></a>
                                            </div>
                                        </div>
                                        <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                            <div class="panel-body">
                                                <div class="form-group" id="acc_name_view" style="display: none;">
                                                    <label>Account Name </label>
                                                    <input type="text" id="o_account_name" class="form-control" readonly="readonly" placeholder="Enter the Account Name" />
                                                </div>
                                                <div class="form-group" id="acc_num_view" style="display: none;">
                                                    <label>Account Number </label>
                                                    <input type="text" id="o_account_number" class="form-control" placeholder="Enter the Account Number" />
                                                </div>
                                                <div class="form-group" style="display: none">
                                                    <label>Account ID </label>
                                                    <input type="text" id="o_account_id" class="form-control" placeholder="Enter the Account ID" />
                                                </div>
                                                <div class="form-group row ifNewLogo">
                                                    <div class="col-xs-3">
                                                        <label>HQ Street Ad </label>
                                                        <input type="text" id="o_account_hq_street" class="form-control" placeholder="Enter HQ Street " />
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <label>HQ City </label>
                                                        <input type="text" id="o_account_hq_city" class="form-control" placeholder="Enter HQ City " />
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <label>HQ State </label>
                                                        <input display="hide" type="text" id="o_account_hq_stateInput" class="form-control" placeholder="Enter HQ State " />
                                                        <select id="o_account_hq_state" class="form-control">
                                                            <option value="NA" disabled="disabled" selected="selected">Enter HQ State</option>
                                                            <option value="AL">Alabama</option>
                                                            <option value="AK">Alaska</option>
                                                            <option value="AZ">Arizona</option>
                                                            <option value="AR">Arkansas</option>
                                                            <option value="CA">California</option>
                                                            <option value="CO">Colorado</option>
                                                            <option value="CT">Connecticut</option>
                                                            <option value="DE">Delaware</option>
                                                            <option value="DC">District of Columbia</option>
                                                            <option value="FL">Florida</option>
                                                            <option value="GA">Georgia</option>
                                                            <option value="HI">Hawaii</option>
                                                            <option value="ID">Idaho</option>
                                                            <option value="IL">Illinois</option>
                                                            <option value="IN">Indiana</option>
                                                            <option value="IA">Iowa</option>
                                                            <option value="KS">Kansas</option>
                                                            <option value="KY">Kentucky</option>
                                                            <option value="LA">Louisiana</option>
                                                            <option value="ME">Maine</option>
                                                            <option value="MD">Maryland</option>
                                                            <option value="MA">Massachusetts</option>
                                                            <option value="MI">Michigan</option>
                                                            <option value="MN">Minnesota</option>
                                                            <option value="MS">Mississippi</option>
                                                            <option value="MO">Missouri</option>
                                                            <option value="MT">Montana</option>
                                                            <option value="NB">Nebraska</option>
                                                            <option value="NV">Nevada</option>
                                                            <option value="NH">New Hampshire</option>
                                                            <option value="NJ">New Jersey	</option>
                                                            <option value="NM">New Mexico</option>
                                                            <option value="NY">New York</option>
                                                            <option value="NC">North Carolina</option>
                                                            <option value="ND">North Dakota</option>
                                                            <option value="OH">Ohio</option>
                                                            <option value="OK">Oklahoma</option>
                                                            <option value="OR">Oregon</option>
                                                            <option value="PA">Pennsylvania</option>
                                                            <option value="PR">Puerto Rico</option>
                                                            <option value="RI">Rhode Island</option>
                                                            <option value="SC">South Carolina</option>
                                                            <option value="SD">South Dakota</option>
                                                            <option value="TN">Tennessee</option>
                                                            <option value="TX">Texas</option>
                                                            <option value="UT">Utah</option>
                                                            <option value="VT">Vermont</option>
                                                            <option value="VA">Virginia</option>
                                                            <option value="WA">Washington	</option>
                                                            <option value="WV">West Virginia</option>
                                                            <option value="WI">Wisconsin</option>
                                                            <option value="WY">Wyoming</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <label>HQ Zip </label>
                                                        <input type="text" id="o_account_hq_zip" class="form-control" placeholder="Enter HQ Zip " />
                                                    </div>
                                                </div>
                                                <div class="form-group ifNewLogo">
                                                    <label>HQ Phone#</label>
                                                    <input type="text" class="form-control" id="o_account_hq__num"  placeholder="Type HQ Number" required="required" />
                                                </div>  
                                                <div class="form-group ifNewLogo">
                                                    <label>Account URL</label>
                                                    <input type="text" class="form-control request-contactemail" id="o_account_url" placeholder="Enter Account URL" required="required" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-default contactInfo">
                                        <div class="panel-heading" role="tab" id="headingTwo">
                                            <div class="row">
                                                <label class="panel-title-heading col-xs-9">Primary Contact Details </label>
                                                <a class="col-xs-3" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"></a>
                                            </div>
                                        </div>
                                        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                            <div class="panel-body">
                                                <div class="form-group contactInfo">
                                                    <label>Contact Name</label>
                                                    <input type="text" class="form-control request-sitecontact" id="con_name" placeholder="Type Contact Name" required="required" />
                                                    <span class="smaller" style="color: red">* Please provide both first and last name..</span>
                                                </div>
                                                <div class="form-group contactInfo">
                                                    <label>Contact Phone#</label>
                                                    <input type="text" class="form-control" id="c_num" placeholder="Type Contact Number" required="required" />
                                                </div>
                                                <div class="form-group contactInfo">
                                                    <label>Contact Email</label>
                                                    <input type="email" class="form-control request-contactemail" id="email" placeholder="Enter Email" required="required" />
                                                </div>
                                                <div class="form-group row contactInfo">
                                                    <div class="col-xs-3">
                                                        <label>Street </label>
                                                        <input type="text" id="c_street" class="form-control" placeholder="Enter Street " />
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <label>City </label>
                                                        <input type="text" id="c_city" class="form-control" placeholder="Enter City " />
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <label>State </label>
                                                        <input display="hide" type="text" id="c_stateInput" class="form-control" placeholder="Enter State " />
                                                        <select id="c_state" class="form-control">
                                                            <option value="NA" disabled="disabled" selected="selected">Enter State</option>
                                                            <option value="AL">Alabama</option>
                                                            <option value="AK">Alaska</option>
                                                            <option value="AZ">Arizona</option>
                                                            <option value="AR">Arkansas</option>
                                                            <option value="CA">California</option>
                                                            <option value="CO">Colorado</option>
                                                            <option value="CT">Connecticut</option>
                                                            <option value="DE">Delaware</option>
                                                            <option value="DC">District of Columbia</option>
                                                            <option value="FL">Florida</option>
                                                            <option value="GA">Georgia</option>
                                                            <option value="HI">Hawaii</option>
                                                            <option value="ID">Idaho</option>
                                                            <option value="IL">Illinois</option>
                                                            <option value="IN">Indiana</option>
                                                            <option value="IA">Iowa</option>
                                                            <option value="KS">Kansas</option>
                                                            <option value="KY">Kentucky</option>
                                                            <option value="LA">Louisiana</option>
                                                            <option value="ME">Maine</option>
                                                            <option value="MD">Maryland</option>
                                                            <option value="MA">Massachusetts</option>
                                                            <option value="MI">Michigan</option>
                                                            <option value="MN">Minnesota</option>
                                                            <option value="MS">Mississippi</option>
                                                            <option value="MO">Missouri</option>
                                                            <option value="MT">Montana</option>
                                                            <option value="NB">Nebraska</option>
                                                            <option value="NV">Nevada</option>
                                                            <option value="NH">New Hampshire</option>
                                                            <option value="NJ">New Jersey	</option>
                                                            <option value="NM">New Mexico</option>
                                                            <option value="NY">New York</option>
                                                            <option value="NC">North Carolina</option>
                                                            <option value="ND">North Dakota</option>
                                                            <option value="OH">Ohio</option>
                                                            <option value="OK">Oklahoma</option>
                                                            <option value="OR">Oregon</option>
                                                            <option value="PA">Pennsylvania</option>
                                                            <option value="PR">Puerto Rico</option>
                                                            <option value="RI">Rhode Island</option>
                                                            <option value="SC">South Carolina</option>
                                                            <option value="SD">South Dakota</option>
                                                            <option value="TN">Tennessee</option>
                                                            <option value="TX">Texas</option>
                                                            <option value="UT">Utah</option>
                                                            <option value="VT">Vermont</option>
                                                            <option value="VA">Virginia</option>
                                                            <option value="WA">Washington	</option>
                                                            <option value="WV">West Virginia</option>
                                                            <option value="WI">Wisconsin</option>
                                                            <option value="WY">Wyoming</option>
                                                        </select>

                                                    </div>
                                                    <div class="col-xs-3">
                                                        <label>Zip </label>
                                                        <input type="text" id="c_zip" class="form-control" placeholder="Enter Zip " />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading" role="tab" id="headingThree">
                                            <div class="row">
                                                <label class="panel-title-heading col-xs-9">Opportunity Details </label>
                                                <a class="col-xs-3" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree"></a>
                                            </div>
                                        </div>
                                        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label>Opportunity Name</label>
                                                    <input type="text" class="form-control request-customer-name" id="opportunity_name" placeholder="Type Opportunity Name" maxlength="39" required="required" />
                                                    <span class="smaller" style="color: red">* Max 39 characters, avoid using special characters i.e @,%*&^$!..</span>
                                                </div>

                                                <div id="display_newOppInfo" style="display: none">
                                                    <div class="form-group">
                                                        <label>Contract Type</label>
                                                        <select class="form-control request-term" id="opportunity_contract">
                                                            <option value="New">New</option>
                                                            <option value="Upgrade">Upgrade</option>
                                                            <option value="Renewal">Renewal</option>
                                                            <option value="CoterminousAdds">Coterminous Adds</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Carrier Type</label>
                                                        <select class="form-control request-term" id="opportunity_carriertype">

                                                            <option value="End User">End User</option>
                                                            <option value="Transport">Transport</option>
                                                            <option value="FTTC">FTTC</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group" id="display_FTTCtype" style="display: none">
                                                        <label>FTTC Type</label>
                                                        <select class="form-control request-term" id="opportunity_FTTCtype">
                                                            <option value="Macro Lit">Macro Lit</option>
                                                            <option value="Macro Dark">Macro Dark</option>
                                                            <option value="Small Cell Lit">Small Cell Lit</option>
                                                            <option value="Small Cell Dark">Small Cell Dark</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group" id="display_AssignSE">
                                                        <label>Assign SE</label>
                                                        <select class="form-control request-term" id="opportunity_SE">
                                                            <option value=""></option>

                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="date">Estimated Close Date</label>
                                                        <input type="date" class="form-control" id="EstimatedCloseDateOpp" required="required" />
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Estimated Revenue </label>
                                                        <input type="number" class="form-control" id="EstimatedRevenue" placeholder="Type Estimated Revenue" required="required" min="0" oninput="validity.valid||(value='');" />
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label>ONR Term Selection</label>
                                                    <div class="multiselect">
                                                        <div class="selectBox " onclick="showCheckboxes()">
                                                            <select class="form-control">
                                                                <option id="selectMoreTerm">Select one or more term</option>
                                                            </select>
                                                            <div class="overSelect"></div>
                                                        </div>
                                                        <div id="checkboxes">
                                                            <label for="M-M">
                                                                <input type="checkbox" id="M-M" />M-M</label>
                                                            <label for="1">
                                                                <input type="checkbox" id="1yr" />1yr</label>
                                                            <label for="2">
                                                                <input type="checkbox" id="2yr" />2yr</label>
                                                            <label for="3">
                                                                <input type="checkbox" id="3yr" />3yr</label>
                                                            <label for="4">
                                                                <input type="checkbox" id="4yr" />4yr</label>
                                                            <label for="5">
                                                                <input type="checkbox" id="5yr" />5yr</label>
                                                            <label for="7">
                                                                <input type="checkbox" id="7yr" />7yr</label>
                                                            <label for="10">
                                                                <input type="checkbox" id="10yr" />10yr</label>
                                                            <label for="20">
                                                                <input type="checkbox" id="20yr" />20yr</label>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>





                            <div class="form-group" style="display: none;">
                                <label>Service Locations</label>
                                <ul id="service_locations" style="font-size: 1.0rem;">
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onclick="ConnectToDynamics()">Submit to Dynamics</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Modal for Success-->
            <div class="modal fade" id="SuccessModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-success" style="text-align: center;">
                            <h3 class="text-white" style="text-align: center;">!!!Opportunity Creation Progress!!!</h3>
                        </div>
                        <div class="modal-footer" style="text-align: center;">

                            <div class="row" id="oppCreatedNotification" style="padding-top: 10px; display: none;">
                                <label id="oppcreatedid">Opportunity Created</label>
                            </div>
                            <div class="row" id="oppExistingNotification" style="padding-top: 10px; display: none;">
                                <label>Adding Locations to Existing Opp..</label>
                            </div>
                            <div class="row" id="NoNewLocreatedNotification" style="padding-top: 10px; display: none;">
                                <label>No New Location to create, Please enter a location to create</label>
                            </div>
                            <div class="row" id="ALocCreatedNotification" style="padding-top: 10px; display: none;">
                                <label>A Locations Created</label>
                            </div>
                            <div class="row" id="NoZLocCreatedNotification" style="padding-top: 10px; display: none;">
                                <label>Created A Locations, No new Z Location to create</label>
                            </div>
                            <div class="row" id="ZLocCreatedNotification" style="padding-top: 10px; display: none;">
                                <label id="changethelabel">Z Locations Created</label>
                            </div>
                            <%--   <div class="row" id="AROUpdateddNotification" style="padding-top: 10px; display: none;">
                                <label id="changeAROlable">Updating HLE based on ARO data ....</label>
                            </div>--%>

                            <div class="showButtons" id="showButtons" style="display: none">
                                <button type="button" onclick="redirectDynamcics()" class="btn btn-primary">Go To Opportunity</button>
                                <button type="button" onclick="reloadPage()" class="btn btn-primary">Create More</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/customLoadingOverlay.js"></script>
    <script src="js/main1.js?v=2.1"></script>
    <script src="js/Constants.js"></script>
    <script src="js/BulkUploadGrid.js"></script>
    <script src="js/AgGridDynamicsUpdateColumns.js"></script>
</body>
</html>
