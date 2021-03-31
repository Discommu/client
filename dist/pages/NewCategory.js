import React, {Component} from "../../_snowpack/pkg/react.js";
import {req} from "../utils/request.js";
import {errorAlert, confirmAlert} from "../utils/alert.js";
class NewCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null
    };
  }
  async componentDidMount() {
    if (!localStorage.token)
      await errorAlert({text: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD55C \uD654\uBA74\uC785\uB2C8\uB2E4"});
  }
  createCategory = async (e) => {
    e.preventDefault();
    const alertRes = await confirmAlert({
      title: "\uC815\uB9D0 \uC0DD\uC131\uC744 \uD560\uAE4C\uC694?",
      confirmButtonText: "\uC0DD\uC131"
    });
    if (!alertRes.isConfirmed)
      return;
    const res = await req({
      query: `
                mutation {
                    addCategory(data: {
                        name: "${this.state.name}"
                        description: "${this.state.description}"
                    })
                }
            `
    });
    if (res.data && res.data.addCategory) {
      this.props.history.push(`/category/${this.state.name}`);
    } else {
      await errorAlert({
        title: "\uC0DD\uC131\uC744 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
      });
    }
  };
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "w-4/5 mx-auto mt-20"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "text-2xl font-semibold text-gray-900 select-none"
    }, "\uCE74\uD14C\uACE0\uB9AC \uC0DD\uC131"), /* @__PURE__ */ React.createElement("form", {
      onSubmit: this.createCategory,
      className: "mt-4"
    }, /* @__PURE__ */ React.createElement("input", {
      className: "w-full h-10 appearance-none rounded-xl border border-gray-400 block pl-2 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none",
      placeholder: "\uC774\uB984",
      onChange: (e) => {
        this.setState({name: e.target.value});
      },
      required: true
    }), /* @__PURE__ */ React.createElement("input", {
      className: "w-full h-10 mt-2 appearance-none rounded-xl border border-gray-400 block pl-2 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none",
      placeholder: "\uC124\uBA85",
      onChange: (e) => {
        this.setState({description: e.target.value});
      },
      required: true
    }), /* @__PURE__ */ React.createElement("button", {
      type: "submit",
      className: "w-full h-10 text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl border-r-2 mt-2"
    }, "\uB9CC\uB4E4\uAE30!")));
  }
}
export default NewCategory;
