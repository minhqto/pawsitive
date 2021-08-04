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

  var options = {
    method: "GET",
    url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json",
    params: { address: "", language: "en" },
    headers: {
      "x-rapidapi-key": "b45077c411msh3b11fddee5a5e95p114864jsn3d68c616da31",
      "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
    },
  };

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
                lat: response.data.results[0].geometry.location.lat, //43.65107,
                lng: response.data.results[0].geometry.location.lng, //-79.347015
              },
              user.firstName + " " + user.lastName,
            ]);
            if (tourStops.length == props.user.length) {
              loader
                .load()
                .then(() => {
                  const map = new window.google.maps.Map(
                    document.getElementById("map"),
                    {
                      center: {
                        lat: 43.65107,
                        lng: -79.347015,
                      }, //tourStops[0][0],
                      zoom: 6,
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
            console.log(tourStops);
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

export function changePoint(users) {
  const tourStops = [];

  const loader = new Loader({
    apiKey: process.env.REACT_APP_API_KEY,
    version: "weekly",
  });

  var options = {
    method: "GET",
    url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json",
    params: { address: "", language: "en" },
    headers: {
      "x-rapidapi-key": "b45077c411msh3b11fddee5a5e95p114864jsn3d68c616da31",
      "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
    },
  };

  if (users.length > 0) {
    users.forEach((user) => {
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
              lat: response.data.results[0].geometry.location.lat, //43.65107,
              lng: response.data.results[0].geometry.location.lng, //-79.347015
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
                      lat: 43.65107,
                      lng: -79.347015,
                    }, //tourStops[0][0],
                    zoom: 6,
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
          console.error(error);
        });
    });
  } else {
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
