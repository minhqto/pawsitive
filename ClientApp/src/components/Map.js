import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Map = (props) => {
  const tourStops = [
    // [{ lat: 34.8791806, lng: -111.8265049 }, "Boynton Pass"],
    // [{ lat: 34.8559195, lng: -111.7988186 }, "Airport Mesa"],
    // [{ lat: 34.832149, lng: -111.7695277 }, "Chapel of the Holy Cross"],
    // [{ lat: 34.823736, lng: -111.8001857 }, "Red Rock Crossing"],
    // [{ lat: 34.800326, lng: -111.7665047 }, "Bell Rock"],
  ];

  const loader = new Loader({
    apiKey: process.env.REACT_APP_API_KEY,
    version: "weekly",
  });

  /*geocode();

  function geocode() {
    var location = "22 Main St Boston MA"; //"26 Goodwood Park Cres East Toronto Canada";
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        parans: {
          address: location,
          key: "AIzaSyC8eAELSwMhuVOWoWVDB1JFv1TioUaRAIA",
        },
      })
      .then(function (response) {
        console.log("Response: " + response);
      })
      .catch(function (err) {
        console.log("Error: " + err);
      });
  }*/

  var options = {
    method: "GET",
    url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json",
    params: { address: "", language: "en" },
    headers: {
      "x-rapidapi-key": "b45077c411msh3b11fddee5a5e95p114864jsn3d68c616da31",
      "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
    },
  };

  console.log("test");

  useEffect(() => {
    if (props.user != null) {
      props.user.forEach((user) => {
        options.params.address =
          user.address.streetAddress +
          ", " +
          user.address.city +
          ", " +
          user.address.province +
          ", " +
          user.address.country;

        axios
          .request(options)
          .then(function (response) {
            tourStops.push([
              {
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng,
              },
              user.firstName + " " + user.lastName,
            ]);
            //console.log(
            //  "Lat: " +
            //    response.data.results[0].geometry.location.lat.toString() +
            //    " Lng: " +
            //    response.data.results[0].geometry.location.lng.toString()
            //);
            if (tourStops.length == props.user.length) {
              loader
                .load()
                .then(() => {
                  const map = new window.google.maps.Map(
                    document.getElementById("map"),
                    {
                      center: tourStops[0][0],
                      zoom: 2,
                    }
                  );
                  tourStops.forEach(([position, title], i) => {
                    const marker = new window.google.maps.Marker({
                      position,
                      map,
                      title: `${i + 1}. ${title}`,
                      label: `${i + 1}`,
                      optimized: false,
                    });
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            //console.log(tourStops);
          })
          .catch(function (error) {
            console.error(error);
          });
      });
    }
  }, [props]);

  return (
    <div>
      <div className={props.className} id="map"></div>
    </div>
  );
};

export default Map;
