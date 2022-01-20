import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProductInfo from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./stylesheets/layout.css";
import "./stylesheets/products.css";
import "./stylesheets/authentication.css";
import "./stylesheets/login.css";
import Orders from "./pages/Orders";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouter>
                <HomePage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/productinfo/:productid"
            element={
              <ProtectedRouter>
                <ProductInfo />
              </ProtectedRouter>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRouter>
                <CartPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRouter>
                <Orders />
              </ProtectedRouter>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRouter>
                <AdminPage />
              </ProtectedRouter>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRouter = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
