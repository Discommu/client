import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { req } from '../utils/request';
import { errorAlert, inputAlert, successAlert, confirmAlert } from '../utils/alert';
import divide from '../utils/divide';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

class Category extends Component {
    constructor (props) {
        super(props);
        this.state = {
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
        })
        if (res.errors) {
            await errorAlert({
                title: '카테고리 불러오기를 실패했습니다'
            })
            history.back()
        }
        else if (!res.data.category) {
            this.setState({ NotFound: true })
        }
        else {
            const data = res.data.category
            this.setState({
                description: data.description,
                author: `${data.author.username}#${data.author.discriminator}`,
                allpostslength: data.posts.length,
                posts: divide(data.posts, 10),
                authorID: data.author.id
            })
            console.log(this.state.allpostslength)
        }
    }

    categoryEdit = async () => {
        const res = await inputAlert({
            title: '새로운 설명을 입력해주세요',
            confirmButtonText: 'Submit',
            preConfirm: async value => {
                const reqResult = await req({
                    query: `
                        mutation {
                            category(name: "${this.state.name}") {
                                edit(description: "${value}")
                            }
                        }
                    `
                })

                if (reqResult.data && reqResult.data.category.edit) {
                    return value
                }
                else {
                    await errorAlert({
                        title: '수정을 실패했습니다'
                    })
                }
            }
        })
        if (res.isConfirmed) {
            this.setState({
                description: res.value
            })
            await successAlert({
                title: '수정을 성공했습니다'
            })
        }
    }

    categoryDelete = async () => {
        const res = await confirmAlert({
            title: '정말 삭제를 할까요?',
            confirmButtonText: '삭제'
        })
        console.log(this.state.name)
        if (res.isConfirmed) {
            const reqResult = await req({
                query: `
                    mutation {
                        category(name: "${this.state.name}") {
                            delete
                        }
                    }
                `
            })

            console.log(reqResult.errors)
            if (reqResult.data && reqResult.data.category.delete) {
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
                    !this.state.NotFound ? (
                        <div className = 'w-4/5 mx-auto'>
                            <div className = 'select-none h-60 sm:h-40 px-12 pt-12 rounded-3xl shadow-xl border-black border-2 border-opacity-5 transition duration-200 ease-in-out transform hover:-translate-y-1.5 sm:flex sm:flex-column'>
                                <div className = ''>
                                    <h1 className = 'banner_sitename text-3xl text-black font-semibold sm:text-3xl'>{this.state.name}</h1>
                                    <h3 className = 'text-base mt-0 text-black text-md font-semibold'>{this.state.description}</h3>
                                </div>
                                <div className = 'sm:flex-grow' />
                                <div className = 'mt-4 sm:mt-0'>
                                    <Link to = {`/user/${this.state.authorID}`}>
                                        <div className = ''>
                                            <FontAwesomeIcon icon = {faUser} className = 'mr-2' />
                                            {this.state.author}
                                        </div>
                                    </Link>
                                    <div className = ''>
                                        <FontAwesomeIcon icon = {faFileAlt} className = 'mr-2' />
                                        {this.state.posts.length}개
                                    </div>
                                    {localStorage.user && (this.state.authorID === JSON.parse(localStorage.user).id) ? (
                                        <div className = ''>
                                            <FontAwesomeIcon icon = {faTrash} className = 'mr-2 cursor-pointer' onClick = {this.categoryDelete} />
                                            <FontAwesomeIcon icon = {faEdit} className = 'cursor-pointer' onClick = {this.categoryEdit} />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            {!!this.state.posts.length ? (
                                <div className = 'py-8'>
                                    <div className = 'text-left sm:flex'>
                                        <h2 className = 'text-2xl font-semibold text-gray-900 select-none'>글 목록</h2>
                                        <div className = 'sm:flex-grow' />
                                        <Link to = '/newpost' className = 'mr-2'>
                                            <button className = 'text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded border-r-2 mb-1 mt-2   sm:mb-0 sm:mt-0'>
                                                만들기!
                                            </button>
                                        </Link>
         
                                        <div className = 'flex sm:flex-row flex-col'>
                                            <div className = 'flex flex-row mb-1 sm:mb-0'>
                                                <div className = 'relative'>
                                                    <select className = 'appearance-none h-full rounded-r rounded-l sm:rounded-r-none border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' onChange = {e => {
                                                        this.setState({ searchOption: e.target.value })
                                                    }}>
                                                        {[
                                                            { value: 'newest', label: '최신 제작순' },
                                                            { value: 'alphabet', label: 'ㄱㄴㄷ 순'},
                                                            { value: 'hearts', label: '하트 개수 순' },
                                                            { value: 'views', label: '조회수 순' }
                                                        ].map(i => <option value = {i.value}>{i.label}</option>)}
                                                    </select>
                                                    <div className = 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                                        <svg className = 'fill-current h-4 w-4' xmlns = 'http://www.w3.org/2000/svg' viewBox = '0 0 20 20'>
                                                            <path d = 'M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <form onSubmit = {this.handleSubmit}>
                                                <div className = 'block relative'>
                                                    <span className = 'h-full absolute inset-y-0 left-0 flex items-center pl-2'>
                                                        <svg viewBox = '0 0 24 24' className = 'h-4 w-4 fill-current text-gray-500'>
                                                            <path d = 'M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z' />
                                                        </svg>
                                                    </span>
                                                    <input placeholder = 'Search' className = 'appearance-none rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none' onChange = {e => {
                                                        this.setState({ searchValue: e.target.value })
                                                    }} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
         
                                    {!(this.state.posts === null) ?
                                        !!(this.state.posts.length) ? (
                                            <div className = '-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                                <div className = 'inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                                    <table className = 'min-w-full leading-normal select-none'>
                                                        <thead>
                                                            <tr>
                                                                <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                                    제목
                                                                </th>
                                                                <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell'>
                                                                    글쓴이
                                                                </th>
                                                                <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                                    조회수
                                                                </th>
                                                                <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell'>
                                                                    하트
                                                                </th>
                                                                <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell'>
                                                                    댓글
                                                                </th>
                                                                <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                                    입장
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.posts[this.state.page].map(post => (
                                                                <tr>
                                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                        <div className = 'flex items-center'>
                                                                            <div className = 'ml-3'>
                                                                                <p className = 'text-gray-900'>{post.title}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell'>
                                                                        <p className = 'text-gray-900'>{`${post.author.username}#${post.author.discriminator}`}</p>
                                                                    </td>
                                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                        <p className = 'text-gray-900'>{post.views}</p>
                                                                    </td>
                                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell'>
                                                                        <p className = 'text-gray-900'>{post.hearts.length}</p>
                                                                    </td>
                                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell'>
                                                                        <p className = 'text-gray-900'>{post.comments.length}</p>
                                                                    </td>
                                                                    <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                        <Link to = {`post/${post._id}`}>
                                                                            <button className = 'text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded border-r-2'>
                                                                                입장
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className = 'px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between'>
                                                        <span className = 'text-xs cursor-default select-none xs:text-sm text-gray-900'>
                                                            Showing {this.state.page * 10 + 1} to {this.state.page * 10 + this.state.posts[this.state.page].length} of {this.state.allpostslength} Posts
                                                        </span>
                                                        <div className = 'inline-flex mt-2 xs:mt-0'>
                                                            <button className = {`text-sm bg-gray-300 ${!this.state.page ? 'cursor-default' : 'hover:bg-gray-400'} text-gray-800 font-semibold py-2 px-4 rounded-l border-r-2 border-gray-200`} onClick = {() => {
                                                                if (!this.state.page) return
                                                                this.setState(s => { return { page: s.page - 1 } })
                                                            }}>
                                                                Prev
                                                            </button>
                                                            <button className = {`text-sm bg-gray-300 ${this.state.page === this.state.posts.length - 1 ? 'cursor-default' : 'hover:bg-gray-400'} text-gray-800 font-semibold py-2 px-4 rounded-r border-l-2 border-gray-200`} onClick = {() => {
                                                                if (this.state.page === this.state.posts.length - 1) return
                                                                this.setState(s => { return { page: s.page + 1 } })
                                                            }}>
                                                                Next
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <h1>검색결과가 없습니다</h1>
                                        )
                                    
                                    : (
                                        <h1>결과 수집중...</h1>
                                    )}
                                </div>
                            ) : (
                                <h1 className = 'font-black text-3xl text-center m-16'>글이 없습니다</h1>
                            )}
                        </div>
                    ) : (
                        <h1 className = 'font-black text-3xl text-center'>카테고리가 없습니다</h1>
                    )
                }
            </div>
        )
    }
}

export default Category;