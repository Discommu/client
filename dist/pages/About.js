import React, {Component} from "../../_snowpack/pkg/react.js";
import DevloperProfile from "../components/DevloperProfile.js";
import developers from "../data/developers.js";
class About extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentDidMount() {
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "mt-20"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "text-center"
    }, /* @__PURE__ */ React.createElement("img", {
      className: "rounded-full mx-auto",
      src: "/favicon.ico",
      alt: "discommu logo"
    }), /* @__PURE__ */ React.createElement("h1", {
      className: "text-4xl font-black mt-10"
    }, "DISCOMMU"), /* @__PURE__ */ React.createElement("h2", {
      className: "text-xl font-2xl"
    }, "Discord\uC5D0\uC11C\uC758 \uAC8C\uC2DC\uD310")), /* @__PURE__ */ React.createElement("div", {
      className: "mt-20 mx-20"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "divide-y-2 divide-black divide-opacity-25"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "text-3xl font-black pb-6"
    }, "\uAC1C\uBC1C\uC790"), /* @__PURE__ */ React.createElement("div", {
      className: "grid gap-5 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
    }, developers.map((m) => /* @__PURE__ */ React.createElement(DevloperProfile, {
      ...m
    }))))));
  }
}
export default About;
