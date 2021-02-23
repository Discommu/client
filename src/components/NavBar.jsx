import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons';

import { req } from '../utils/request';

class NavBar extends Component {
    constructor () {
        super();
        this.state = {
            loginURL: '',
            user: null,
            popUp: false
        };
    }

    async componentDidMount() {
        try {
            this.setState({ user: JSON.parse(localStorage.user) })
            console.log(JSON.parse(localStorage.user))
        }
        catch {
            delete localStorage.user
        }

        if (localStorage.token && !localStorage.user) {
            const r = await req({
                query: `
                    query {
                        me {
                            id
                            username
                            avatarURL
                            discriminator
                        }
                    }
                `
            })
            console.log(r)

            if (r.error) {
                delete localStorage.token
                this.setState({ user: null })
            }
            else {
                this.setState({ user: r.data.me })
                localStorage.user = JSON.stringify(r.data.me)
            }
        }
        else if (!localStorage.token && !localStorage.user)
            this.setState({ user: null })

        if (localStorage.loginURL)
            this.setState({ loginURL: localStorage.loginURL })
        else {
            const r = await query({
                query: `
                    query {
                        loginURL
                    }
                `
            })
            this.setState({ loginURL: r.data.loginURL })
            localStorage.loginURL = this.state.loginURL
        }
    }

    render() {
        return (
            <div>
                <div className = 'border-b h-10 fixed top-0 left-0 w-full flex pl-4 items-center bg-white dark:bg-grey-900'>
                    <Link to = '/'>
                        <div className = 'flex-none text-lg select-none' style = {{fontFamily: 'Open Sans, sans-serif'}}>
                            DISCOMMU
                        </div>
                    </Link>
                    <div className = 'hidden flex-none sm:flex' style = {{fontFamily: 'Roboto, sans-serif'}}>
                        <Link to = '/commu' className = 'pl-5 pr-5 hover:cursor-pointer select-none'>게시판</Link>
                        <Link to = '/categories' className = 'pr-5 hover:cursor-pointer select-none'>카테고리</Link>
                    </div>

                    <div className = 'flex-grow' />

                    {this.state.user ? (
                    <>

                        <div className = 'sm:hidden' onClick = {() => this.setState({ popUp: !this.state.popUp })}>
                            <FontAwesomeIcon icon = {faBars} className = 'mr-5' />
                        </div>

                        <div className = 'hidden sm:flex'>
                            <div className = 'flex cursor-pointer items-center' onClick = {() => this.setState({ popUp: !this.state.popUp })}>
                                <img src = {this.state.user.avatarURL} className = 'rounded-full w-7 h-7 mr-2' />
                                <h4 className = 'pr-2 select-none'>{this.state.user.username.length > 10 ? `${this.state.user.username.slice(0, 10)}...` : this.state.user.username}#{this.state.user.discriminator}</h4>
                                <FontAwesomeIcon icon = {faAngleDown} className = 'mr-5' />
                            </div>

                            {this.state.popUp ? (
                                <div className = 'mt-9 origin-top-right absolute right-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                                    <div className = 'py-1' role = 'menu' aria-orientation = 'vertical' aria-labelledby = 'options-menu'>
                                        <Link to = {`/user/${this.state.user.id}`} className = 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>프로필</Link>
                                        <button onClick = {() => {
                                            delete localStorage.token
                                            delete localStorage.user
                                            location.reload()
                                        }} className = 'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'>
                                            로그아웃
                                        </button>
                                    </div>
                                </div>
                            ): null}
                        </div>
                    </>
                    ) : (
                        <a href = {this.state.loginURL} className = 'select-none pr-5'>
                            로그인
                        </a>
                    )}
                </div>

                {this.state.popUp ? (
                    <div className = 'w-full fixed mt-10 border-b sm:hidden'>
                        <Link to = 'commu'  className = 'flex cursor-pointer items-center px-4 py-1 w-full h-8 flex text-m text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                            <h4 className = 'pr-2 select-none'>게시판</h4>
                        </Link>

                        <Link to = 'categories'  className = 'border-t flex cursor-pointer items-center px-4 py-1 w-full h-8 flex text-m text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                            <h4 className = 'pr-2 select-none'>카테고리</h4>
                        </Link>

                        <button onClick = {() => {
                            delete localStorage.token
                            delete localStorage.user
                            location.reload()
                        }} className = 'border-t px-4 py-1 w-full h-8 flex text-m text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                            로그아웃
                        </button>

                        <Link to = {`/user/${this.state.user.id}`}  className = 'border-t flex cursor-pointer items-center px-4 py-1 w-full h-8 flex text-m text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                            <img src = {this.state.user.avatarURL} className = 'rounded-full w-7 h-7 mr-2' />
                            <h4 className = 'pr-2 select-none'>{this.state.user.username.length > 10 ? `${this.state.user.username.slice(0, 10)}...` : this.state.user.username}#{this.state.user.discriminator}</h4>
                        </Link>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default NavBar;