import React from "react";
import { DELETE_PRODUCT, PRODUCTS } from "../../../api/api";
import Table from "../../components/Table";

const Products = () => {
  return (
    <div className="main-dash">
      <Table
        headers={[
          "title",
          "images",
          "description",
          "price",
          "rating",
          "created_at",
          "updated_at",
        ]}
        api={PRODUCTS}
        delete={DELETE_PRODUCT}
        searchPage={"product"}
        caption={"PRODUCTS"}
      />
    </div>
  );
};

export default Products;
