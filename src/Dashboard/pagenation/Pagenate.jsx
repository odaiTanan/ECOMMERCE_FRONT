import ReactPaginate from "react-paginate";

export default function PaginatedItems({ pageCount, setPage, page }) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<span className="custom-next center">{">"}</span>}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel={<span className="custom-previous center">{"<"}</span>}
        renderOnZeroPageCount={null}
        containerClassName="pagenationContiner"
        pageClassName="pageLi center"
        pageLinkClassName="pageLink"
        activeClassName="activePage"
        activeLinkClassName="activeLink"
        onPageChange={(e) => {
          setPage(e.selected + 1);
        }}
        forcePage={page - 1}
      />
    </>
  );
}
