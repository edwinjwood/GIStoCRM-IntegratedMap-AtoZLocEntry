using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.ServiceModel;
using System.ServiceModel.Description;
using Microsoft.VisualBasic;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using Microsoft.Xrm.Tooling.Connector;
using Microsoft.Xrm.Sdk;


using System.Web.UI.WebControls.WebParts;

// These namespaces are found in the Microsoft.Xrm.Sdk.dll assembly
// found in the SDK\bin folder.
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

namespace CarrierEsriToDynamics
{
    public partial class index : System.Web.UI.Page
    {
        public static Uri HomeRealmUri { get; private set; }
        public static ClientCredentials DeviceCredentials { get; private set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            //String name = System.Web.HttpContext.Current.User.Identity.Name;
            //Debug.WriteLine("name = " + name);
            // Getting the Username from the active directory.
            String username = "deepak.begrajka";
            
            try
            {
                using (var context = new PrincipalContext(ContextType.Domain))
                {

                    UserPrincipal principal = null;
                    
                    if (User.Identity.Name != null)
                    {

                        using (principal = UserPrincipal.FindByIdentity(context, User.Identity.Name))
                        {
                            if (principal != null)
                            {
                                Debug.WriteLine(" User.Identity.Name = " + User.Identity.Name);
                                var firstName = principal.GivenName;
                                var lastName = principal.Surname;                               
                                var Phone = principal.VoiceTelephoneNumber.ToString();                               
                                var Email = principal.EmailAddress;
                                username = principal.SamAccountName;
                                name.InnerText = firstName + " " + lastName; 
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
                    else{
                        username = "deepak.begrajka";
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }


                IOrganizationService service = GetCRM_Service();

                String UName = "SC_NET\\" + username;
                Guid owner_ID = GetSystemUserIdByName(UName);
                Debug.WriteLine("OWNER ID = " + owner_ID);

                List<string> account_name = GetAccountID(owner_ID);
                int i = 0;
               
                List<string> Aname = new List<string>();
                List<string> Anumber = new List<string>();
                List<string> AId = new List<string>();
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
                    i++;
                }
                if (!Page.IsPostBack)
                {
                    ddl1.DataSource = LocationofData;
                    ddl1.DataBind();

                    //first item in the list
                    //ddl1.Items.Insert(0, new ListItem("-- Select--", ""));
                    
                    int ix = 0;

                    for (int xz = 0; xz < Aname.Count; xz++ )
                    {
                        //Debug.WriteLine("Account Name = " + o);
                        String namex = Aname[xz];
                        String numberx = Anumber[xz];
                        String Id = AId[xz];
                        ddl1.Items.Insert(ix, new ListItem(namex + " -- " + numberx, namex + "$$" + numberx + "$$" + Id));
                        ix++;
                    }
                    ddl1.Items.Insert(ix, new ListItem("Other"));
                }

//  accountName.Items.Add(new ListItems("z", "ssdsd"));
        }
        public static IOrganizationService GetCRM_Service()
        {
            Uri organizationUri = new Uri(ConfigurationManager.AppSettings["organizationUri"]);
            String clientId = ConfigurationManager.AppSettings["clientId"];
            String clientSecret = ConfigurationManager.AppSettings["clientSecret"];
            String domain = ConfigurationManager.AppSettings["domain"];

            try
            {
                //Create the Dynamics 365 Connection:
                Console.WriteLine("Connecting to Dynamics 365 Server...");
                CrmServiceClient service = new CrmServiceClient($@"AuthType=ClientSecret;url={organizationUri};ClientId={clientId};ClientSecret={clientSecret}");
                return service.OrganizationWebProxyClient != null ? service.OrganizationWebProxyClient : (IOrganizationService)service.OrganizationServiceProxy;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while connecting to Dynamics 365 Server " + ex.Message);
                Console.ReadKey();
                return null;
            }
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
                Debug.Write("Whats the yser name in her {0} \n", userName);

            //       throw new InvalidOperationException(string.Format("Cannot find User in CRM for {0}", userName));
            //     Debug.WriteLine(userName + " ************************ " + entity.Id);
            //Debug.WriteLine(entity.Id);
            return entity.Id;
        }

        // Get all the account using the owner ID
        public static List<string> GetAccountID(Guid ownerID) {
            IOrganizationService service = GetCRM_Service();
            List<String> xyz = new List<string>();
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "account",
                    ColumnSet = new ColumnSet("accountid","name","accountnumber"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                        {
                            new FilterExpression
                            {
                                Conditions =
                                {
                                    new ConditionExpression("ownerid", ConditionOperator.Equal, ownerID)
                                }
                            }
                        }
                    }
                };
                //       Console.WriteLine(ColumnSet);
                 
                int x =10;
                //Entity entity = service.RetrieveMultiple(query).Entities.FirstOrDefault();
                List <Entity> entity = service.RetrieveMultiple(query).Entities.ToList<Entity>();
                for (int i = 0; i < entity.Count; i++)
                {
                    Debug.WriteLine("all entity account ID = " + entity[i].Attributes["accountid"]);
                    Debug.WriteLine("all the entity" + entity[i].Attributes["name"]);
                    Debug.WriteLine("all the entity Account number " + entity[i].Attributes["accountnumber"]);
                    String name = Convert.ToString( entity[i].Attributes["name"]);
                    String accountID =  Convert.ToString(entity[i].Attributes["accountid"]);
                    String accountNumber = Convert.ToString(entity[i].Attributes["accountnumber"]);
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
            catch (InvalidOperationException exception )
            {
               
                xyz.Add("zzxasfsfsd");
                return xyz;
            }
        }

        public object LocationofData { get; set; }

        protected void Unnamed_Command(object sender, CommandEventArgs e)
        {
            var DropDownListValue = ddl1.Text;
            String DropDV = ddl1.SelectedValue.ToString();
            Debug.WriteLine("DropDownListValue ====  " + DropDownListValue);
            Debug.WriteLine("DropDownListValue ====  " + DropDV);
            Response.Redirect("map.aspx?Account=" + DropDownListValue, false);
        }
    }
}