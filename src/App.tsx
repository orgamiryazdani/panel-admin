import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "./components/auth/AuthGuard";
import AppProviders from "./providers/AppProviders";
import { cleanupOldAccounts } from "./utils/cleanupOldAccounts";
import Loading from "./components/common/Loading";
import Products from "./pages/Products";

// بارگذاری پویا برای صفحات
const CreateProduct = React.lazy(() => import("./pages/CreateProduct"));
const Category = React.lazy(() => import("./pages/Category"));
const CreateCategory = React.lazy(() => import("./pages/CreateCategory"));
const Users = React.lazy(() => import("./pages/Users"));
const CreateUser = React.lazy(() => import("./pages/CreateUser"));
const Profile = React.lazy(() => import("./pages/Profile"));
const SignIn = React.lazy(() => import("./pages/SignIn"));

function App() {
  useEffect(() => {
    cleanupOldAccounts();
  }, []);

  return (
    <AppProviders>
      <Suspense
        fallback={
          <div className='w-full h-screen z-50 flex items-center justify-center'>
            <Loading width="115"/>
          </div>
        }>
        <Routes>
          {/* auth guard */}
            {/* products page*/}
          <Route element={<AuthGuard />}>
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
      </Suspense>
    </AppProviders>
  );
}

export default App;
