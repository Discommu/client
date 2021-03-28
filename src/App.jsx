import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import NoIE from './pages/NoIE';
import About from './pages/About';
import CallBack from './pages/Callback';

import Categories from './pages/Categories';
import Posts from './pages/Posts';

import Category from './pages/Category';
import Post from './pages/Post';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

class App extends Component {
    componentDidMount() {
        localStorage.theme = localStorage.theme || 'white'
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        if (!location.href.includes('/callback')) {
            localStorage.previousPage = location.href
        }
    }

    render() {
        if (!!document.documentMode) {
            return <NoIE />
        }

        return (
            <div className = 'flex flex-col h-screen'>
                <BrowserRouter>
                    <NavBar />
                    <div className = 'mb-auto'>
                        <Switch>
                            <Route exact path = '/' component = {Main} />
                            <Route path = '/about' component = {About} />
                            <Route path = '/callback' component = {CallBack} />
                            <Route path = '/categories' component = {Categories} />
                            <Route path = '/commu' component = {Posts} />
                            <Route path = '/noie' component = {NoIE} />
                            <Route path = '/category/:name' component = {Category} />
                            <Route path = '/post/:id' component = {Post} />
                        </Switch>
                    </div>
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
};

export default App;