import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import ProductValues from "./modules/views/ProductValues";

import BigBanner from "./modules/views/BigBanner";

const Home = () => {
  return (
    <React.Fragment>
      <BigBanner />
      <ProductValues />
    </React.Fragment>
  );
};

export default Home;
