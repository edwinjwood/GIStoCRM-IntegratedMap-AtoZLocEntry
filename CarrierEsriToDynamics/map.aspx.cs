using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.ServiceModel;
using System.ServiceModel.Description;
using Microsoft.VisualBasic;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using System.Web.Script.Serialization;
using Microsoft.Xrm.Tooling.Connector;
//Test commit comment

// These namespaces are found in the Microsoft.Xrm.Sdk.dll assembly
// found in the SDK\bin folder.
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Discovery;
using Microsoft.Xrm.Sdk.Messages;

// This namespace is found in Microsoft.Crm.Sdk.Proxy.dll assembly
// found in the SDK\bin folder.
using Microsoft.Crm.Sdk.Messages;

// Directory  Services
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using Spirit.Esrimap.Business;
using Newtonsoft.Json;
using Microsoft.VisualBasic.ApplicationServices;
//using System.Web.Script.Serialization;
using System.Runtime.Serialization;
using System.Net;
using Newtonsoft.Json.Linq;
using Microsoft.Xrm.Sdk.Metadata;

namespace CarrierEsriToDynamics
{
    public class Account
    {
        public string Name;
        public string Number;
        public string AID;
    }

    public class AccountDetails {
        public string circuit_phone;
        public string address;
        public string token_cicuit_voice;
    }
    public class ListALocation {
        public string username { get; set; }
        public List<String> term { get; set; }
        public string OppID { get; set; }
        public string LocationData { get; set; }
        
    }

    public class ListAroFsrData
    {
        public string buried_length_feet { get; set; }
        public string link_status { get; set; }
        public Guid location_id { get; set; }
        //public string segment_name { get; set; }
        public string classOfService { get; set; }
        public string LocationType { get; set; }

    }

    public class ALocationDetail {
        public string LocationName { get; set; }
        public string LocationType { get; set; }
        public string tempid { get; set; }
        public string LocationAddress { get; set; }
        public string LocationApartment { get; set; }
        public string LocationLatLong { get; set; }
        public string LocationBandwidth { get; set; }
        public string LocationRegion { get; set; }
        public string LocationFiber { get; set; }
        public string LocationOffnet { get; set; }
        public string LocationNpanxx { get; set; }
        public string LocationDiversity { get; set; }
        public string LocationDiversitytype { get; set; }
        public string LocationCos { get; set; }
        public string LocationCosFsr { get; set; }
        public string LocationCosOnr { get; set; }
        public string LocationInterfaceSpeed { get; set; }
        public string LocationFsrProposedSol { get; set; }
        public string LocationProposedSol { get; set; }
        public string LocationNearNetDistance { get; set; }
        public string LocationNearNetOspCost { get; set; }
        public string LocationNearNetEqipmentCost { get; set; }
        public string LocationClosingDate { get; set; }
        public string id { get; set; }
        public string LocationType1 { get; set; }
        public string LocationSubType { get; set; }
        public string LocationMultiTenant { get; set; }
        public string LocationFloor { get; set; }
        public string LocationApartmentType { get; set; }
    }

    public class ZLocationDetail
    {
        public string LocationName { get; set; }
        public string LocationType { get; set; }
        public string tempid { get; set; }
        public string LocationAddress { get; set; }
        public string LocationApartment { get; set; }
        public string LocationLatLong { get; set; }
        public string LocationBandwidth { get; set; }
        public string LocationRegion { get; set; }
        public string LocationFiber { get; set; }
        public string LocationOffnet { get; set; }
        public string LocationNpanxx { get; set; }
        public string LocationDiversity { get; set; }
        public string LocationDiversitytype { get; set; }
        public string LocationCos { get; set; }
        public string LocationCosFsr { get; set; }
        public string LocationCosOnr { get; set; }
        public string LocationInterfaceSpeed { get; set; }
        public string LocationFSRproposedsolution { get; set; }
        public string Locationproposedsolution { get; set; }
        public string LocationProposedSol { get; set; }
        public string LocationAttachAZ { get; set; }
        public string LocationNearNetDistance { get; set; }
        public string LocationNearNetOspCost { get; set; }
        public string LocationNearNetEqipmentCost { get; set; }
        public string LocationClosingDate { get; set; }
        public string LocationNearNetOnNetLocationID { get; set; }
        public string LocationType1 { get; set; }
        public string LocationSubType { get; set; }
        public string LocationMultiTenant { get; set; }
        public string LocationFloor { get; set; }
        public string LocationApartmentType { get; set; }
    }

    public class LocationDetail
    {
        public string ID { get; set; }
        public string LocationName { get; set; }
        public string LocationType { get; set; }
        public string LocationAddress { get; set; }
        public string LocationLatLong { get; set; }
        public string LocationProduct { get; set; }
        public string LocationBandwidth { get; set; }
        public string LocationRegion { get; set; }
        public string LocationFiber { get; set; }
        public string LocationEoc { get; set; }
        public string LocationOffnet { get; set; }
        public string LocationNpanxx { get; set; }
        public string LocationDiversity { get; set; }


    }

    public class LocationInfo {
        public Guid id { get; set; }
        public string locAddress { get; set; }
        public string name { get; set; }
        public string locationtype { get; set; }
        public Boolean isSourecLoc { get; set; }

    }

    public class aData
    {
        public string EmployeeName { get; set; }
        public string EAccountName { get; set; }
        public string EAccountNumber { get; set; }
        public string EAccountID { get; set; }
        public string EOpportunityName { get; set; }
        public List<String> EOpportunityTerm { get; set; }
        public string EOpportunityContract { get; set; }
        public string EEstimaedCloseDate { get; set; }
        public string EEstimaedRevenue { get; set; }
        public string JsonLocValue { get; set; }
        
    }

    public class OpportunityClass
    {
        public string EmployeeName { get; set; }
        public string EAccountName { get; set; }
        public string EAccountNumber { get; set; }
        public string EAccountID { get; set; }
        public string EAccountPhone { get; set; }
        public string EAccountStreet { get; set; }
        public string EAccountCity { get; set; }
        public string EAccountState { get; set; }
        public string EAccountZip { get; set; }
        public string EAccountUrl { get; set; }
        public string EOpportunityName { get; set; }
        public List<String> EOpportunityTerm { get; set; }
        public string EOpportunityContract { get; set; }
        public string EContactName { get; set; }
        public string EContactNumber { get; set; }
        public string EContactEmail { get; set; }
        public string ContactStreet { get; set; }
        public string ContactCity { get; set; }
        public string ContactState { get; set; }
        public string ContactZip { get; set; }
        public string ECarrierType { get; set; }
        public string EFTTCType { get; set; }
        public string EAssignSE { get; set; }
        public string EEstimaedCloseDate { get; set; }
        public string EEstimaedRevenue { get; set; }
    }

    public class LatLong {
        public string Lat { get; set; }
        public string Long { get; set; }
        public string Address { get; set; }
    }

    public class FSRDetails {
        public string rfpid { get; set; }
        public string longitude { get; set; }
        public string latitude { get; set; }
        public string classOfService { get; set; }
        public string LocationType { get; set; }
        public string Bandwidth { get; set; }
        public Guid OwnerID { get; set; }
        public Guid OpportunityId { get; set; }
        public Guid LocationID { get; set; }
        public string Diversity { get; set; }
        public string DiversityType { get; set; }
        public string ProposedSolution { get; set; }
        public string LocationCosFsr { get; set; }
        public string LocationCosOnr { get; set; }
        public string LocationFsrProposedSol { get; set; }
        public string LocationProposedSol { get; set; }

        public string Term { get; set; }
        public string ClosingDate { get; set; }
        public string ALocationGuid { get; set; }
        public string LocationNearNetDistance { get; set; }
        public string LocationNearNetOspCost { get; set; }
        public string LocationNearNetEqipmentCost { get; set; }
    }

    public partial class map : System.Web.UI.Page
    {
        public static Uri HomeRealmUri { get; private set; }
        public static ClientCredentials DeviceCredentials { get; private set; }
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetDate(String name)
        {
            Debug.WriteLine("Username for ajax call er es frsdfsd fsd f = " + name);
            Debug.WriteLine("Username for ajax call = " + name);
            Char delimiter = '@';
            String[] substrings = name.Split(delimiter);
            Debug.WriteLine("Username for ajax call = " + substrings[0]);
            var appDomain = ConfigurationManager.AppSettings["appDomain"];
            String USName = substrings[0]+ "@" + appDomain; //1326 cloud configuration - transition from on prim to Dynamics 365 cloud [username format change]
            Debug.WriteLine("Username for ajax call = " + USName);

            IOrganizationService service = GetCRM_Service();
            Guid owner_ID = GetSystemUserIdByName(USName);
            List<string> account_name = GetAccountID(owner_ID);
            int i = 0;

            List<string> Aname = new List<string>();
            List<string> Anumber = new List<string>();
            List<string> AId = new List<string>();
            List<Account> account = new List<Account>();
            //Account a = new Account();

            String[] seperator = { "@@@$$$" };
            foreach (object o in account_name)
            {
                String x = Convert.ToString(o);
                Debug.WriteLine("String Comp = " + x);
                String[] words = x.Split(seperator, StringSplitOptions.RemoveEmptyEntries);
                Debug.WriteLine("Name === " + words[0]);
                Aname.Add(words[0]);
                Debug.WriteLine("Number === " + words[1]);
                Anumber.Add(words[1]);
                Debug.WriteLine("ID === " + words[2]);
                AId.Add(words[2]);
                Account a = new Account();
                a.Name = words[0];
                a.Number = words[1];
                a.AID = words[2];
                account.Add(a);
                i++;
            }
            //string ans = JsonConvert.SerializeObject(account, Formatting.Indented);
            JavaScriptSerializer jss = new JavaScriptSerializer();
            jss.MaxJsonLength = Int32.MaxValue;
            string ans = jss.Serialize(account);
            //int t = json.Length;
            //return json;
            return ans;
            //return ans;
        }

