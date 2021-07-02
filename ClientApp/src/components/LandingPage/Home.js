import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import AppFooter from "./modules/views/AppFooter";
import ProductValues from "./modules/views/ProductValues";

import BigBanner from "./modules/views/BigBanner";

const Home = () => {
  return (
    <React.Fragment>
      <BigBanner />
      <ProductValues />
      <AppFooter />
    </React.Fragment>
  );
};

export default Home;
