import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const Main = () => (
    <div className = 'pt-16 w-full tracking-tighter'>
        <div className = 'select-none w-4/5 h-56 pl-12 pt-12 mx-auto bg-gradient-to-r from-green-500 to-purple-500 rounded-3xl'>
            <h1 className = 'banner_sitename text-3xl text-white font-bold sm:text-3xl'>DISCOMMU</h1>
            <h3 className = 'text-base mt-0 text-white text-lg font-bold'>Discord에서의 게시판!</h3>
            <Link to = '/commu'>
                <button className = 'text-base border-white border-2 p-2 rounded-lg mt-2 text-white font-semibold hover:bg-white hover:text-green-500'>
                    게시판
                </button>
            </Link>
        </div>

        <div className = 'select-none w-4/5 pt-12 mx-auto lg:grid lg:grid-cols-2 lg:gap-4'>
            <a href = 'https://discord.com/api/oauth2/authorize?client_id=761495487215042570&permissions=0&scope=bot'>
                <div className = 'transition duration-200 ease-in-out w-full h-16 pl-6 rounded-xl flex items-center transform hover:-translate-y-1.5' style = {{backgroundColor: '#7289da'}}>
                    <FontAwesomeIcon icon = {faDiscord} className = 'text-3xl' style = {{color: 'white'}} />
                    <h2 className = 'text-white text-lg font-bold ml-6 sm:text-xl'>DISCOMMU BOT 초대하기!</h2>
                </div>
            </a>
            <a href = 'https://discord.gg/R5UG5mR'>
                <div className = 'transition duration-200 ease-in-out w-full h-16 pl-6 rounded-xl shadow-2xl flex items-center transform hover:-translate-y-1.5'>
                    <h2 className = 'text-lg font-bold ml-6 sm:text-xl'>Team Kat 보러가기!</h2>
                </div>
            </a>
        </div>
    </div>
)

export default Main;