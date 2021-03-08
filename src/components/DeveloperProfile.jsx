import React from 'react';

const DevloperProfile = ({ iconURL, name, role, github }) => (
    <a href = {`https://github.com/${github}`}>
        <div class = 'flex flex-col items-center justify-center bg-white p-4 shadow-2xl rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1.5'>
		    <div className = 'inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40'>
			    <img src = {iconURL} alt = {`${name} icon`} className = 'h-full w-full' />
			</div>

			<h2 className = 'mt-4 font-bold text-xl'>{name}</h2>
			<h5 className = 'mt-2 text-md font-medium'>{role}</h5>
		</div>
    </a>
)

export default DevloperProfile;