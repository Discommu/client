import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { req } from '../utils/request';
import { errorAlert, inputAlert, successAlert, confirmAlert } from '../utils/alert';

import PostList from '../components/PostList';

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
                authorID: data.author.id,
                postlength: data.posts.length
            })
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
                                        {this.state.postlength}개
                                    </div>
                                    {localStorage.user && (this.state.authorID === JSON.parse(localStorage.user).id) ? (
                                        <div className = ''>
                                            <FontAwesomeIcon icon = {faTrash} className = 'mr-2 cursor-pointer' onClick = {this.categoryDelete} />
                                            <FontAwesomeIcon icon = {faEdit} className = 'cursor-pointer' onClick = {this.categoryEdit} />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className = 'py-8'>
                                <PostList category = {this.state.name} />
                            </div>
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