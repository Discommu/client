import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => (
    <div className = 'pt-16 w-full'>
        <div className = 'select-none w-4/5 h-56 pl-12 pt-12 mx-auto bg-gradient-to-r from-green-500 to-purple-500 rounded-3xl sm:h-60'>
            <h1 className = 'banner_sitename text-3xl text-white font-bold sm:text-4xl'>DISCOMMU</h1>
            <h3 className = 'text-base mt-0 text-white text-xl font-bold sm:text-xl'>Discord에서의 게시판!</h3>
            <Link to = '/commu'>
                <button className = 'text-base border-white border-2 p-2 rounded-lg mt-2 text-white font-semibold hover:bg-white hover:text-green-500 sm:text-xl'>
                    게시판
                </button>
            </Link>
        </div>
    </div>
)

export default Main;