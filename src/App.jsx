import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import Layout from "./Components/Layout/Layout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CartContextProvider from "./Context/CartContext";
import UserContextProvider from "./Context/UserContext";
import WishlistContextProvider from "./Context/WishlistContext";
import ChangePassword from "./Pages/Auth/ChangePassword/ChangePassword";
import ForgetPassword from "./Pages/Auth/ForgetPassword/ForgetPassword";
import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Signup/Signup";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Contacts from "./Pages/Contacts/Contacts";
import Home from "./Pages/Home/Home";
import Notfound from "./Pages/Notfound/Notfound";
import Products from "./Pages/Products/Products";
import Wishlist from "./Pages/Wishlist/Wishlist";
import AllOrders from "./components/AllOrders/AllOrders";
import BrandsDetails from "./components/BrandsDetails/BrandsDetails";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import ProductDetails from "./components/ProductDetails/ProductDetails";

let query = new QueryClient();
let Routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categoryDetails/:id",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brandsDetails/:id",
        element: (
          <ProtectedRoute>
            <BrandsDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "contacts",
        element: (
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "changePassword", element: <ChangePassword /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={Routing}></RouterProvider>
              <Toaster richColors />
            </WishlistContextProvider>
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
