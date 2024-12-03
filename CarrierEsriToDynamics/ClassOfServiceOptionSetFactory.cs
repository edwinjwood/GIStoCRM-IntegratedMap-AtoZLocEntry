using Microsoft.Xrm.Sdk;
namespace Spirit.Esrimap.Business
{
    public class ClassOfServiceOptionSetFactory
    {
        private static ClassOfServiceOptionSetFactory _instanse;

        private ClassOfServiceOptionSetFactory()
        {
        }

        public static ClassOfServiceOptionSetFactory Instanse
        {
            get { return _instanse ?? (_instanse = new ClassOfServiceOptionSetFactory()); }
        }

        public OptionSetValue GetOptionSet(string cos)
        {
            int value = 0;
            switch (cos)
            {
                case "Cross Connect":
                    value = 241870000;
                    break;
                case "Dark Fiber":
                    value = 241870012;
                    break;
                case "DarkFiber":
                    value = 241870012;
                    break;
                case "DS0":
                    value = 241870011;
                    break;
                case "DS1":
                    value = 241870001;
                    break;
                case "DS3":
                    value = 241870002;
                    break;
                case "DS3 (MUX)":
                    value = 241870003;
                    break;
                case "Ethernet":
                    value = 241870004;
                    break;
                case "OC12/622Mb":
                    value = 241870005;
                    break;
                case "OC195/10Gb":
                    value = 241870006;
                    break;
                case "OC3/10Mb":
                    value = 241870007;
                    break;
                case "OC48/2.5Mb":
                    value = 241870008;
                    break;
                case "Other":
                    value = 241870009;
                    break;
                case "Wavelength Service":
                    value = 241870010;
                    break;
                case "TDM":
                    value = 241870013;
                    break;

            }
            return new OptionSetValue(value);
        }
    }
}