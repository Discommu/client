import { Component } from 'react';

import { req } from '../utils/request';
import { errorAlert } from '../utils/alert';

class CallBack extends Component {
    constructor () {
        super();
        this.state = {
            finishFetch: false
        };
    }

    async componentDidMount() {
        const code = (new URLSearchParams(window.location.search)).get('code')
        const res = await req({
            query: `
                mutation {
                    login(code: "${code}")
                }
            `
        })
        if (!res.errors) {
            const data = res.data
            const tokenInfo = data.login
            if (!tokenInfo)
                await errorAlert({
                    title: '로그인에 실패했습니다'
                })
            else
                localStorage.token = tokenInfo
        }
        else {
            const errors = res.errors
            if (errors[0])
                await errorAlert({
                    title: '로그인에 실패했습니다',
                    text: errors[0].message
                })
            else
                await errorAlert({
                    title: '로그인에 실패했습니다'
                })
        }
        window.location.href = localStorage.previousPage || window.location.hostname
    }

    render() {
        return null;
    }
}

export default CallBack;