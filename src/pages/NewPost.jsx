import React, { Component } from 'react';

import { req } from '../utils/request';
import { errorAlert, confirmAlert } from '../utils/alert';

class NewPost extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: null,
            content: null,
            category: (new URLSearchParams(this.props.location.search)).get('category') || null,
            tag: null
        };
    }

    async componentDidMount() {
        if (!localStorage.token)
            await errorAlert({ text: '로그인이 필요한 화면입니다' })
    }

    createPost = async e => {
        e.preventDefault()
        const alertRes = await confirmAlert({
            title: '정말 작성을 할까요?',
            confirmButtonText: '작성'
        })
        if (!alertRes.isConfirmed) return;

        const res = await req({
            query: `
                mutation {
                    addPost(data: {
                        title: "${this.state.title}"
                        content: "${this.state.content}"
                        ${this.state.tag ? `tag: [${this.state.tag.filter(x => !!x)
                            .map(x => `"${x}"`)
                            .join(",")}]` : ""}
                        category: "${this.state.category}"
                    })
                }
            `
        })

        if (res.data && !!res.data.addPost) {
            this.props.history.push(`/post/${res.data.addPost}`)
        }
        else {
            await errorAlert({
                title: '작성을 실패했습니다'
            })
        }
    }

    render() {
        return (
            <div className = 'w-4/5 mx-auto mt-20'>
                <h2 className = 'text-2xl font-semibold text-gray-900 select-none'>글 작성</h2>
                <form onSubmit = {this.createPost} className = 'mt-4'>
                    <div className = 'md:flex'>
                        <input className = 'w-full h-10 appearance-none rounded-l-xl rounded-r-xl border md:rounded-r-none border-gray-400 block pl-2 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none md:w-4/5' placeholder = '제목' value = {this.state.title} onChange = {e => {
                            this.setState({ title: e.target.value })
                        }} required />
                        <input className = 'appearance-none w-full h-10 rounded-r-xl mt-2 md:mt-0 rounded-l-xl md:rounded-l-none border block md:w-1/5 bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' placeholder = '카테고리' value = {this.state.category} onChange = {e => {
                            this.setState({ category: e.target.value })
                        }} required />
                    </div>
                    <textarea className = 'w-full h-96 mt-2 appearance-none rounded-xl border border-gray-400 block pl-2 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none' placeholder = '내용' value = {this.state.content} onChange = {e => {
                        this.setState({ content: e.target.value })
                    }} required />
                    <input className = 'w-full h-10 appearance-none mt-2 rounded-l-xl rounded-r-xl border md:rounded-r-none border-gray-400 block pl-2 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none' placeholder = '태그' onChange = {e => {
                        this.setState({ tag: e.target.value.split() })
                    }} required />
                    <button type = 'submit' className = 'w-full h-10 text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl border-r-2 mt-2'>
                        작성
                    </button>
                </form>
            </div>
        )
    }
}

export default NewPost;
