import React from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {FontAwesomeIcon} from "../../_snowpack/pkg/@fortawesome/react-fontawesome.js";
import {faDiscord} from "../../_snowpack/pkg/@fortawesome/free-brands-svg-icons.js";
const Main = () => /* @__PURE__ */ React.createElement("div", {
  className: "pt-16 w-full tracking-tighter"
}, /* @__PURE__ */ React.createElement("div", {
  className: "select-none w-4/5 h-56 pl-12 pt-12 mx-auto bg-gradient-to-r from-green-500 to-purple-500 rounded-3xl"
}, /* @__PURE__ */ React.createElement("h1", {
  className: "banner_sitename text-3xl text-white font-bold sm:text-3xl"
}, "DISCOMMU"), /* @__PURE__ */ React.createElement("h3", {
  className: "text-base mt-0 text-white text-lg font-bold"
}, "Discord\uC5D0\uC11C\uC758 \uAC8C\uC2DC\uD310!"), /* @__PURE__ */ React.createElement(Link, {
  to: "/commu"
}, /* @__PURE__ */ React.createElement("button", {
  className: "text-base border-white border-2 p-2 rounded-lg mt-2 text-white font-semibold hover:bg-white hover:text-green-500 sm:text-lg"
}, "\uAC8C\uC2DC\uD310"))), /* @__PURE__ */ React.createElement("div", {
  className: "select-none w-4/5 pt-12 mx-auto lg:grid lg:grid-cols-2 lg:gap-4"
}, /* @__PURE__ */ React.createElement("a", {
  href: "https://discord.com/api/oauth2/authorize?client_id=761495487215042570&permissions=0&scope=bot"
}, /* @__PURE__ */ React.createElement("div", {
  className: "transition duration-200 ease-in-out w-full h-16 pl-6 rounded-xl shadow-2xl flex items-center transform hover:-translate-y-1.5",
  style: {backgroundColor: "#7289da"}
}, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
  icon: faDiscord,
  className: "text-3xl",
  style: {color: "white"}
}), /* @__PURE__ */ React.createElement("h2", {
  className: "text-white font-bold ml-6 text-xl"
}, "DISCOMMU BOT \uCD08\uB300\uD558\uAE30!"))), /* @__PURE__ */ React.createElement("a", {
  href: "https://discord.gg/R5UG5mR"
}, /* @__PURE__ */ React.createElement("div", {
  className: "transition duration-200 ease-in-out w-full h-16 pl-6 rounded-xl shadow-2xl flex items-center transform hover:-translate-y-1.5"
}, /* @__PURE__ */ React.createElement("h2", {
  className: "font-bold ml-6 text-xl"
}, "Team Kat \uBCF4\uB7EC\uAC00\uAE30!")))));
export default Main;
