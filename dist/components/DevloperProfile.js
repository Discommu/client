import React from "../../_snowpack/pkg/react.js";
const DevloperProfile = ({iconURL, name, role, github}) => /* @__PURE__ */ React.createElement("a", {
  href: `https://github.com/${github}`
}, /* @__PURE__ */ React.createElement("div", {
  class: "flex flex-col items-center justify-center bg-white p-4 shadow-2xl rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1.5"
}, /* @__PURE__ */ React.createElement("div", {
  className: "inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40"
}, /* @__PURE__ */ React.createElement("img", {
  src: iconURL,
  alt: `${name} icon`,
  className: "h-full w-full"
})), /* @__PURE__ */ React.createElement("h2", {
  className: "mt-4 font-bold text-xl"
}, name), /* @__PURE__ */ React.createElement("h5", {
  className: "mt-2 text-md font-medium"
}, role)));
export default DevloperProfile;
