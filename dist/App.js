import React, {Component} from "../_snowpack/pkg/react.js";
import {BrowserRouter, Route, Switch} from "../_snowpack/pkg/react-router-dom.js";
import Main from "./pages/Main.js";
import CallBack from "./pages/Callback.js";
import About from "./pages/About.js";
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
    }))), /* @__PURE__ */ React.createElement(Footer, null)));
  }
}
;
export default App;
