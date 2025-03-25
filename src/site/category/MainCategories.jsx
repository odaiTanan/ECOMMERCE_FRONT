import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { host } from "../../api/api";
import useCategoriesQuery from "../../tanstckQuery/hooks/useCategoriesQuery";

const MainCategories = () => {
  const [regionError, setRegionError] = useState(false);
  //get categories
  const { data: categories = [] } = useCategoriesQuery({ setRegionError });

  const show = categories.map((cat) => {
    return (
      <Link to={`${cat.id}`} className="cat-card">
        <img className="catimage" src={host.slice(0, -5) + cat.image} alt="" />
        <p>{cat.title}</p>
        <FontAwesomeIcon className="catIcon" icon={faAnglesDown} />
      </Link>
    );
  });
  return (
    <div className="full">
      <div className="main-categories continer">{show}</div>
    </div>
  );
};

export default MainCategories;
