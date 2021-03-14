import React, {Component} from "../../_snowpack/pkg/react.js";
class NoIE extends Component {
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "mt-16 text-center select-none"
    }, /* @__PURE__ */ React.createElement("img", {
      className: "mx-auto",
      src: "https://arklign.com/wp-content/uploads/2019/07/no-ie-475x280.jpg",
      alt: "noie"
    }), /* @__PURE__ */ React.createElement("h1", {
      className: "text-4xl font-black mt-4"
    }, "Don't use IE!!"), /* @__PURE__ */ React.createElement("a", {
      href: "https://death-to-ie11.com/"
    }, /* @__PURE__ */ React.createElement("button", {
      className: "border-2 border-blue-500 rounded-md py-1 px-24 bg-blue-500 text-white font-black mt-4 transition duration-200 ease-in-out transform hover:bg-blue-600"
    }, "Why?")));
  }
}
export default NoIE;
