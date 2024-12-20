﻿using System;
using System.Linq;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System.Diagnostics;

namespace CarrierEsriToDynamics
{
    public class AccountCreation
    {
        public static Guid CreateProspectAccount(Guid Owner_ID, Guid ContactID, String AccountName, String streetAddress, String City, String State
            , String Zip, String AccountUrl, String AccountPhone, IOrganizationService service)
        {
            String stateShortRepresentation = State.Length == 2 ? State : map.GetStateByName(State);
            //IOrganizationService service = DynamicsServiceConnection.GetCRM_Service();
            Entity _Account = new Entity("account");
            _Account.Attributes["statecode"] = 0;
            _Account.Attributes["name"] = AccountName;
            //_Account.Attributes["address1_composite"] = streetAddress + ", " + City + ", " + stateShortRepresentation + ", "+ Zip;
            _Account.Attributes["address1_line1"] = streetAddress;
            _Account.Attributes["address1_city"] = City;
            _Account.Attributes["address1_stateorprovince"] = stateShortRepresentation;
            _Account.Attributes["address1_postalcode"] = Zip;
            _Account.Attributes["ownerid"] = new EntityReference("systemuser", Owner_ID);
            _Account.Attributes["primarycontactid"] = new EntityReference("contact", ContactID);
            _Account.Attributes["telephone1"] = AccountPhone;
            _Account.Attributes["websiteurl"] = AccountUrl;
            Guid accountId = service.Create(_Account);
            Debug.WriteLine("Account Created = " + accountId);
            return accountId;
        }
    }
}