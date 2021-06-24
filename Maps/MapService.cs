using System;
namespace pawsitive.maps.MapService

{
    public class MapService
    {
        private string apiUrl = "https://www.google.com/maps/embed/v1/view?zoom=10&center=43.6532%2C-79.3832&key=AIzaSyC8eAELSwMhuVOWoWVDB1JFv1TioUaRAIA";
        public MapService() { }

        public string getDefaultMap()
        {
            return apiUrl;
        }
    }
}