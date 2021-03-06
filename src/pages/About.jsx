import React, { Component } from 'react';

import DevloperProfile from '../components/DevloperProfile';
import developers from '../data/developers';

class About extends Component {
    constructor () {
        super();
        this.state = {
        };
    }

    async componentDidMount() {
    }

    render() {
        return (
            <div className = 'mt-20'>
                <div className = 'text-center'>
                    <img className = 'rounded-full mx-auto' src = '/favicon.ico' alt = 'discommu logo' />
                    <h1 className = 'text-4xl font-black mt-10'>DISCOMMU</h1>
                    <h2 className = 'text-xl font-2xl'>Discord에서의 게시판</h2>
                </div>

                <div className = 'mt-20 mx-20'>
                    <div className = 'divide-y-2 divide-black divide-opacity-25'>
                        <h2 className = 'text-3xl font-black pb-6'>개발자</h2>
                        <div className = 'grid grid-cols-4 gap-5 pt-4'>
                            {developers.map(m => (<DevloperProfile {...m} />))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;