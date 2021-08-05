import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Map = (props) => {
  var permissionDenied = true;
  var permissionLat = 0;
  var permissionLng = 0;
  const tourStops = [
    // [{ lat: 34.8791806, lng: -111.8265049 }, "Boynton Pass"],
    // [{ lat: 34.8559195, lng: -111.7988186 }, "Airport Mesa"],
    // [{ lat: 34.832149, lng: -111.7695277 }, "Chapel of the Holy Cross"],
    // [{ lat: 34.823736, lng: -111.8001857 }, "Red Rock Crossing"],
    // [{ lat: 34.800326, lng: -111.7665047 }, "Bell Rock"],
  ];

  useEffect(() => {
    if (props.user != null) {
      loadMap(props.user, permissionDenied);
    }
  }, [props]);

  return (
    <div>
      <div className={props.className} id="map"></div>
      <p>
        © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
        contributors
      </p>
    </div>
  );
};

export function loadMap(users, permissionDenied, permissionLat, permissionLng) {
  const tourStops = [];

  const loader = new Loader({
    apiKey: process.env.REACT_APP_API_KEY,
    version: "weekly",
  });

  var options = {
    method: "GET",
    url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward",
    params: {
      street: "", //'12 West 4th Street',
      city: "", //'New York City',
      state: "", //'NY',
      postalcode: "", //"10012",
      country: "", //"USA",
      "accept-language": "en",
      polygon_threshold: "0.0",
    },
    headers: {
      "x-rapidapi-key": "b45077c411msh3b11fddee5a5e95p114864jsn3d68c616da31",
      "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
    },
  };

  if (users.length > 0) {
    users.forEach((user) => {
      console.log(user.address.postalCode.replace(" ", ""));
      options.params.street = user.address.streetAddress;
      options.params.city = user.address.city;
      options.params.state = user.address.province;
      options.params.country = user.address.country;

      axios
        .request(options)
        .then(function (response) {
          console.log(response);
          tourStops.push([
            {
              lat: parseFloat(response.data[0].lat), //43.65107,
              lng: parseFloat(response.data[0].lon), //-79.347015,
            },
            user.firstName + " " + user.lastName,
          ]);
          if (tourStops.length == users.length) {
            loader
              .load()
              .then(() => {
                const map = new window.google.maps.Map(
                  document.getElementById("map"),
                  {
                    center: {
                      lat:
                        localStorage.getItem("permissionDenied") == "true" ||
                        permissionDenied
                          ? 49.15675
                          : search == true
                          ? permissionLat
                          : parseFloat(localStorage.getItem("permissionLat")) ||
                            permissionLat,
                      lng:
                        localStorage.getItem("permissionDenied") == "true" ||
                        permissionDenied
                          ? -84.4395
                          : search == true
                          ? permissionLng
                          : parseFloat(localStorage.getItem("permissionLng")) ||
                            permissionLng,
                    }, //tourStops[0][0],
                    zoom:
                      localStorage.getItem("permissionDenied") == "true" ||
                      permissionDenied
                        ? 5
                        : 11,
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
        })
        .catch(function (error) {
          console.error("Axios error: " + error);
        });
    });
  } else if (window.google) {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 62.24,
        lng: -96.4835,
      },
      zoom: 3.5,
    });
  }
}

export default Map;
