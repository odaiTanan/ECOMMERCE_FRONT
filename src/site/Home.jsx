import React from "react";
import SectionTitle from "../components/SectionTitle";
import Landing from "./Landing";
import Latest_products from "./product/Latest_products";
import Latest_sales from "./product/Latest_sales";
import Top_rated from "./product/Top_rated";

const Home = () => {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Landing />
      <SectionTitle title="Latest Products With Sale" />
      <Latest_sales />
      <hr
        className="continer"
        style={{
          borderTop: "dashed 2px #bbbdbc",
          height: "auto",
          backgroundColor: "transparent",
        }}
      />{" "}
      <SectionTitle title="Top Rated " />
      <Top_rated />
      <hr
        className="continer"
        style={{
          borderTop: "dashed 2px #bbbdbc",
          height: "auto",
          backgroundColor: "transparent",
        }}
      />
      <SectionTitle title="Latest Products " />
      <Latest_products />
    </div>
  );
};

export default Home;
