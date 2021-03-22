import React, {Component} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {req} from "../utils/request.js";
import {errorAlert, inputAlert, successAlert, confirmAlert} from "../utils/alert.js";
import divide from "../utils/divide.js";
import {FontAwesomeIcon} from "../../_snowpack/pkg/@fortawesome/react-fontawesome.js";
import {faUser, faFileAlt, faTrash, faEdit} from "../../_snowpack/pkg/@fortawesome/free-solid-svg-icons.js";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "newest",
      searchValue: "",
      name: props.match.params.name,
      author: null,
      authorID: null,
      description: null,
      posts: [],
      NotFound: false,
      page: 0,
      allpostslength: 0
    };
  }
  async componentDidMount() {
    const res = await req({
      query: `
                query {
                    category(name: "${this.state.name}") {
                        description
                        author {
                            username
                            discriminator
                            id
                        }
                        posts {
                            _id
                            author {
                                username
                                discriminator
                                id
                            }
                            title
                            tag
                            hearts
                            views
                            comments {
                                _id
                            }
                        }
                    }
                }
            `
    });
    if (res.errors) {
      await errorAlert({
        title: "\uCE74\uD14C\uACE0\uB9AC \uBD88\uB7EC\uC624\uAE30\uB97C \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
      });
      history.back();
    } else if (!res.data.category) {
      this.setState({NotFound: true});
    } else {
      const data = res.data.category;
      this.setState({
        description: data.description,
        author: `${data.author.username}#${data.author.discriminator}`,
        allpostslength: data.posts.length,
        posts: divide(data.posts, 10),
        authorID: data.author.id
      });
    }
  }
  categoryEdit = async () => {
    const res = await inputAlert({
      title: "\uC0C8\uB85C\uC6B4 \uC124\uBA85\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694",
      confirmButtonText: "Submit",
      preConfirm: async (value) => {
        const reqResult = await req({
          query: `
                        mutation {
                            category(name: "${this.state.name}") {
                                edit(description: "${value}")
                            }
                        }
                    `
        });
        if (reqResult.data && reqResult.data.category.edit) {
          return value;
        } else {
          await errorAlert({
            title: "\uC218\uC815\uC744 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
          });
        }
      }
    });
    if (res.isConfirmed) {
      this.setState({
        description: res.value
      });
      await successAlert({
        title: "\uC218\uC815\uC744 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4"
      });
    }
  };
  categoryDelete = async () => {
    const res = await confirmAlert({
      title: "\uC815\uB9D0 \uC0AD\uC81C\uB97C \uD560\uAE4C\uC694?",
      confirmButtonText: "\uC0AD\uC81C"
    });
    console.log(this.state.name);
    if (res.isConfirmed) {
      const reqResult = await req({
        query: `
                    mutation {
                        category(name: "${this.state.name}") {
                            delete
                        }
                    }
                `
      });
      console.log(reqResult.errors);
      if (reqResult.data && reqResult.data.category.delete) {
        await successAlert({
          title: "\uC0AD\uC81C\uB97C \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4"
        });
        history.back();
      } else {
        await errorAlert({
          title: "\uC0AD\uC81C\uB97C \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
        });
      }
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const tagRegex = /#(?<tag>\S+)/g;
    let search = this.state.searchValue.replace(tagRegex, "").trim().replaceAll(/ +/g, " ");
    const tags = [...search.matchAll(tagRegex)];
    const tagText = tags.length ? `tags: [${tags}],` : "";
    console.log(`searchType: "${this.state.selectedOption}", searchQuery: "${this.state.searchValue}", ${tagText} category: "${this.state.name}"`);
    const res = await req({
      query: `
                query {
                    posts(searchType: "${this.state.selectedOption}", searchQuery: "${this.state.searchValue}", ${tagText} category: "${this.state.name}") {
                        _id
                        author {
                            username
                            discriminator
                            id
                        }
                        title
                        tag
                        hearts
                        views
                        comments {
                            _id
                        }
                    }
                }
            `
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
      className: "mt-16"
    }, !this.state.NotFound ? /* @__PURE__ */ React.createElement("div", {
      className: "w-4/5 mx-auto"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "select-none h-60 sm:h-40 px-12 pt-12 rounded-3xl shadow-xl border-black border-2 border-opacity-5 transition duration-200 ease-in-out transform hover:-translate-y-1.5 sm:flex sm:flex-column"
    }, /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, /* @__PURE__ */ React.createElement("h1", {
      className: "banner_sitename text-3xl text-black font-semibold sm:text-3xl"
    }, this.state.name), /* @__PURE__ */ React.createElement("h3", {
      className: "text-base mt-0 text-black text-md font-semibold"
    }, this.state.description)), /* @__PURE__ */ React.createElement("div", {
      className: "sm:flex-grow"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "mt-4 sm:mt-0"
    }, /* @__PURE__ */ React.createElement(Link, {
      to: `/user/${this.state.authorID}`
    }, /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      icon: faUser,
      className: "mr-2"
    }), this.state.author)), /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      icon: faFileAlt,
      className: "mr-2"
    }), this.state.allpostslength, "\uAC1C"), localStorage.user && this.state.authorID === JSON.parse(localStorage.user).id ? /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      icon: faTrash,
      className: "mr-2 cursor-pointer",
      onClick: this.categoryDelete
    }), /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      icon: faEdit,
      className: "cursor-pointer",
      onClick: this.categoryEdit
    })) : null)), /* @__PURE__ */ React.createElement("div", {
      className: "py-8"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "text-left sm:flex"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "text-2xl font-semibold text-gray-900 select-none"
    }, "\uAE00 \uBAA9\uB85D"), /* @__PURE__ */ React.createElement("div", {
      className: "sm:flex-grow"
    }), /* @__PURE__ */ React.createElement(Link, {
      to: "/newpost",
      className: "mr-2"
    }, /* @__PURE__ */ React.createElement("button", {
      className: "text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded border-r-2 mb-1 mt-2   sm:mb-0 sm:mt-0"
    }, "\uB9CC\uB4E4\uAE30!")), /* @__PURE__ */ React.createElement("div", {
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
      to: `post/${post._id}`
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
    }, "Next"))))) : /* @__PURE__ */ React.createElement("h1", null, "\uAC80\uC0C9\uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4") : /* @__PURE__ */ React.createElement("h1", null, "\uACB0\uACFC \uC218\uC9D1\uC911..."))) : /* @__PURE__ */ React.createElement("h1", {
      className: "font-black text-3xl text-center"
    }, "\uCE74\uD14C\uACE0\uB9AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"));
  }
}
export default Category;
