import React, {Component} from "../../_snowpack/pkg/react.js";
import {req} from "../utils/request.js";
import {errorAlert, confirmAlert} from "../utils/alert.js";
class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: null,
      category: new URLSearchParams(this.props.location.search).get("category") || null,
      tag: null
    };
  }
  async componentDidMount() {
    if (!localStorage.token)
      await errorAlert({text: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD55C \uD654\uBA74\uC785\uB2C8\uB2E4"});
  }
  createPost = async (e) => {
    e.preventDefault();
    const alertRes = await confirmAlert({
      title: "\uC815\uB9D0 \uC791\uC131\uC744 \uD560\uAE4C\uC694?",
      confirmButtonText: "\uC791\uC131"
    });
    if (!alertRes.isConfirmed)
      return;
    const res = await req({
      query: `
                mutation {
                    addPost(data: {
                        title: "${this.state.title}"
                        content: "${this.state.content}"
                        ${this.state.tag ? `tag: [${this.state.tag.filter((x) => !!x).map((x) => `"${x}"`).join(",")}]` : ""}
                        category: "${this.state.category}"
                    })
                }
            `
    });
    if (res.data && !!res.data.addPost) {
      this.props.history.push(`/post/${res.data.addPost}`);
    } else {
      await errorAlert({
        title: "\uC791\uC131\uC744 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
      });
    }
  };
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "w-4/5 mx-auto mt-20"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "text-2xl font-semibold text-gray-900 select-none"
    }, "\uAE00 \uC791\uC131"), /* @__PURE__ */ React.createElement("form", {
      onSubmit: this.createPost,
      className: "mt-4"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "md:flex"
    }, /* @__PURE__ */ React.createElement("input", {
      className: "w-full h-10 appearance-none rounded-l-xl rounded-r-xl border md:rounded-r-none border-gray-400 block pl-2 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none md:w-4/5",
      placeholder: "\uC81C\uBAA9",
      value: this.state.title,
      onChange: (e) => {
        this.setState({title: e.target.value});
      },
      required: true
    }), /* @__PURE__ */ React.createElement("input", {
      className: "appearance-none w-full h-10 rounded-r-xl mt-2 md:mt-0 rounded-l-xl md:rounded-l-none border block md:w-1/5 bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
      placeholder: "\uCE74\uD14C\uACE0\uB9AC",
      value: this.state.category,
      onChange: (e) => {
        this.setState({category: e.target.value});
      },
      required: true
    })), /* @__PURE__ */ React.createElement("textarea", {
      className: "w-full h-96 mt-2 appearance-none rounded-xl border border-gray-400 block pl-2 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none",
      placeholder: "\uB0B4\uC6A9",
      value: this.state.content,
      onChange: (e) => {
        this.setState({content: e.target.value});
      },
      required: true
    }), /* @__PURE__ */ React.createElement("input", {
      className: "w-full h-10 appearance-none mt-2 rounded-l-xl rounded-r-xl border md:rounded-r-none border-gray-400 block pl-2 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none",
      placeholder: "\uD0DC\uADF8",
      onChange: (e) => {
        this.setState({tag: e.target.value.split(" ")});
      },
      required: true
    }), /* @__PURE__ */ React.createElement("button", {
      type: "submit",
      className: "w-full h-10 text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl border-r-2 mt-2"
    }, "\uC791\uC131")));
  }
}
export default NewPost;
