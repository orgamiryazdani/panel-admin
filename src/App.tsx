import "./App.css";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Category from "./pages/Category";
import CreateCategory from "./pages/CreateCategory";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import AuthGuard from "./components/auth/AuthGuard";
import AppProviders from "./providers/AppProviders";
import { useEffect } from "react";
import { cleanupOldAccounts } from "./utils/cleanupOldAccounts";

function App() {
  useEffect(() => {
    cleanupOldAccounts();
  }, []);

  return (
    <AppProviders>
      <Routes>
        {/* auth guard */}
        <Route element={<AuthGuard />}>
          {/* products page*/}
          <Route
            path='/'
            element={<Products />}
          />
          {/* add products page*/}
          <Route
            path='/create-product'
            element={<CreateProduct />}
          />
          {/* category page*/}
          <Route
            path='/categories'
            element={<Category />}
          />
          {/* add category page*/}
          <Route
            path='/create-category'
            element={<CreateCategory />}
          />
          {/* users page*/}
          <Route
            path='/users'
            element={<Users />}
          />
          {/* add user page*/}
          <Route
            path='/create-user'
            element={<CreateUser />}
          />
          {/* profile page*/}
          <Route
            path='/profile'
            element={<Profile />}
          />
        </Route>
        {/* sign in page*/}
        <Route
          path='/signin'
          element={<SignIn />}
        />
      </Routes>
    </AppProviders>
  );
}

export default App;
