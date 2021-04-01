import React, {Component} from "../../_snowpack/pkg/react.js";
import ReactMarkDown from "../../_snowpack/pkg/react-markdown.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import timetoString from "../utils/timetoString.js";
import {req} from "../utils/request.js";
import {errorAlert, successAlert, confirmAlert} from "../utils/alert.js";
import {FontAwesomeIcon} from "../../_snowpack/pkg/@fortawesome/react-fontawesome.js";
import {faTrash, faEdit, faComments} from "../../_snowpack/pkg/@fortawesome/free-solid-svg-icons.js";
import {ThemeProvider} from "../../_snowpack/pkg/styled-components.js";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.match.params.id,
      title: null,
      timestamp: 0,
      content: null,
      authorID: null,
      author: null,
      category: null,
      comments: [],
      hearts: [],
      views: 0,
      tag: [],
      commentContent: null,
      notFound: false,
      editContent: {}
    };
  }
  async componentDidMount() {
    const res = await req({
      query: `
                query {
                    post(id: "${this.state._id}") {
                        title
                        timestamp
                        content
                        author {
                            id
                            username
                            discriminator
                        }
                        category
                        comments {
                            _id
                            content
                            timestamp
                            reply
                            author {
                                avatarURL
                                id
                                username
                                discriminator
                            }
                        }
                        hearts
                        views
                        tag
                      }
                }
            `
    });
    if (res.errors || !res.data.post) {
      this.setState({notFound: true});
    } else {
      const data = res.data.post;
      this.setState({
        title: data.title,
        timestamp: timetoString(data.timestamp),
        content: data.content,
        authorID: data.author.id,
        author: `${data.author.username}#${data.author.discriminator}`,
        category: data.category,
        comments: this.formatComments(data.comments),
        hearts: data.hearts,
        views: data.views,
        tag: data.tag
      });
    }
  }
  postDelete = async () => {
    const res = await confirmAlert({
      title: "\uC815\uB9D0 \uC0AD\uC81C\uB97C \uD560\uAE4C\uC694?",
      confirmButtonText: "\uC0AD\uC81C"
    });
    if (res.isConfirmed) {
      const reqResult = await req({
        query: `
                    mutation {
                        post(id: "${this.state._id}") {
                            delete
                        }
                    }
                `
      });
      if (reqResult.data && reqResult.data.post.delete) {
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
  formatComments = (comments) => comments.map((comment) => {
    return {
      ...comment,
      editing: false
    };
  }).reverse();
  newComment = async (e) => {
    e.preventDefault();
    if (!this.state.commentContent)
      return;
    const res = await req({
      query: `
                mutation {
                    post(id: "${this.state._id}") {
                        addComment(content: "${this.state.commentContent}")
                    }
                }
            `
    });
    if (res.data && res.data.post.addComment) {
      const commentsRes = await req({
        query: `
                    query {
                        post(id: "${this.state._id}") {
                            comments {
                                _id
                                content
                                timestamp
                                reply
                                author {
                                    avatarURL
                                    id
                                    username
                                    discriminator
                                }
                            }
                        }
                    }
                `
      });
      if (commentsRes.data)
        this.setState({
          commentContent: "",
          comments: this.formatComments(commentsRes.data.post.comments)
        });
      else
        this.setState({
          commentContent: ""
        });
    } else {
      await errorAlert({
        title: "\uB4F1\uB85D\uC744 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
      });
    }
  };
  commentDelete = async (id) => {
    const res = await confirmAlert({
      title: "\uC815\uB9D0 \uC0AD\uC81C\uB97C \uD560\uAE4C\uC694?",
      confirmButtonText: "\uC0AD\uC81C"
    });
    if (res.isConfirmed) {
      const reqResult = await req({
        query: `
                    mutation {
                        comment(id: "${id}") {
                            delete
                        }
                    }
                `
      });
      if (reqResult.data && reqResult.data.comment.delete) {
        const commentsRes = await req({
          query: `
                        query {
                            post(id: "${this.state._id}") {
                                comments {
                                    _id
                                    content
                                    timestamp
                                    reply
                                    author {
                                        avatarURL
                                        id
                                        username
                                        discriminator
                                    }
                                }
                            }
                        }
                    `
        });
        if (commentsRes.data)
          this.setState({
            comments: this.formatComments(commentsRes.data.post.comments)
          });
      } else {
        await errorAlert({
          title: "\uC0AD\uC81C\uB97C \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
        });
      }
    }
  };
  commentEdit = async (id) => {
  };
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "mt-16"
    }, !this.state.notFound ? !!this.state.title ? /* @__PURE__ */ React.createElement("div", {
      className: "w-4/5 mx-auto"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "inline-block min-w-full shadow rounded-lg overflow-hidden"
    }, /* @__PURE__ */ React.createElement("table", {
      className: "min-w-full leading-normal select-none"
    }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
    }, "\uC81C\uBAA9"), /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
    }, "\uC81C\uC791\uC790"), /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
    }, "\uC870\uD68C\uC218"), /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell"
    }, "\uCE74\uD14C\uACE0\uB9AC"), /* @__PURE__ */ React.createElement("th", {
      className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell"
    }, "\uB0A0\uC9DC"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex items-center"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "ml-3"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, this.state.title)))), /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm"
    }, /* @__PURE__ */ React.createElement(Link, {
      to: `/user/${this.state.authorID}`
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, this.state.author))), /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, this.state.views)), /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell"
    }, /* @__PURE__ */ React.createElement(Link, {
      to: `/category/${this.state.category}`
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, this.state.category))), /* @__PURE__ */ React.createElement("td", {
      className: "px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-900"
    }, this.state.timestamp))))), /* @__PURE__ */ React.createElement("div", {
      className: "px-5 py-5 bg-white border-t flex flex-col xs:flex-row"
    }, /* @__PURE__ */ React.createElement(ReactMarkDown, null, this.state.content), /* @__PURE__ */ React.createElement("div", {
      className: "flex mt-10"
    }, /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, this.state.tag.map((tag) => /* @__PURE__ */ React.createElement(Link, {
      to: `/tag/${tag}`
    }, /* @__PURE__ */ React.createElement("div", {
      className: "text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full mr-1"
    }, "#", tag)))), /* @__PURE__ */ React.createElement("div", {
      className: "flex-grow"
    }), localStorage.user && this.state.authorID === JSON.parse(localStorage.user).id ? /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, /* @__PURE__ */ React.createElement(Link, {
      to: `/editpost/${this.state._id}`
    }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      icon: faEdit
    })), /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      className: "ml-2 cursor-pointer",
      icon: faTrash,
      onClick: this.postDelete
    })) : null)), /* @__PURE__ */ React.createElement("div", {
      className: "px-5 py-5 bg-white border-t flex flex-col xs:flex-row"
    }, /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, /* @__PURE__ */ React.createElement("h1", {
      className: "text-xl"
    }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      icon: faComments,
      className: "mr-1"
    }), /* @__PURE__ */ React.createElement("b", null, this.state.comments.length, "\uAC1C"))), /* @__PURE__ */ React.createElement("div", {
      className: "flex mx-2 mb-4"
    }, /* @__PURE__ */ React.createElement("form", {
      className: "bg-white px-4 pt-2 w-full",
      onSubmit: this.newComment
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-wrap -mx-3"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "px-3 mb-2 mt-2 w-full"
    }, /* @__PURE__ */ React.createElement("textarea", {
      value: this.state.commentContent,
      className: "bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white",
      name: "body",
      placeholder: "\uC0C8 \uB313\uAE00",
      required: true,
      onChange: (e) => {
        this.setState({commentContent: e.target.value});
      }
    })), /* @__PURE__ */ React.createElement("div", {
      className: "flex items-start md:w-full px-3"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "-mr-1"
    }, /* @__PURE__ */ React.createElement("input", {
      type: "submit",
      className: "text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded border-r-2",
      value: "\uB4F1\uB85D"
    })))))), /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, this.state.comments.map((comment) => /* @__PURE__ */ React.createElement("div", {
      className: "shadow-xl w-full mt-2 px-4 py-2 border-2 border-gray-100 rounded-xl"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex"
    }, /* @__PURE__ */ React.createElement(Link, {
      to: `/user/${comment.author.id}`,
      className: "flex items-center"
    }, /* @__PURE__ */ React.createElement("img", {
      src: comment.author.avatarURL,
      alt: "User's avatar",
      className: "w-8 h-8 rounded-full mr-2"
    }), /* @__PURE__ */ React.createElement("p", {
      className: "font-medium"
    }, comment.author.username, "#", comment.author.discriminator)), /* @__PURE__ */ React.createElement("div", {
      className: "flex-grow"
    }), /* @__PURE__ */ React.createElement("p", {
      className: "font-medium"
    }, timetoString(comment.timestamp))), comment.editing ? /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, /* @__PURE__ */ React.createElement("form", {
      onSubmit: () => this.commentEdit(comment._id)
    }, /* @__PURE__ */ React.createElement("input", {
      placeholder: "\uC218\uC815 \uB0B4\uC6A9",
      value: comment.content,
      className: "bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white",
      onChange: (e) => {
        this.setState((state) => {
          return {
            editContent: {
              ...editContent,
              [comment._id]: e.target.value
            }
          };
        });
      }
    }))) : /* @__PURE__ */ React.createElement("div", {
      className: "mt-1 flex"
    }, comment.content, /* @__PURE__ */ React.createElement("div", {
      className: "flex-grow"
    }), localStorage.user && comment.author.id === JSON.parse(localStorage.user).id ? /* @__PURE__ */ React.createElement("div", {
      className: ""
    }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      className: "ml-2 cursor-pointer",
      icon: faEdit,
      onClick: () => {
        this.setState((state) => {
          return {
            comments: this.formatComments(state.comments.map((_comment) => {
              if (_comment._id === comment._id) {
                const newComment = {
                  ..._comment,
                  editing: true
                };
                return newComment;
              }
            }))
          };
        });
      }
    }), /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
      className: "ml-2 cursor-pointer",
      icon: faTrash,
      onClick: () => this.commentDelete(comment._id)
    })) : null)))))))) : /* @__PURE__ */ React.createElement("h1", {
      className: "font-black text-3xl text-center"
    }, "\uAE00\uC744 \uAC00\uC838\uC624\uB294 \uC911\uC785\uB2C8\uB2E4") : /* @__PURE__ */ React.createElement("h1", {
      className: "font-black text-3xl text-center"
    }, "\uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"));
  }
}
export default Post;
