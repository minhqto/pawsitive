import { Loader } from "@googlemaps/js-api-loader";
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

  useEffect(() => {
    if (props.user != null) {
      props.user.forEach((user) => {
        tourStops.push([
          {
            lat: parseInt(user.address.geo.lat),
            lng: parseInt(user.address.geo.lng),
          },
          user.name,
        ]);
      });
    }
    if (tourStops.length > 0) {
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
  }, [props]);

  return (
    <div>
      <div className={props.className} id="map"></div>
    </div>
  );
};

export default Map;
