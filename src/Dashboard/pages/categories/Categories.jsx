import React from "react";
import { CATEGORIES, DELETE_CATEGORY } from "../../../api/api";
import Table from "../../components/Table";

const Categories = () => {
  return (
    <div className="main-dash">
      <Table
        headers={["title", "image", "created_at", "updated_at"]}
        api={CATEGORIES}
        delete={DELETE_CATEGORY}
        searchPage={"category"}
        caption={"CATEGORIES"}
      />
    </div>
  );
};

export default Categories;
