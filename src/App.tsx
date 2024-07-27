import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Category from "./pages/Category";
import CreateCategory from "./pages/CreateCategory";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ThemeProvider } from "./context/theme-provider";
import AuthGuard from "./components/auth/AuthGuard";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
       <Toaster />
      <ThemeProvider
        defaultTheme='dark'
        storageKey='vite-ui-theme'>
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
              path='/category'
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
          {/* sign up page*/}
          <Route
            path='/signup'
            element={<SignUp />}
          />
          {/* sign in page*/}
          <Route
            path='/signin'
            element={<SignIn />}
          />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