        [WebMethod]
        public static string checkIfLocationNearNet(LatLong latlongObj) {
            String latitude = latlongObj.Lat;
            String longitude = latlongObj.Long;
            String address = latlongObj.Address;
            String[] AddressSplit = address.Split(',');
            String StreetAddress = AddressSplit[0].Trim();
            Debug.WriteLine("StreetAddress = " + StreetAddress);
            String City = AddressSplit[1].Trim();
            String State = AddressSplit[2].Trim();
            String Zip = AddressSplit[3].Trim();
            IOrganizationService service = GetCRM_Service();
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "spirit_nearnetlocation",
                    ColumnSet = new ColumnSet("spirit_street1", "spirit_locationtype", "spirit_equipmentcost", "spirit_builddistance", "spirit_ospcost", "statuscode"),
                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {                                    
                                    new ConditionExpression("spirit_street1", ConditionOperator.Equal, StreetAddress),
                                    new ConditionExpression("spirit_postalcode", ConditionOperator.Equal, Zip),
                                    new ConditionExpression("statuscode", ConditionOperator.Equal, 1), 
                                }
                            }
                        }
                    }
                };
                //query.AddOrder("LocationType", OrderType.Descending);
                //Entity entity = service.RetrieveMultiple(query).Entities.First()
                List<Entity> entity = service.RetrieveMultiple(query).Entities.ToList<Entity>();
                JObject Details;
                String DetailsS = "";
                if (entity.Count == 0)
                {
                    Debug.WriteLine("entity == null");
                    Details = new JObject() {
                            new JProperty("LocationType", 241870009),
                             };
                    String DetailssS = Details.ToString();
                    return DetailssS;
                }
                for (int i = 0; i < entity.Count; i++) {
                    string id = (entity[i].Id).ToString();
                    var locType = (OptionSetValue)entity[i].Attributes["spirit_locationtype"];
                    var nearNetStatus = (OptionSetValue)entity[i].Attributes["statuscode"];
                    Debug.WriteLine("locType = " + locType.Value);
                    Debug.WriteLine("nearNetStatusValue = " + nearNetStatus.Value);
                    if (locType.Value.ToString() == "241870002" && nearNetStatus.Value == 1)
                    {
                        //Location is OnNet
                        Details = new JObject() {
                                new JProperty("LocationType", locType.Value),
                                new JProperty("LocationID", id)
                                 };
                        //String DetailsS = Details.ToString();
                        return Details.ToString();
                    }
                    else if (locType.Value.ToString() == "241870003" && nearNetStatus.Value == 1)
                    {
                        Debug.WriteLine("Location is Nearnet");
                        string spirit_builddistance = entity[i].Attributes["spirit_builddistance"].ToString();
                        Debug.WriteLine("spirit_builddistance = " + spirit_builddistance);
                        Money equipmentCost = (Money)entity[i].Attributes["spirit_equipmentcost"];
                        Debug.WriteLine("equipment cost = " + equipmentCost.Value);
                        Money ospCost = (Money)entity[i].Attributes["spirit_ospcost"];
                        Debug.WriteLine("OSP cost = " + ospCost.Value);
                        Details = new JObject() {
                                new JProperty("LocationType", locType.Value),
                                new JProperty("spirit_builddistance",spirit_builddistance),
                                new JProperty("equipmentCost",equipmentCost.Value),
                                new JProperty("ospCost", ospCost.Value),
                                new JProperty("LocationID", id)
                                 };
                        DetailsS = Details.ToString();
                    }
                    else
                    {
                        Details = new JObject() {
                                new JProperty("LocationType", 241870009),
                                 };
                        DetailsS = Details.ToString();
                    }
                }
                return DetailsS;
            }
            catch (Exception e)
            {
                JObject Details = new JObject() {
                            new JProperty("LocationType", 241870009),
                             };
                String DetailsS = Details.ToString();
                return DetailsS;
            }
        }

        [WebMethod]
        public static string GetEnvUrl()
        {
            return ConfigurationManager.AppSettings["portalUrl"].ToString();
        }
        
        [WebMethod]
        public static string GetReverseUrl()
        {
            var stringEnd = "/reverseGeocode?f=pjson&featureTypes=&location=";
            return ConfigurationManager.AppSettings["reverseURL"] + stringEnd;
        }

        [WebMethod]
        public static string GetEnvMapId()
        {
            return ConfigurationManager.AppSettings["mapId"];
        }

        [WebMethod]
        public static string GetEnvRedirect()
        {
            var stringEnd = "/main.aspx?etn=opportunity&pagetype=entityrecord&id=";
            return ConfigurationManager.AppSettings["redirectSrc"] + stringEnd;
        }

        [WebMethod]
        public static string GetEsriGeoCodeTokken()
        {
            var stringEnd = "client_id=YzVigbD9Tdj0bPfV&grant_type=client_credentials&client_secret=7250ba7746a9417889fd82b7ff271fbf&expiration=2880&f=pjson";
            return ConfigurationManager.AppSettings["tokkenUrl"] + stringEnd;
        }

        [WebMethod]
        public static List<string> GetAssignSE() {
            IOrganizationService service = GetCRM_Service();
            string output="";
            List<string> SE = new List<string>();
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "team",
                    ColumnSet = new ColumnSet("teamid"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("name", ConditionOperator.Equal, "Carrier Sales Engineering Team"),
                                }
                            }
                        }
                    }
                };
                Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

                Debug.WriteLine("all entity account ID = " + entity.Id);
                if (entity == null)
                {
                    throw new InvalidOperationException();

                }
                Guid teamid = entity.Id;
                List<string> systemusersID = getSystemUserId(teamid);
                foreach (var sid in systemusersID) {
                    var name = getUserDetails(sid);
                    output = sid + "&&&&" + name;
                    SE.Add(output);
                }
                return SE;
            }
            catch (InvalidOperationException exception)
            {

                SE.Add("XYZ");
                return SE;
            }
            //return "XYZ";
        }

        public static List<String> getSystemUserId(Guid teamid) {
            IOrganizationService service = GetCRM_Service();
            List<String> systemuserID = new List<String>();
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "teammembership",
                    ColumnSet = new ColumnSet("systemuserid"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("teamid", ConditionOperator.Equal, teamid)

                                }
                            }
                        }
                    }
                };
                //query.AddOrder("name", OrderType.Ascending);
                //       Console.WriteLine(ColumnSet);

                int x = 10;
                //Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

                List<Entity> entity = service.RetrieveMultiple(query).Entities.ToList<Entity>();
                for (int i = 0; i < entity.Count; i++)
                {
                    String userid =  Convert.ToString(entity[i].Attributes["systemuserid"]);
                    systemuserID.Add(userid);

                }
                if (entity == null)
                {
                    throw new InvalidOperationException();

                }
                //Debug.WriteLine("All the account ID = " + entity.Count);
                return systemuserID;

            }
            catch (InvalidOperationException exception)
            {

                systemuserID.Add("zzxasfsfsd");
                return systemuserID;
            }
        }

        public static string getUserDetails(string sid) {
            IOrganizationService service = GetCRM_Service();
            Guid userid = Guid.Parse(sid);
            var query = new QueryExpression
            {
                EntityName = "systemuser",
                ColumnSet = new ColumnSet("fullname"),

                Criteria = new FilterExpression
                {
                    Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("systemuserid", ConditionOperator.Equal, userid)
                                }
                            }
                        }
                }
            };
            //       Console.WriteLine(ColumnSet);
            Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

            if (entity == null)
            {
                return "";
            }
            String name = (string)entity.Attributes["fullname"];
            return name;
        }



        [WebMethod]
        public static string GetOppInfo(String existingoppid) {
            Debug.WriteLine("here = " + existingoppid);
            IOrganizationService service = GetCRM_Service();
            var query = new QueryExpression
            {
                EntityName = "opportunity",
                ColumnSet = new ColumnSet("spirit_opportunityid", "name"),

                Criteria = new FilterExpression
                {
                    Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("spirit_opportunityid", ConditionOperator.Equal, existingoppid)
                                }
                            }
                        }
                }
            };
            //Debug.WriteLine(ColumnSet);
            Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

            if (entity == null) {
                Debug.WriteLine("entity == null");
                return "";
            }
            string id = (entity.Id).ToString();
            var locInfo = GetLocationForOpp(entity.Id);
            String name = (string)entity.Attributes["name"];
            var l1 = new LocationInfo();
            l1.name = name;
            l1.id = entity.Id;
            l1.locAddress = "";
            l1.locationtype = "";
            l1.isSourecLoc = false;
            //list_loc_info.Add(l1);
            locInfo.Add(l1);
            var json = new JavaScriptSerializer().Serialize(locInfo);
            Debug.WriteLine(locInfo[0].name);
            Debug.WriteLine("I am here");
            Debug.WriteLine(json);
            return json;
        }

        [WebMethod]
        public static string GetFullname(String name1)
        {
            String fullname="Map User";
            Debug.WriteLine(" *********** i am herere ****************");
            try
            {
                using (var context = new PrincipalContext(ContextType.Domain))
                {

                    UserPrincipal principal = null;

                    if (name1 != null)
                    {

                        using (principal = UserPrincipal.FindByIdentity(context, name1))
                        {
                            if (principal != null)
                            {
                                Debug.WriteLine(" User.Identity.Name = " + name1);
                                var firstName = principal.GivenName;
                                var lastName = principal.Surname;
                                var Phone = principal.VoiceTelephoneNumber;
                                var Email = principal.EmailAddress;
                                //username = principal.SamAccountName;
                                fullname = firstName + " " + lastName;
                                //Get User Title
                                String title;
                                DirectoryEntry directoryEntry = principal.GetUnderlyingObject() as DirectoryEntry;
                                if (directoryEntry.Properties.Contains("title"))
                                {
                                    title = directoryEntry.Properties["title"].Value.ToString();
                                }
                            }
                        }
                    }
                    else
                    {
                        fullname = "XYZ";
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
            
            Debug.WriteLine("Fullname =  " + fullname);

            String fname = JsonConvert.SerializeObject(fullname, Formatting.Indented);
            return fname;
        }

        [System.Web.Services.WebMethod]
        public static string createOpportunity(OpportunityClass oppObj) {
            Guid opportunityID = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");
            string output = "";
            try
            {
                String UName = oppObj.EmployeeName;
                String AName = oppObj.EAccountName;
                String ANumber = oppObj.EAccountNumber;
                String AID = oppObj.EAccountID;
                String OPName = oppObj.EOpportunityName;
                //List<String> OPTerm = oppObj.EOpportunityTerm;
                String OPContract = oppObj.EOpportunityContract;
                String ConName = oppObj.EContactName;
                String Number = oppObj.EContactNumber;
                String Email = oppObj.EContactEmail;
                String CarrierType = oppObj.ECarrierType;
                String FttcType = oppObj.EFTTCType;
                String EAssignSE = oppObj.EAssignSE;
                Guid AssignSE = Guid.Parse(EAssignSE);
                String OPEstimatedCloseDate = oppObj.EEstimaedCloseDate;
                String OPEstimatedRevenue = oppObj.EEstimaedRevenue;
                DateTime parsedDate = DateTime.Parse(OPEstimatedCloseDate);
                IOrganizationService service = GetCRM_Service();
                var appDomain = ConfigurationManager.AppSettings["appDomain"];
                Guid owner_ID = GetSystemUserIdByName(UName + "@" + appDomain); //1326 cloud configuration - transition from on prim to Dynamics 365 cloud [username format change]
                Guid AccountID = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");
                Guid ContactID = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");
                
                Entity request_opportunity = new Entity("opportunity");
                int saleschannelvalue = 241870001;
                int ContractValueBasedOnString = 241870000;

                if (OPContract == "New")
                {
                    ContractValueBasedOnString = 241870000;
                }
                if (OPContract == "Upgrade")
                {
                    ContractValueBasedOnString = 241870001;
                }
                if (OPContract == "Renewal")
                {
                    ContractValueBasedOnString = 241870002;
                }
                if (OPContract == "CoterminousAdds")
                {
                    ContractValueBasedOnString = 241870003;
                }
                int CarrierTypeValue = 241870000;
                if (CarrierType == "End User") {
                    CarrierTypeValue = 241870000;
                }
                if (CarrierType == "Transport")
                {
                    CarrierTypeValue = 241870001;

                }
                if (CarrierType == "FTTC")
                {
                    CarrierTypeValue = 241870002;
                }
            if (ANumber == "None")
                {
                    Debug.WriteLine("Creating opportunity");
                    String[] ContactName = ConName.Split(new char[] { ' ' }, 2, StringSplitOptions.RemoveEmptyEntries);                    

                    ContactID = CreateContact(owner_ID, ContactName[0], ContactName[1], Number, Email, oppObj.ContactStreet.Trim(), oppObj.ContactCity.Trim(), oppObj.ContactState.Trim(), oppObj.ContactZip.Trim());
                    AccountID = AccountCreation.CreateProspectAccount(owner_ID, ContactID, AName, oppObj.EAccountStreet.Trim(), oppObj.EAccountCity.Trim(), oppObj.EAccountState.Trim(), oppObj.EAccountZip.Trim(), oppObj.EAccountUrl, oppObj.EAccountPhone, service);
                    //Create Opportunity
                    request_opportunity["name"] = OPName;
                    request_opportunity["ownerid"] = new EntityReference("systemuser", owner_ID);
                    request_opportunity["spirit_campaignrelated"] = false;
                    //request_opportunity["spirit_term"] = TermOptionSetFactory.Instanse.GetOptionSet(OPTerm.First());
                    //TermEntity termEntity = new TermEntity();
                    //Guid termGuid = termEntity.retrieveTerm(OPTerm.First());
                    //if (termGuid != new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00"))
                    //{
                    //    request_opportunity["cloud_term"] = new EntityReference("cpq_term", termGuid);
                    //}
                    request_opportunity["customeridtype"] = 2;
                    request_opportunity["dyncloud_saleschannel"] = new OptionSetValue((int)saleschannelvalue);
                    request_opportunity["spirit_type"] = new OptionSetValue((int)ContractValueBasedOnString);
                    request_opportunity["spirit_carriertype"] = new OptionSetValue((int)CarrierTypeValue);
                    if (CarrierType == "FTTC")
                    {
                        int FTTCtypevalue = 241870000;
                        if (FttcType == "Macro Lit")
                        {
                            FTTCtypevalue = 241870000;
                        }
                        if (FttcType == "Macro Dark")
                        {
                            FTTCtypevalue = 241870001;
                        }
                        if (FttcType == "Small Cell Lit")
                        {
                            FTTCtypevalue = 241870002;
                        }
                        if (FttcType == "Small Cell Dark")
                        {
                            FTTCtypevalue = 241870003;
                        }
                        request_opportunity["spirit_fttttype"] = new OptionSetValue((int)FTTCtypevalue);
                    }
                    request_opportunity["parentcontactid"] = new EntityReference("contact", ContactID);
                    if (AccountID != new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00"))
                        request_opportunity["parentaccountid"] = new EntityReference("account", AccountID);
                    request_opportunity["spirit_assignedsalesengineer"] = new EntityReference("systemuser", AssignSE);
                    request_opportunity["estimatedclosedate"] = parsedDate;
                    request_opportunity["estimatedvalue"] = new Money((decimal)Convert.ToDouble(OPEstimatedRevenue));
                    int newLogo = 241870001;
                    request_opportunity["spirit_newlogo2"] = new OptionSetValue((int)newLogo);
                    opportunityID = service.Create(request_opportunity);
                }
                else
                {
                    AccountID = new Guid(AID);
                    ContactID = GetContactID(AccountID);
                    Debug.WriteLine("ContactId = " + ContactID);
                    //Create Opportunity
                    request_opportunity["name"] = OPName;
                    request_opportunity["ownerid"] = new EntityReference("systemuser", owner_ID);
                    request_opportunity["spirit_campaignrelated"] = false;
                    //request_opportunity["spirit_term"] = TermOptionSetFactory.Instanse.GetOptionSet(OPTerm.First());
                    //TermEntity termEntity = new TermEntity();
                    //Guid termGuid = termEntity.retrieveTerm(OPTerm.First());
                    //if (termGuid != new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00"))
                    //{
                    //    request_opportunity["cloud_term"] = new EntityReference("cpq_term", termGuid);
                    //}
                    request_opportunity["customeridtype"] = 2;
                    if (ContactID != new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00")) {
                        request_opportunity["parentcontactid"] = new EntityReference("contact", ContactID);
                    }                    
                    request_opportunity["parentaccountid"] = new EntityReference("account", AccountID);
                    request_opportunity["dyncloud_saleschannel"] = new OptionSetValue((int)saleschannelvalue);
                    request_opportunity["spirit_carriertype"] = new OptionSetValue((int)CarrierTypeValue);
                    request_opportunity["spirit_type"] = new OptionSetValue((int)ContractValueBasedOnString);
                    if (CarrierType == "FTTC")
                    {
                        int FTTCtypevalue = 241870000;
                        if (FttcType == "Macro Lit")
                        {
                            FTTCtypevalue = 241870000;
                        }
                        if (FttcType == "Macro Dark")
                        {
                            FTTCtypevalue = 241870001;
                        }
                        if (FttcType == "Small Cell Lit")
                        {
                            FTTCtypevalue = 241870002;
                        }
                        if (FttcType == "Small Cell Dark")
                        {
                            FTTCtypevalue = 241870003;
                        }
                        request_opportunity["spirit_fttttype"] = new OptionSetValue((int)FTTCtypevalue);
                    }
                    request_opportunity["spirit_assignedsalesengineer"] = new EntityReference("systemuser", AssignSE);
                    request_opportunity["estimatedclosedate"] = parsedDate;
                    request_opportunity["estimatedvalue"] = new Money((decimal)Convert.ToDouble(OPEstimatedRevenue));
                    int newLogo = 241870000;
                    request_opportunity["spirit_newlogo2"] = new OptionSetValue((int)newLogo);
                    opportunityID = service.Create(request_opportunity);
                }
        }
            catch (Exception)
            {
                String x = "Exception";
                return x;
            }
    string oppid = getOppID(opportunityID);
            output = opportunityID.ToString() + "&&&&" + oppid;
            return output;
        }

        public static string getOppID(Guid opportunityID) {
            try
            {
                IOrganizationService service = GetCRM_Service();
                var query = new QueryExpression
                {
                    EntityName = "opportunity",
                    ColumnSet = new ColumnSet("spirit_opportunityid"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("opportunityid", ConditionOperator.Equal, opportunityID),

                                }
                            }
                        }
                    }
                };
                Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

                    Debug.WriteLine("all entity account ID = " + entity.Attributes["spirit_opportunityid"]);                
                if (entity == null)
                {
                    throw new InvalidOperationException();

                }
                String oppid = entity.Attributes["spirit_opportunityid"].ToString();
                return oppid;

            }
            catch (InvalidOperationException exception)
            {
                return "xyz";
            }
            //return "xyz";
        }
        // Check for contact, if not add contact
        public static Guid CreateContact(Guid Owner_ID, String ConFristName, String ConLastName, String ConNumber, String ConEmail, String streetAddress, String City, String State
            , String Zip)
        {
            String stateShortRepresentation = "";
            if (State.Length == 2)
            {
                stateShortRepresentation = State;
            }
            else
            {
                stateShortRepresentation = GetStateByName(State);
            }
            IOrganizationService service = GetCRM_Service();
            int role = 100000003;
            Entity _contact = new Entity("contact");
            _contact.Attributes["firstname"] = ConFristName;
            _contact.Attributes["new_contacttype"] = new OptionSetValue((int)role);
            _contact.Attributes["ownerid"] = new EntityReference("systemuser", Owner_ID);
            _contact.Attributes["lastname"] = ConLastName;
            _contact.Attributes["emailaddress1"] = ConEmail;
            _contact.Attributes["telephone1"] = ConNumber;
            _contact.Attributes["address1_line1"] = streetAddress;
            _contact.Attributes["address1_city"] = City;
            _contact.Attributes["address1_stateorprovince"] = stateShortRepresentation;
            _contact.Attributes["address1_postalcode"] = Zip;
            Guid contactID = service.Create(_contact);
            return contactID;
        }

        [System.Web.Services.WebMethod]
        public static string create_ALocations(ListALocation ALocObj) {
            Debug.WriteLine("create service location");
            Guid ALocationID = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");

            String UName = ALocObj.username;
            List<String> Locterm = ALocObj.term;
            String OppId = ALocObj.OppID;
            Debug.WriteLine("OppId ==== " + OppId);
            Guid OppGuid = Guid.Parse(OppId);

            String LocData = ALocObj.LocationData;
            Debug.WriteLine(LocData);
            JavaScriptSerializer js = new JavaScriptSerializer();
            ALocationDetail[] Details = js.Deserialize<ALocationDetail[]>(LocData);
            String DetailsLengthString = Details.Length.ToString();
            Debug.WriteLine(Details);
            IOrganizationService service = GetCRM_Service();
            int DetailsLengthInt = Convert.ToInt32(DetailsLengthString);
            for (int i = 0; i < DetailsLengthInt; i++)
            {
                String LocationName = Details[i].LocationName;
                String LocationType = Details[i].LocationType;
                String tempid = Details[i].tempid;
                String Address = Details[i].LocationAddress;
                String LocationApartment = Details[i].LocationApartment;
                String LocationLatLong = Details[i].LocationLatLong;
                String LocationBandwidth="";
                String LocationRegion = Details[i].LocationRegion;
                String LocationFiber = Details[i].LocationFiber;
                String LocationOffnet = Details[i].LocationOffnet;
                String LocationNpanxx = Details[i].LocationNpanxx;
                String LocationDIversity = Details[i].LocationDiversity;
                String LocationDiversitytype = Details[i].LocationDiversitytype;
                String LocationCos="";
                String[] LocationCosFsr = Details[i].LocationCosFsr.Split(',');
                String[] LocationCosOnr = Details[i].LocationCosOnr.Split(',');
                String LocationInterfaceSpeed = Details[i].LocationInterfaceSpeed;
                String LocationFsrProposedSol = Details[i].LocationFsrProposedSol;
                String LocationProposedSol = Details[i].LocationProposedSol;
                String LocationNearNetDistance = Details[i].LocationNearNetDistance;
                String LocationNearNetOspCost = Details[i].LocationNearNetOspCost;
                String LocationNearNetEquipmentCost = Details[i].LocationNearNetEqipmentCost;
                String closingdate = Details[i].LocationClosingDate;
                String LocationType1 = Details[i].LocationType1;
                String LocationSubType = Details[i].LocationSubType;
                String LocationFloor = Details[i].LocationFloor;
                String LocationMultiTenant = Details[i].LocationMultiTenant;
                String LocationApartmentType = Details[i].LocationApartmentType;
                Debug.WriteLine(Address);

                String[] AddressSplit = Address.Split(',');
                String StreetAddress = AddressSplit[0].Trim();
                String City = AddressSplit[1].Trim();
                String State = AddressSplit[2].Trim();
                String stateShortRepresentation = "";
                if (State.Length == 2)
                {
                    stateShortRepresentation = State;
                }
                else
                {
                    stateShortRepresentation = GetStateByName(State);
                }
                int? stateOptionValueNullable = GetOptionSetValueFromLabel("ccl_masterservicelocation", "spirit_state", stateShortRepresentation, service);
                int stateOptionValue = 0;
                if (stateOptionValueNullable.HasValue) stateOptionValue = stateOptionValueNullable.Value;

                String Zipcode = AddressSplit[3].Trim();
                String[] LatLongSplit = LocationLatLong.Split(',');
                String LatitudeLocation = LatLongSplit[0].Trim();
                String LongitudeLocation = LatLongSplit[1].Trim();

                var appDomain = ConfigurationManager.AppSettings["appDomain"];
                Guid owner_ID = GetSystemUserIdByName(UName + "@" + appDomain); //1326 cloud configuration - transition from on prim to Dynamics 365 cloud [username format change]
                var locationUrl = ConfigurationManager.AppSettings["locationUrl"];
                var location_link = locationUrl + "&marker="
                    + LongitudeLocation 
                    + ";" + LatitudeLocation 
                    + ";&level=18";
                
                var request_sla = new Entity("spirit_servicelocation");
                request_sla["spirit_businessname"] = LocationName;
                request_sla["ownerid"] = new EntityReference("systemuser", owner_ID);

                if (LocationType == "New")
                {
                    int Lvalue = 241870000;
                    Debug.WriteLine(Lvalue);
                    request_sla["spirit_locationtype"] = new OptionSetValue((int)Lvalue);
                }
                else if (LocationType == "OnNet")
                {
                    int Lvalue = 241870002;
                    request_sla["spirit_locationtype"] = new OptionSetValue((int)Lvalue);
                }
                else
                {
                    int Lvalue = 241870003;

                }
                if (LocationType1 != "")
                {
                    int? intLocationType1 = GetOptionSetValueFromLabel("spirit_servicelocation", "spirit_locationtype1", LocationType1, service);
                    int locationTypeOptionValue = 0;
                    if (intLocationType1.HasValue) locationTypeOptionValue = intLocationType1.Value;
                    request_sla["spirit_locationtype1"] = new OptionSetValue((int)locationTypeOptionValue);
                }
                if (LocationSubType != "")
                {
                    int? locationSubTypeNullable = GetOptionSetValueFromLabel("spirit_servicelocation", "spirit_locationsubtype", LocationSubType, service);
                    int locationSubTypeOptionValue = 0;
                    if (locationSubTypeNullable.HasValue) locationSubTypeOptionValue = locationSubTypeNullable.Value;
                    request_sla["spirit_locationsubtype"] = new OptionSetValue((int)locationSubTypeOptionValue);
                }

                request_sla["spirit_street1"] = StreetAddress;
                request_sla["spirit_city"] = City;
                request_sla["spirit_servicelocationforopportunityid"] = new EntityReference("opportunity", OppGuid);
                //request_sla["spirit_state"] = stateShortRepresentation;
                request_sla["spirit_statenew"] = new OptionSetValue(stateOptionValue);
                request_sla["spirit_postalcode"] = Zipcode;
                //request_sla["spirit_npanxx"] = LocationNpanxx;
                request_sla["spirit_esrilatitude"] = LatitudeLocation;
                request_sla["spirit_esrilongitude"] = LongitudeLocation;
                request_sla["spirit_locationlink"] = location_link;  //enviromentVariableRemoval
                request_sla["spirit_sourcelocation"] = true;
                int saleschannelvalue = 241870001;
                request_sla["spirit_saleschannelglobal"] = new OptionSetValue((int)saleschannelvalue);
                if (LocationDIversity == "true")
                {
                    request_sla["spirit_diverse"] = true;
                }
                if (LocationDIversity == "false")
                {
                    request_sla["spirit_diverse"] = false;
                }
                if (LocationType1 == "Building" && LocationFloor != "")
                {
                    int? floorNullable = GetOptionSetValueFromLabel("spirit_servicelocation", "spirit_floor", LocationFloor, service);
                    int floorOptionValue = 0;
                    if (floorNullable.HasValue) floorOptionValue = floorNullable.Value;
                    request_sla["spirit_floor"] = new OptionSetValue((int)floorOptionValue);
                    int multiTenantOn = 241870001;
                    int multiTenantOff = 241870000;
                    request_sla["spirit_multitenant"] = LocationMultiTenant == "on" ? new OptionSetValue((int)multiTenantOn) : new OptionSetValue((int)multiTenantOff);
                }

                if (LocationApartmentType != "")
                {
                    int? ApartmentTypeNullable = GetOptionSetValueFromLabel("spirit_servicelocation", "spirit_secondaryaddressdesignator", LocationApartmentType, service);
                    int apartmentTypeOptionValue = 0;
                    if (ApartmentTypeNullable.HasValue) apartmentTypeOptionValue = ApartmentTypeNullable.Value;
                    request_sla["spirit_secondaryaddressdesignator"] = new OptionSetValue((int)apartmentTypeOptionValue);
                    request_sla["spirit_street2"] = LocationApartment;
                }

                ALocationID = service.Create(request_sla);
                if (LocationFiber == "true")
                {
                    var request_fiber = new Entity("spirit_fiberserviceabilityrequest");
                    //request_fiber["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(LocationBandwidth);
                    //request_fiber["spirit_classofservice"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);
                    request_fiber["ownerid"] = new EntityReference("systemuser", owner_ID);
                    TermEntity termEntity = new TermEntity();
                    request_fiber["spirit_opportunity"] = new EntityReference("opportunity", OppGuid);
                    request_fiber["spirit_fiberrequestid"] = new EntityReference("spirit_servicelocation", ALocationID);
                    saleschannelvalue = 241870001;
                    request_fiber["spirit_saleschannel"] = new OptionSetValue((int)saleschannelvalue);
                    if (LocationDIversity == "true")
                    {
                        request_fiber["spirit_diverse"] = true;
                        int diversitytype = 241870000;
                        if (LocationDiversitytype == "Dedicated Physical Ring")
                        {
                            diversitytype = 241870000;
                        }

                        if (LocationDiversitytype == "Dedicated Virtual Ring")
                        {
                            diversitytype = 241870001;
                        }
                        if (LocationDiversitytype == "Dual Entrance Facility")
                        {
                            diversitytype = 241870002;
                        }

                        if (LocationDiversitytype == "Non Collapsed Last Mile Lateral")
                        {
                            diversitytype = 241870003;
                        }

                        if (LocationDiversitytype == "Non Collapsed Lateral & Dual Entrance")
                        {
                            diversitytype = 241870004;
                        }
                        if (LocationDiversitytype == "POP Diversity with Router Diversity")
                        {
                            diversitytype = 241870005;
                        }
                        if (LocationDiversitytype == "Redundant CPE Router/Switch 10G Port")
                        {
                            diversitytype = 241870006;
                        }
                        if (LocationDiversitytype == "Redundant CPE Router/Switch 1G Port")
                        {
                            diversitytype = 241870007;
                        }
                        if (LocationDiversitytype == "Single Pop with Router Diversity")
                        {
                            diversitytype = 241870008;
                        }
                        request_fiber["spirit_diversitytype"] = new OptionSetValue((int)diversitytype);
                    }
                    if (LocationDIversity == "false")
                    {
                        request_fiber["spirit_diverse"] = false;
                    }

                    //if (string.IsNullOrEmpty(LocationCos) == true)
                    //{
                    //    LocationCos = "Ethernet";

                    //    request_fiber["spirit_classofservice"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);
                    //}
                    //else
                    //{
                    //request_fiber["spirit_classofservice"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);
                    //}

                    if (string.IsNullOrEmpty(Details[i].LocationFsrProposedSol) == true)
                    {
                        request_fiber["spirit_notes"] = "Internet";
                    }
                    else
                    {
                        Debug.WriteLine(Details[i].LocationFsrProposedSol);
                        request_fiber["spirit_notes"] = Details[i].LocationFsrProposedSol;
                    }
                    //if (LocationType == "NearNet")
                    //{
                    //    request_fiber["spirit_nearnetospcosts"] = new Money((decimal)Convert.ToDouble(LocationNearNetOspCost));
                    //    request_fiber["spirit_nearnetequipmentcosts"] = new Money((decimal)Convert.ToDouble(LocationNearNetEquipmentCost));
                    //    request_fiber["spirit_nearnetdistanceft"] = Decimal.Parse(LocationNearNetDistance);
                    //    request_fiber["spirit_nearnet"] = true;
                    //}
                    //else
                    //{
                    //    request_fiber["spirit_nearnet"] = false;
                    //}
                    if (closingdate != "")
                    {
                        DateTime parsedDate = DateTime.Parse(closingdate);
                        request_fiber["spirit_requestedcompletiondate"] = parsedDate;
                    }

                    for (int x = 0; x < LocationCosFsr.Length; x++)
                    {

                        if (LocationCosFsr[x].Length != 0)
                            {
                                //split class of service and bandwidth
                                String[] multiSelectSplit = LocationCosFsr[x].Split('-');
                                LocationCos = multiSelectSplit[0].Trim();
                                LocationBandwidth = multiSelectSplit[1].Trim();

                            request_fiber["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(LocationBandwidth);
                            request_fiber["spirit_classofservice"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);
                            if (LocationType == "NearNet")
                            {
                                request_fiber["spirit_nearnetospcosts"] = new Money((decimal)Convert.ToDouble(LocationNearNetOspCost));
                                request_fiber["spirit_nearnetequipmentcosts"] = new Money((decimal)Convert.ToDouble(LocationNearNetEquipmentCost));
                                request_fiber["spirit_nearnetdistanceft"] = Decimal.Parse(LocationNearNetDistance);
                                request_fiber["spirit_nearnet"] = true;
                            }
                            else
                            {
                                request_fiber["spirit_nearnet"] = false;
                            }


                            Guid fiberid = service.Create(request_fiber);

                        }
                    }
                }
                if (LocationOffnet == "true")
                {
                    for (int j = 0; j < Locterm.Count; j++)
                    {
                        var request_offnet = new Entity("spirit_offnetserviceabilityrequest");
                        //request_offnet["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(LocationBandwidth);
                        request_offnet["ownerid"] = new EntityReference("systemuser", owner_ID);
                        TermEntity termEntity = new TermEntity();
                        Guid termGuid = termEntity.retrieveTerm(Locterm[j]);
                        if (termGuid != new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00"))
                        {
                            request_offnet["cloud_term"] = new EntityReference("cpq_term", termGuid);
                        }
                        //request_offnet["spirit_termglobal"] = TermOptionSetFactory.Instanse.GetOptionSet(Locterm[j]);
                        request_offnet["spirit_opportunity"] = new EntityReference("opportunity", OppGuid);
                        request_offnet["spirit_offnetrequestid"] = new EntityReference("spirit_servicelocation", ALocationID);
                        if (string.IsNullOrEmpty(Details[i].LocationProposedSol) == true)
                        {
                            request_offnet["spirit_notes"] = "Note";
                        }
                        else
                        {
                            request_offnet["spirit_notes"] = Details[i].LocationProposedSol;
                        }

                        int interfacespd = 241870000;
                        if (LocationInterfaceSpeed == "100Mb")
                        {
                            interfacespd = 241870000;
                            request_offnet["spirit_interfacespeed"] = new OptionSetValue((int)interfacespd);
                        }
                        if (LocationInterfaceSpeed == "1Gb")
                        {
                            interfacespd = 241870001;
                            request_offnet["spirit_interfacespeed"] = new OptionSetValue((int)interfacespd);
                        }
                        if (LocationInterfaceSpeed == "10Gb")
                        {
                            interfacespd = 241870002;
                            request_offnet["spirit_interfacespeed"] = new OptionSetValue((int)interfacespd);
                        }

                        for (int x = 0; x < LocationCosOnr.Length; x++)
                        {

                            if (LocationCosOnr[x].Length != 0)
                            {
                                //split class of service and bandwidth
                                String[] multiSelectSplit = LocationCosOnr[x].Split('-');
                                LocationCos = multiSelectSplit[0].Trim();
                                LocationBandwidth = multiSelectSplit[1].Trim();

                                if (string.IsNullOrEmpty(LocationCos) == true)
                                {
                                    LocationCos = "Ethernet";
                                    request_offnet["spirit_circuittype"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);
                                }
                                else
                                {
                                    Debug.WriteLine(ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos));
                                    request_offnet["spirit_circuittype"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);
                                }

                                //request_offnet["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(LocationBandwidth);
                                request_offnet["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(LocationBandwidth);

                                service.Create(request_offnet);

                            }
                        }

                    }

                }
                Details[i].id = ALocationID.ToString();
            
            }

            Debug.WriteLine(Details[0].id);
            var json = new JavaScriptSerializer().Serialize(Details);

            return json;
        }

        public static int? GetOptionSetValueFromLabel(string entityName, string fieldName, string labelString, IOrganizationService service)
        {
            var attReq = new RetrieveAttributeRequest();
            attReq.EntityLogicalName = entityName;
            attReq.LogicalName = fieldName;
            attReq.RetrieveAsIfPublished = true;

            var attResponse = (RetrieveAttributeResponse)service.Execute(attReq);
            var attMetadata = (EnumAttributeMetadata)attResponse.AttributeMetadata;

            return attMetadata.OptionSet.Options.Where(x => x.Label.UserLocalizedLabel.Label == labelString).FirstOrDefault().Value;
        }
        public static string token_ARO = "";
        public static string getReportID = "";

        [System.Web.Services.WebMethod]
        public static string create_ZLocations(ListALocation ZLocObj) {
            //try
            //{
                Debug.WriteLine("createZ Loc");
                Guid ALocationID = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");

                String UName = ZLocObj.username;
                List<String> Locterm = ZLocObj.term;
                String OppId = ZLocObj.OppID;
                Guid OppGuid = Guid.Parse(OppId);
                List<FSRDetails> fsrclass = new List<FSRDetails>();
            int hle_to_create_counter = 0;
            JArray target_hle = new JArray();
            String LocData = ZLocObj.LocationData;
                Debug.WriteLine(LocData);
                JavaScriptSerializer js = new JavaScriptSerializer();
                ZLocationDetail[] Details = js.Deserialize<ZLocationDetail[]>(LocData);
                String DetailsLengthString = Details.Length.ToString();
                Debug.WriteLine(Details);
                IOrganizationService service = GetCRM_Service();
                int DetailsLengthInt = Convert.ToInt32(DetailsLengthString);
                for (int i = 0; i < DetailsLengthInt; i++)
                {
                    String LocationName = Details[i].LocationName;
                    String LocationType = Details[i].LocationType;
                    String tempid = Details[i].tempid;
                    String Address = Details[i].LocationAddress;
                    String LocationApartment = Details[i].LocationApartment;
                    String LocationLatLong = Details[i].LocationLatLong;
                    String LocationBandwidth = Details[i].LocationBandwidth;
                    String LocationRegion = Details[i].LocationRegion;
                    String LocationFiber = Details[i].LocationFiber;
                    String LocationOffnet = Details[i].LocationOffnet;
                    String LocationNpanxx = Details[i].LocationNpanxx;
                    String LocationDIversity = Details[i].LocationDiversity;
                    String LocationDiversitytype = Details[i].LocationDiversitytype;
                    String LocationCos = Details[i].LocationCos;
                    String[] LocationCosFsr = Details[i].LocationCosFsr.Split(',');
                    String[] LocationCosOnr = Details[i].LocationCosOnr.Split(',');
                    String LocationInterfaceSpeed = Details[i].LocationInterfaceSpeed;
                    String LocationFsrProposedSol = Details[i].LocationFSRproposedsolution;
                    String LocationProposedSol = Details[i].LocationProposedSol;
                    String Locationproposedsolution = Details[i].Locationproposedsolution;
                    String ALocID = Details[i].LocationAttachAZ;
                    String LocationNearNetDistance = Details[i].LocationNearNetDistance;
                    String LocationNearNetOspCost = Details[i].LocationNearNetOspCost;
                    String LocationNearNetEquipmentCost = Details[i].LocationNearNetEqipmentCost;
                    String closingdate = Details[i].LocationClosingDate;
                    String LocationType1 = Details[i].LocationType1;
                    String LocationSubType = Details[i].LocationSubType;
                    String LocationFloor = Details[i].LocationFloor;
                    String LocationMultiTenant = Details[i].LocationMultiTenant;
                    String LocationApartmentType = Details[i].LocationApartmentType;
                    Debug.WriteLine(Address);

                    String[] AddressSplit = Address.Split(',');
                    String StreetAddress = AddressSplit[0].Trim();
                    String City = AddressSplit[1].Trim();
                    String State = AddressSplit[2].Trim();
                    String stateShortRepresentation = "";

                    if (State.Length == 2)
                    {
                        stateShortRepresentation = State;
                    }
                    else
                    {
                        stateShortRepresentation = GetStateByName(State);
                    }
                    int? stateOptionValueNullable = GetOptionSetValueFromLabel("ccl_masterservicelocation", "spirit_state", stateShortRepresentation, service);
                    int stateOptionValue = 0;
                    if (stateOptionValueNullable.HasValue) stateOptionValue = stateOptionValueNullable.Value;

                    String Zipcode = AddressSplit[3].Trim();
                    String[] LatLongSplit = LocationLatLong.Split(',');
                    String LatitudeLocation = LatLongSplit[0].Trim();
                    String LongitudeLocation = LatLongSplit[1].Trim();

                var appDomain = ConfigurationManager.AppSettings["appDomain"];
                Guid owner_ID = GetSystemUserIdByName(UName + "@" + appDomain); //1326 cloud configuration - transition from on prim to Dynamics 365 cloud [username format change]
                var locationUrl = ConfigurationManager.AppSettings["locationUrl"];
                var location_link = locationUrl + "&marker=" + LongitudeLocation + ";" + LatitudeLocation + ";&level=18";

                string LocationNearNetOnNetLocationID_str = Details[i].LocationNearNetOnNetLocationID;
                 //   Debug.WriteLine("LocationNearNetOnNetLocationID = " + LocationNearNetOnNetLocationID_str);
                    var request_sla = new Entity("spirit_servicelocation");
                    request_sla["spirit_businessname"] = LocationName;
                    request_sla["ownerid"] = new EntityReference("systemuser", owner_ID);
                    if (LocationNearNetOnNetLocationID_str != "" || !(string.IsNullOrEmpty(LocationNearNetOnNetLocationID_str))) {
                        Guid NearNetOnNetLocationID = new Guid(LocationNearNetOnNetLocationID_str);
                        //Debug.WriteLine("LocationNearNetOnNetLocationID = " + LocationNearNetOnNetLocationID_str);
                        request_sla["sgr_nearnetid"] = new EntityReference("spirit_nearnetlocation", NearNetOnNetLocationID);
                    }
                    if (LocationType == "New")
                    {
                        int Lvalue = 241870000;
                        Debug.WriteLine(Lvalue);
                        request_sla["spirit_locationtype"] = new OptionSetValue((int)Lvalue);
                    }
                    else if (LocationType == "OnNet")
                    {
                        int Lvalue = 241870002;
                        request_sla["spirit_locationtype"] = new OptionSetValue((int)Lvalue);
                    }
                    else
                    {
                        int Lvalue = 241870003;
                        request_sla["spirit_locationtype"] = new OptionSetValue((int)Lvalue);
                    }
                    if (LocationType1 != "")
                    {
                        int? intLocationType1 = GetOptionSetValueFromLabel("spirit_servicelocation", "spirit_locationtype1", LocationType1, service);
                        int locationTypeOptionValue = 0;
                        if (intLocationType1.HasValue) locationTypeOptionValue = intLocationType1.Value;
                        request_sla["spirit_locationtype1"] = new OptionSetValue((int)locationTypeOptionValue);
                    }
                    if (LocationSubType != "")
                    {
                        int? locationSubTypeNullable = GetOptionSetValueFromLabel("spirit_servicelocation", "spirit_locationsubtype", LocationSubType, service);
                        int locationSubTypeOptionValue = 0;
                        if (locationSubTypeNullable.HasValue) locationSubTypeOptionValue = locationSubTypeNullable.Value;
                        request_sla["spirit_locationsubtype"] = new OptionSetValue((int)locationSubTypeOptionValue);
                    }

                request_sla["spirit_street1"] = StreetAddress;
                    request_sla["spirit_street2"] = LocationApartment;
                    request_sla["spirit_city"] = City;
                    request_sla["spirit_servicelocationforopportunityid"] = new EntityReference("opportunity", OppGuid);
                    request_sla["spirit_state"] = stateShortRepresentation;
                    request_sla["spirit_statenew"] = new OptionSetValue(stateOptionValue);
                    request_sla["spirit_postalcode"] = Zipcode;
                    request_sla["spirit_npanxx"] = LocationNpanxx;
                    request_sla["spirit_esrilatitude"] = LatitudeLocation;
                    request_sla["spirit_esrilongitude"] = LongitudeLocation;
                    request_sla["spirit_locationlink"] = location_link; //enviromentVariableRemoval
                request_sla["spirit_sourcelocation"] = false;
                int saleschannelvalue = 241870001;
                request_sla["spirit_saleschannelglobal"] = new OptionSetValue((int)saleschannelvalue);
                if (ALocID != "")
                    {

                        Guid ALocGuid = Guid.Parse(ALocID);
                        request_sla["spirit_alocation"] = new EntityReference("spirit_servicelocation", ALocGuid);
                    }
                    if (LocationDIversity == "true")
                    {
                        request_sla["spirit_diverse"] = true;
                    }
                    if (LocationDIversity == "false")
                    {
                        request_sla["spirit_diverse"] = false;
                    }

                if (LocationType1 == "Building" && LocationFloor != "")
                {
                    int? floorNullable = GetOptionSetValueFromLabel("spirit_servicelocation", "spirit_floor", LocationFloor, service);
                    int floorOptionValue = 0;
                    if (floorNullable.HasValue) floorOptionValue = floorNullable.Value;
                    request_sla["spirit_floor"] = new OptionSetValue((int)floorOptionValue);
                    int multiTenantOn = 241870001;
                    int multiTenantOff = 241870000;
                    request_sla["spirit_multitenant"] = LocationMultiTenant == "on" ? new OptionSetValue((int)multiTenantOn) : new OptionSetValue((int)multiTenantOff);
                }

                if (LocationApartmentType != "")
                {
                    int? ApartmentTypeNullable = GetOptionSetValueFromLabel("spirit_servicelocation", "spirit_secondaryaddressdesignator", LocationApartmentType, service);
                    int apartmentTypeOptionValue = 0;
                    if (ApartmentTypeNullable.HasValue) apartmentTypeOptionValue = ApartmentTypeNullable.Value;
                    request_sla["spirit_secondaryaddressdesignator"] = new OptionSetValue((int)apartmentTypeOptionValue);
                    request_sla["spirit_street2"] = LocationApartment;
                }

                ALocationID = service.Create(request_sla);
                    if (LocationFiber == "true")
                    {
                    hle_to_create_counter += 1;

                    //storing object to work on ARO.
                    FSRDetails fsrd = new FSRDetails();
                        fsrd.rfpid = ALocationID.ToString();
                        fsrd.longitude = LongitudeLocation;
                        fsrd.latitude = LatitudeLocation;
                        fsrd.LocationType = LocationType;
                        fsrd.LocationID = ALocationID;
                        fsrd.OpportunityId = OppGuid;
                        fsrd.OwnerID = owner_ID;
                        //fsrd.ProposedSolution = LocationProposedSol;
                        fsrd.LocationFsrProposedSol = LocationFsrProposedSol;
                        fsrd.Diversity = LocationDIversity;
                        fsrd.DiversityType = LocationDiversitytype;
                        //fsrd.Term = Locterm.First();
                        fsrd.ALocationGuid = ALocID;
                        fsrd.LocationNearNetDistance = LocationNearNetDistance;
                        fsrd.LocationNearNetEqipmentCost = LocationNearNetEquipmentCost;
                        fsrd.LocationNearNetOspCost = LocationNearNetOspCost;
                        fsrd.ClosingDate = closingdate;

                    //if (LocationCos != "")
                        if (LocationCos != "" && (LocationCosOnr[0]) == "")

                        {
                            fsrd.LocationFsrProposedSol = LocationProposedSol;
                        fsrd.Bandwidth = LocationBandwidth;
                        fsrd.classOfService = LocationCos;

                        fsrclass.Add(fsrd);
                                createFiberServiceAbilityRequest(fsrd);
                            }

                    else
                    {
                        //loop through each item that has been selected in multi select dropdown for fsr creation on z location
                        for (int x = 0; x < LocationCosFsr.Length; x++)
                        {

                            if (LocationCosFsr[x].Length != 0)
                            {
                                //split class of service and bandwidth
                                String[] multiSelectSplit = LocationCosFsr[x].Split('-');
                                LocationCos = multiSelectSplit[0].Trim();
                                LocationBandwidth = multiSelectSplit[1].Trim();

                                //fsrd.LocationCosFsr = LocationCos;
                                fsrd.Bandwidth = LocationBandwidth;
                                fsrd.classOfService = LocationCos;


                                fsrclass.Add(fsrd);
                                createFiberServiceAbilityRequest(fsrd);


                            }
                        }

                    }
                    
                    //fsrclass.Add(fsrd);

                    target_hle.Add(new JObject() {
                        new JProperty("id",ALocationID.ToString()),
                        new JProperty("longitude",LongitudeLocation),
                        new JProperty("latitude",LatitudeLocation),
                         });

                }
                    if (LocationOffnet == "true")
                {
                    for (int j = 0; j < Locterm.Count; j++)
                    {
                        var request_offnet = new Entity("spirit_offnetserviceabilityrequest");
                        //request_offnet["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(LocationBandwidth);
                        request_offnet["ownerid"] = new EntityReference("systemuser", owner_ID);
                        TermEntity termEntity = new TermEntity();
                        Guid termGuid = termEntity.retrieveTerm(Locterm[j]);
                        if (termGuid != new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00"))
                        {
                            request_offnet["cloud_term"] = new EntityReference("cpq_term", termGuid);
                        }
                        //request_offnet["spirit_termglobal"] = TermOptionSetFactory.Instanse.GetOptionSet(Locterm[j]);
                        request_offnet["spirit_opportunity"] = new EntityReference("opportunity", OppGuid);
                        request_offnet["spirit_offnetrequestid"] = new EntityReference("spirit_servicelocation", ALocationID);

                        //if (string.IsNullOrEmpty(LocationCos) == true)
                        //{
                        //    LocationCos = "Ethernet";
                        //    request_offnet["spirit_circuittype"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);
                        //}
                        //else
                        //{
                        //    Debug.WriteLine(ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos));
                        //    request_offnet["spirit_circuittype"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);
                        //}
                        if (string.IsNullOrEmpty(Details[i].Locationproposedsolution) == true)
                        {
                            if (string.IsNullOrEmpty(Details[i].LocationProposedSol) == true)
                            { 
                                request_offnet["spirit_notes"] = "Note"; 
                            }
                            else 
                            {
                                request_offnet["spirit_notes"] = LocationProposedSol;
                            }
                            
                        }
                        else
                        {
                            request_offnet["spirit_notes"] = Details[i].Locationproposedsolution;
                        }

                        int interfacespd = 241870000;
                        if (LocationInterfaceSpeed == "100Mb")
                        {
                            interfacespd = 241870000;
                            request_offnet["spirit_interfacespeed"] = new OptionSetValue((int)interfacespd);
                        }
                        if (LocationInterfaceSpeed == "1Gb")
                        {
                            interfacespd = 241870001;
                            request_offnet["spirit_interfacespeed"] = new OptionSetValue((int)interfacespd);
                        }
                        if (LocationInterfaceSpeed == "10Gb")
                        {
                            interfacespd = 241870002;
                            request_offnet["spirit_interfacespeed"] = new OptionSetValue((int)interfacespd);
                        }
                        if (ALocID != "")
                        {

                            Guid ALocGuid = Guid.Parse(ALocID);
                            request_offnet["spirit_offnetrequestid2"] = new EntityReference("spirit_servicelocation", ALocGuid);
                        }

                        //    if (LocationCos != "")//used for bulk onr  
                        //    //need to use another value to identify bulk request
                        //{
                        //    request_offnet["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(LocationBandwidth);
                        //    request_offnet["spirit_circuittype"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);

                        //    service.Create(request_offnet);
                        //}
                        if (LocationCos != "" && (LocationCosOnr[0]) == "")
                        {
                            request_offnet["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(LocationBandwidth);
                            request_offnet["spirit_circuittype"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);

                            service.Create(request_offnet);

                        }

                        else
                        {
                            //loop through each item that has been selected in multi select dropdown for onr creation on z location

                            for (int x = 0; x < LocationCosOnr.Length; x++)
                            {

                                if (LocationCosOnr[x].Length != 0)
                                {
                                    //split class of service and bandwidth
                                    String[] multiSelectSplit = LocationCosOnr[x].Split('-');
                                    LocationCos = multiSelectSplit[0].Trim();
                                    LocationBandwidth = multiSelectSplit[1].Trim();

                                    request_offnet["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(LocationBandwidth);
                                    request_offnet["spirit_circuittype"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(LocationCos);

                                    service.Create(request_offnet);

                                }
                            }
                    }

                        }
                    }
                }

            //Iteratte the HleCounter to work on ARO

            if (hle_to_create_counter == 0)
            {
                return "Success";
            }
            else
            {
                try
                {
                    //        token_ARO = token_ARO == "" ? getAROToken() : token_ARO;
                    //        //string ARO_token = getAROToken();
                    if (getReportID == "")
                    {
                        //            string Report_string = getAvailableReports(token_ARO);
                        //            Debug.WriteLine("Report_string  = " + Report_string);
                        //            JArray values = JArray.Parse(Report_string);


                        //            foreach (var Data in values)
                        //            {
                        //                Debug.WriteLine("Data  =========================" + Data);
                        //                Debug.WriteLine("reportData  =========================" + Data["reportData"]["id"] + Data["reportData"]["name"]);
                        //                if (Data["reportData"]["name"].ToString() == "rfp_output")
                        //                {
                        //                    getReportID = Data["reportData"]["id"].ToString();
                        //                }

                        //            }
                    }


                    //        //JObject first_element = (JObject)values[0];
                    //        //  JObject first_report = (JObject)first_element.GetValue("reportData");
                    //        // string Report_id = (string)first_report.SelectToken("id");
                    Debug.WriteLine("Report ID = " + getReportID);

                    JObject postData = new JObject();
                    postData.Add(new JProperty("rfpId", OppGuid.ToString()));
                    postData.Add(new JProperty("fiberRoutingMode", "ROUTE_FROM_FIBER"));
                    postData.Add(new JProperty("targets", target_hle));
                    //        string PlanId = getPlainId(token_ARO, postData.ToString());
                    //        string AllReports = getIndividualReport(PlanId, getReportID, token_ARO);
                    //        Debug.WriteLine(AllReports);
                    Debug.WriteLine("IS Reports EMPTY");
                    //        JArray ARO_values = JArray.Parse(AllReports);
                    //        Debug.WriteLine("IS Reports EMPTY = " + ARO_values.ToString());
                    for (int j = 0; j < hle_to_create_counter; j++)
                    {
                        for (int k = 0; k < hle_to_create_counter; k++)
                        {
                            //                JObject AROINFO = (JObject)ARO_values[k];
                            //                string location_id = (string)AROINFO.SelectToken("location_id");
                            //                if (location_id == fsrclass[j].LocationID.ToString())
                            //                {
                            //createFiberServiceAbilityRequest( fsrclass[j]);
                            break;
                            //                }
                        }
                    }
                    return "Success";

                        }
                                catch (Exception e)
                {
                    Debug.WriteLine(e.Message);
                    return "Error Message = " + e.Message + "Error Source " + e.Source;
                }
            }
            //}
            //catch (Exception e)
            //{
            //    string output = "!!Exception!! = " + e.Message + ", Source = " + e.Source;
            //    return output;
            //}
            //return "Success";

        }

        public static string createFiberServiceAbilityRequest( FSRDetails fsrd)
        {
            IOrganizationService service = GetCRM_Service();
            var request_fiber = new Entity("spirit_fiberserviceabilityrequest");
            request_fiber["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(fsrd.Bandwidth);
            request_fiber["ownerid"] = new EntityReference("systemuser", fsrd.OwnerID);
            //request_fiber["spirit_termglobal"] = TermOptionSetFactory.Instanse.GetOptionSet(fsrd.Term);
            request_fiber["spirit_opportunity"] = new EntityReference("opportunity", fsrd.OpportunityId);
            request_fiber["spirit_fiberrequestid"] = new EntityReference("spirit_servicelocation", fsrd.LocationID);
            int saleschannelvalue = 241870001;
            request_fiber["spirit_saleschannel"] = new OptionSetValue((int)saleschannelvalue);
            request_fiber["spirit_notes"] = fsrd.LocationFsrProposedSol;
            if (fsrd.Diversity == "true")
            {
                request_fiber["spirit_diverse"] = true;
                int diversitytype = 241870000;
                if (fsrd.DiversityType == "Dedicated Physical Ring")
                {
                    diversitytype = 241870000;
                }

                if (fsrd.DiversityType == "Dedicated Virtual Ring")
                {
                    diversitytype = 241870001;
                }
                if (fsrd.DiversityType == "Dual Entrance Facility")
                {
                    diversitytype = 241870002;
                }
                if (fsrd.DiversityType == "Non Collapsed Last Mile Lateral")
                {
                    diversitytype = 241870003;
                }
                if (fsrd.DiversityType == "Non Collapsed Lateral & Dual Entrance")
                {
                    diversitytype = 241870004;
                }
                if (fsrd.DiversityType == "POP Diversity with Router Diversity")
                {
                    diversitytype = 241870005;
                }
                if (fsrd.DiversityType == "Redundant CPE Router/Switch 10G Port")
                {
                    diversitytype = 241870006;
                }
                if (fsrd.DiversityType == "Redundant CPE Router/Switch 1G Port")
                {
                    diversitytype = 241870007;
                }
                if (fsrd.DiversityType == "Single Pop with Router Diversity")
                {
                    diversitytype = 241870008;
                }
                request_fiber["spirit_diversitytype"] = new OptionSetValue((int)diversitytype);
            }
            if (fsrd.Diversity == "false")
            {
                request_fiber["spirit_diverse"] = false;
            }
            if (string.IsNullOrEmpty(fsrd.classOfService) == true)
            {
                fsrd.classOfService = "Ethernet";
                request_fiber["spirit_classofservice"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(fsrd.classOfService);
            }
            else
            {
                request_fiber["spirit_classofservice"] = ClassOfServiceOptionSetFactory.Instanse.GetOptionSet(fsrd.classOfService);
            }
            //if (string.IsNullOrEmpty(fsrd.ProposedSolution) == true)
            //{
            //    request_fiber["spirit_notes"] = "internet";
            //}
            //else
            //{
            //    Debug.WriteLine(fsrd[i].LocationFsrProposedSol);
            //    request_fiber["spirit_notes"] = fsrd.ProposedSolution;
            //}
            if (fsrd.ALocationGuid != "")
            {
                Guid ALocGuid = Guid.Parse(fsrd.ALocationGuid);
                request_fiber["spirit_fiberrequestid2"] = new EntityReference("spirit_servicelocation", ALocGuid);
            }
            if (fsrd.classOfService == "Ethernet")
            {
                    if (fsrd.LocationType == "NearNet")
                    {
                        Debug.WriteLine(fsrd.LocationType);
                        request_fiber["spirit_nearnetospcosts"] = new Money((decimal)Convert.ToDouble(fsrd.LocationNearNetOspCost));
                        request_fiber["spirit_nearnetequipmentcosts"] = new Money((decimal)Convert.ToDouble(fsrd.LocationNearNetEqipmentCost));
                        request_fiber["spirit_nearnetdistanceft"] = Decimal.Parse(fsrd.LocationNearNetDistance);
                        if (fsrd.Diversity == "true")
                        {
                            request_fiber["spirit_nearnet"] = false;
                        }
                        else
                        {
                            if (fsrd.Bandwidth == "2000Mb" || fsrd.Bandwidth == "3000Mb" || fsrd.Bandwidth == "4000Mb" || fsrd.Bandwidth == "5000Mb" || fsrd.Bandwidth == "6000Mb" || fsrd.Bandwidth == "7000Mb" || fsrd.Bandwidth == "8000Mb" || fsrd.Bandwidth == "9000Mb" || fsrd.Bandwidth == "10000Mb")
                            {
                                request_fiber["spirit_nearnet"] = true;
                            }
                        }

                    } 
            else
            {
                request_fiber["spirit_nearnet"] = false;
                if (fsrd.LocationType == "OnNet")
                {
                    if (fsrd.Bandwidth == "2000Mb" || fsrd.Bandwidth == "3000Mb" || fsrd.Bandwidth == "4000Mb" || fsrd.Bandwidth == "5000Mb" || fsrd.Bandwidth == "6000Mb" || fsrd.Bandwidth == "7000Mb" || fsrd.Bandwidth == "8000Mb" || fsrd.Bandwidth == "9000Mb" || fsrd.Bandwidth == "10000Mb")
                    {
                        //Don't send cost
                    }
                    else
                    {
                        if (fsrd.Diversity == "true") {
                            //Don't send cost
                        }
                        else
                        {
                            int addc = 6000;
                            request_fiber["spirit_additionalcosts"] = new Money((decimal)Convert.ToDouble(addc));
                            int addec = 1000;
                            request_fiber["spirit_additionalequipmentcosts"] = new Money((decimal)Convert.ToDouble(addec));
                        }
                    }
                }

            }
            }
            else {
                if (fsrd.LocationType == "NearNet") {
                    request_fiber["spirit_nearnetospcosts"] = new Money((decimal)Convert.ToDouble(fsrd.LocationNearNetOspCost));
                    request_fiber["spirit_nearnetequipmentcosts"] = new Money((decimal)Convert.ToDouble(fsrd.LocationNearNetEqipmentCost));
                    request_fiber["spirit_nearnetdistanceft"] = Decimal.Parse(fsrd.LocationNearNetDistance);
                    request_fiber["spirit_nearnet"] = false;
                }
                if (fsrd.LocationType == "OnNet")
                {
                    //Don't do anything and update location
                }
            }
            //if (fsrd.LocationType == "NearNet")
            //{
            //    Debug.WriteLine(fsrd.LocationType);
            //    request_fiber["spirit_nearnetospcosts"] = new Money((decimal)Convert.ToDouble(fsrd.LocationNearNetOspCost));
            //    request_fiber["spirit_nearnetequipmentcosts"] = new Money((decimal)Convert.ToDouble(fsrd.LocationNearNetEqipmentCost));
            //    request_fiber["spirit_nearnetdistanceft"] = Decimal.Parse(fsrd.LocationNearNetDistance);
            //    request_fiber["spirit_nearnet"] = true;
            //}
            //else
            //{
            //    request_fiber["spirit_nearnet"] = false;
            //    if (fsrd.LocationType == "OnNet") {
            //        int addc = 6000;
            //        request_fiber["spirit_additionalcosts"] = new Money((decimal)Convert.ToDouble(addc));
            //        int addec = 1000;
            //        request_fiber["spirit_additionalequipmentcosts"] = new Money((decimal)Convert.ToDouble(addec));
            //    }
            //}

            if (fsrd.ClosingDate != "" && fsrd.ClosingDate != null)
            {
                Debug.WriteLine("************** fsrd.ClosingDate ==== " + fsrd.ClosingDate);
                DateTime parsedDate = DateTime.Parse(fsrd.ClosingDate);
                request_fiber["spirit_requestedcompletiondate"] = parsedDate;
            }
            //ARO ADD
            //string burried_length = (string)AROValues.SelectToken("buried_length_feet"); ARO Delete
            //string link_status = (string)AROValues.SelectToken("link_status");  ARO Delete
            //string segment_name = (string)AROValues.SelectToken("segment_name");  ARO Delete

            if (fsrd.classOfService == "Ethernet")
            {

                if (fsrd.LocationType != "OnNet" && fsrd.Diversity == "false")
                {
                    //if (link_status == "connected")   ARO Delete
                    //{
                    //    //request_fiber.Attributes["spirit_burieddistance"] = Convert.ToDecimal(burried_length);
                    //    request_fiber.Attributes["new_arodistanceft"] = Convert.ToDecimal(burried_length);
                    //    //request_fiber.Attributes["spirit_arofootage"] = Convert.ToDecimal(burried_length);
                    //    request_fiber["spirit_cityzonerural"] = new OptionSetValue((int)241870016);
                    //    request_fiber["spirit_aroconnectedsite"] = true;
                    //}

                    //if (segment_name != "")
                    //{
                    //    Debug.WriteLine("Segment name = " + segment_name);
                    //    Guid Segment_ID = getSegmentID(segment_name);
                    //    Debug.WriteLine("Segment ID = " + Segment_ID);
                    //    if (Segment_ID.ToString() != "00000000-0000-0000-0000-000000000000")
                    //    {
                    //        Entity request_location = new Entity("spirit_servicelocation");
                    //        request_location.Id = fsrd.LocationID;
                    //        request_location["spirit_fibersegment"] = new EntityReference("spirit_fibersegment", Segment_ID);
                    //        try
                    //        {
                    //            service.Update(request_location);
                    //        }
                    //        catch (Exception e)
                    //        {
                    //            Debug.WriteLine(e.Message);
                    //            return "Error Message = " + e.Message + "Error Source " + e.Source;
                    //        }
                    //    }
                    //}
                }

                //else
                //{
                //    if (segment_name != "")
                //    {
                //        Debug.WriteLine("Segment name = " + segment_name);
                //        Guid Segment_ID = getSegmentID(segment_name);
                //        Debug.WriteLine("Segment ID = " + Segment_ID);
                //        if (Segment_ID.ToString() != "00000000-0000-0000-0000-000000000000")
                //        {
                //            Entity request_location = new Entity("spirit_servicelocation");
                //            request_location.Id = fsrd.LocationID;
                //            request_location["spirit_fibersegment"] = new EntityReference("spirit_fibersegment", Segment_ID);
                //            try
                //            {
                //                service.Update(request_location);
                //            }
                //            catch (Exception e)
                //            {
                //                Debug.WriteLine(e.Message);
                //                return "Error Message = " + e.Message + "Error Source " + e.Source;
                //            }
                //        }
                //    }
                //}
            }
            //else
            //{
            //    if (segment_name != "")
            //    {
            //        Debug.WriteLine("Segment name = " + segment_name);
            //        Guid Segment_ID = getSegmentID(segment_name);
            //        Debug.WriteLine("Segment ID = " + Segment_ID);
            //        if (Segment_ID.ToString() != "00000000-0000-0000-0000-000000000000")
            //        {
            //            Entity request_location = new Entity("spirit_servicelocation");
            //            request_location.Id = fsrd.LocationID;
            //            request_location["spirit_fibersegment"] = new EntityReference("spirit_fibersegment", Segment_ID);
            //            try
            //            {
            //                service.Update(request_location);
            //            }
            //            catch (Exception e)
            //            {
            //                Debug.WriteLine(e.Message);
            //                return "Error Message = " + e.Message + "Error Source " + e.Source;
            //            }
            //        }
            //    }
            //}

            Guid fsrid = service.Create(request_fiber);

            return "Success";
        }


        //retrive segmentID
        public static Guid getSegmentID(string segmentname) {
            try
            {
                IOrganizationService service = GetCRM_Service();
                var query = new QueryExpression
                {
                    EntityName = "spirit_fibersegment",
                    ColumnSet = new ColumnSet("spirit_fibersegmentid"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("spirit_name", ConditionOperator.Equal, segmentname),

                                }
                            }
                        }
                    }
                };
                Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();
                //Debug.WriteLine("all entity account ID = " + entity.GetAttributeValue<EntityReference>("spirit_fiberrequestid").Id.ToString());
                if (entity == null)
                {
                    throw new InvalidOperationException();
                }
                Debug.WriteLine("Segment Entity ID = " + entity.Id.ToString());
                return entity.Id;
            }
            catch (InvalidOperationException exception)
            {
                Guid g = new Guid();
                return g;
            }
        }

        //retieve location guid
        public static string getLocationGuid(Guid fsrid)
        {
            try
            {
                IOrganizationService service = GetCRM_Service();
                var query = new QueryExpression
                {
                    EntityName = "spirit_fiberserviceabilityrequest",
                    ColumnSet = new ColumnSet("spirit_fiberrequestid"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("spirit_fiberserviceabilityrequestid", ConditionOperator.Equal, fsrid),

                                }
                            }
                        }
                    }
                };
                Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

                Debug.WriteLine("all entity account ID = " + entity.GetAttributeValue<EntityReference>("spirit_fiberrequestid").Id.ToString());
                if (entity == null)
                {
                    throw new InvalidOperationException();

                }
                String locationid = entity.GetAttributeValue<EntityReference>("spirit_fiberrequestid").Id.ToString();
                return locationid;

            }
            catch (InvalidOperationException exception)
            {


                return "Notfound " + exception.Message;
            }
            //return "xyz";
        }


        [System.Web.Services.WebMethod]
        public static string createTheOpportunity(aData obj)
        {
            try
            {
                Debug.WriteLine("***************************Creating New Opp fr = ");
                String UName = obj.EmployeeName;
                String AName = obj.EAccountName;
                String ANumber = obj.EAccountNumber;
                String AID = obj.EAccountID;
                String OPName = obj.EOpportunityName;
                List<String> OPTerm = obj.EOpportunityTerm;
                String OPEstimatedCloseDate = obj.EEstimaedCloseDate;
                String OPEstimatedRevenue = obj.EEstimaedRevenue;
                //String OPTerm = "1yr";
                String OPContract = obj.EOpportunityContract;
                String LocData = obj.JsonLocValue;

                //Debug.WriteLine("OP Estimated Close Date = " + OPEstimatedCloseDate);
                DateTime parsedDate = DateTime.Parse(OPEstimatedCloseDate);
               // TimeZoneInfo easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                //DateTime justDate = TimeZoneInfo.ConvertTimeFromUtc(parsedDate, easternZone);
                //var justDate = parsedDate.ToShortDateString();
               
                //Debug.WriteLine(parsedDate);
                //Debug.WriteLine("Just date = " + justDate);
                //Debug.WriteLine("OP Estimated Revenue = " + OPEstimatedRevenue);
                //string revenue = string.Format("{0:0.00}", OPEstimatedRevenue);
                //Debug.WriteLine("revenue = " + revenue);
                JavaScriptSerializer js = new JavaScriptSerializer();
                LocationDetail[] Details = js.Deserialize<LocationDetail[]>(LocData);


                Debug.WriteLine(UName + "\n " + AName + "\n " + ANumber + "\n " + AID + "\n " + OPName + "\n " + OPTerm + "\n " + LocData);
                String DetailsLengthString = Details.Length.ToString();
                Debug.WriteLine("First term from thte array " + OPTerm.First());
                int DetailsLengthInt = Convert.ToInt32(DetailsLengthString);
                Debug.WriteLine(DetailsLengthInt);


                var appDomain = ConfigurationManager.AppSettings["appDomain"];
                IOrganizationService service = GetCRM_Service();
                Guid owner_ID = GetSystemUserIdByName(UName + "@" + appDomain); //1326 cloud configuration - transition from on prim to Dynamics 365 cloud [username format change]
                Guid AccountID = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");
                Guid ContactID = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");
                Guid opportunityID = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");
                Entity request_opportunity = new Entity("opportunity");
                int saleschannelvalue = 241870001;
                int ContractValueBasedOnString = 241870000;

                if (OPContract == "New") {
                    ContractValueBasedOnString = 241870000;
                }
                if (OPContract == "Upgrade")
                {
                    ContractValueBasedOnString = 241870001;
                }
                if (OPContract == "Renewal")
                {
                    ContractValueBasedOnString = 241870002;
                }
                if (OPContract == "CoterminousAdds")
                {
                    ContractValueBasedOnString = 241870003;
                }
                if (AName == "Other")
                {
                    
                    //Create Opportunity
                    request_opportunity["name"] = OPName;
                    request_opportunity["ownerid"] = new EntityReference("systemuser", owner_ID);
                    request_opportunity["spirit_campaignrelated"] = false;
                    //request_opportunity["spirit_term"] = TermOptionSetFactory.Instanse.GetOptionSet(OPTerm.First());
                    request_opportunity["customeridtype"] = 2;
                    request_opportunity["dyncloud_saleschannel"] = new OptionSetValue((int)saleschannelvalue);
                    request_opportunity["spirit_type"] = new OptionSetValue((int)ContractValueBasedOnString);
                    request_opportunity["estimatedclosedate"] = parsedDate;
                    request_opportunity["estimatedvalue"] = new Money((decimal)Convert.ToDouble( OPEstimatedRevenue));
                    //request_opportunity["customerid"] = ContactID;
                    //request_opportunity["description"] = string.Format(
                    //    Customer_name + " " + Contact_name + " " + Contact_email + " " + Contact_phone + " " + Address + " " + Bandwidth + " " + Region + " " + Term
                    //    );
                    opportunityID = service.Create(request_opportunity);
                }
                else
                {
                    AccountID = new Guid(AID);
                    ContactID = GetContactID(AccountID);

                    Debug.WriteLine("ContactId = " + ContactID);

                    //Create Opportunity
                    request_opportunity["name"] = OPName;
                    request_opportunity["ownerid"] = new EntityReference("systemuser", owner_ID);
                    request_opportunity["spirit_campaignrelated"] = false;
                    //request_opportunity["spirit_term"] = TermOptionSetFactory.Instanse.GetOptionSet(OPTerm.First());
                    request_opportunity["customeridtype"] = 2;
                    request_opportunity["parentcontactid"] = new EntityReference("contact", ContactID);
                    request_opportunity["parentaccountid"] = new EntityReference("account", AccountID);
                    request_opportunity["dyncloud_saleschannel"] = new OptionSetValue((int)saleschannelvalue);
                     request_opportunity["spirit_type"] = new OptionSetValue((int)ContractValueBasedOnString);
                  //  request_opportunity["estimatedvalue"] = new Money((decimal)Convert.ToDouble(OPEstimatedRevenue));
                    request_opportunity["estimatedclosedate"] = parsedDate;
                    request_opportunity["estimatedvalue"] = new Money((decimal)Convert.ToDouble(OPEstimatedRevenue));
                    //request_opportunity["customerid"] = ContactID;
                    //request_opportunity["description"] = string.Format(
                    //    Customer_name + " " + Contact_name + " " + Contact_email + " " + Contact_phone + " " + Address + " " + Bandwidth + " " + Region + " " + Term
                    //    );
                    opportunityID = service.Create(request_opportunity);

                }


                Guid ServiceLocationIDA = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");
                for (int i = 0; i < DetailsLengthInt; i++)
                {

                    String[] AddressSplit = Details[i].LocationAddress.Split(',');
                    String StreetAddress = AddressSplit[0].Trim();
                    String City = AddressSplit[1].Trim();
                    String State = AddressSplit[2].Trim();
                    String stateShortRepresentation = "";
                    if (State.Length == 2) {
                        stateShortRepresentation = State;
                    }
                    else { 
                        stateShortRepresentation = GetStateByName(State);
                    }

                    String Zipcode = AddressSplit[3].Trim();
                    String[] LatLongSplit = Details[i].LocationLatLong.Split(',');
                    String LatitudeLocation = LatLongSplit[0].Trim();
                    String LongitudeLocation = LatLongSplit[1].Trim();
                    
                    if (String.IsNullOrEmpty(StreetAddress) || String.IsNullOrEmpty(City) || String.IsNullOrEmpty(stateShortRepresentation) || String.IsNullOrEmpty(Zipcode))
                    {
                        StreetAddress = "1500 Hampton Street";
                        City = "Columbia";
                        stateShortRepresentation = "SC";
                        Zipcode = "29201";
                    }
                    if (Details[i].ID == "0")
                    {
                        Debug.WriteLine("*****************A Location *********************************************");

                        ServiceLocationIDA = createNewServiceLocation(owner_ID, opportunityID, Details[i].LocationName, Details[i].LocationType,
                            StreetAddress, City, stateShortRepresentation, Zipcode, Details[i].LocationNpanxx,
                            LatitudeLocation, LongitudeLocation, Details[i].LocationProduct, Details[i].LocationDiversity);
                        if (Details[i].LocationFiber == "True")
                        {

                            Debug.WriteLine("Fiber Checked");
                            var request_fiber = new Entity("spirit_fiberserviceabilityrequest");
                            if (Details[i].LocationBandwidth == "0Mb")
                            {


                                //request_fiber["spirit_name"] = Details[i].LocationName + " @" + StreetAddress;
                            }
                            else
                            {
                                request_fiber["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(Details[i].LocationBandwidth);
                               // request_fiber["spirit_name"] = Details[i].LocationBandwidth + " for " + Details[i].LocationName + " @" + StreetAddress;
                            }
                            if (Details[i].LocationDiversity == "True")
                            {
                                request_fiber["spirit_diverse"] = true;
                            }
                            if (Details[i].LocationDiversity == "False")
                            {
                                request_fiber["spirit_diverse"] = false;
                            }
                            //request_fiber["spirit_name"] = Bandwidth + " for " + SLAZ + " @" + StreetZ;
                            request_fiber["ownerid"] = new EntityReference("systemuser", owner_ID);
                            request_fiber["spirit_region"] = RegionOptionSetFactory.Instanse.GetOptionSet(Details[i].LocationRegion);
                            //request_fiber["spirit_termglobal"] = TermOptionSetFactory.Instanse.GetOptionSet(OPTerm.First());
                            request_fiber["spirit_opportunity"] = new EntityReference("opportunity", opportunityID);
                            //request_fiber["spirit_fiberrequestid"] = new EntityReference("spirit_servicelocation", ServiceLocationIDZ);
                            request_fiber["spirit_fiberrequestid2"] = new EntityReference("spirit_servicelocation", ServiceLocationIDA);
                            service.Create(request_fiber);
                        }
                        if (Details[i].LocationEoc == "True")
                        {
                            Debug.WriteLine("Eoc Checked");
                            var request_eoc = new Entity("spirit_eocserviceabilityrequest");
                            if (Details[i].LocationBandwidth == "0Mb")
                            {
                               // request_eoc["spirit_name"] = Details[i].LocationName + " @" + StreetAddress;
                            }
                            else
                            {
                                //request_eoc["spirit_bandwidth"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(Details[i].LocationBandwidth);
                                //request_eoc["spirit_name"] = Details[i].LocationBandwidth + " for " + Details[i].LocationName + " @" + StreetAddress;
                            }
                            //request_fiber["spirit_name"] = Bandwidth + " for " + SLAZ + " @" + StreetZ;
                            request_eoc["ownerid"] = new EntityReference("systemuser", owner_ID);
                            request_eoc["spirit_opportunity"] = new EntityReference("opportunity", opportunityID);
                            //request_fiber["spirit_fiberrequestid"] = new EntityReference("spirit_servicelocation", ServiceLocationIDZ);
                            request_eoc["spirit_eocavailabilityforservicelocatiid2"] = new EntityReference("spirit_servicelocation", ServiceLocationIDA);
                            service.Create(request_eoc);
                        }
                        if (Details[i].LocationOffnet == "True")
                        {
                            Debug.WriteLine("Offnet Checked");
                            for (int jj = 0; jj < OPTerm.Count; jj++) { 
                                var request_offnet = new Entity("spirit_offnetserviceabilityrequest");
                                if (Details[i].LocationBandwidth == "0Mb")
                                {
                                //    request_offnet["spirit_name"] = Details[i].LocationName + " @" + StreetAddress;
                                }
                                else
                                {
                                    request_offnet["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(Details[i].LocationBandwidth);
                                    //  request_offnet["spirit_name"] = Details[i].LocationBandwidth + " for " + Details[i].LocationName + " @" + StreetAddress;
                                }
                                //request_fiber["spirit_name"] = Bandwidth + " for " + SLAZ + " @" + StreetZ;
                                request_offnet["ownerid"] = new EntityReference("systemuser", owner_ID);
                                request_offnet["spirit_region"] = RegionOptionSetFactory.Instanse.GetOptionSet(Details[i].LocationRegion);
                                TermEntity termEntity = new TermEntity();
                                Guid termGuid = termEntity.retrieveTerm(OPTerm[jj]);
                                if (termGuid != new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00"))
                                {
                                    request_offnet["cloud_term"] = new EntityReference("cpq_term", termGuid);
                                }
                                //request_offnet["spirit_termglobal"] = TermOptionSetFactory.Instanse.GetOptionSet(OPTerm[jj]);
                                request_offnet["spirit_opportunity"] = new EntityReference("opportunity", opportunityID);
                                //request_fiber["spirit_fiberrequestid"] = new EntityReference("spirit_servicelocation", ServiceLocationIDZ);
                                request_offnet["spirit_offnetrequestid2"] = new EntityReference("spirit_servicelocation", ServiceLocationIDA);
                                service.Create(request_offnet);
                            }
                        }
                    }
                    else
                    {
                        Guid ServiceLocationIDZ = createNewServiceLocation(owner_ID, opportunityID, Details[i].LocationName, Details[i].LocationType,
                            StreetAddress, City, stateShortRepresentation, Zipcode, Details[i].LocationNpanxx,
                            LatitudeLocation, LongitudeLocation, Details[i].LocationProduct, Details[i].LocationDiversity);
                        if (Details[i].LocationFiber == "True")
                        {
                            Debug.WriteLine("Fiber Checked");
                            var request_fiber = new Entity("spirit_fiberserviceabilityrequest");
                            if (Details[i].LocationBandwidth == "0Mb")
                            {
                              //  request_fiber["spirit_name"] = Details[i].LocationName + " @" + StreetAddress;
                            }
                            else
                            {
                                String bandwid = Details[i].LocationBandwidth;
                                Debug.WriteLine(bandwid);
                               // var b = Convert.ToInt32(BandwidthOptionSetFactory.Instanse.GetOptionSet(bandwid));
                                //Debug.WriteLine(b);
                                request_fiber["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(bandwid);
                                //  request_fiber["spirit_name"] = Details[i].LocationBandwidth + " for " + Details[i].LocationName + " @" + StreetAddress;
                            }
                            if (Details[i].LocationDiversity == "True")
                            {
                                request_fiber["spirit_diverse"] = true;
                            }
                            if (Details[i].LocationDiversity == "False")
                            {
                                request_fiber["spirit_diverse"] = false;
                            }
                                //request_fiber["spirit_name"] = Bandwidth + " for " + SLAZ + " @" + StreetZ;
                                request_fiber["ownerid"] = new EntityReference("systemuser", owner_ID);
                            request_fiber["spirit_region"] = RegionOptionSetFactory.Instanse.GetOptionSet(Details[i].LocationRegion);
                            //request_fiber["spirit_termglobal"] = TermOptionSetFactory.Instanse.GetOptionSet(OPTerm.First());
                            request_fiber["spirit_opportunity"] = new EntityReference("opportunity", opportunityID);
                            request_fiber["spirit_fiberrequestid"] = new EntityReference("spirit_servicelocation", ServiceLocationIDZ);
                            request_fiber["spirit_fiberrequestid2"] = new EntityReference("spirit_servicelocation", ServiceLocationIDA);
                            service.Create(request_fiber);
                        }
                        if (Details[i].LocationEoc == "True")
                        {
                            Debug.WriteLine("Eoc Checked");
                            var request_eoc = new Entity("spirit_eocserviceabilityrequest");
                            if (Details[i].LocationBandwidth == "0Mb")
                            {
                             //   request_eoc["spirit_name"] = Details[i].LocationName + " @" + StreetAddress;
                            }
                            else
                            {
                               // request_eoc["spirit_bandwidth"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(Details[i].LocationBandwidth);
                                //    request_eoc["spirit_name"] = Details[i].LocationBandwidth + " for " + Details[i].LocationName + " @" + StreetAddress;
                            }
                            //request_fiber["spirit_name"] = Bandwidth + " for " + SLAZ + " @" + StreetZ;
                            request_eoc["spirit_opportunity"] = new EntityReference("opportunity", opportunityID);
                            request_eoc["ownerid"] = new EntityReference("systemuser", owner_ID);
                            request_eoc["spirit_eocavailabilityforservicelocatiid"] = new EntityReference("spirit_servicelocation", ServiceLocationIDZ);
                            request_eoc["spirit_eocavailabilityforservicelocatiid2"] = new EntityReference("spirit_servicelocation", ServiceLocationIDA);
                            service.Create(request_eoc);
                        }
                        if (Details[i].LocationOffnet == "True")
                        {
                            Debug.WriteLine("Offnet Checked");
                            for(int kk=0; kk< OPTerm.Count; kk++) { 
                                var request_offnet = new Entity("spirit_offnetserviceabilityrequest");
                                if (Details[i].LocationBandwidth == "0Mb")
                                {
                                  //  request_offnet["spirit_name"] = Details[i].LocationName + " @" + StreetAddress;
                                }
                                else
                                {

                                    request_offnet["spirit_bandwidthrequested"] = BandwidthOptionSetFactory.Instanse.GetOptionSet(Details[i].LocationBandwidth);
                                    //request_offnet["spirit_name"] = Details[i].LocationBandwidth + " for " + Details[i].LocationName + " @" + StreetAddress;
                                }
                                TermEntity termEntity = new TermEntity();
                                Guid termGuid = termEntity.retrieveTerm(OPTerm[kk]);
                                if (termGuid != new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00"))
                                {
                                    request_offnet["cloud_term"] = new EntityReference("cpq_term", termGuid);
                                }

                                //request_fiber["spirit_name"] = Bandwidth + " for " + SLAZ + " @" + StreetZ;
                                request_offnet["ownerid"] = new EntityReference("systemuser", owner_ID);
                                request_offnet["spirit_region"] = RegionOptionSetFactory.Instanse.GetOptionSet(Details[i].LocationRegion);
                                //request_offnet["spirit_termglobal"] = TermOptionSetFactory.Instanse.GetOptionSet(OPTerm[kk]);
                                request_offnet["spirit_opportunity"] = new EntityReference("opportunity", opportunityID);
                                request_offnet["spirit_offnetrequestid"] = new EntityReference("spirit_servicelocation", ServiceLocationIDZ);
                                request_offnet["spirit_offnetrequestid2"] = new EntityReference("spirit_servicelocation", ServiceLocationIDA);
                                service.Create(request_offnet);
                            }
                        }
                    }
                }

                String x = "acb";
                return x;
            }
            catch (Exception ex) {
                Debug.WriteLine(ex.Message);
                Debug.WriteLine(ex.Source);

                String x = "Wrong";
                return x;
            }
        }

        // Get Service Here
        public static IOrganizationService GetCRM_Service()
        {
            //1326 cloud configuration
            // - transition from on prim to Dynamics 365 cloud
            //***************************************Start**************************************
            Uri organizationUri = new Uri(ConfigurationManager.AppSettings["organizationUri"]);
            String clientId = ConfigurationManager.AppSettings["clientId"];
            String clientSecret = ConfigurationManager.AppSettings["clientSecret"];

            try
            {
                //Create the Dynamics 365 Connection:
                Console.WriteLine("Connecting to Dynamics 365 Server...");
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;  //to prevent currentAccesstoken error
                CrmServiceClient service = new CrmServiceClient($@"AuthType=ClientSecret;url={organizationUri};ClientId={clientId};ClientSecret={clientSecret}");
                return service.OrganizationWebProxyClient != null ? service.OrganizationWebProxyClient : (IOrganizationService)service.OrganizationServiceProxy;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while connecting to Dynamics 365 Server " + ex.Message);
                Console.ReadKey();
                return null;
            }
            //***************************************End**************************************
        }

        // Create New Service Location(custom entity)
        public static Guid createNewServiceLocation(Guid Owner_ID, Guid opportunityId, String Service_Location, String LocationType, String Street, String City, String State, String Code,
            String npanxx, String lat, string longi, String Product, String Diversity)
        {
            IOrganizationService service = GetCRM_Service();

            var locationUrl = ConfigurationManager.AppSettings["locationUrl"];
            var location_link = locationUrl
                            + "&marker="
                                + longi + ";" 
                                + lat 
                                + ";&level=18";

            Debug.WriteLine("Here");
            Debug.WriteLine("********** Diversity *****" + Diversity);
           // Debug.WriteLine(Service_Location + " " + Street + " " + City + " " + State + " " + Code);
            // var OwnerID = "12345KIPS__6789";
            var request_sla = new Entity("spirit_servicelocation");
            request_sla["spirit_businessname"] = Service_Location;
            request_sla["ownerid"] = new EntityReference("systemuser", Owner_ID);
            Debug.WriteLine("Street for Servicer Location ***** = " + Street);
            Debug.WriteLine(LocationType);
            if (LocationType == "New")
            {
                int Lvalue = 241870000;
                Debug.WriteLine(Lvalue);
                request_sla["spirit_locationtype"] = new OptionSetValue((int)Lvalue);
            }
            else {
                int Lvalue = 241870001;
                request_sla["spirit_locationtype"] = new OptionSetValue((int)Lvalue);
            }
            request_sla["spirit_street1"] = Street;
            request_sla["spirit_city"] = City;
            request_sla["spirit_servicelocationforopportunityid"] = new EntityReference("opportunity", opportunityId);
            request_sla["spirit_state"] = State;
            request_sla["spirit_postalcode"] = Code;
            request_sla["spirit_npanxx"] = npanxx;
            request_sla["spirit_esrilatitude"] = lat;
            request_sla["spirit_esrilongitude"] = longi;
            request_sla["spirit_locationlink"] = location_link; //enviromentVariableRemoval
            Debug.WriteLine("Diversity in the location =" + Diversity);
            if(Diversity == "True") { 
                request_sla["spirit_diverse"] = true;
            }
            if (Diversity == "False")
            {
                request_sla["spirit_diverse"] = false;
            }
            //request_sla["spirit_spiritproduct"] = new EntityReference("product", productID);
            if (Product == "Dark Fiber") {
                int valueP = 241870004;
                request_sla["spirit_carrierproduct"] = new OptionSetValue((int)valueP); 
            }
            else if(Product == "EPL"){
                int valueP = 241870001;
                request_sla["spirit_carrierproduct"] = new OptionSetValue((int)valueP);             
            }
            else if (Product == "EVPL")
            {
                int valueP = 241870002;
                request_sla["spirit_carrierproduct"] = new OptionSetValue((int)valueP);
            }
            else if (Product == "DIA")
            {
                int valueP = 241870003;
                request_sla["spirit_carrierproduct"] = new OptionSetValue((int)valueP);
            }
            else if (Product == "Transport/Back Haul")
            {
                int valueP = 241870000;
                request_sla["spirit_carrierproduct"] = new OptionSetValue((int)valueP);
            }
            Guid serviceLocationID = service.Create(request_sla);
            //          request["ownerid"] = new EntityReference("systemuser", OwnerID);
            Debug.WriteLine("New Service Location Created with Service Location ID = " + serviceLocationID);
            return serviceLocationID;
        }

        //Get Contact ID from an account
        public static Guid GetContactID(Guid Acc_ID)
        {
            IOrganizationService service = GetCRM_Service();
            Debug.WriteLine("Inside Account ID Account Number = " + Acc_ID);
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "contact",
                    ColumnSet = new ColumnSet("contactid"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("parentcustomerid", ConditionOperator.Equal, Acc_ID)
                                }
                            }
                        }
                    }
                };
                //       Console.WriteLine(ColumnSet);
                Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

                if (entity == null)
                {
                    throw new InvalidOperationException();
                }
                return entity.Id;
            }
            catch (InvalidOperationException exception)
            {
                Guid g = new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00");
                // entity.Id = g;
                // Debug.WriteLine("New GUid check " + entity.Id);
                return g;
            }
            //            Debug.WriteLine(entity.Id);
        }

        // Get system user ID by name
        public static Guid GetSystemUserIdByName(string userName)
        {

            IOrganizationService service = GetCRM_Service();

             var query = new QueryExpression
            {
                EntityName = "systemuser",
                ColumnSet = new ColumnSet("systemuserid"),

                Criteria = new FilterExpression
                {
                    Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("domainname", ConditionOperator.Equal, userName)
                                }
                            }
                        }
                }
            };
            //       Console.WriteLine(ColumnSet);
            Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

            if (entity == null)
                Debug.Write("Whats the user name in her {0} \n", userName);

            //       throw new InvalidOperationException(string.Format("Cannot find User in CRM for {0}", userName));
            //     Debug.WriteLine(userName + " ************************ " + entity.Id);
            //Debug.WriteLine(entity.Id);
            return entity.Id;
        }

        // Get all the account using the owner ID
        public static List<string> GetAccountID(Guid ownerID)
        {
            Debug.WriteLine("OwnerId = " + ownerID);
            IOrganizationService service = GetCRM_Service();
            List<String> xyz = new List<string>();
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "account",
                    ColumnSet = new ColumnSet("accountid", "name", "accountnumber", "statuscode"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("ownerid", ConditionOperator.Equal, ownerID),
                                    new ConditionExpression("statuscode", ConditionOperator.Equal, 1),
                                    //new ConditionExpression("accountnumber",ConditionOperator.NotNull),
                                   
                                }
                            }
                        }
                    }
                };
                query.AddOrder("name", OrderType.Ascending);
                //       Console.WriteLine(ColumnSet);
                
                //Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

                List<Entity> entity = service.RetrieveMultiple(query).Entities.ToList<Entity>();
                
                    for (int i = 0; i < entity.Count; i++)
                    {
                        
                        Debug.WriteLine("all entity account ID = " + entity[i].Attributes["accountid"]);
                        Debug.WriteLine("all the entity" + entity[i].Attributes["name"]);
                        String name = Convert.ToString(entity[i].Attributes["name"]);
                        String accountID = Convert.ToString(entity[i].Attributes["accountid"]);
                        string accountNumber = "";
                       //if (entity[i].Attributes["accountnumber"] != null && (entity[i].Attributes
                        if (entityNullCatchStringValue(entity[i], "accountnumber") != "")
                        {
                            Debug.WriteLine("all the entity Account number " + Convert.ToString(entity[i].Attributes["accountnumber"]));
                        accountNumber = Convert.ToString(entity[i].Attributes["accountnumber"]);
                        }
                        else
                        {
                            accountNumber = "NA";
                        }

                        String dummyString = String.Join("@@@$$$", name, accountNumber, accountID);
                        xyz.Add(dummyString);

                    }
                                
                if (entity == null)
                {
                    throw new InvalidOperationException();

                }
                Debug.WriteLine("All the account ID = " + entity.Count);
                return xyz;

            }
            catch (InvalidOperationException exception)
            {

                xyz.Add("zzxasfsfsd");
                return xyz;
            }
        }


        private static string entityNullCatchStringValue(Entity entity, string type)
        {
            try
            {
                return (string)entity[type];
            }
            catch (Exception e)
            {
                return "";
            }
        }
        //All the Location Info 
        public static List<LocationInfo> GetLocationForOpp(Guid id) {
            var list_loc_info = new List<LocationInfo>();
            IOrganizationService service = GetCRM_Service();
            
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "spirit_servicelocation",
                    ColumnSet = new ColumnSet("spirit_servicelocationid", "spirit_addressmerged", "spirit_businessname", "spirit_locationtype", "spirit_sourcelocation", "cloud_addressmerged"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("spirit_servicelocationforopportunityid", ConditionOperator.Equal, id),
                                   

                                }
                            }
                        }
                    }
                };
                query.AddOrder("spirit_businessname", OrderType.Ascending);
                //int x = 10;
                //Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();

                List<Entity> entity = service.RetrieveMultiple(query).Entities.ToList<Entity>();
                for (int i = 0; i < entity.Count; i++)
                {
                    //Debug.WriteLine("all entity account ID = " + entity[i].Attributes["spirit_servicelocationid"]);
                    //Debug.WriteLine("all the entity" + entity[i].Attributes["spirit_addressmerged"]);
                    String name;
                    try
                    {
                        name = Convert.ToString(entity[i].Attributes["spirit_businessname"]);
                        //throw new KeyNotFoundException();
                    }
                    catch (KeyNotFoundException ) {
                        name = "Name Not Present";
                    }


                    Guid LocID = entity[i].Id;
                    //String address = Convert.ToString(entity[i].Attributes["spirit_addressmerged"]);
                    String address = Convert.ToString(entity[i].Attributes["cloud_addressmerged"]);
                    String locationtype;
                    try
                    {
                        locationtype = ((Microsoft.Xrm.Sdk.OptionSetValue)(entity[i].Attributes["spirit_locationtype"])).Value.ToString();


                        //Convert.ToString(entity[i].Attributes["spirit_locationtype"].ToString());
                        
                        //throw new KeyNotFoundException();
                    }
                    catch(KeyNotFoundException) {
                        locationtype = "No Location Type";
                    }
                    Boolean isSource = false;
                    try {
                       var x =  entity[i].Attributes["spirit_sourcelocation"].ToString();
                        if (x == "True") {
                            isSource = true;
                        }
                        else
                        {
                            isSource = false;
                        }
                        Debug.WriteLine(isSource);
                    }
                    catch (KeyNotFoundException)
                    {
                        isSource = false;
                    }
                    Debug.WriteLine("isSourece === " , isSource);
                    var l1 = new LocationInfo();
                    l1.name = name;
                    l1.id = LocID;
                    l1.locAddress = address;
                    l1.locationtype = locationtype;
                    l1.isSourecLoc = isSource;
                    list_loc_info.Add(l1);

                }
                if (entity == null)
                {
                    throw new InvalidOperationException();

                }
               // Debug.WriteLine("All the account ID = " + entity.Count);
                //return list_loc_info;

            }
            catch (InvalidOperationException)
            {

                //xyz.Add("zzxasfsfsd");
                return list_loc_info;
            }
            return list_loc_info;
        }


        //ARO code - enviromentVariableRemoval
        //private static string baseURL = "https://segra-test.aro.altvil.com";
        //private static string baseURL = "https://lumos.aro.altvil.com";
        private static string baseURL = ConfigurationManager.AppSettings["baseURL"];

        public static string getPlainId(string accessToken, string data)
        {
            try
            {
            var request = (HttpWebRequest)WebRequest.Create(baseURL + "/api-ext/rfp/v1/process");
            byte[] data1 = Encoding.ASCII.GetBytes(data);
            Debug.WriteLine(data);
            request.Method = "POST";
            request.PreAuthenticate = true;
            request.Headers.Add("Authorization", "Bearer " + accessToken);
            request.ContentType = "application/json";
            request.Timeout = 500000;
            request.ReadWriteTimeout = 3200000;
            request.ContentLength = data1.Length;
            using (var stream = request.GetRequestStream())
            {
                stream.Write(data1, 0, data1.Length);
            }
            var response = (HttpWebResponse)request.GetResponse();
            string planId = "";
            using (var responseString = new StreamReader(response.GetResponseStream()))
            {
                JObject jsonObject = JObject.Parse(responseString.ReadToEnd());
                planId = (string)jsonObject.GetValue("planId");
                Debug.WriteLine("planID === ", planId);
            }
            //var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();            
            response.Close();
            return planId;
            }
            catch (Exception e)
            {
                return "Exception = Message = " + e.Message + " Source = " + e.Source;
            }
        }

        //public static string getIndividualReport(string planId, string reportId, string accessToken)
        //{
        //    try
        //    {
        //        var request = (HttpWebRequest)WebRequest.Create(baseURL + "/api-ext/rfp/v1/" + planId + "/report/" + reportId + ".json");
        //        request.Method = "GET";
        //        request.PreAuthenticate = true;
        //        request.Headers.Add("Authorization", "Bearer " + accessToken);
        //        var response = (HttpWebResponse)request.GetResponse();
        //        var rString = "";
        //        using (var responseString = new StreamReader(response.GetResponseStream()))
        //        {
        //            rString = responseString.ReadToEnd();
        //        }
        //        //var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
        //        response.Close();
        //        return rString;
        //    }
        //    catch (Exception e)
        //    {
        //        return "Exception = Message = " + e.Message + " Source = " + e.Source;
        //    }
        //}

