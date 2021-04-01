import React from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {url} from "../utils/request.js";
const Footer = () => /* @__PURE__ */ React.createElement("div", {
  className: "flex flex-col mt-16"
}, /* @__PURE__ */ React.createElement("footer", {
  className: "bg-gray-900 text-gray-300 px-6 lg:px-8 py-12 select-none mt-auto"
}, /* @__PURE__ */ React.createElement("div", {
  className: "max-w-screen-xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-8"
}, /* @__PURE__ */ React.createElement("div", {
  className: "col-span-2"
}, /* @__PURE__ */ React.createElement("h5", {
  className: "text-xl font-semibold text-white"
}, "Discommu"), /* @__PURE__ */ React.createElement("nav", {
  className: "mt-4"
}, /* @__PURE__ */ React.createElement("ul", {
  className: "space-y-2"
}, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Link, {
  to: "/about",
  className: "font-normal text-base hover:text-gray-100"
}, "About"))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", {
  className: "text-xl font-semibold text-white"
}, "Menu"), /* @__PURE__ */ React.createElement("nav", {
  className: "mt-4"
}, /* @__PURE__ */ React.createElement("ul", {
  className: "space-y-2"
}, localStorage.loginURL ? /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
  href: localStorage.loginURL,
  className: "font-normal text-base hover:text-gray-100"
}, "Login")) : null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Link, {
  to: "/commu",
  className: "font-normal text-base hover:text-gray-100"
}, "Board")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Link, {
  to: "/categories",
  className: "font-normal text-base hover:text-gray-100"
}, "Category"))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", {
  className: "text-xl font-semibold text-white"
}, "Links"), /* @__PURE__ */ React.createElement("nav", {
  className: "mt-4"
}, /* @__PURE__ */ React.createElement("ul", {
  className: "space-y-2"
}, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
  target: "_blank",
  href: url,
  className: "font-normal text-base hover:text-gray-100"
}, "API")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
  target: "_blank",
  href: "https://teamkat.tk",
  className: "font-normal text-base hover:text-gray-100"
}, "Team Kat")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
  target: "_blank",
  href: "https://discord.com/api/oauth2/authorize?client_id=761495487215042570&permissions=0&scope=bot",
  className: "font-normal text-base hover:text-gray-100"
}, "Bot")))))), /* @__PURE__ */ React.createElement("div", {
  className: "max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 mt-6 lg:mt-8 pt-8 "
}, /* @__PURE__ */ React.createElement("div", {
  className: "text-sm space-y-4 md:space-y-1 text-center md:text-left"
}, /* @__PURE__ */ React.createElement("p", null, "\xA9", new Date().getFullYear(), " Team Kat. All rights reserved.")))));
export default Footer;
