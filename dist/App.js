import React, {Component} from "../_snowpack/pkg/react.js";
import {BrowserRouter, Route, Switch} from "../_snowpack/pkg/react-router-dom.js";
import Main from "./pages/Main.js";
import NoIE from "./pages/NoIE.js";
import About from "./pages/About.js";
import CallBack from "./pages/Callback.js";
import Categories from "./pages/Categories.js";
import Posts from "./pages/Posts.js";
import Category from "./pages/Category.js";
import Post from "./pages/Post.js";
import NewCategory from "./pages/NewCategory.js";
import NavBar from "./components/NavBar.js";
import Footer from "./components/Footer.js";
class App extends Component {
  componentDidMount() {
    localStorage.theme = localStorage.theme || "white";
    if (localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (!location.href.includes("/callback")) {
      localStorage.previousPage = location.href;
    }
  }
  render() {
    if (!!document.documentMode) {
      return /* @__PURE__ */ React.createElement(NoIE, null);
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col h-screen"
    }, /* @__PURE__ */ React.createElement(BrowserRouter, null, /* @__PURE__ */ React.createElement(NavBar, null), /* @__PURE__ */ React.createElement("div", {
      className: "mb-auto"
    }, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
      exact: true,
      path: "/",
      component: Main
    }), /* @__PURE__ */ React.createElement(Route, {
      path: "/about",
      component: About
    }), /* @__PURE__ */ React.createElement(Route, {
      path: "/callback",
      component: CallBack
    }), /* @__PURE__ */ React.createElement(Route, {
      path: "/categories",
      component: Categories
    }), /* @__PURE__ */ React.createElement(Route, {
      path: "/commu",
      component: Posts
    }), /* @__PURE__ */ React.createElement(Route, {
      path: "/noie",
      component: NoIE
    }), /* @__PURE__ */ React.createElement(Route, {
      path: "/category/:name",
      component: Category
    }), /* @__PURE__ */ React.createElement(Route, {
      path: "/post/:id",
      component: Post
    }), /* @__PURE__ */ React.createElement(Route, {
      path: "/newcategory",
      component: NewCategory
    }))), /* @__PURE__ */ React.createElement(Footer, null)));
  }
}
;
export default App;
