import React, { Component } from 'react';
import ReactMarkDown from 'react-markdown';
import { Link } from 'react-router-dom';

import timetoString from '../utils/timetoString';
import { req } from '../utils/request';
import { errorAlert, successAlert, confirmAlert } from '../utils/alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faComments } from '@fortawesome/free-solid-svg-icons';

class Post extends Component {
    constructor (props) {
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
                            content
                            timestamp
                            reply
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
            const data = res.data.post
            this.setState({
                title: data.title,
                timestamp: timetoString(data.timestamp),
                content: data.content,
                authorID: data.author.id,
                author: `${data.author.username}#${data.author.discriminator}`,
                category: data.category,
                comments: data.comments,
                hearts: data.hearts,
                views: data.views,
                tag: data.tag
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

    newComment = async e => {
        e.preventDefault()
        if (!this.state.commentContent) return

        const res = await req({
            query: `
                mutation {
                    post(id: "${this.state._id}") {
                        addComment(content: "${this.state.commentContent}")
                    }
                }
            `
        })

        if (res.data && res.data.post.addComment) {
            const commentsRes = await req({
                query: `
                    query {
                        post(id: "${this.state._id}") {
                            comments {
                                content
                                timestamp
                                reply
                                author {
                                    id
                                    username
                                    discriminator
                                }
                            }
                        }
                    }
                `
            })
            if (commentsRes.data)
                this.setState({
                    commentContent: '',
                    comments:  commentsRes.data.post.comments
                })
            else
                this.setState({
                    commentContent: ''
                })
        }
        else {
            await errorAlert({
                title: '등록을 실패했습니다'
            })
        }
    }

    render() {
        return (
            <div className = 'mt-16'>
                {
                    !this.state.notFound ? 
                        !!this.state.title ? (
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
                                                                <p className = 'text-gray-900'>{this.state.title}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                        <Link to = {`user/${this.state.authorID}`}>
                                                            <p className = 'text-gray-900'>{this.state.author}</p>
                                                        </Link>
                                                    </td>
                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                        <p className = 'text-gray-900'>{this.state.views}</p>
                                                    </td>
                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell'>
                                                        <Link to = {`category/${this.state.category}`}>
                                                            <p className = 'text-gray-900'>{this.state.category}</p>
                                                        </Link>
                                                    </td>
                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell'>
                                                        <p className = 'text-gray-900'>{this.state.timestamp}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className = 'px-5 py-5 bg-white border-t flex flex-col xs:flex-row'>
                                            <ReactMarkDown>
                                                {this.state.content}
                                            </ReactMarkDown>
                                            <div className = 'flex mt-10'>
                                                <div className = ''>
                                                    {this.state.tag.map(tag => (
                                                        <div className = 'text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full mr-1'>#{tag}</div>
                                                    ))}
                                                </div>
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
                                                    <b>{this.state.comments.length}개</b>
                                                </h1>
                                            </div>
                                            <div className = 'flex mx-2 mb-4'>
                                                <form className = 'bg-white px-4 pt-2 w-full' onSubmit = {this.newComment}>
                                                    <div className = 'flex flex-wrap -mx-3 mb-6'>
                                                        <div className = 'px-3 mb-2 mt-2 w-full'>
                                                            <textarea value = {this.state.commentContent} className = 'bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white' name = 'body' placeholder = '새 댓글' required onChange = {e => {
                                                                this.setState({ commentContent: e.target.value })
                                                            }} />
                                                        </div>
                                                        <div className = 'flex items-start md:w-full px-3'>
                                                            <div className = '-mr-1'>
                                                                <input type = 'submit' className = 'text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded border-r-2' value = '등록'/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className = ''>
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
