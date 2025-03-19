import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function calcStars(rate) {
  const gold = [];
  for (let i = 0; i < Math.floor(Number(rate)); i++) {
    gold.push(<FontAwesomeIcon className="solid" icon={faStar} />);
  }
  const empty = [];
  for (let i = 0; i < 5 - Math.floor(Number(rate)); i++) {
    empty.push(<FontAwesomeIcon icon={faStar} />);
  }
  const result = gold.concat(empty);
  return result;
}
