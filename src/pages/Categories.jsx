import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import divide from '../utils/divide';
import { req } from '../utils/request';
import { errorAlert } from '../utils/alert';

class Categories extends Component {
    constructor () {
        super();
        this.state = {
            selectedOption: null,
            searchValue: null,
            categories: null,
            allcategories: null,
            page: 0
        };
    }

    async componentDidMount() {
        const res = await req({
            query: `
                query {
                    categories {
                        name
                        description
                        author {
                            username
                            discriminator
                        }
                        posts {
                            title
                        }
                    }
                }
            `
        })
        if (res.errors) {
            await errorAlert({
                title: '카테고리 불러오기를 실패했습니다'
            })
        }

        else {
            let res2 = []
            for (let i = 0 ; i < res.data.categories.length ; i ++) {
                const j = res.data.categories[i]
                res2.push({
                    name: j.name,
                    description: j.description,
                    author: `${j.author.username}#${j.author.discriminator}`,
                    posts: j.posts.length
                })
            }
            this.setState({
                allcategorieslength: res2.length, 
                categories: divide(res2, 10)
            })
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        const res = await req({
            query: `
                query {
                    categories(searchType: "${this.state.selectedOption}", searchQuery: "${this.state.searchValue}") {
                        name
                        description
                        author {
                            username
                            discriminator
                        }
                        posts {
                            title
                        }
                    }
                }
            `
        })
        if (res.errors) {
            console.log(res.errors)
            await errorAlert({
                title: '카테고리 검색을 실패했습니다'
            })
        }

        else {
            let res2 = []
            for (let i = 0 ; i < res.data.categories.length ; i ++) {
                const j = res.data.categories[i]
                res2.push({
                    name: j.name,
                    description: j.description,
                    author: `${j.author.username}#${j.author.discriminator}`,
                    posts: j.posts.length
                })
            }
            this.setState({
                allcategories: res2, 
                categories: divide(res2, 10)
            })
        }
    }

    render() {
        return (
            <div className = 'antialiased font-sans mt-10'>
                <div className = 'container mx-auto px-4 sm:px-8'>
                    <div className = 'py-8'>
                        <div className = 'text-left sm:flex'>
                            <h2 className = 'text-2xl font-semibold text-gray-900 select-none'>카테고리 목록</h2>
                            <div className = 'sm:flex-grow' />
                            <Link to = '/newcategory' className = 'mr-2'>
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
                                                { value: 'posts', label: '글 개수 순' }
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

                        {!(this.state.categories === null) ?
                            !!(this.state.categories.length) ? (
                                <div className = '-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                    <div className = 'inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                        <table className = 'min-w-full leading-normal select-none'>
                                            <thead>
                                                <tr>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                        이름
                                                    </th>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell'>
                                                        글 수
                                                    </th>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell'>
                                                        제작자
                                                    </th>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                        설명
                                                    </th>
                                                    <th className = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                        입장
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.categories[this.state.page].map(category => (
                                                    <tr>
                                                        <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <div className = 'flex items-center'>
                                                                <div className = 'ml-3'>
                                                                    <p className = 'text-gray-900'>{category.name}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell'>
                                                            <p className = 'text-gray-900'>{category.posts}</p>
                                                        </td>
                                                        <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm hidden sm:table-cell'>
                                                            <p className = 'text-gray-900'>{category.author}</p>
                                                        </td>
                                                        <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <p className = 'text-gray-900'>{category.description}</p>
                                                        </td>
                                                        <td className = 'px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <Link to = {`category/${category.name}`}>
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
                                                Showing {this.state.page * 10 + 1} to {this.state.page * 10 + this.state.categories[this.state.page].length} of {this.state.allcategorieslength} Categories
                                            </span>
                                            <div className = 'inline-flex mt-2 xs:mt-0'>
                                                <button className = {`text-sm bg-gray-300 ${!this.state.page ? 'cursor-default' : 'hover:bg-gray-400'} text-gray-800 font-semibold py-2 px-4 rounded-l border-r-2 border-gray-200`} onClick = {() => {
                                                    if (!this.state.page) return
                                                    this.setState(s => { return { page: s.page - 1 } })
                                                }}>
                                                    Prev
                                                </button>
                                                <button className = {`text-sm bg-gray-300 ${this.state.page === this.state.categories.length - 1 ? 'cursor-default' : 'hover:bg-gray-400'} text-gray-800 font-semibold py-2 px-4 rounded-r border-l-2 border-gray-200`} onClick = {() => {
                                                    if (this.state.page === this.state.categories.length - 1) return
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
                </div>
            </div>
        )
    }
}

export default Categories;