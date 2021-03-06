import {Component} from "../../_snowpack/pkg/react.js";
import {req} from "../utils/request.js";
import {errorAlert} from "../utils/alert.js";
class CallBack extends Component {
  constructor() {
    super();
    this.state = {
      finishFetch: false
    };
  }
  async componentDidMount() {
    const code = new URLSearchParams(window.location.search).get("code");
    const res = await req({
      query: `
                mutation {
                    login(code: "${code}")
                }
            `
    });
    if (!res.errors) {
      const data = res.data;
      const tokenInfo = data.login;
      if (!tokenInfo)
        await errorAlert({
          title: "\uB85C\uADF8\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
        });
      else
        localStorage.token = tokenInfo;
    } else {
      const errors = res.errors;
      if (errors[0])
        await errorAlert({
          title: "\uB85C\uADF8\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4",
          text: errors[0].message
        });
      else
        await errorAlert({
          title: "\uB85C\uADF8\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"
        });
    }
    window.location.href = localStorage.previousPage || window.location.hostname;
  }
  render() {
    return null;
  }
}
export default CallBack;
