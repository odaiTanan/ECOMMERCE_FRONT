import {
  faCalendarDays,
  faEllipsis,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { host } from "../../api/api";
import FormateDate from "../../helpers/FormateDate";
import useDeleteMutation from "../../tanstckQuery/hooks/useDeleteMutation";
import useTableQuery from "../../tanstckQuery/hooks/useTableQuery";
import useTableSearchMutation from "../../tanstckQuery/hooks/useTableSearchMutation";
import Paginate from "../pagenation/Pagenate";
import TableLoading from "./TableLoading";
const Table = (props) => {
  /*get current user for users page */
  const currentUser = props.currentUser;
  //states
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [found, setFound] = useState(true);
  //date picker ref
  const dateRef = useRef();
  //fetch api to get table data
  const {
    data = [],
    error,
    isLoading: isTableLoading,
  } = useTableQuery({
    pageTitle: props.searchPage,
    itemsPerPage,
    page,
    api: props.api,
    setDataLength,
  });
  if (error) return error.message;

  const pageCount = Math.ceil(dataLength / itemsPerPage);
  //Front Pagenation For Filtered Data
  const frontPageCount = filteredData.length / itemsPerPage;
  const start = page * itemsPerPage - itemsPerPage;
  const end = start + itemsPerPage;
  const pagenatedFrontData = filteredData.slice(start, end);

  /*remove function to remove user,product... */
  const { mutation, isPending: isDeleting } = useDeleteMutation({
    pageTitle: props.searchPage,
    deleted: props.delete,
  });
  //handle search
  const { searchMutation, isSearching } = useTableSearchMutation({
    setFilteredData,
    setFound,
    search,
  });
  useEffect(() => {
    let timeOut;
    if (search.length > 0) {
      timeOut = setTimeout(() => {
        searchMutation.mutate(props.searchPage);
      }, 600);
    } else {
      setFilteredData([]);
    }
    return () => clearTimeout(timeOut);
  }, [search]);
  useEffect(() => {
    setDate("");
  }, [page]);
  //get status
  const isUser = props.isUser | false;
  const loading = isTableLoading | isDeleting | isSearching;

  /*headers of table */
  const showHeaders = props.headers.map((head, key) => {
    return props.isUser && head == "updated_at" ? (
      <th key={key}>last login</th>
    ) : (
      <th key={key}>{head}</th>
    );
  });
  /*mapping on data by head name */
  const show =
    search.length > 0 ? (pagenatedFrontData ? pagenatedFrontData : []) : data;
  const showData = show
    .filter((data) => {
      const dataDate = FormateDate(data.updated_at);
      return date != "" ? dataDate == FormateDate(date) : data;
    })
    .map((data, key) => {
      {
        return (
          <tr>
            <td data-cell={"id"}>{key + 1 + itemsPerPage * (page - 1)}</td>
            {props.headers.map((head, keyHead) => {
              return head == "role" ? (
                data[head] == "1995" ? (
                  <td data-cell={"role"}>{"admin"}</td>
                ) : data[head] == "2001" ? (
                  <td data-cell={"role"}>{"user"}</td>
                ) : data[head] == "1999" ? (
                  <td data-cell={"role"}>{"products manager"}</td>
                ) : (
                  ""
                )
              ) : head == "name" && isUser && currentUser.id == data.id ? (
                <td data-cell={"name"}>{data[head] + "(you)"}</td>
              ) : head == "images" ? (
                <td
                  data-cell={"images"}
                  style={{ padding: data[head].length > 0 && "5px !important" }}
                >
                  {data[head].length > 0 ? (
                    <div
                      className="center"
                      style={{ display: "flex", gap: "5px" }}
                    >
                      <div id={`imagesShow${key}`} className="imagesShow">
                        <span
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "10px",
                          }}
                        >
                          {" "}
                          <FontAwesomeIcon
                            style={{ color: "red", cursor: "pointer" }}
                            icon={faXmark}
                            onClick={(e) => {
                              document.getElementById(
                                `imagesShow${key}`
                              ).style.display = "none";
                            }}
                          />
                        </span>
                        {data[head].map((item) => {
                          return (
                            <img
                              className="tdImgMulty"
                              src={host.slice(0, -5) + item.image}
                            />
                          );
                        })}
                      </div>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        className="tdImg"
                        src={host.slice(0, -5) + data[head][0].image}
                      />
                      <FontAwesomeIcon
                        id="ellipsis"
                        icon={faEllipsis}
                        onClick={(e) => {
                          document.getElementById(
                            `imagesShow${key}`
                          ).style.display = "flex";
                        }}
                      />
                    </div>
                  ) : (
                    "No Images"
                  )}
                </td>
              ) : head == "image" ? (
                <td data-cell={"image"} className=" image">
                  <div className="center">
                    {" "}
                    <img
                      style={{ width: "50px", height: "50px" }}
                      className=" tdImg"
                      src={host.slice(0, -5) + data[head]}
                    />
                  </div>
                </td>
              ) : head == "created_at" || head == "updated_at" ? (
                <td data-cell={head}>{FormateDate(data[head])}</td>
              ) : (
                <td data-cell={head}>{data[head]}</td>
              );
            })}

            {/*edit icon */}
            <td data-cell={"action"} className="icons-con ">
              <div className="center">
                <Link to={`update/${data.id}`}>
                  <FontAwesomeIcon
                    style={{ color: "green", marginRight: "3px" }}
                    icon={faPenToSquare}
                  />
                </Link>
                {/*delete icon*/}
                {isUser && currentUser.id == data.id ? (
                  ""
                ) : (
                  <FontAwesomeIcon
                    style={{
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "3px",
                    }}
                    icon={faXmark}
                    onClick={() => mutation.mutate(data.id)}
                  />
                )}
              </div>
            </td>
          </tr>
        );
      }
    });

  return (
    <div className="main-table">
      <div className="searchCont">
        <input
          type="text"
          placeholder="search..."
          className="search"
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          id="search"
        />{" "}
        <input
          type="date"
          ref={dateRef}
          placeholder="search..."
          onChange={(e) => setDate(e.target.value)}
          name="date"
          id="date"
        />
        <div
          className="custom-date"
          onClick={() => dateRef.current.showPicker()}
        >
          <span>{date || "yyyy-mm-dd"}</span>
          <FontAwesomeIcon icon={faCalendarDays} />
        </div>
      </div>
      <table>
        <caption>{props.caption}</caption>
        <thead>
          <tr className="head-tr">
            <th>id</th>
            {showHeaders}
            <th>action</th>
          </tr>
        </thead>
        <tbody>{show.length > 0 && !loading && showData}</tbody>
      </table>
      {loading ? (
        <div style={{ width: "100%", marginTop: "40px", position: "relative" }}>
          <TableLoading />
        </div>
      ) : (
        show.length == 0 &&
        !loading && <tr className="center">{`no ${props.searchPage} found`}</tr>
      )}
      {search.length == 0 ? (
        <Paginate pageCount={pageCount} setPage={setPage} page={page} />
      ) : (
        <Paginate pageCount={frontPageCount} setPage={setPage} page={page} />
      )}
    </div>
  );
};

export default Table;
