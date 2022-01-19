import React from "react";
// import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";

function LayOut({ children, loader }) {
  return (
    <div>
      {loader && <Loader />}
      <Header />
      <div className="content">{children}</div>

      {/* <Footer /> */}
    </div>
  );
}

export default LayOut;