public static string GetStateByName(string name)
    {
    switch (name.ToUpper())
    {
        case "ALABAMA":
            return "AL";

        case "ALASKA":
            return "AK";

        case "AMERICAN SAMOA":
            return "AS";

        case "ARIZONA":
            return "AZ";

        case "ARKANSAS":
            return "AR";

        case "CALIFORNIA":
            return "CA";

        case "COLORADO":
            return "CO";

        case "CONNECTICUT":
            return "CT";

        case "DELAWARE":
            return "DE";

        case "DISTRICT OF COLUMBIA":
            return "DC";

        case "FEDERATED STATES OF MICRONESIA":
            return "FM";

        case "FLORIDA":
            return "FL";

        case "GEORGIA":
            return "GA";

        case "GUAM":
            return "GU";

        case "HAWAII":
            return "HI";

        case "IDAHO":
            return "ID";

        case "ILLINOIS":
            return "IL";

        case "INDIANA":
            return "IN";

        case "IOWA":
            return "IA";

        case "KANSAS":
            return "KS";

        case "KENTUCKY":
            return "KY";

        case "LOUISIANA":
            return "LA";

        case "MAINE":
            return "ME";

        case "MARSHALL ISLANDS":
            return "MH";

        case "MARYLAND":
            return "MD";

        case "MASSACHUSETTS":
            return "MA";

        case "MICHIGAN":
            return "MI";

        case "MINNESOTA":
            return "MN";

        case "MISSISSIPPI":
            return "MS";

        case "MISSOURI":
            return "MO";

        case "MONTANA":
            return "MT";

        case "NEBRASKA":
            return "NE";

        case "NEVADA":
            return "NV";

        case "NEW HAMPSHIRE":
            return "NH";

        case "NEW JERSEY":
            return "NJ";

        case "NEW MEXICO":
            return "NM";

        case "NEW YORK":
            return "NY";

        case "NORTH CAROLINA":
            return "NC";

        case "NORTH DAKOTA":
            return "ND";

        case "NORTHERN MARIANA ISLANDS":
            return "MP";

        case "OHIO":
            return "OH";

        case "OKLAHOMA":
            return "OK";

        case "OREGON":
            return "OR";

        case "PALAU":
            return "PW";

        case "PENNSYLVANIA":
            return "PA";

        case "PUERTO RICO":
            return "PR";

        case "RHODE ISLAND":
            return "RI";

        case "SOUTH CAROLINA":
            return "SC";

        case "SOUTH DAKOTA":
            return "SD";

        case "TENNESSEE":
            return "TN";

        case "TEXAS":
            return "TX";

        case "UTAH":
            return "UT";

        case "VERMONT":
            return "VT";

        case "VIRGIN ISLANDS":
            return "VI";

        case "VIRGINIA":
            return "VA";

        case "WASHINGTON":
            return "WA";

        case "WEST VIRGINIA":
            return "WV";

        case "WISCONSIN":
            return "WI";

        case "WYOMING":
            return "WY";
    }

    throw new Exception("Not Available");
}

    }
}