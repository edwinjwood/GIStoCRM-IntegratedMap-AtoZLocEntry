using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;

namespace CarrierEsriToDynamics
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class LookUpUser : System.Web.Services.WebService
    {

        [WebMethod]
        public bool lookUpUserRecord(String name)
        {
            var appDomain = ConfigurationManager.AppSettings["appDomain"];
            string domainname = name + "@"+ appDomain; //1326 cloud configuration - transition from on prim to Dynamics 365 cloud [username format change]
            IOrganizationService service = map.GetCRM_Service();
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "systemuser",
                    ColumnSet = new ColumnSet("domainname"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                    {
                        new FilterExpression
                        {
                            Conditions =
                            {
                                new ConditionExpression("domainname", ConditionOperator.Equal, domainname),
                            }
                        }
                    }
                    }
                };
                Entity entity = service.RetrieveMultiple(query).Entities.First<Entity>();
                if (entity == null)
                {
                    throw new InvalidOperationException();
                }
                return true;
            }
            catch (InvalidOperationException)
            {
                return false;
            }
        }
        [WebMethod]
        public bool checkUserRole(string name)
        {
            Debug.WriteLine("Check User Name =  " + name);
            Guid systemUserId = getSystemUserID(name);
            if(systemUserId != new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00"))
            {
                List<Guid> roleId = getUserRoleId(systemUserId);
                Debug.WriteLine("get role ID =  " + roleId);
                if (roleId.Count > 0)
                {
                    for(int i = 0; i< roleId.Count; i++)
                    {
                        bool ifPresent = getSystemUserRole(roleId[i]);
                        if (ifPresent) return true;
                    }
                    return false;
                }
                else return false;
            }
            return false;
        }  

        private Guid getSystemUserID(string name)
        {
            var appDomain = ConfigurationManager.AppSettings["appDomain"];
            string domainname = name + "@" + appDomain; //1326 cloud configuration - transition from on prim to Dynamics 365 cloud [username format change]
            IOrganizationService service = map.GetCRM_Service();
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "systemuser",
                    ColumnSet = new ColumnSet("domainname"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                    {
                        new FilterExpression
                        {
                            Conditions =
                            {
                                new ConditionExpression("domainname", ConditionOperator.Equal, domainname),
                            }
                        }
                    }
                    }
                };
                Entity entity = service.RetrieveMultiple(query).Entities.First<Entity>();
                if (entity == null)
                {
                    throw new InvalidOperationException();
                }
                return entity.Id;
            }
            catch (InvalidOperationException)
            {
                return new Guid("11223344-5566-7788-99AA-BBCCDDEEFF00"); 
            }
        }

        private List<Guid> getUserRoleId(Guid systemUserId)
        {
            List<Guid> role = new List<Guid>();
            IOrganizationService service = map.GetCRM_Service();
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "systemuserroles",
                    ColumnSet = new ColumnSet("systemuserid", "roleid"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                    {
                        new FilterExpression
                        {
                            Conditions =
                            {
                                new ConditionExpression("systemuserid", ConditionOperator.Equal, systemUserId),
                            }
                        }
                    }
                    }
                };
                List<Entity> entity = service.RetrieveMultiple(query).Entities.ToList<Entity>();
                if (entity == null)
                {
                    throw new InvalidOperationException();
                }
                for (int i = 0; i < entity.Count; i++)
                {
                    Guid roleId = Guid.Parse(entity[i].Attributes["roleid"].ToString());
                    role.Add(roleId);
                }
                return role;
            }
            catch (InvalidOperationException)
            {
                return role;
            }
        }

        private bool getSystemUserRole(Guid roleId)
        {
            IOrganizationService service = map.GetCRM_Service();
            try
            {
                var query = new QueryExpression
                {
                    EntityName = "role",
                    ColumnSet = new ColumnSet("roleid", "name"),

                    Criteria = new FilterExpression
                    {
                        Filters =
                    {
                        new FilterExpression
                        {
                            Conditions =
                            {
                                new ConditionExpression("roleid", ConditionOperator.Equal, roleId),
                            }
                        }
                    }
                    }
                };
                Entity entity = service.RetrieveMultiple(query).Entities.First<Entity>();
                if (entity == null)
                {
                    throw new InvalidOperationException();
                }
                Debug.WriteLine("entity user role -====  " + entity.Attributes["name"].ToString());
                if (entity.Attributes["name"].ToString() == "Carrier Sales Support Representative") return true;
                else return false;
            }
            catch (InvalidOperationException)
            {
                return false;
            }
        }
    }
}
