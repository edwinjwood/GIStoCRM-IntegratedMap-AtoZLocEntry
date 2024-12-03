<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="CarrierEsriToDynamics.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Carrier Maps</title>
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet">
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/bootstrap-social.css" rel="stylesheet">
    <link href="css/styles.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">

</head>
<body>
    <form id="form1" runat="server">
    <header class="jumbotron container-fluid text-center">
        <div class="container">
            <h1 class="display-3" style="float:inherit; font-size:xx-large; color:#212121; font-family:Arial; font-weight: bold;">Carrier Esri Dynamics Connector</h1>
              <div class="row row-header">
                  <div class="col-xs-12 col-sm-3" >
                      <img style="float:left; width: 250px;" src="img/main-logo.png" class="img-responsive"/>
                  </div>  
                  <div class="col-xs-12 col-sm-5">
                      
                  </div>
                  <div class="col-xs-12 col-sm-4 text-center">
                      <label style=" font-size:xx-large; color:#FF3F80; font-family:Arial; font-weight: bold;">Welcome</label>
                      <br/>
                      <br/>
                      <label id="name" runat="server" style="font-size:xx-large; color:#FF3F80; font-family:Arial; font-weight: bold;">  Deepak Begrajka  </label>
                  </div>  
                 </div>                                 
              </div>
            
    </header>
    <div class="row-content" style="padding:20px;">
        <div class="container">
            <label style=" display: flex; align-items: center; justify-content: center; color:black; font-size:200%; padding:40px;"> Select Account</label>
            

            <asp:DropDownList CssClass="form-control" ID="ddl1" runat="server"> </asp:DropDownList>

            <asp:Button runat="server" CssClass="bg-primary" OnCommand="Unnamed_Command" ID="AccessMap" Text="Enter Map  " style=" display: flex; align-items: center; justify-content: center; color:black;  margin-top:25px;margin-bottom:15px;" /> 

        </div>
    </div>
    <footer class="row-footer">
        <div class="container">
            <label style="padding-top:50px; font-size:120%;">Spirit Communications Proprietary: This information contained herein is for use by authorized only and is not for general distribution</label>
        </div>
    </footer>
    </form>
</body>
</html>
