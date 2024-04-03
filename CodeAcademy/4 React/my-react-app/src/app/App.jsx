import React from "react";
import About from "../components/About";
import SignUp from "../components/SignUp";
import Articles from "../components/Articles";
import Article from "../components/Article";
import Categories from "../components/Categories";
import Category from "../components/Category";
import Author from "../components/Author";
import Profile from "../components/Profile";
import EditProfileForm from "../components/EditProfileForm";
import Root from "../components/Root";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    /* Wrap this Root Route to create Router here */
    <Route path="/" element={<Root />}>
      {" "}
      {/* Add Routes here! */}
      <Route path="/about" element={<About />}></Route>
      <Route path="/articles" element={<Articles />}></Route>
      <Route path="/articles/:title" element={<Article />}></Route>
      <Route path="/authors/:name" element={<Author />}></Route>
      <Route path="/categories" element={<Categories />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
    </Route>
  )
);

function App() {
  return (
    <>
      {/* Replace below and add Router Provider*/}{" "}
      <RouterProvider router={router} />{" "}
    </>
  );
}

export default App;
