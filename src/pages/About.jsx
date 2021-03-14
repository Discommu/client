import React, { Component } from 'react';

import DeveloperProfile from '../components/DeveloperProfile';
import developers from '../data/developers';

class About extends Component {
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
                        <div className = 'grid gap-5 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
                            {developers.map(m => (<DeveloperProfile {...m} />))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;