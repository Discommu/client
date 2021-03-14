import React, { Component } from 'react';

class NoIE extends Component {
    render() {
        return (
            <div className = 'mt-16 text-center select-none'>
                <img className = 'mx-auto' src = 'https://arklign.com/wp-content/uploads/2019/07/no-ie-475x280.jpg' alt = 'noie' />
                <h1 className = 'text-4xl font-black mt-4'>Don't use IE!!</h1>
                <a href = 'https://death-to-ie11.com/'>
                    <button className = 'border-2 border-blue-500 rounded-md py-1 px-24 bg-blue-500 text-white font-black mt-4 transition duration-200 ease-in-out transform hover:bg-blue-600'>
                        Why?
                    </button>
                </a>
            </div>
        )
    }
}

export default NoIE;