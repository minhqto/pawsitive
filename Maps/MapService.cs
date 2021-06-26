using System;
namespace pawsitive.maps.MapService

{
    //deprecated
    public class MapService
    {
        private string apiUrl = "";
        public MapService() { }

        public string getDefaultMap()
        {
            return apiUrl;
        }
    }
}