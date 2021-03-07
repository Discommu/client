import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import CallBack from './pages/Callback';
import About from './pages/About';

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
        return (
            <div className = 'flex flex-col h-screen'>
                <BrowserRouter>
                    <NavBar />
                    <div className = 'mb-auto'>
                        <Switch>
                            <Route exact path = '/' component = {Main} />
                            <Route path = '/about' component = {About} />
                            <Route path = '/callback' component = {CallBack} />
                        </Switch>
                    </div>
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
};

export default App;