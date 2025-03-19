import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faCartFlatbedSuitcase,
  faUsers,
  faUserPlus,
  faFilePen,
  faBoxOpen,
  faShapes,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
export const navs = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: ["1995"],
  },
  {
    name: "Add User",
    path: "addUser",
    icon: faUserPlus,
    role: ["1995"],
  },
  {
    name: "Categories",
    path: "categories",
    icon: faShapes,
    role: ["1995", "1999"],
  },
  {
    name: "Add Categories",
    path: "addCategory",
    icon: faPlusSquare,
    role: ["1995", "1999"],
  },
  {
    name: "Products",
    path: "products",
    icon: faBoxOpen,
    role: ["1995", "1999"],
  },
  {
    name: "Add Product",
    path: "addProduct",
    icon: faPlusSquare,
    role: ["1995", "1999"],
  },
  {
    name: "Go Home",
    path: "/",
    icon: faHome,
    role: ["1995", "1999"],
  },
];
