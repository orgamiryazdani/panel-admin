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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
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
    </QueryClientProvider>
  );
}

export default App;
