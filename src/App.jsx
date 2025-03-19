//dashboard and auth and main css imports
import "./css/all.min.css";
import "./css/index.css";
import "./css/media-query/media.css";
import "./css/auth/form.css";
import "./css/components/button.css";
import "./css/components/loading.css";
import "./css/Dashboard/pages/dashboard.css";
import "./css/Dashboard/pages/pages.css";
import "./css/Dashboard/components/bar.css";
import "./css/Dashboard/components/table.css";
import "./css/Dashboard/form.css";
import "./css/root.css";
import "./css/components/productCard.css";
import "./css/components/userTitle.css";
import "./css/auth/errorPage.css";
import "./css/Dashboard/components/TableLoading.css";
import "./css/Dashboard/components/Paginate.css";
import "./css/Dashboard/components/title.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
//auth
import Register from "./auth/Register";
import Login from "./auth/Login";
import GoogleCallback from "./auth/GoogleCallback";
import ERR404 from "./auth/ERR404";
import CanBackToAuth from "./auth/CanBackToAuth";
import RequiredAuth from "./auth/RequiredAuth";
//elements
import Loading from "./components/Loading";
import Website from "./site/Website";
import MainCategories from "./site/category/MainCategories";
import Home from "./site/Home";
import SingleProduct from "./site/product/SingleProduct";
import ProductsByCategory from "./site/product/ProductsByCategory";
import Search from "./site/product/Search";
import Success from "./site/payments/Success";
import Cancle from "./site/payments/Cancle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//dashboard lazy loading to improve user experiance
const Dashboard = React.lazy(() => import("./Dashboard/pages/Dashboard"));
const Users = React.lazy(() => import("./Dashboard/pages/users/Users"));
const UpdateUser = React.lazy(() =>
  import("./Dashboard/pages/users/UpdateUser")
);
const AddUser = React.lazy(() => import("./Dashboard/pages/users/AddUser"));
const UpdateCategory = React.lazy(() =>
  import("./Dashboard/pages/categories/UpdateCategory")
);
const Categories = React.lazy(() =>
  import("./Dashboard/pages/categories/Categories")
);
const AddCategory = React.lazy(() =>
  import("./Dashboard/pages/categories/AddCategory")
);
const Products = React.lazy(() =>
  import("./Dashboard/pages/products/Products")
);
const UpdateProduct = React.lazy(() =>
  import("./Dashboard/pages/products/UpdateProduct")
);
const AddProduct = React.lazy(() =>
  import("./Dashboard/pages/products/AddProduct")
);
const query = new QueryClient();
function App() {
  return (
    <div style={{ position: "relative" }}>
      <QueryClientProvider client={query}>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            {/*puplic routes*/}
            <Route path="payment/success" element={<Success />} />
            <Route path="payment/cancel" element={<Cancle />} />
            <Route element={<Website />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="categories" element={<MainCategories />} />
              <Route path="categories/:cat" element={<ProductsByCategory />} />
            </Route>

            <Route element={<CanBackToAuth />}>
              {" "}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route path="/*" element={<ERR404 />} />

            {/*protected routes */}
            <Route
              element={
                <RequiredAuth allowedAccess={["1995", "1996", "1999"]} />
              }
            >
              <Route path="/dashboard" element={<Dashboard />}>
                <Route element={<RequiredAuth allowedAccess={["1995"]} />}>
                  <Route path="users" element={<Users />} />
                  <Route path="users/update/:id" element={<UpdateUser />} />
                  <Route path="addUser" element={<AddUser />} />
                </Route>
                <Route
                  element={<RequiredAuth allowedAccess={["1995", "1999"]} />}
                >
                  <Route path="categories" element={<Categories />} />
                  <Route path="addCategory" element={<AddCategory />} />
                  <Route path="addProduct" element={<AddProduct />} />
                  <Route path="products" element={<Products />} />
                  <Route
                    path="categories/update/:id"
                    element={<UpdateCategory />}
                  />
                </Route>
                <Route path="products/update/:id" element={<UpdateProduct />} />
              </Route>
            </Route>
          </Routes>
        </React.Suspense>
      </QueryClientProvider>
    </div>
  );
}

export default App;
