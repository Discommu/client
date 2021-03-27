import React, {Component} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {FontAwesomeIcon} from "../../_snowpack/pkg/@fortawesome/react-fontawesome.js";
import {faAngleDown, faBars} from "../../_snowpack/pkg/@fortawesome/free-solid-svg-icons.js";
import {req} from "../utils/request.js";
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      loginURL: "",
      user: null,
      popUp: false
    };
  }
  async componentDidMount() {
    try {
      this.setState({user: JSON.parse(localStorage.user)});
    } catch {
      delete localStorage.user;
    }
    if (localStorage.token && !localStorage.user) {
      const r = await req({
        query: `
                    query {
                        me {
                            id
                            username
                            avatarURL
                            discriminator
                        }
                    }
                `
      });
      console.log(r);
      if (r.error) {
        delete localStorage.token;
        this.setState({user: null});
      } else {
        this.setState({user: r.data.me});
        localStorage.user = JSON.stringify(r.data.me);
      }
    } else if (!localStorage.token && !localStorage.user)
      this.setState({user: null});
    if (localStorage.loginURL)
      this.setState({loginURL: localStorage.loginURL});
    else {
      const r = await req({
        query: `
                    query {
                        loginURL
                    }
                `
      });
      this.setState({loginURL: r.data.loginURL});
      localStorage.loginURL = this.state.loginURL;
    }
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      className: "border-b h-10 fixed top-0 left-0 w-full flex pl-4 items-center bg-white dark:bg-grey-900 z-50"
    }, /* @__PURE__ */ React.createElement(Link, {
      to: "/"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex-none text-lg select-none",
      style: {fontFamily: "Open Sans, sans-serif"}
    }, "DISCOMMU")), /* @__PURE__ */ React.createElement("div", {
      className: "hidden flex-none sm:flex",
      style: {fontFamily: "Roboto, sans-serif"}
    }, /* @__PURE__ */ React.createElement(Link, {
      to: "/commu",
      className: "pl-5 pr-5 hover:cursor-pointer select-none hover:text-gray-700"
    }, "\uAC8C\uC2DC\uD310"), /* @__PURE__ */ React.createElement(Link, {
      to: "/categories",
      className: "pr-5 hover:cursor-pointer select-none hover:text-gray-700"
    }, "\uCE74\uD14C\uACE0\uB9AC")), /* @__PURE__ */ React.createElement("div", {
      className: "flex-grow"
    }), this.state.user ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      className: "sm:hidden",
      onClick: () => this.setState({popUp: !this.state.popUp})
    }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      icon: faBars,
      className: "mr-5"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "hidden sm:flex"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex cursor-pointer items-center select-none",
      onClick: () => this.setState({popUp: !this.state.popUp})
    }, /* @__PURE__ */ React.createElement("img", {
      src: this.state.user.avatarURL,
      className: "rounded-full w-7 h-7 mr-2"
    }), /* @__PURE__ */ React.createElement("h4", {
      className: "pr-2"
    }, this.state.user.username.length > 10 ? `${this.state.user.username.slice(0, 10)}...` : this.state.user.username, "#", this.state.user.discriminator), /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      icon: faAngleDown,
      className: "mr-5"
    })), this.state.popUp ? /* @__PURE__ */ React.createElement("div", {
      className: "mt-9 origin-top-right absolute right-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "py-1",
      role: "menu",
      "aria-orientation": "vertical",
      "aria-labelledby": "options-menu"
    }, /* @__PURE__ */ React.createElement(Link, {
      to: `/user/${this.state.user.id}`,
      className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }, "\uD504\uB85C\uD544"), /* @__PURE__ */ React.createElement("button", {
      onClick: () => {
        delete localStorage.token;
        delete localStorage.user;
        location.reload();
      },
      className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
    }, "\uB85C\uADF8\uC544\uC6C3"))) : null)) : /* @__PURE__ */ React.createElement("a", {
      href: this.state.loginURL,
      className: "select-none pr-5"
    }, "\uB85C\uADF8\uC778")), this.state.popUp ? /* @__PURE__ */ React.createElement("div", {
      className: "bg-white w-full fixed mt-10 border-b z-50 sm:hidden"
    }, /* @__PURE__ */ React.createElement(Link, {
      to: "commu",
      className: "flex cursor-pointer items-center px-4 py-1 w-full h-8 flex text-m text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }, /* @__PURE__ */ React.createElement("h4", {
      className: "pr-2 select-none"
    }, "\uAC8C\uC2DC\uD310")), /* @__PURE__ */ React.createElement(Link, {
      to: "categories",
      className: "border-t flex cursor-pointer items-center px-4 py-1 w-full h-8 flex text-m text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }, /* @__PURE__ */ React.createElement("h4", {
      className: "pr-2 select-none"
    }, "\uCE74\uD14C\uACE0\uB9AC")), /* @__PURE__ */ React.createElement("button", {
      onClick: () => {
        delete localStorage.token;
        delete localStorage.user;
        location.reload();
      },
      className: "border-t px-4 py-1 w-full h-8 flex text-m text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }, "\uB85C\uADF8\uC544\uC6C3"), /* @__PURE__ */ React.createElement(Link, {
      to: `/user/${this.state.user.id}`,
      className: "border-t flex cursor-pointer items-center px-4 py-1 w-full h-8 flex text-m text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }, /* @__PURE__ */ React.createElement("img", {
      src: this.state.user.avatarURL,
      className: "rounded-full w-7 h-7 mr-2"
    }), /* @__PURE__ */ React.createElement("h4", {
      className: "pr-2 select-none"
    }, this.state.user.username.length > 10 ? `${this.state.user.username.slice(0, 10)}...` : this.state.user.username, "#", this.state.user.discriminator))) : null);
  }
}
export default NavBar;
