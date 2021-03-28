import React, { Component } from 'react';
import ReactMarkDown from 'react-markdown';
import { Link } from 'react-router-dom';

import { req } from '../utils/request';
import { errorAlert, successAlert, confirmAlert } from '../utils/alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faComments } from '@fortawesome/free-solid-svg-icons';

class Post extends Component {
    constructor (props) {
        super(props);
        this.state = {
            _id: props.match.params.id,
            data: null,
            notFound: false
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
                            author {
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
        })
        if (res.errors || !res.data.post) {
            this.setState({ notFound: true })
        }
        else {
            this.setState({
                data: res.data.post
            })
        }
    }

    postDelete = async () => {
        const res = await confirmAlert({
            title: '정말 삭제를 할까요?',
            confirmButtonText: '삭제'
        })
        if (res.isConfirmed) {
            const reqResult = await req({
                query: `
                    mutation {
                        post(id: "${this.state._id}") {
                            delete
                        }
                    }
                `
            })

            if (reqResult.data && reqResult.data.post.delete) {
                await successAlert({
                    title: '삭제를 성공했습니다'
                })
                history.back()
            }
            else {
                await errorAlert({
                    title: '삭제를 실패했습니다'
                })
            }
        }
    }

    render() {
        return (
            <div className = 'mt-16'>
                {
                    !this.state.notFound ? 
                        !!this.state.data ? (
                            <div className = 'w-4/5 mx-auto'>
                                <div className = '-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                    <div className = 'inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                        <table className = 'min-w-full leading-normal select-none'>
                                            <thead>
                                                <tr>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                        제목
                                                    </th>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                        제작자
                                                    </th>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                        조회수
                                                    </th>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell'>
                                                        카테고리
                                                    </th>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell'>
                                                        날짜
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                        <div className = 'flex items-center'>
                                                            <div className = 'ml-3'>
                                                                <p className = 'text-gray-900'>{this.state.data.title}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                        <Link to = {`user/${this.state.data.author.id}`}>
                                                            <p className = 'text-gray-900'>{`${this.state.data.author.username}#${this.state.data.author.discriminator}`}</p>
                                                        </Link>
                                                    </td>
                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                        <p className = 'text-gray-900'>{this.state.data.views}</p>
                                                    </td>
                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell'>
                                                        <Link to = {`category/${this.state.data.category}`}>
                                                            <p className = 'text-gray-900'>{this.state.data.category}</p>
                                                        </Link>
                                                    </td>
                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell'>
                                                        <p className = 'text-gray-900'>{new Date(this.state.data.timestamp * 1000).toLocaleDateString(undefined, {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            second: '2-digit'
                                                        })}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className = 'px-5 py-5 bg-white border-t flex flex-col xs:flex-row'>
                                            <ReactMarkDown>
                                                {this.state.data.content}
                                            </ReactMarkDown>
                                            <div className = 'flex mt-10'>
                                                <div className = 'flex-grow' />
                                                <div className = ''>
                                                    <Link to = {`editpost/${this.state._id}`}>
                                                        <FontAwesomeIcon icon = {faEdit} />
                                                    </Link>
                                                    <FontAwesomeIcon className = 'ml-2 cursor-pointer' icon = {faTrash} onClick = {this.postDelete} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className = 'px-5 py-5 bg-white border-t flex flex-col xs:flex-row'>
                                            <div className = ''>
                                                <h1 className = 'text-xl'>
                                                    <FontAwesomeIcon icon = {faComments} className = 'mr-1' />
                                                    <b>{this.state.data.comments.length}개</b>
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h1 className = 'font-black text-3xl text-center'>글을 가져오는 중입니다</h1>
                        )
                    : (
                        <h1 className = 'font-black text-3xl text-center'>글이 없습니다</h1>
                    )
                }
            </div>
        )
    }
}

export default Post;
