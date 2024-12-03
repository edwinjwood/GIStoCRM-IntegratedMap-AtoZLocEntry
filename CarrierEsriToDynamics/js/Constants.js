var bandwidthArray = { '5Mb': '5Mb', 'N/A':'N/A', '2Mb': '2Mb', '3Mb': '3Mb', '6Mb': '6Mb', '10Mb': '10Mb', '20Mb': '20Mb', '30Mb': '30Mb', '40Mb': '40Mb', '50Mb': '50Mb', '60Mb': '60Mb', '70Mb': '70Mb', '80Mb': '80Mb', '90Mb': '90Mb', '100Mb': '100Mb', '150Mb': '150Mb', '200Mb': '200Mb', '250Mb': '250Mb', '300Mb': '300Mb', '350Mb': '350Mb', '400Mb': '400Mb', '450Mb': '450Mb', '500Mb': '500Mb', '550Mb': '550Mb', '600Mb': '600Mb', '650Mb': '650Mb', '700Mb': '700Mb', '750Mb': '750Mb', '800Mb': '800Mb', '850Mb': '850Mb', '900Mb': '900Mb', '950Mb': '950Mb', '1Gb': '1000Mb', '2Gb': '2000Mb', '3Gb': '3000Mb', '4Gb': '4000Mb', '5Gb': '5000Mb', '6Gb': '6000Mb', '7Gb': '7000Mb', '8Gb': '8000Mb', '9Gb': '9000Mb', '10Gb': '10000Mb', '100Gb': '100000Mb', };
var bandwidthArray2 = ['5Mb', 'N/A','2Mb', '3Mb', '6Mb', '10Mb', '20Mb', '30Mb', '40Mb', '50Mb', '60Mb', '70Mb', '80Mb', '90Mb', '100Mb', '150Mb', '200Mb', '250Mb', '300Mb', '350Mb', '400Mb', '450Mb', '500Mb', '550Mb', '600Mb', '650Mb', '700Mb', '750Mb', '800Mb', '850Mb', '900Mb', '950Mb', '1000Mb', '2000Mb', '3000Mb', '4000Mb', '5000Mb', '6000Mb', '7000Mb', '8000Mb', '9000Mb', '10000Mb', '100000Mb'];
var regionArray = ['none', 'Coastal TC', 'Midlands TC', 'Upstate TC', 'North Carolina TC', 'Wilmington TC'];
var locationtypeArray = ['', 'New', 'OnNet', 'NearNet'];
var diversitytypeArray = ["Dedicated Physical Ring", "Dedicated Virtual Ring", "Dual Entrance Facility", "Non Collapsed Last Mile Lateral",
    "Non Collapsed Lateral & Dual Entrance", "POP Diversity with Router Diversity", "Redundant CPE Router/Switch 10G Port", "Redundant CPE Router/Switch 1G Port",
    "Single Pop with Router Diversity"];
var classofservicetypearray = ['', 'Cross Connect', 'Dark Fiber', 'DS0', 'DS1', 'DS3', 'DS3 (MUX)', 'Ethernet', 'OC12/622Mb', 'OC195/10Gb', 'OC3/10Mb', 'OC48/2.5Mb', 'Wavelength Service', 'Other'];
var interfacespeedtypearray = ['', '100Mb', '1Gb', '10Gb'];
var locationType1Array = ["", "Building", "Campus Building", "Tower", "Small Cell", "Splice Point", "Carrier Building/Data Center"];

var locationSubTypeAray = ["", "Hospitality", "Hospital", "Education", "Commercial Office", "Industrial", "Warehouse", "Retail - Single Tenant Building", "Retail - Multitenant Facility", "Military Facility", "Mixed Use", "Other", "Carrier Hut", "H-Frame", "Commercial Computing Data Center", "Carrier Hotel - Multitenant", "Wireless Carrier MSC", "Single Carrier CO/POP"];

var multiTenantArray = ["Yes", "No"];

var floorArray = ["", "LL3", "LL2", "LL1", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "90", "100"];

var ste_aptArray = ["", "APT", "STE", "RM", "DEPT", "BLDG", "UNIT"];