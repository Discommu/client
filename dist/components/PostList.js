import React, {Component} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {getPosts} from "../utils/getAPI.js";
import {errorAlert} from "../utils/alert.js";
import divide from "../utils/divide.js";
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "newest",
      searchValue: "",
      posts: [],
      page: 0,
      allpostslength: 0,
      notFound: false
    };
  }
  async componentDidMount() {
    const res = await getPosts(this.props ? {...this.props} : void 0);
    if (res.errors) {
      await errorAlert({
        title: "\uAE00 \uBD88\uB7EC\uC624\uAE30\uB97C \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
      });
      history.back();
    } else if (!res.data.posts) {
      this.setState({notFound: true});
    } else {
      const data = res.data.posts;
      this.setState({
        allpostslength: data.length,
        posts: divide(data, 10)
      });
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const tagRegex = /#(?<tag>\S+)/g;
    let search = this.state.searchValue.replace(tagRegex, "").trim().replaceAll(/ +/g, " ");
    const res = await getPosts({
      searchValue: this.state.searchValue,
      selectedOption: this.state.selectedOption,
      category: this.state.name,
      tags: [...search.matchAll(this.state.searchValue.replace(tagRegex, "").trim().replaceAll(/ +/g, " "))]
    });
    if (res.errors) {
      await errorAlert({
        title: "\uAE00 \uAC80\uC0C9\uC744 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
      });
    } else {
      this.setState({
        allpostslength: res.data.posts.length,
        posts: divide(res.data.posts, 10)
      });
    }
  };
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, /* @__PURE__ */ React.createElement("div", {
      className: "text-left sm:flex"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "text-2xl font-semibold text-gray-900 select-none"
    }, "\uAE00 \uBAA9\uB85D"), /* @__PURE__ */ React.createElement("div", {
      className: "sm:flex-grow"
    }), /* @__PURE__ */ React.createElement(Link, {
      to: `/newpost${!!this.props.category ? `?category=${this.props.category}` : ""}`,
      className: "mr-2"
    }, /* @__PURE__ */ React.createElement("button", {
      className: "text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded border-r-2 mb-1 mt-2   sm:mb-0 sm:mt-0"
    }, "\uC791\uC131")), /* @__PURE__ */ React.createElement("div", {
      className: "flex sm:flex-row flex-col"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row mb-1 sm:mb-0"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "relative"
    }, /* @__PURE__ */ React.createElement("select", {
      className: "appearance-none h-full rounded-r rounded-l sm:rounded-r-none border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
      onChange: (e) => {
        this.setState({selectedOption: e.target.value});
      }
    }, [
      {value: "newest", label: "\uCD5C\uC2E0 \uC81C\uC791\uC21C"},
      {value: "alphabet", label: "\u3131\u3134\u3137 \uC21C"},
      {value: "hearts", label: "\uD558\uD2B8 \uAC1C\uC218 \uC21C"},
      {value: "views", label: "\uC870\uD68C\uC218 \uC21C"}
    ].map((i) => /* @__PURE__ */ React.createElement("option", {
      value: i.value
    }, i.label))), /* @__PURE__ */ React.createElement("div", {
      className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    }, /* @__PURE__ */ React.createElement("svg", {
      className: "fill-current h-4 w-4",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }, /* @__PURE__ */ React.createElement("path", {
      d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
    }))))), /* @__PURE__ */ React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /* @__PURE__ */ React.createElement("div", {
      className: "block relative"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "h-full absolute inset-y-0 left-0 flex items-center pl-2"
    }, /* @__PURE__ */ React.createElement("svg", {
      viewBox: "0 0 24 24",
      className: "h-4 w-4 fill-current text-gray-500"
    }, /* @__PURE__ */ React.createElement("path", {
      d: "M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
    }))), /* @__PURE__ */ React.createElement("input", {
      placeholder: "Search",
      className: "appearance-none rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none",
      onChange: (e) => {
        this.setState({searchValue: e.target.value});
      }
    }))))), !(this.state.posts === null) ? !!this.state.posts.length ? /* @__PURE__ */ React.createElement("div", {
      className: "-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "inline-block min-w-full shadow rounded-lg overflow-hidden"
    }, /* @__PURE__ */ React.createElement("table", {
      className: "min-w-full leading-normal select-none"
    }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
    }, "\uC81C\uBAA9"), /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell"
    }, "\uAE00\uC4F4\uC774"), /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
    }, "\uC870\uD68C\uC218"), /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell"
    }, "\uD558\uD2B8"), /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell"
    }, "\uB313\uAE00"), /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
    }, "\uC785\uC7A5"))), /* @__PURE__ */ React.createElement("tbody", null, this.state.posts[this.state.page].map((post) => /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex items-center"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "ml-3"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, post.title)))), /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, `${post.author.username}#${post.author.discriminator}`)), /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, post.views)), /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, post.hearts.length)), /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, post.comments.length)), /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm"
    }, /* @__PURE__ */ React.createElement(Link, {
      to: `/post/${post._id}`,
      replace: true
    }, /* @__PURE__ */ React.createElement("button", {
      className: "text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded border-r-2"
    }, "\uC785\uC7A5"))))))), /* @__PURE__ */ React.createElement("div", {
      className: "px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "text-xs cursor-default select-none xs:text-sm text-gray-900"
    }, "Showing ", this.state.page * 10 + 1, " to ", this.state.page * 10 + this.state.posts[this.state.page].length, " of ", this.state.allpostslength, " Posts"), /* @__PURE__ */ React.createElement("div", {
      className: "inline-flex mt-2 xs:mt-0"
    }, /* @__PURE__ */ React.createElement("button", {
      className: `text-sm bg-gray-300 ${!this.state.page ? "cursor-default" : "hover:bg-gray-400"} text-gray-800 font-semibold py-2 px-4 rounded-l border-r-2 border-gray-200`,
      onClick: () => {
        if (!this.state.page)
          return;
        this.setState((s) => {
          return {page: s.page - 1};
        });
      }
    }, "Prev"), /* @__PURE__ */ React.createElement("button", {
      className: `text-sm bg-gray-300 ${this.state.page === this.state.posts.length - 1 ? "cursor-default" : "hover:bg-gray-400"} text-gray-800 font-semibold py-2 px-4 rounded-r border-l-2 border-gray-200`,
      onClick: () => {
        if (this.state.page === this.state.posts.length - 1)
          return;
        this.setState((s) => {
          return {page: s.page + 1};
        });
      }
    }, "Next"))))) : /* @__PURE__ */ React.createElement("h1", null, "\uAC80\uC0C9\uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4") : /* @__PURE__ */ React.createElement("h1", null, "\uAC80\uC0C9\uC911..."));
  }
}
export default PostList;
