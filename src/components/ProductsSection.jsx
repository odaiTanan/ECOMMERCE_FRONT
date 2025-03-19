import React from "react";
import { useState } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "react-loading-skeleton";
import { useContext } from "react";
import { searchContext } from "../context/SearchContext";
import Paginate from "../Dashboard/pagenation/Pagenate";
import useProductsQuery from "../tanstckQuery/hooks/useProductsQuery";
//a component used to show products (by category,search....)
const ProductsSection = ({ api, category = "", isCategory = false }) => {
  //search input value
  const SearchContext = useContext(searchContext);
  const search = SearchContext.search;
  //get data
  const {
    data = [],
    isError,
    isLoading,
  } = useProductsQuery({
    isCategory,
    api,
    category,
  });

  //pagenation
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const PageCount = data.length / itemsPerPage;
  const start = page * itemsPerPage - itemsPerPage;
  const end = start + itemsPerPage;
  const pagenatedFrontData = data.slice(start, end);
  //show products
  const show = (
    search.length > 0
      ? pagenatedFrontData.filter((pro) => {
          return pro.title.toUpperCase().includes(search.toUpperCase());
        })
      : pagenatedFrontData
  ).map((product, key) => {
    return (
      <ProductCard
        key={key}
        id={product.id}
        title={product.title}
        description={product.description}
        discount={product.discount}
        price={product.price}
        images={product.images}
        rate={product.rating}
        product={product}
      />
    );
  });
  if (isError) {
    return "Some Thing Went Wrong ...";
  }
  return (
    <>
      {isLoading ? (
        <div className="continer latest products-section-skeleton ">
          {[...Array(5)].map((_, index) => (
            <Skeleton
              baseColor="#bbbdbc"
              highlightColor="#f2f0ef"
              height={300}
            />
          ))}
        </div>
      ) : show.length == 0 ? (
        <div className="center" style={{ margin: "40px 0", color: "red" }}>
          <h2>No Products Found</h2>
        </div>
      ) : (
        <>
          <div className="continer latest">{show}</div>
          <div style={{ width: "300px", margin: "20px auto" }}>
            {data.length > 6 && (
              <Paginate pageCount={PageCount} setPage={setPage} page={page} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductsSection;
