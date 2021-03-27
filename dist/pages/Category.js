import React, {Component} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {req} from "../utils/request.js";
import {errorAlert, inputAlert, successAlert, confirmAlert} from "../utils/alert.js";
import PostList from "../components/PostList.js";
import {FontAwesomeIcon} from "../../_snowpack/pkg/@fortawesome/react-fontawesome.js";
import {faUser, faFileAlt, faTrash, faEdit} from "../../_snowpack/pkg/@fortawesome/free-solid-svg-icons.js";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.match.params.name,
      author: null,
      authorID: null,
      description: null,
      NotFound: false,
      postlength: 0
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
        authorID: data.author.id,
        postlength: data.posts.length
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
    }), this.state.postlength, "\uAC1C"), localStorage.user && this.state.authorID === JSON.parse(localStorage.user).id ? /* @__PURE__ */ React.createElement("div", {
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
    }, /* @__PURE__ */ React.createElement(PostList, {
      category: this.state.name
    }))) : /* @__PURE__ */ React.createElement("h1", {
      className: "font-black text-3xl text-center"
    }, "\uCE74\uD14C\uACE0\uB9AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"));
  }
}
export default Category;
